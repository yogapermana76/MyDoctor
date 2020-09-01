import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { colors, fonts } from '../../../utils'
import { DummyDoctor1 } from '../../../assets'

const Other = () => {
  return (
    <View style={styles.container}>
      <Image source={DummyDoctor1} style={styles.avatar} />
      <View>
        <View style={styles.chatContent}>
          <Text style={styles.text}>Chat Item Component</Text>
        </View>
        <Text style={styles.date}>4.50 AM</Text>
      </View>
    </View>
  )
}

export default Other

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    alignItems: 'flex-end',
    paddingLeft: 16,
    flexDirection: 'row'
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    marginRight: 12
  },
  chatContent: {
    backgroundColor: colors.primary,
    padding: 12,
    paddingRight: 18,
    maxWidth: '80%',
    borderRadius: 10,
    borderBottomLeftRadius: 0
  },
  text: {
    fontSize: 14,
    fontFamily: fonts.primary.normal,
    color: colors.white
  },
  date: {
    fontSize: 11,
    fontFamily: fonts.primary.normal,
    color: colors.text.secondary,
    marginTop: 8
  }
})