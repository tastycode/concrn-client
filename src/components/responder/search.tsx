import React from 'react'
import { View, Text, FlatList } from 'react-native'
import Search from 'react-native-search-box'
import ResponderItem from './search/responder-item'

const responders = [
  {
    key: 5,
    name: 'Jacob Savage',
    distance: '0.2mi',
    lastLogin: '4/2/18'
  },
  {
    key: 6,
    name: 'Tyler Gary',
    distance: '0.3mi',
    lastlogin: '3/4/17'
  },
  {
    key: 7,
    name: 'Johnny Popovich',
    distance: '0.5mi',
    lastlogin: '4/20/17'
  }
]


export default class extends React.Component {
  constructor() {
    super()
    this.state = {
      searchText: ""
    }
  }


  render() {
    const filteredResponders =() => {
      return responders.filter( responder => (new RegExp(this.state.searchText, "i")).test(responder.name) )
    }

    const renderResponder =({item: responder}) => {
      return <ResponderItem key={responder.id} responder={responder} />
    }

    return <View style={{flex: 1}}>
      <Search onChangeText={text => this.setState({searchText: text})} onCancel={() => this.props.onCancel()}></Search>
      <FlatList style={{flex: 1}}
        data={filteredResponders()}
        renderItem={({item: responder}) => <ResponderItem  onPress={() => this.props.onChosen(responder)}
        key={responder.id} responder={responder}/>}/>
    </View>
  }
}
