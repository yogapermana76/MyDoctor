import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { List } from '../../components'
import { colors, fonts } from '../../utils'
import { DummyDoctor1 } from '../../assets'

const Messages = () => {
  return (
    <View style={styles.page}>
      <View style={styles.content}>
        <Text style={styles.title}>Messages</Text>
        <List
          profile={DummyDoctor1}
          name="Alexander Jannie"
          desc="Male"
        />
        <List
          profile={DummyDoctor1}
          name="Alexander Jannie"
          desc="Male"/>
        <List
          profile={DummyDoctor1}
          name="Alexander Jannie"
          desc="Male"
        />
      </View>
    </View>
  )
}

export default Messages

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.secondary,
    flex: 1
  },
  content: {
    backgroundColor: colors.white,
    flex: 1,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20
  },
  title: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginTop: 30,
    marginLeft: 16,
  }
})
