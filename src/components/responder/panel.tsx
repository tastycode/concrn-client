import React from 'react'
import styled from 'styled-components/native'
import { TouchableOpacity } from 'react-native'
import { Switch} from 'react-native'
import { Text } from 'react-native'

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


export default () => <Panel>
            <ControlGroup>
              <ControlLabel>Available?</ControlLabel>
              <Switch value={false}/>
            </ControlGroup>
            <ControlGroup>
              <ControlLabel>Partner</ControlLabel>
              <TouchableOpacity><ControlText>CHOOSE...</ControlText></TouchableOpacity>
            </ControlGroup>
          </Panel>
