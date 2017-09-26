import React from 'react'
import { connect } from "react-redux";
import { TouchableOpacity, Switch, Text } from 'react-native'
import styled from 'styled-components/native'
import * as R from 'ramda'
const Panel = styled.View`
  background-color: #363636;
`

const ControlLabel = styled.Text`
  color: white;
`

const ControlGroup = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 10px;
`

const ControlText = styled.Text`
  color: white;
`

@connect(state => {
  return {
    partner: R.path(['responder','partner'], state)
  }
})
export default class extends React.Component {
  render() {
    console.log('panel props', this.props)
    const chooseLabel = (this.props.partner && this.props.partner.name) || 'CHOOSE '
    return <Panel>
            <ControlGroup>
              <ControlLabel>Available?</ControlLabel>
              <Switch value={false}/>
            </ControlGroup>
            <ControlGroup>
              <ControlLabel>Partner</ControlLabel>
              <TouchableOpacity onPress={() => this.props.onChoose()}><ControlText>{chooseLabel} ➔</ControlText></TouchableOpacity>
            </ControlGroup>
          </Panel>

  }
}

