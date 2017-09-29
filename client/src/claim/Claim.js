import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from './Header';
import Metadata from './Metadata';
import LineItem from './LineItem';
import Footer from './Footer';
import { clearAuth } from '../other';
import { formatAmount } from './format';
import './claim.css';

export const ClaimNotFound = () => <div>claim not found</div>;

export const Claim = ({ claim: { transactions }, total }) =>
  <section>
    <Header />
    <Metadata />
    <div className="mxn1">
      <table className="col-12" style={{ borderSpacing: '0.5rem' }}>
        <tbody>
          <tr>
            <td><label className="label center">Ref.</label></td>
            <td className="col-3"><label className="label center">Receipt From</label></td>
            <td className="col-2"><label className="label center">Purchase</label></td>
            <td className="col-1"><label className="label center">Date</label></td>
            <td className="col-3"><label className="label center">Notes</label></td>
            <td className=""><label className="label center">Receipt</label></td>
            <td className="col-1"><label className="label center">Amount</label></td>
            <td className="col-1"><label className="label center">Local Amount</label></td>
            <td className="col-1"><label className="label center">VAT</label></td>
          </tr>
          {
            transactions.map((transaction, index) => <LineItem key={transaction.id} index={index} {...transaction}/>)
          }
          <tr>
            <td colSpan="5" className="right-align">
              <label className="label">Total:</label>
            </td>
            <td colSpan="2">
              <input className="input col-12 mb0 right-align" disabled value={formatAmount('GBP', total)}/>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <Footer />
  </section>;

const MaybeClaim = props =>
  props.claim != null ? <Claim {...props} /> : <ClaimNotFound />;

export default connect(
  ({ accounts = [], selectedAccountId, transactions = [], expenses = [], claims = [] }, { match: { params: { id } } }) => {
    const claim = claims.find(claim => id === claim.id);
    return ({
      claim,
      total: claim != null ? claim.transactions.reduce((total, { amount }) => total + amount, 0) : 0
    })
  },
  { clearAuth }
)(MaybeClaim);