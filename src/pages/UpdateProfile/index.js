import React from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import { Header, Profile, Input, Button, Gap } from '../../components'
import { colors } from '../../utils'

const UpdateProfile = () => {
  return (
    <View style={styles.page}>
      <Header title="Update Profile" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Profile />
          <Gap height={26} />
          <Input label="Full Name" />
          <Gap height={24} />
          <Input label="Pekerjaan" />
          <Gap height={24} />
          <Input label="Email" />
          <Gap height={24} />
          <Input label="Password" />
          <Gap height={24} />
          <Button title="Save Profile" />
          <Gap height={40} />
        </View>
      </ScrollView>
    </View>
  )
}

export default UpdateProfile

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    flex: 1
  },
  content: {
    padding: 40,
    paddingTop: 0
  }
})
