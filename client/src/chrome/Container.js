import React from 'react';
import { connect } from 'react-redux';
import { performAuth } from '../monzo';
import Home from '../home/Home';
import Summary from '../summary/Summary';

export default ({ children }) =>
  <div className="flex justify-center">
    <div className="col-10 mt1 mb4">
      {children}
    </div>
  </div>;
