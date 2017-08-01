import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { View, Text } from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat'
import { ActionCable } from 'react-actioncable-provider'
import * as actions from 'actions/reporter'
import moment from 'moment'

function giftedMessages(messages) {
  return messages
    .map( message => ({...message, created_at: moment(message.created_at).utc()}) )
    .sort( (a, b) => b.created_at - a.created_at )
    .map( message => {
    // hack to make messages from myself look like they're from me.
    // It's a hack because gifted chat seems to only be able to compare integer id values
    const userId = /Reporter/.test(message.from.id) ? parseInt(message.from.id.toString().replace(/[^\d]/g,'')) : message.from.id
    return {
      _id: message.id,
      text: message.text,
      createdAt: message.created_at,
      reportId: message.report_id,
      user: {
        _id: userId,
        name: message.from.name
      }
    }})
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
    console.log('onMessageReceived', data)
    this.props.dispatch(actions.reportMessageReceived(data.message))
  }

  componentWillUnmount() {
    this.subscription &&
      this.context.cable.subscriptions.remove(this.subscription)
  }

  onMessageSent(messages) {
    messages.forEach( ({ text }) => {
      const reportId = this.props.reportId
      this.props.dispatch(actions.reportSendMessage({ reportId, text }))
    })
  }

  render() {
    const messages = giftedMessages(this.props.messages).filter( message => {
      console.log(message.reportId, this.props.reportId)
      return message.reportId == this.props.reportId
    })
    const user = {
      _id: this.props.reporterId,
      name: this.props.name
    }
    return (
      <GiftedChat
        onSend={(messages) => this.onMessageSent(messages)}
        showUserAvatar={false}
        user={user}
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
    messages: state.report.messages,
    reporterId: state.auth.reporterId,
    name: state.auth.name

  }
}

export default connect(mapStateToProps)(Chat)
