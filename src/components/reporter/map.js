import React from 'react'
import { connect } from 'react-redux'

import { View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import MapView from 'react-native-maps';
import styled from 'styled-components/native'
import * as actions from 'actions/reporter'

import { Button } from 'native-base'

const MapContainer = styled.View`
  position: relative;
  flex: 1;
`
const MarkerContainer = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
`

const Marker = styled.Image`
`

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
    borderWidth: 1,
    borderColor: '#ff0000',
    borderStyle: 'solid'

  },
});

class Map extends React.Component {
  state = {
    region: {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }
  }

  _regionChanged(region) {
    this.setState({region})
  }

  createReport(args) {
    this.props.dispatch(actions.createReport({
      ...this.state.region
    }))
  }

  render() {
    return (
      <View style={{ flex: 1}}>
        <MapContainer>
          <MapView
            style={{flex: 1}}
            region={this.state.region}
            onRegionChange={this._regionChanged.bind(this)}
          />
          <MarkerContainer pointerEvents={'none'}>
            <Marker source={require('images/pin.png')}/>
          </MarkerContainer>
        </MapContainer>
        <Button full onPress={this.createReport.bind(this)}>
          <Text style={{color: 'white'}}>Start a report</Text>
        </Button>
      </View>
    )
  }
}
export default connect()(Map)
