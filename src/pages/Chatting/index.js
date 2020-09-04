import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { Header, ChatItem, InputChat } from '../../components'
import { fonts, colors, getData, showError, getChatTime, setDateChat } from '../../utils'
import { FireBase } from '../../config'

const Chatting = ({navigation, route}) => {
  const dataDoctor = route.params
  const [chatContent, setChatContent] = useState('')
  const [user, setUser] = useState({})
  const [chatData, setChatData] = useState([])

  useEffect(() => {
    getDataUserFromLocal()

    const chatID = `${user.uid}_${dataDoctor.data.uid}`
    const urlFirebase = `chatting/${chatID}/allChat/`

    FireBase.database()
      .ref(urlFirebase)
      .on('value', (snapshot) => {
        if (snapshot.val()) {
          const dataSnapshot = snapshot.val()
          const allDataChat = []
          // group by date
          Object.keys(dataSnapshot).map(key => {
            const dataChat = dataSnapshot[key]
            const newDataChat = []
            // group by id chat
            Object.keys(dataChat).map(itemChat => {
              newDataChat.push({
                id: itemChat,
                data: dataChat[itemChat]
              })
            })

            allDataChat.push({
              id: key,
              data: newDataChat
            })
          })

          setChatData(allDataChat)
        }
      })
  }, [dataDoctor.data.uid, user.uid])

  const getDataUserFromLocal = () => {
    getData('user').then(res => {
      setUser(res)
    })
  }

  const chatSend = () => {
    const today = new Date()

    const data = {
      sendBy: user.uid,
      chatDate: today.getTime(),
      chatTime: getChatTime(today),
      chatContent
    }

    const chatID = `${user.uid}_${dataDoctor.data.uid}`

    const urlFirebase = `chatting/${chatID}/allChat/${setDateChat(today)}`

    FireBase.database()
      .ref(urlFirebase)
      .push(data)
      .then(() => {
        setChatContent('')
      })
      .catch(err => {
        showError(err.message)
      })
  }

  return (
    <View style={styles.page}>
      <Header
        type="dark-profile"
        title={dataDoctor.data.fullName}
        photo={{ uri: dataDoctor.data.photo }}
        desc={dataDoctor.data.profession}
        onPress={() => navigation.goBack()}
      />
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {chatData.map(chat => (
            <View key={chat.id}>
              <Text style={styles.chatDate}>{chat.id}</Text>
              {chat.data.map(itemChat => {
                const isMe = itemChat.data.sendBy === user.uid
                return (
                  <ChatItem
                    key={itemChat.id}
                    isMe={isMe}
                    text={itemChat.data.chatContent}
                    time={itemChat.data.chatTime}
                    photo={isMe ? null : { uri: user.photo}}
                  />
                )
              })}
            </View>
          ))}
        </ScrollView>
      </View>
      <InputChat
        value={chatContent}
        onChangeText={setChatContent}
        onButtonPress={chatSend}
      />
    </View>
  )
}

export default Chatting

const styles = StyleSheet.create({
  page: {
    borderColor: colors.white,
    flex: 1
  },
  content: {
    flex: 1
  },
  chatDate: {
    fontSize: 11,
    fontFamily: fonts.primary.normal,
    color: colors.secondary,
    marginVertical: 20,
    textAlign: 'center'
  }
})
