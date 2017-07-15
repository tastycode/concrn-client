import React from 'react'

import { View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import MapView from 'react-native-maps';
import styled from 'styled-components/native'

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

export default ({navigation}) => (
    <View style={{ flex: 1}}>
      <MapContainer>
        <MapView
          style={{flex: 1}}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
        <MarkerContainer pointerEvents={'none'}>
          <Marker source={require('images/pin.png')}/>
        </MarkerContainer>
      </MapContainer>
      <Button full>
        <Text style={{color: 'white'}}>Start a report</Text>
      </Button>
    </View>
)
