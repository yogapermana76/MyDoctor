import React, { useState } from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import { showMessage } from "react-native-flash-message";
import { Header, Input, Button, Gap, Loading } from '../../components';
import { colors, useForm, storeData } from '../../utils';
import { FireBase } from '../../config';

const Register = ({ navigation }) => {
  const [form, setForm] = useForm({
    fullName: '',
    profession: '',
    email: '',
    password: ''
  })

  const [loading, setLoading] = useState(false)

  const onContinue = () => {
    setLoading(true)
    FireBase.auth()
      .createUserWithEmailAndPassword(form.email, form.password)
      .then(success => {
        setLoading(false)
        setForm('reset')
        const data = {
          fullName: form.fullName,
          profession: form.profession,
          email: form.email,
          uid: success.user.uid
        }

        FireBase.database()
          .ref(`users/${success.user.uid}/`)
          .set(data)

        storeData('user', data)
        navigation.navigate('UploadPhoto', data)
      })
      .catch(error => {
        const errorMessage = error.message;
        setLoading(false)
        showMessage({
          message: errorMessage,
          type: 'default',
          backgroundColor: colors.error,
          color: colors.white
        });
      });
  }

  return (
    <>
      <View style={styles.page}>
        <Header onPress={() => navigation.goBack()} title="Daftar Akun" />
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <Input
            label="Full Name"
            value={form.fullName}
            onChangeText={value => setForm('fullName', value)}
          />
          <Gap height={24} />
          <Input
            label="Pekerjaan"
            value={form.profession}
            onChangeText={value => setForm('profession', value)}
          />
          <Gap height={24} />
          <Input
            label="Email"
            value={form.email}
            onChangeText={value => setForm('email', value)}
          />
          <Gap height={24} />
          <Input
            label="Password"
            value={form.password}
            onChangeText={value => setForm('password', value)}
            secureTextEntry
          />
          <Gap height={40} />
          <Button
            title="Continue"
            onPress={onContinue}
          />
        </ScrollView>
      </View>
      {loading && <Loading />}
    </>
  )
}

export default Register;

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    flex: 1
  },
  content: {
    padding: 40, paddingTop: 0
  }
})
