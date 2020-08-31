import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { IconDoctor, IconMessages, IconDoctorActive, IconMessagesActive, IconHospitalsActive } from '../../../assets'
import { colors, fonts } from '../../../utils'

const TabItem = ({title, active, onPress, onLongPress}) => {
  const Icon = () => {
    if (title === 'Doctor') {
      return active ? <IconDoctorActive /> : <IconDoctor />
    }
    if (title === 'Messages') {
      return active ? <IconMessagesActive /> : <IconMessages />
    }
    if (title === 'Hospitals') {
      return  active ? <IconHospitalsActive /> : <IconMessages />
    }
    return <IconDoctor />
  }
  return (
    <TouchableOpacity onPress={onPress} onLongPress={onLongPress}>
      <View style={styles.container}>
        <Icon />
        <Text style={styles.text(active)}>{title}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default TabItem

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  text: (active) => ({
    fontSize: 10,
    color: active ? colors.text.menuActive : colors.text.menuInactive,
    fontFamily: fonts.primary[600],
    marginTop: 4
  })
})
