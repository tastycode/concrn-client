import React from "react"
import { connect } from "react-redux"
import { NavigationActions } from "react-navigation"
import * as types from "actions/types"

import {
  Geolocation,
  TextInput,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native"
import reverseGeocode from "services/reverseGeocode"
import MapView from "react-native-maps"
import styled from "styled-components"
import ResponderPanel from "components/responder/Panel"
import Modal from "react-native-modalbox"
import * as R from "ramda"

import { Button } from "native-base"

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

const AddressPreviewContainer = styled(View)`
  shadow-color: black;
  shadow-opacity: 0.3;
  shadow-radius: 7px;
  shadow-offset: 5px 2px;
  background: white;
  position: absolute;
  top: 20px;
  left: 20px;
  right: 20px;
  display: flex;
  padding: 15px;
  flex-direction: row;
`

const AddressPreviewInput = styled(TextInput)`
  border-width: 0px;
  flex: 1;
`

const Marker = styled.Image``

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
    borderWidth: 1,
    borderColor: "#ff0000",
    borderStyle: "solid",
  },
})

class MapComponent extends React.Component {
  // avoid conflict with Map
  state = {
    region: {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
    addressText: "",
    addressTextSelection: { start: 0, end: 0 },
    placeId: null,
  }

  componentDidMount = async () => {
    navigator.geolocation.getCurrentPosition(position => {
      if (!position.coords) return
      this.setState(
        {
          region: {
            ...this.state.region,
            ...position.coords,
          },
        },
        () => {
          this._regionChanged(this.state.region)
          window.someComponent = this
        },
      )
    })
  }

  _regionChanged = async region => {
    const {
      results: [firstResult],
    } = await reverseGeocode(region)
    const { formatted_address, place_id } = firstResult
    this.setState(
      {
        region,
        addressText: formatted_address,
        placeId: place_id,
        addressTextSelection: {
          start: 0,
          end: 0,
        },
      },
      () => {
        this.addressInput.setNativeProps({ selection: { start: 0, end: 0 } })
      },
    )
  }

  _addressSelectionChanged = ({ nativeEvent: { selection } }) => {
    this.setState({
      addressTextSelection: selection,
    })
  }

  createReport(args) {
    this.props.dispatch({
      type: types.REPORT_STORE,
      payload: {
        googlePlaceId: this.state.placeId,
        address: this.state.addressText,
        lat: this.state.region.latitude,
        long: this.state.region.longitude,
      },
    })
    this.props.dispatch(NavigationActions.navigate({ routeName: "promptHarm" }))
  }

  render() {
    const onChoose = () => this.modal.open()
    const onCancel = () => this.modal.close()
    const onChosen = responder => {
      this.modal.close()
      this.props.dispatch({ type: types.RESPONDER_PARTNER_CHOSEN, responder })
    }

    console.log("selection", this.state.addressTextSelection)
    return (
      <View style={{ flex: 1 }}>
        {this.props.isResponder && <ResponderPanel />}
        <MapContainer>
          <MapView
            style={{ flex: 1 }}
            region={this.state.region}
            onRegionChange={this._regionChanged.bind(this)}
          />
          <AddressPreviewContainer>
            <AddressPreviewInput
              innerRef={addressInput => {
                this.addressInput = addressInput
              }}
              onSelectionChange={this._addressSelectionChanged}
              selection={this.state.addressTextSelection}
              value={this.state.addressText}
            />
          </AddressPreviewContainer>
          <MarkerContainer pointerEvents={"none"}>
            <Marker source={require("images/pin.png")} />
          </MarkerContainer>
        </MapContainer>
        <Button full onPress={this.createReport.bind(this)}>
          <Text style={{ color: "white" }}>Start a report</Text>
        </Button>
      </View>
    )
  }
}

export default connect(state => {
  return {
    isResponder: R.pipe(R.path(["auth", "responderId"]), R.isNil(), R.not())(
      state,
    ),
  }
})(MapComponent)
