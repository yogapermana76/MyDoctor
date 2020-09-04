import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import { colors, fonts } from '../../../utils';
import IconOnly from './IconOnly';
import BtnIconSend from './BtnIconSend';

const Button = ({type, title, onPress, icon, disable}) => {
  if (type === 'btn-icon-send') {
    return <BtnIconSend disable={disable} onPress={onPress} />
  }
  if (type === 'icon-only') {
    return <IconOnly icon={icon} onPress={onPress} />
  }
  if (disable) {
    return (
      <View style={styles.disableBg}>
        <Text style={styles.disableText}>{title}</Text>
      </View>
    )
  }
  return (
    <TouchableOpacity style={styles.container(type)} onPress={onPress}>
      <Text style={styles.title(type)}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: (type) => ({
    backgroundColor: type === 'secondary' ? colors.button.secondary.background : colors.button.primary.background,
    paddingVertical: 10,
    borderRadius: 10,
  }),
  title: (type) => ({
    color: type === 'secondary' ? colors.button.secondary.text : colors.button.primary.text,
    fontSize: 18,
    textAlign: 'center',
    fontFamily: fonts.primary[600],
  }),
  disableBg: {
    backgroundColor: colors.button.disable.background,
    paddingVertical: 10,
    borderRadius: 10, 
  },
  disableText: {
    color: colors.button.disable.text,
    fontSize: 18,
    textAlign: 'center',
    fontFamily: fonts.primary[600],
  }
});
