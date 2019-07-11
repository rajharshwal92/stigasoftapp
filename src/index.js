import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { HashRouter, Route, Switch, Link } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet';
import { PersistGate } from 'redux-persist/integration/react';
import fetchMiddleware from './middlewares/axiosMiddleWare';
import reducer from './reducers';
import Login from '../src/containers/LoginContainer';
import Home from '../src/containers/DashboardContainer';
import './assets/stylesheets/main.css';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#0e8c4d',
        },
        secondary: {
            main: '#585858',
        },
        default: {
            main: '#dc0909'
        }
    },
});

if (module.hot) {
    module.hot.accept();
}
const middleware = [thunk, fetchMiddleware];
if (process.env.NODE_ENV !== 'production') {
    middleware.push(createLogger());
}
const persistConfig = {
    key: 'root',
    storage,
    stateReconciler: hardSet,
    blacklist: []
};
const persistedReducer = persistReducer(persistConfig, reducer);


export const store = createStore(
    // reducer,
    persistedReducer, applyMiddleware(...middleware)
);
export const persistor = persistStore(store);
ReactDOM.render(
    <MuiThemeProvider theme={theme}>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <HashRouter>
                    <Switch>
                        <Route exact path="/" component={Login} />
                        <Route exact path="/home" component={Home} />
                    </Switch>
                </HashRouter>
            </PersistGate>
        </Provider>
    </MuiThemeProvider>
    , document.getElementById('root'));
registerServiceWorker();