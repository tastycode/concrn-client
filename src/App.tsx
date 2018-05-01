import React from "react"
import thunkMiddleware from "redux-thunk"
import createSagaMiddleware from "redux-saga"
import { AppRegistry, AsyncStorage, View } from "react-native"
import { Provider } from "react-redux"
import ActionCable from "react-native-actioncable"
import ActionCableProvider from "react-actioncable-provider"
import { createLogger } from "redux-logger"
import { persistStore, autoRehydrate } from "redux-persist"
import { Store } from "redux"
import { createStore, applyMiddleware, compose } from "redux"

import * as types from 'actions/types'
import reducer from "./reducers"
import rootSaga from './sagas/index'
import AppNavigator from "./navigators/AppNavigator"

// See network requests in debugger
XMLHttpRequest = GLOBAL.originalXMLHttpRequest
  ? GLOBAL.originalXMLHttpRequest
  : GLOBAL.XMLHttpRequest

// Remove once react-navigation is updated: https://github.com/react-community/react-navigation/issues/1330
console.ignoredYellowBox = ["Warning: BackAndroid"]

const sagaMiddleware = createSagaMiddleware()

// Middleware that logs actions
const loggerMiddleware = createLogger({ predicate: () => __DEV__ })

function configureStore(initialState) {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  const enhancer = composeEnhancers(
    autoRehydrate(),
    applyMiddleware(sagaMiddleware,  loggerMiddleware)
  )
  const store = createStore(reducer, initialState, enhancer)
  /* this is an attempt at avoiding the errors we encounter when hot-module loading
   * is on and we modify the reducer tree. It may be partially effective { */
  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require("./reducers/index").default
      store.replaceReducer(nextRootReducer)
    })
    /* } */
  }
  return store
}

const cable = ActionCable.createConsumer("ws://localhost:3000/cable")

const App = class App extends React.Component {
  private store: Store<any>

  constructor() {
    super()
    this.store = configureStore({})
    sagaMiddleware.run(rootSaga)
  }
  state = {
    rehydrated: false
  }
  componentWillMount() {
    let persistor = persistStore(this.store, { storage: AsyncStorage, whitelist: ['auth'] }, () => {
      this.setState({ rehydrated: true })
      this.store.dispatch({type: types.AUTH_CHECK})
    })
  }
  render() {
    /* This prevents the app from rendering until the redux store is rehydrated { */
    if (!this.state.rehydrated) {
      return <View />
    }
    /* } */
    return (
      <Provider store={this.store}>
        <ActionCableProvider cable={cable}>
          <AppNavigator />
        </ActionCableProvider>
      </Provider>
    )
  }
}

AppRegistry.registerComponent("ConcrnClient", () => App)
export default App
