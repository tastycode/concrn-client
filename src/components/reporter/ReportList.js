import React from "react"
import { Text, View } from "react-native"
import { connect } from "react-redux"
import R from "ramda"

import * as types from "actions/types"

const mapStateToProps = state => {
  return { reportEntities: state.entities.report }
}

const ReportList = ({ dispatch, reportEntities = {} }) => {
  dispatch({
    type: types.REPORT_LIST,
  })
  const reports = reportEntities.myReports
    ? reportEntities.myReports.ids.map(id => reportEntities.byId[id])
    : []
  return <View>{reports.map(report => <Text>{report.id}</Text>)}</View>
}

export default R.pipe(connect(mapStateToProps))(ReportList)
