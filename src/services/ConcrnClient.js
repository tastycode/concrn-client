import axios from "axios"
import Config from "react-native-config"
import { camel2snake, snake2camel } from "camel-snake"
let globalHeaders = {
  "Content-Type": "application/json",
}
function apiRequest(method, path) {
  return async (data, requestParams) => {
    const replacedPath = Object.keys(data).reduce((path, key) => {
      return path.replace(`:${key}`, data[key])
    }, path)
    const apiUrl = Config.API_URL
    const requestConfig = {
      method,
      url: `${apiUrl}/${replacedPath}`,
      data,
      headers: globalHeaders,
      ...requestParams,
    }
    console.log({ requestConfig })
    const response = await axios(requestConfig)
    return response.data
  }
}

function jsonApiCreateRequest(path) {
  return async (data, requestParams) => {
    const snakeData = camel2snake(data)
    const requestData = {
      data: {
        attributes: snakeData,
      },
    }

    const response = await apiRequest("POST", path)(requestData)
    return snake2camel(response.data)
  }
}

function jsonApiIndexRequest(path) {
  return async (data, requestParams) => {
    const { data: rows } = await apiRequest("GET", path)(data)
    return rows.map(row => {
      return {
        id: row.id,
        ...snake2camel(row.attributes),
      }
    })
  }
}

export default {
  device: {
    create: apiRequest("POST", "/devices"),
    verify: apiRequest("POST", "/devices/verify"),
  },
  token: {
    validate: apiRequest("GET", "/tokens/validate"),
    refresh: apiRequest("POST", "/tokens/refresh"),
  },
  report: {
    create: jsonApiCreateRequest("/reports"),
    update: apiRequest("PATCH", "/reports/:id"),
    index: jsonApiIndexRequest("/reports"),
  },
  responder: {
    validate: apiRequest("GET", "/responders/device"),
    update: apiRequest("PUT", "/responders/:id"),
  },
  configureAuthentication({ token }) {
    globalHeaders["Authorization"] = `Bearer ${token}`
  },
}
