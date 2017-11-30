import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from './Header';
import Metadata from './Metadata';
import LineItem from './LineItem';
import Footer from './Footer';
import Receipt from './Receipt';
import { clearAuth } from '../other';
import { formatAmount } from './format';
import withClaims from '../provider/withClaims';
import './claim.css';

export const ClaimNotFound = () => <div>claim not found</div>;

export const Claim = ({ claim: { transactions }, total }) =>
  <section>
    <Header />
    {/* <Metadata /> pass values in here */}
    <div className="">
      <table className="table col-12">
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
            transactions.map((transaction, index) =>
              <LineItem
                {...transaction}
                key={transaction.id}
                index={index}
                excludeDisabled={index === 0}
                onExclude={() => alert(transaction.id)}
              />
            )
          }
          <tr>
            <td colSpan="5" className="right-align bold pr1">
              Total
            </td>
            <td colSpan="2">
              <input className="input col-12 mb0 right-align" disabled defaultValue={formatAmount('GBP', total)} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <Footer />
    {
      transactions.filter(({ attachments }) => attachments.length > 0)
        .map(({ id, attachments: [{ url }] }, index) =>
          <Receipt
            key={id}
            id={id}
            index={index}
            url={url}
          />
        )
    }
  </section>;

const MaybeClaim = props =>
  props.claim != null ? <Claim {...props} /> : <ClaimNotFound />;

export default withClaims(connect(
  (props, { match: { params: { id } }, claims = [] }) => {
    const claim = claims.find(claim => id === claim.id);
    return ({
      claim,
      total: claim != null ? claim.transactions.reduce((total, { amount }) => total + amount, 0) : 0
    })
  },
  { clearAuth }
)(MaybeClaim));