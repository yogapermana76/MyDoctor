import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { HomeProfile, DoctorCategory, RatedDoctor, NewsItem, Gap } from '../../components'
import { fonts, colors, showError } from '../../utils'
import { ScrollView } from 'react-native-gesture-handler'
import { FireBase } from '../../config'

const Doctor = ({navigation}) => {
  const [news, setNews] = useState([])
  const [doctors, setDoctors] = useState([])
  const [categoryDoctor, setCategoryDoctor] = useState([])

  useEffect(() => {
    getCategoryDoctor()
    getTopRatedDoctors()
    getNews()
  }, [])

  const getCategoryDoctor = () => {
    FireBase.database()
      .ref('category_doctor/')
      .once('value')
      .then(res => {
        if (res.val()) {
          const data = res.val().filter(el => el !== null)
          setCategoryDoctor(data)
        }
      })
      .catch(err => {
        showError(err.message)
      })
  }

  const getTopRatedDoctors = () => {
    FireBase.database()
      .ref('doctors/')
      .orderByChild('rate')
      .limitToLast(3)
      .once('value')
      .then(res => {
        if (res.val()) {
          const oldData = res.val()
          const data = []
          Object.keys(oldData).map(key => {
            data.push({
              id: key,
              ...oldData[key]
            })
          })
          setDoctors(data)
        }
      })
      .catch(err => {
        showError(err.message)
      })
  }

  const getNews = () => {
    FireBase.database()
      .ref('news/')
      .once('value')
      .then(res => {
        if (res.val()) {
          const data = res.val().filter(el => el !== null)
          setNews(data)
        }
      })
      .catch(err => {
        showError(err.message)
      })
  }

  return (
    <View style={styles.page}>
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.wrapperSection}>
            <Gap height={30} />
            <HomeProfile onPress={() => navigation.navigate('UserProfile')} />
            <Text style={styles.welcome}>Mau konsultasi dengan siapa hari ini?</Text>
          </View>
          <View style={styles.wrapperScroll}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} >
              <View style={styles.category}>
                <Gap width={32} />
                {categoryDoctor.map(item => (
                  <DoctorCategory
                    key={item.id}
                    category={item.category}
                    onPress={() => navigation.navigate('ChooseDoctor', item)}
                  />
                ))}
                <Gap width={22} />
              </View>
            </ScrollView>
          </View>
          <View style={styles.wrapperSection}>
            <Text style={styles.sectionLabel}>Top Rated Doctors</Text>
            {doctors.map(item => (
              <RatedDoctor
                key={item.id}
                name={item.fullName}
                desc={item.category}
                avatar={{ uri: item.photo }}
                onPress={() => navigation.navigate('DoctorProfile', item)}
              />
            ))}
            <Text style={styles.sectionLabel}>Good News</Text>
          </View>
          {news.map(item => (
            <NewsItem
              key={item.id}
              title={item.title}
              date={item.date}
              image={item.image}
            />
          ))}
          <Gap height={30} />
        </ScrollView>
      </View>
    </View>
  )
}

export default Doctor

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
  wrapperSection: {
    paddingHorizontal: 16
  },
  welcome: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginTop: 30,
    marginBottom: 16,
    maxWidth: 209
  },
  category: {
    flexDirection: 'row'
  },
  wrapperScroll: {
    marginHorizontal: -16
  },
  sectionLabel: {
    fontSize: 16,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginTop: 30,
    marginBottom: 16
  }
})
