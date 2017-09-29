import React from 'react';
import { formatAmount, formatDate } from './format';

export default ({ name = "Chris Price", teamList = '', startDate = new Date(2017, 8, 10), endDate = new Date(2017, 8, 13), submissionDate = new Date, description = '', clientName = '', projectName = '', accountCode = 4, officeCode = 3 }) =>
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
          <input className="input col-12 mb0" id="start-date" value={formatDate(startDate)} />
        </div>
        <div className="col-6 px1">
          <label className="label" htmlFor="end-date">Trip/Activity End Date:</label>
          <input className="input col-12 mb0" id="end-date" value={formatDate(endDate)} />
        </div>
      </div>
      <p>
        <label className="label" htmlFor="submission-date">Form Submission Date:</label>
        <input className="input col-12 mb0" id="submission-date" value={formatDate(submissionDate)} />
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
  </div>;