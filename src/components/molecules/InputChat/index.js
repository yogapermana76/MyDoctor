import React from 'react'
import { StyleSheet, View, TextInput } from 'react-native'
import { colors, fonts } from '../../../utils'
import { Button } from '../../atoms'

const InputChat = () => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Tulis Pesan Untuk Nairobi"
      />
      <Button type="btn-icon-send" title="Send" />
    </View>
  )
}

export default InputChat

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexDirection: 'row',
  },
  input: {
    backgroundColor: colors.disable,
    padding: 14,
    borderRadius: 10,
    flex: 1,
    marginRight: 10,
    fontSize: 14,
    fontFamily: fonts.primary.normal,
    maxHeight: 45
  }
})
