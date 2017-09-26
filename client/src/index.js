import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { BrowserRouter, Route } from 'react-router-dom';
import './index.css';
import 'ace-css/css/ace.min.css';
import App from './App';
import Auth from './Auth';
import Home from './home/Home';
import Summary from './summary/Summary';
import Claim from './claim/Claim';
import Container from './chrome/Container';
import reducer, { loadState } from './reducer';
// import registerServiceWorker from './registerServiceWorker';

const store = createStore(reducer, loadState(), applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter >
      <Container>
        <Home/>
        <Summary/>
        <Claim/>
        {/* <Route exact path="/" component={App} />
        <Route path="/auth" component={Auth} /> */}
      </Container>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
// registerServiceWorker();
