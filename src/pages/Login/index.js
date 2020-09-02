import React, { useState } from 'react';
import { StyleSheet, Text, ScrollView } from 'react-native';
import { ILLogo } from '../../assets';
import { Input, Button, Link, Gap, Loading } from '../../components';
import { colors, fonts, useForm, storeData } from '../../utils';
import { FireBase } from '../../config';
import { showMessage } from 'react-native-flash-message';

const Login = ({ navigation }) => {
  const [form, setForm] = useForm({ email: '', password: '' })
  const [loading, setLoading] = useState(false)

  const login = () => {
    setLoading(true)
    FireBase.auth()
      .signInWithEmailAndPassword(form.email, form.password)
      .then(res => {
        setLoading(false)
        FireBase.database()
          .ref(`users/${res.user.uid}/`)
          .once('value')
          .then(resDB => {
            if (resDB.val()) {
              storeData('user', resDB.val())
              navigation.replace('MainApp')
            }
          })
      })
      .catch(err => {
        setLoading(false)
        showMessage({
          message: err.message,
          type: 'default',
          backgroundColor: colors.error,
          color: colors.white
        })
      })
  }

  return (
    <>
      <ScrollView style={styles.page} showsVerticalScrollIndicator={false}>
        <ILLogo />
        <Text style={styles.title}>Masuk dan mulai berkonsultasi</Text>
        <Input
          label="Email Address"
          value={form.email}
          onChangeText={(value) => setForm('email', value)}
        />
        <Gap height={24} />
        <Input
          label="Password"
          value={form.password}
          onChangeText={(value) => setForm('password', value)}
          secureTextEntry
        />
        <Gap height={10} />
        <Link title="Forgot My Password" size={12} />
        <Gap height={40} />
        <Button title="Sign In" onPress={login} />
        <Gap height={30} />
        <Link
          title="Create New Account"
          size={16}
          align="center"
          onPress={() => navigation.navigate('Register')}
        />
      </ScrollView>
      {loading && <Loading />}
    </>
  )
}

export default Login

const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: colors.white,
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginVertical: 40,
    maxWidth: 153,
  }
})
