import React from 'react';

export default () =>
  <section>
    <h1>Transactions Crunched</h1>
    <p className="italic">Monzo is reporting that you have multiple accounts (check you out!). For now, I've assumed you'd like to pool your transactions across all of these accounts.</p>
    <p>After looking over your last 3 months worth of transactions I've found 101 categorised as expenses. Of these 12 have receipts attached and 33 are currently marked as unclaimed.</p>
    <p>I've therefore taken the liberty of grouping these into the following potential claims for you -</p>
    <ul>
      <li><a href="#">Wed 13th March 2017 - Friday 15th March 2017, Cambridge</a></li>
      <li><a href="#">Wed 23th June 2017 - Friday 25th June 2017, Copenhagen</a></li>
    </ul>
    <p>In case my algorithms are on the fritz, I can also <a href="#">generate a monster claim</a> containing all of the above. You can then exclude irrelevant transactions to create a bespoke claim.</p>
    <p>And just in case you need them, here are your previously claims -</p>
    <ul>
      <li><a href="#">A fitting description, submitted Saturday 16th March 2016</a></li>
      <li><a href="#">Another great description, submitted Friday 25th June 2016</a></li>
    </ul>
    <p className="">If you'd like, I can always <a href="#">go further back</a> through your transactions?</p>
    <p className="my3 center"><button className="btn btn-outline not-rounded">Sign-out</button></p>
  </section>;