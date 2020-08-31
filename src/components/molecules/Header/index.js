import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {IconBackDart} from '../../../assets';
import { Gap } from '../../atoms';
import { colors } from '../../../utils';

const Header = () => {
  return (
    <View style={styles.container}>
      <IconBackDart />
      <Text style={styles.text}>ini header</Text>
      <Gap width={24} />
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 30,
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center'
  },
  text: {
    textAlign: 'center',
    flex: 1,
    color: colors.text.primary,
    fontSize: 20,
    fontFamily: 'Nurito-SemiBold',
  },
})
