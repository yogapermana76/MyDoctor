import React from 'react'
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import { colors, fonts } from '../../../utils'

const Loading = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.primary} />
      <Text style={styles.text}>Loading...</Text>
    </View>
  )
}

export default Loading

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.loadingBackgound,
    width: '100%',
    height: '100%'
  },
  text: {
    fontSize: 18,
    fontFamily: fonts.primary[600],
    color: colors.primary,
    marginTop: 16
  }
})
