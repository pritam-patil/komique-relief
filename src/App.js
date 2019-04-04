import React, { Component } from 'react';
import { Provider } from 'react-redux';
import Home from './containers/home-screen';
import store from './reducers';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Home/>
        </div>
      </Provider>
    );
  }
}

export default App;
