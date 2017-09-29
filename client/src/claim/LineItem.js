import React from 'react';
import { formatAmount, formatDate } from './format';

export default ({ index, merchant, category, created, notes, attachments, currency, amount, localCurrency, localAmount }) => <tr>
  <td>{index}.</td>
  <td><input className="input col-12 mb0" value={merchant}/></td>
  <td>
    <select className="select col-12 mb0" value={category}>
      <option>Travel</option>
      <option>Accomodation</option>
      <option>Refreshments</option>
      <option>Parking</option>
      <option>Other</option>
    </select>
  </td>
  <td><input className="input col-12 mb0" value={formatDate(created)}/></td>
  <td><input className="input col-12 mb0" value={notes}/></td>
  <td className="center">
    <input type="checkbox" disabled checked={attachments.length > 0} />
  </td>
  <td><input className="input col-12 mb0 right-align" value={formatAmount(currency, amount)}/></td>
  <td><input className="input col-12 mb0 right-align" value={localCurrency != null ? formatAmount(localCurrency, localAmount) : ''} /></td>
  <td><input className="input col-12 mb0" disabled /></td>
  <td><button className="btn btn-outline">Exclude</button></td>
</tr>;