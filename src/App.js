import AppNavigator from './navigators/app'
import React from 'react'
import reducer from './reducers'
import thunkMiddleware from 'redux-thunk'
import { AppRegistry, AsyncStorage, View, Text } from 'react-native'
import { Provider } from 'react-redux'
import { createLogger } from 'redux-logger'
import { persistStore, autoRehydrate } from 'redux-persist'
import { createStore,
          applyMiddleware,
          combineReducers,
          compose
          } from 'redux'

// See network requests in debugger
XMLHttpRequest = GLOBAL.originalXMLHttpRequest ?
    GLOBAL.originalXMLHttpRequest :
    GLOBAL.XMLHttpRequest;

// Remove once react-navigation is updated: https://github.com/react-community/react-navigation/issues/1330
console.ignoredYellowBox = ['Warning: BackAndroid']

// Middleware that logs actions
const loggerMiddleware = createLogger({ predicate: (getState, action) => __DEV__  })

function configureStore(initialState) {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const enhancer = composeEnhancers(
    autoRehydrate(),
    applyMiddleware(
      thunkMiddleware,
      loggerMiddleware
    )
  )
  const store = createStore(reducer, initialState, enhancer)
  /* this is an attempt at avoiding the errors we encounter when hot-module loading
   * is on and we modify the reducer tree. It may be partially effective { */
  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('./reducers/index').default;
      store.replaceReducer(nextRootReducer);
    });
    /* } */
  }
  return store
}

const store = configureStore({})

const App = class App extends React.Component {
  state = {
    rehydrated: false
  }
  componentWillMount() {
    persistStore(store, { storage: AsyncStorage }, () => {
      this.setState({rehydrated: true})
    })
  }
  render() {
    /* This prevents the app from rendering until the redux store is rehydrated { */
    if (!this.state.rehydrated) {
      return (
        <View></View>
      )
    }
    /* } */
    return (
      <Provider store={store}>
        <AppNavigator/>
      </Provider>
    )
  }
}

AppRegistry.registerComponent('ConcrnClient', () => App)
export default App
