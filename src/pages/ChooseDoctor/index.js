import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Header, List } from '../../components'
import { colors, showError } from '../../utils'
import { FireBase } from '../../config'

const ChooseDoctor = ({navigation, route}) => {
  const itemCategory = route.params
  const [doctors, setDoctors] = useState([])

  useEffect(() => {
    callDoctorByCategory()
  }, [])

  const callDoctorByCategory = () => {
    FireBase.database()
      .ref('doctors')
      .orderByChild('category')
      .equalTo(itemCategory.category)
      .once('value')
      .then(res => {
        if (res.val()) {
          const data = Object.keys(res.val()).map(id => ({ id, data: res.val()[id] }))
          setDoctors(data)
        }
      })
      .catch(err => {
        showError(err.message)
      })
  }

  return (
    <View style={styles.page}>
      <Header
        type="dark"
        title={`Pilih ${itemCategory.category}`}
        onPress={() => navigation.goBack()}
      />
      {doctors.map(doctor => (
        <List
          key={doctor.id}
          type="next"
          profile={{ uri: doctor.data.photo }}
          name={doctor.data.fullName}
          desc={doctor.data.gender}
          onPress={() => navigation.navigate('DoctorProfile', doctor)}
        />
      ))}
    </View>
  )
}

export default ChooseDoctor

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    flex: 1
  }
})
