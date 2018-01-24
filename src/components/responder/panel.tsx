import React from 'react'
import { connect } from "react-redux";
import { TouchableOpacity, Switch, Text } from 'react-native'
import styled from 'styled-components/native'
import * as R from 'ramda'
import * as types from 'actions/types'
import * as responderActions from 'actions/responder'
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

const ResponderPanel = ({partner, onChoose, isAvailable, dispatch}) => {
    const chooseLabel = (partner && partner.name) || 'CHOOSE '
    const onAvailabilityChange = (value) => {
      dispatch(responderActions.updateInitial({
          available: value
      }))
      //spatch({type: types.RESPONDER_AVAILABILITY_SET, availability: value})
    }

    return <Panel>
            <ControlGroup>
              <ControlLabel>Available?</ControlLabel>
              <Switch value={isAvailable} onValueChange={onAvailabilityChange}/>
            </ControlGroup>
            <ControlGroup>
              <ControlLabel>Partner</ControlLabel>
              <TouchableOpacity onPress={() => onChoose()}><ControlText>{chooseLabel} ➔</ControlText></TouchableOpacity>
            </ControlGroup>
          </Panel>

}
export default connect(state => {
  return {
    partner: R.path(['auth', 'responder','partner'], state),
    isAvailable: R.path(['auth', 'responder', 'available'], state)
  }
})(ResponderPanel)
