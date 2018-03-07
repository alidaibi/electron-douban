import 'assets/styles/style.less';
import 'assets/font/iconfont.css';
import React, { Component } from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
// import AsyncComponent from './AsyncComponent';
import Body from './components/body';
import Header from './components/header';
import Nav from './components/nav';
import rootReducer from './reducer/index';

const store = createStore(
  combineReducers({ ...rootReducer })
);

// const Login = AsyncComponent(() => import('./login'));

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className='app'>
            <Header />
            <div className='app-main'>
              <Nav />
              <div className='app-main-route'>
                <Route exact path='/' component={Body} />
                <Route path='/index' component={Body} />
              </div>
            </div>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
