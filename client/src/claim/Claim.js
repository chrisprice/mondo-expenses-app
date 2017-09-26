import React from 'react';
import './claim.css';

const date = date => date.toISOString().substr(0, 10);

export default ({ name = "Chris Price", teamList = '', startDate = new Date(2017, 8, 10), endDate = new Date(2017, 8, 13), submissionDate = new Date, description = '', clientName = '', projectName = '', accountCode = 4, officeCode = 3 }) =>
  <section>
    <div className="flex justify-between">
      <h1 className="">
        Employee Scott Logic Claim for Reimbursement
      </h1>
      <div className="mt3">
        <button className="btn btn-big btn-outline ml3">Back</button>
        <button className="btn btn-big btn-outline ml3">Print</button>
        <button className="btn btn-big btn-outline ml3">Mark as Claimed</button>
      </div>
    </div>
    <div className="flex justify-between mxn1">
      <div className="col-6 px1">
        <p>
          <label className="label" htmlFor="name">Name:</label>
          <input className="input col-12 mb0" id="name" value={name} />
        </p>
        <p>
          <label className="label" htmlFor="description">Brief Overall Description of Trip/Activity:</label>
          <input className="input col-12 mb0" id="description" value={description} />
        </p>
        <div className="flex mxn1">
          <div className="col-6 px1">
            <label className="label" htmlFor="start-date">Trip/Activity Start Date:</label>
            <input className="input col-12 mb0" id="start-date" value={date(startDate)} />
          </div>
          <div className="col-6 px1">
            <label className="label" htmlFor="end-date">Trip/Activity End Date:</label>
            <input className="input col-12 mb0" id="end-date" value={date(endDate)} />
          </div>
        </div>
        <p>
          <label className="label" htmlFor="submission-date">Form Submission Date:</label>
          <input className="input col-12 mb0" id="submission-date" value={date(submissionDate)} />
        </p>
      </div>
      <div className="col-6 px1">
        <p>
          <label className="label" htmlFor="team-list">Team List (If Applicable):</label>
          <input className="input col-12 mb0" id="team-list" value={teamList} />
        </p>
        <p>
          <label className="label" htmlFor="client-name">Client Name (If Applicable):</label>
          <input className="input col-12 mb0" id="client-name" value={clientName} />
        </p>
        <p>
          <label className="label" htmlFor="project-name">Project Name (If Applicable):</label>
          <input className="input col-12 mb0" id="project-name" value={projectName} />
        </p>
        <div className="flex mxn1">
          <div className="col-6 px1">
            <label className="label" htmlFor="account-code">Account Code:</label>
            <select className="select col-12 mb0" id="account-code" value={accountCode}>
              <option value="6400">6400 - Charge Client</option>
              <option value="6450">6450 - Trips Internal</option>
              <option value="7351">7351 - UX Practice</option>
              <option value="Other">Other</option>
              <option value="?">Unknown</option>
            </select>
          </div>
          <div className="col-6 px1">
            <label className="label" htmlFor="office-code">Office Code:</label>
            <select className="select col-12 mb0" id="office-code" value={officeCode}>
              <option value="001">001 - Newcastle</option>
              <option value="002">002 - Edinburgh</option>
              <option value="003">003 - London</option>
              <option value="004">004 - Bristol</option>
            </select>
          </div>
        </div>
      </div>
    </div>
    <div className="mxn1">
      <table className="col-12" style={{ borderSpacing: '0.5rem' }}>
        <tbody>
          <tr>
            <td><label className="label center">Ref.</label></td>
            <td className="col-2"><label className="label center">Receipt From</label></td>
            <td className="col-2"><label className="label center">Purchase</label></td>
            <td className="col-2"><label className="label center">Date</label></td>
            <td className="col-3"><label className="label center">Notes</label></td>
            <td className=""><label className="label center">Receipt</label></td>
            <td className="col-1"><label className="label center">Amount</label></td>
            <td className="col-1"><label className="label center">Local Amount</label></td>
            <td className="col-1"><label className="label center">VAT</label></td>
          </tr>
          <tr>
            <td>1.</td>
            <td><input className="input col-12 mb0" /></td>
            <td>
              <select className="select col-12 mb0">
                <option>Travel</option>
                <option>Accomodation</option>
                <option>Refreshments</option>
                <option>Parking</option>
                <option>Other</option>
              </select>
            </td>
            <td><input className="input col-12 mb0" /></td>
            <td><input className="input col-12 mb0" /></td>
            <td className="center">
              <input type="checkbox" disabled checked />
            </td>
            <td><input className="input col-12 mb0" /></td>
            <td><input className="input col-12 mb0" /></td>
            <td><input className="input col-12 mb0" disabled /></td>
            <td><button className="btn btn-outline">Exclude</button></td>
          </tr>
          <tr>
            <td colSpan="6" className="right-align">
              <label className="label">Total:</label>
            </td>
            <td><input className="input col-12 mb0" disabled /></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div className="flex justify-between mxn1">
      <div className="col-6 px1">
        <p>I certify that these expenses were necessarily incurred</p>
        <div className="flex mxn1">
          <p className="px1 col-6">
            <label className="label">Signed: </label>
            <input className="input" disabled />
          </p>
          <p className="px1 col-3">
            <label className="label">Date: </label>
            <input className="input" disabled />
          </p>
        </div>
      </div>
      <div className="col-6 px1">
        <div className="border border-silver rounded px3">
          <p><label className="label">Admin Use Only</label></p>
          <div className="flex mxn1">
            <p className="px1 col-3">
              <label className="label">PL Number: </label>
              <input className="input" disabled />
            </p>
            <p className="px1 col-6">
              <label className="label">Auth Signature: </label>
              <input className="input" disabled />
            </p>
            <p className="px1 col-3">
              <label className="label">Date: </label>
              <input className="input" disabled />
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>;