import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { View, Text } from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat'
import { ActionCable } from 'react-actioncable-provider'
import * as actions from 'actions/reporter'

function giftedMessages(messages) {
  return messages.map( message => ({
    _id: message.id,
    text: message.text,
    user: {
      _id: 0,
      name: message.from,
      avatar: 'https://facebook.github.io/react/img/logo_og.png'
    }
  }))
}

class Chat extends React.Component {
  static contextTypes = {
    cable: PropTypes.object.isRequired
  }

  componentDidMount() {
    //this.props.dispatch(actions.reportMessages)
    this.subscription = this.context.cable.subscriptions.create({channel: 'ReportsChannel', id: this.props.reportId},
      {
        connected() {
          console.log('connected to reports channel')
        },
        received: this.onMessageReceived.bind(this)
      })
  }

  onMessageReceived(data) {
    this.props.dispatch(actions.reportMessageReceived(data))
  }


  componentWillUnmount() {
    this.subscription &&
      this.context.cable.subscriptions.remove(this.subscription)
  }

  render() {
    const messages = giftedMessages(this.props.messages)
    return (
      <GiftedChat
        messages={messages}>
      </GiftedChat>
    )
  }
}

//const Chat = ({reportId}) => {
  //const onReceived = (message) => {
    //console.log(message)
  //}
  //return (
      //<GiftedChat
        //messages={messages}>
        //<ActionCable channel={{channel: `ReportsChannel`, id: reportId}} onReceived={onReceived} />
      //</GiftedChat>
  //)
//}

const mapStateToProps = (state) => {
  return {
    reportId: state.report.reportId,
    messages: state.report.messages
  }
}
export default connect(mapStateToProps)(Chat)
