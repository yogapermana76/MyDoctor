import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Header, ListDoctor } from '../../components'
import { DummyDoctor1 } from '../../assets'
import { colors } from '../../utils'

const ChooseDoctor = () => {
  return (
    <View style={styles.page}>
      <Header type="dark" title="Pilih Dokter Anak" />
      <ListDoctor
        type="next"
        profile={DummyDoctor1}
        name="Alexander Jannie"
        desc="Male"
      />
      <ListDoctor
        type="next"
        profile={DummyDoctor1}
        name="Alexander Jannie"
        desc="Male"
      />
      <ListDoctor
        type="next"
        profile={DummyDoctor1}
        name="Alexander Jannie"
        desc="Male"
      />
      <ListDoctor
        type="next"
        profile={DummyDoctor1}
        name="Alexander Jannie"
        desc="Male"
      />
      <ListDoctor
        type="next"
        profile={DummyDoctor1}
        name="Alexander Jannie"
        desc="Male"
      />
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
