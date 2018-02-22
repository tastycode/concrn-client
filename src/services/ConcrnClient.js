import axios from "axios"
import Config from "react-native-config"
function apiRequest(method, path) {
  return async (data, requestParams) => {
    const replacedPath = Object.keys(data).reduce((path, key) => {
      return path.replace(`:${key}`, data[key])
    }, path)
    alert(Config.API_URL)
    const apiUrl = Config.API_URL
    const response = await axios({
      method,
      url: `${apiUrl}/api${replacedPath}`,
      data,
      ...requestParams,
    })
    return response.data
  }
}

export default {
  device: {
    validate: apiRequest("POST", "/devices/validate"),
    create: apiRequest("POST", "/devices"),
    verify: apiRequest("POST", "/devices/verify"),
  },
  report: {
    create: apiRequest("POST", "/reports"),
    messages: {
      create: apiRequest("POST", "/reports/:reportId/messages"),
    },
  },
  responder: {
    validate: apiRequest("GET", "/responders/device"),
    update: apiRequest("PUT", "/responders/:id"),
  },
}
