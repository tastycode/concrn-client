import React from "react"
import { Image, FlatList, Linking, View } from "react-native"
import { connect } from "react-redux"
import styled from "styled-components"
import R from "ramda"
import moment from "moment-timezone"

import {
  Body,
  Button,
  Container,
  Content,
  Card,
  CardItem,
  Left,
  Right,
  Text,
} from "native-base"

import { color } from "styles/constants"
import * as types from "actions/types"

const CardImage = styled.Image`
  flex: 1;
  height: 200px;
  width: 100%;
  resize-mode: cover;
`

const ReportNotes = styled.Text`
  border-left-width: 1;
  border-color: #aaa;
  padding-left: 20px;
  font-style: italic;
`

const StatusChip = styled.Text`
  padding: 5px;
  border-radius: 25px;
  background-color: ${color.plum};
  color: white;
`

const mapStateToProps = state => {
  return { reportEntities: state.entities.report }
}

const reportCard = ({ item: report }) => {
  console.log({ report })
  const imgSrc = `https://maps.googleapis.com/maps/api/staticmap?zoom=10&size=400x300&sensor=false&maptype=roadmap&markers=color:red|${
    report.coordinates.x
  },${report.coordinates.y}`
  report.responderReporterNotes = "we sent him to the hospital"
  return (
    <Card key={report.id}>
      <CardItem>
        <Body>
          <CardImage source={{ uri: imgSrc }} />
        </Body>
      </CardItem>
      <CardItem>
        <ReportNotes>{report.reporterNotes}</ReportNotes>
      </CardItem>
      <CardItem>
        <Left>
          <Text note>
            {moment(report.createdAt)
              .tz(moment.tz.guess())
              .format("MMMM Do YYYY, h:mma")}
          </Text>
        </Left>
        <Right>
          <StatusChip>{report.status.toUpperCase()}</StatusChip>
        </Right>
      </CardItem>
      {report.responderReporterNotes && (
        <View>
          <CardItem>
            <View>
              <Text note>Responder's notes</Text>
            </View>
          </CardItem>
          <CardItem>
            <View>
              <ReportNotes>{report.reporterNotes}</ReportNotes>
            </View>
          </CardItem>
        </View>
      )}
      <CardItem footer>
        <Left>
          <Button
            transparent
            onPress={() =>
              Linking.openURL(
                `mailto:support@concrn.org?subject=Report%20${report.id}`,
              )
            }
            textStyle={{ color: "#87838B" }}
          >
            <Text>Ask a question</Text>
          </Button>
        </Left>
      </CardItem>
    </Card>
  )
}

const ReportList = ({ dispatch, reportEntities = {} }) => {
  dispatch({
    type: types.REPORT_LIST,
  })
  const reports = reportEntities.myReports
    ? reportEntities.myReports.ids.map(id => reportEntities.byId[id])
    : []
  return (
    <Container>
      <Content>
        <FlatList
          data={reports}
          renderItem={reportCard}
          keyExtractor={item => item.id}
        />
      </Content>
    </Container>
  )
}

export default R.pipe(connect(mapStateToProps))(ReportList)
