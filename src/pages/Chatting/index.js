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

    const chatID = `${user.uid}_${dataDoctor.uid}`
    const urlChatting = `chatting/${chatID}/allChat/`

    FireBase.database()
      .ref(urlChatting)
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
                ...dataChat[itemChat]
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
  }, [dataDoctor.uid, user.uid])

  const getDataUserFromLocal = () => {
    getData('user').then(res => {
      setUser(res)
    })
  }

  const chatSend = () => {
    const today = new Date()

    const dataChat = {
      sendBy: user.uid,
      chatDate: today.getTime(),
      chatTime: getChatTime(today),
      chatContent
    }

    const dataHistoryChatForUser = {
      lastContentChat: chatContent,
      lastChatDate: today.getTime(),
      uidPartner: dataDoctor.uid
    }

    const dataHistoryChatForDoctor = {
      lastContentChat: chatContent,
      lastChatDate: today.getTime(),
      uidPartner: user.uid
    }

    const chatID = `${user.uid}_${dataDoctor.uid}`

    const urlChatting = `chatting/${chatID}/allChat/${setDateChat(today)}`
    const urlMessageUser = `messages/${user.uid}/${chatID}/`
    const urlMessageDoctor = `messages/${dataDoctor.uid}/${chatID}`

    FireBase.database()
      .ref(urlChatting)
      .push(dataChat)
      .then(() => {
        // set history for user
        FireBase.database()
          .ref(urlMessageUser)
          .set(dataHistoryChatForUser)

        // set history for doctor
        FireBase.database()
          .ref(urlMessageDoctor)
          .set(dataHistoryChatForDoctor)

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
        title={dataDoctor.fullName}
        photo={{ uri: dataDoctor.photo }}
        desc={dataDoctor.profession}
        onPress={() => navigation.goBack()}
      />
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {chatData.map(chat => (
            <View key={chat.id}>
              <Text style={styles.chatDate}>{chat.id}</Text>
              {chat.data.map(itemChat => {
                const isMe = itemChat.sendBy === user.uid
                return (
                  <ChatItem
                    key={itemChat.id}
                    isMe={isMe}
                    text={itemChat.chatContent}
                    time={itemChat.chatTime}
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
