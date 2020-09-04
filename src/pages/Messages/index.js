import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { List } from '../../components'
import { colors, fonts, getData } from '../../utils'
import { FireBase } from '../../config'

const Messages = ({navigation}) => {
  const [historyChat, setHistoryChat] = useState([])
  const [user, setUser] = useState({})

  useEffect(() => {
    getDataUserFromLocal()
    const rootDB = FireBase.database().ref()
    const urlHistory = `messages/${user.uid}/`
    const messagesDB = rootDB.child(urlHistory)

    messagesDB
      .on('value', async snapshot => {
        if (snapshot.val()) {
          const oldData = snapshot.val()
          const data = []

          const promises = await Object.keys(oldData).map(async key => {
            const urlUidDoctor = `doctors/${oldData[key].uidPartner}`
            const detailDoctor = await rootDB.child(urlUidDoctor).once('value')
            data.push({
              id: key,
              detailDoctor: detailDoctor.val(),
              ...oldData[key]
            })
          })

          await Promise.all(promises)

          setHistoryChat(data)
        }
      })
  }, [user.uid])

  const getDataUserFromLocal = () => {
    getData('user').then(res => {
      setUser(res)
    })
  }

  return (
    <View style={styles.page}>
      <View style={styles.content}>
        <Text style={styles.title}>Messages</Text>
        {historyChat.map(chat => (
          <List
            key={chat.id}
            profile={{ uri: chat.detailDoctor.photo }}
            name={chat.detailDoctor.fullName}
            desc={chat.lastContentChat}
            onPress={() => navigation.navigate('Chatting', chat.detailDoctor)}
          />
        ))}
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
