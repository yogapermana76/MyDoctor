import React, { useState } from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import { Header, Input, Button, Gap, Loading } from '../../components';
import { colors, useForm } from '../../utils';
import { FireBase } from '../../config';

const Register = ({navigation}) => {
  const [form, setForm] = useForm({
    fullName: '',
    profession: '',
    email: '',
    password: ''
  })

  const [loading, setLoading] = useState(false)

  const onContinue = () => {
    // navigation.navigate('UploadPhoto')
    setLoading(true)
    FireBase.auth()
      .createUserWithEmailAndPassword(form.email, form.password)
      .then(success => {
        setForm('reset')
        setLoading(false)
        console.log(success, 'register success')
      })
      .catch(error => {
        const errorMessage = error.message;
        setLoading(false)
        console.log(errorMessage, 'register error')
      });
  }

  return (
    <>
      <View style={styles.page}>
        <Header onPress={() => navigation.goBack()} title="Daftar Akun" />
        <View style={styles.content}>
          <ScrollView showsVerticalScrollIndicator={false}>
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
