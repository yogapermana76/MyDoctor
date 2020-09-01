import React, { useState } from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import { Header, Input, Button, Gap } from '../../components';
import { colors } from '../../utils';

const Register = ({navigation}) => {
  const [fullName, setFullName] = useState('')
  const [profession, setProfession] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const onContinue = () => {
    // navigation.navigate('UploadPhoto')
    console.log(fullName, profession, email, password)
  }
  return (
    <View style={styles.page}>
      <Header onPress={() => navigation.goBack()} title="Daftar Akun" />
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Input
            label="Full Name"
            value={fullName}
            onChangeText={setFullName}
          />
          <Gap height={24} />
          <Input
            label="Pekerjaan"
            value={profession}
            onChangeText={setProfession}
          />
          <Gap height={24} />
          <Input
            label="Email"
            value={email}
            onChangeText={setEmail}
          />
          <Gap height={24} />
          <Input
            label="Password"
            value={password}
            onChangeText={setPassword}
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
