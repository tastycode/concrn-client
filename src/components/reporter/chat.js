import React from 'react'
import { View, Text } from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat'

const messages = [
  {
    _id: 1,
    text: 'Concrn is here to help!, is anyone at risk of harm?',
    user: {
      _id: 2,
      name: 'React Native',
      avatar: 'https://facebook.github.io/react/img/logo_og.png',
    }
  }
]

export default () => (
  <GiftedChat
    messages={messages}/>
)
