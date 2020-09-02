import React, { useState, useEffect } from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import ImagePicker from 'react-native-image-picker';
import { Header, Profile, Input, Button, Gap } from '../../components'
import { colors, getData, storeData } from '../../utils'
import { FireBase } from '../../config'
import { showMessage } from 'react-native-flash-message'
import { ILNullPhoto } from '../../assets';

const UpdateProfile = ({navigation}) => {
  const [profile, setProfile] = useState({
    fullName: '',
    profession: '',
    email: '',
  })
  const [password, setPassword] = useState('')
  const [photo, setPhoto] = useState(ILNullPhoto)
  const [photoForDB, setPhotoForDB] = useState('')

  useEffect(() => {
    getData('user').then(res => {
      const data = res
      setPhoto({ uri: res.photo })
      setPhotoForDB(res.photo)
      setProfile(data)
    })
  }, [])

  const update = () => {
    const data = profile
    data.photo = photoForDB

    if (password.length > 0) {
      if (password.length < 6) {
        showMessage({
          message: 'Password kurang dari 6 karakter',
          type: 'default',
          backgroundColor: colors.error,
          color: colors.white
        })
      } else {
        updatePassword()
        updateProfileData()
      }
    } else {
      updateProfileData()
    }
  }

  const updatePassword = () => {
    FireBase.auth()
      .onAuthStateChanged(user => {
        if (user) {
          user.updatePassword(password)
          .catch(err => {
            showMessage({
              message: err.message,
              type: 'default',
              backgroundColor: colors.error,
              color: colors.white
            })
          })
        }
      })
  }

  const updateProfileData = () => {
    const data = profile
    data.photo = photoForDB

    FireBase.database()
      .ref(`users/${profile.uid}/`)
      .update(data)
      .then(() => {
        storeData('user', data)
        navigation.goBack('UserProfile')
      })
      .catch(err => {
        showMessage({
          message: err.message,
          type: 'default',
          backgroundColor: colors.error,
          color: colors.white
        })
      })
  }

  const changeText = (key, value) => {
    setProfile({
      ...profile,
      [key]: value
    })
  }

  const getImage = () => {
    const option = {
      quality: 0.5,
      maxWidth: 200,
      maxHeight: 200
    }
    ImagePicker.launchImageLibrary(option, (response) => {
      if (response.didCancel || response.error) {
        showMessage({
          message: 'ooops, sepertinya anda tidak memilih fotonya?',
          type: 'default',
          backgroundColor: colors.error,
          color: colors.white
        })
      } else {
        const source = { uri: response.uri }
        setPhotoForDB(`data:${response.type};base64, ${response.data}`)
        setPhoto(source)
      }
    })
  }

  return (
    <View style={styles.page}>
      <Header title="Update Profile" onPress={() => navigation.goBack()} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Profile isRemove photo={photo} onPress={getImage} />
          <Gap height={26} />
          <Input
            label="Full Name"
            value={profile.fullName}
            onChangeText={(value) => changeText('fullName', value)}
          />
          <Gap height={24} />
          <Input
            label="Pekerjaan"
            value={profile.profession}
            onChangeText={(value) => changeText('profession', value)}
          />
          <Gap height={24} />
          <Input
            disable
            label="Email"
            value={profile.email}
          />
          <Gap height={24} />
          <Input
            label="Password"
            value={password}
            onChangeText={(value) => setPassword(value)}
            secureTextEntry
          />
          <Gap height={24} />
          <Button
            title="Save Profile"
            onPress={update}
          />
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
