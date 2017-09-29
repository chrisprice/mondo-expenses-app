'use strict';

const express = require('express');
const cookieParser = require('cookie-parser');
const argv = require('minimist')(process.argv.slice(2));
const url = require('url');
const path = require('path');
const MonzoApi = require('monzo-api');
const uuid = require('uuid').v4;

const secure = argv.secure || false;
const hostname = argv.hostname || 'localhost';
const privatePort = argv.port || 5000;
const publicPort = secure ? 443 : privatePort;

const monzo = new MonzoApi(argv.clientId, argv.clientSecret);
monzo.redirectUrl = url.format({
  protocol: secure ? 'https' : 'http',
  hostname: hostname,
  port: publicPort,
  pathname: 'auth'
});

const tokens = new Map();

const app = express();

app.use(cookieParser(argv.cookieSecret));

app.get('/', (request, response) => {
  // side-effects!
  const authorizationUrl = monzo.authorizationUrl;
  response.cookie('state', monzo.stateToken);
  response.redirect(authorizationUrl);
});

app.get('/auth', async (request, response) => {
  try {
    // by default internal state is used, concurrent use will cause issues
    const result = await monzo.authenticate(request.query.code, request.query.state, request.cookies.state);
    const sessionId = uuid();
    tokens.set(`${sessionId}`, result.access_token);
    console.log(sessionId, result);
    // by default internal state is used, concurrent use will SERIOUS issues
    const pong = await monzo.ping();
    console.log(pong);
    response.sendStatus(200);
  } catch (e) {
    console.error(e);
    response.sendStatus(500);
  }
});

app.use('/', express.static(path.join(__dirname, 'client', 'public')));

app.get('*', (request, response) => {
  response.sendFile(path.join(__dirname, 'client', 'public', 'index.html'));
})

app.listen(privatePort, () => console.log(`Listening at http://0.0.0.0:${privatePort}/`));











// function balanceRequest(accessToken, accountId) {
//   return {
//     uri: 'https://api.getmondo.co.uk/balance',
//     headers: {
//       'Authorization': 'Bearer ' + accessToken
//     },
//     qs: {
//       'account_id': accountId
//     },
//     json: true
//   };
// }

// function listTransactionsRequest(accessToken, accountId, since = null, before = null) {
//   return {
//     uri: 'https://api.getmondo.co.uk/transactions',
//     headers: {
//       'Authorization': 'Bearer ' + accessToken
//     },
//     qs: {
//       'account_id': accountId,
//       'expand[]': 'merchant'
//     },
//     json: true
//   };
// }

// function accountsRequest(accessToken) {
//   return {
//     uri: 'https://api.getmondo.co.uk/accounts',
//     headers: {
//       'Authorization': 'Bearer ' + accessToken
//     },
//     json: true
//   };
// }

// function authTokenRequest(code) {
//   return {
//     method: 'POST',
//     uri: 'https://api.getmondo.co.uk/oauth2/token',
//     form: {
//       'grant_type': 'authorization_code',
//       'client_id': argv.clientId,
//       'client_secret': argv.clientSecret,
//       'redirect_uri': redirectUrl,
//       'code': code
//     },
//     json: true
//   };
// }

// const parseDateRange = range => {
//   return [expected.substr(0, 10)), expected.substr(11, 10)];
// }

// const createFilterFromQuery = (query) =>
//   (tx) => {
//     const keys = Object.keys(query)
//       .filter(k => ['format'].indexOf(k) === -1);
//     for (const key of keys) {
//       const expected = query[key];
//       const actual = tx[key];
//       if (Array.isArray(actual)) {
//         if (actual.indexOf(expected) === -1) {
//           return false;
//         }
//       } else if (['created', 'settled'].indexOf(key) > -1) {
//         const min = new Date(expected.substr(0, 10));
//         const max = new Date(expected.substr(11, 10));
//         max.setDate(max.getDate() + 1);
//         const date = new Date(actual);
//         return min < date && date < max;
//       } else {
//         if (actual != expected) { // eslint-disable-line eqeqeq
//           return false;
//         }
//       }
//     }
//     return true;
//   };

// // configure the session
// app.use(session({
//   store: new FileStore(),
//   secret: 'session-secret',
//   resave: false,
//   saveUninitialized: true
// }));

// app.use(express.static(path.join(__dirname, '/node_modules')));

// app.set('views', path.join(__dirname, '/views'));
// app.set('view engine', 'ejs');

// app.get('/auth', (request, response) => {
//   rp(authTokenRequest(request.query.code))
//     .then((body) => {
//       if (body.error) {
//         console.error(body);
//       } else {
//         console.log('Access token returned:', body.access_token);
//         request.session.token = body.access_token;
//         response.redirect('/?notes=#expenses');
//       }
//     })
//     .error((error) => {
//       console.error(error);
//     });

// });

// app.get('/', (request, response) => {
//   const accessToken = argv.accessToken || request.session.token;
//   if (!accessToken) {
//     response.redirect(loginUrl);
//     return;
//   }

//   rp(accountsRequest(accessToken))
//     .then(accountsResponse => {
//       const account = accountsResponse.accounts[0];
//       return rp(balanceRequest(accessToken, account.id))
//       .then(mondoData => {
//         const data = {
//           account: account,
//           balance: mondoData[0]
//         };
//         return response.render('index', data);
//       });
//     })
//     .error((error) => console.error(error));

// });

// app.get('/expenses', (request, response) => {
//   const accessToken = argv.accessToken || request.session.token;
//   if (!accessToken) {
//     response.redirect(loginUrl);
//     return;
//   }

//   rp(accountsRequest(accessToken))
//     .then(accountsResponse => {
//       const since = request.query.since
//       const account = accountsResponse.accounts[0];
//       return Q.all([
//         rp(balanceRequest(accessToken, account.id)),
//         rp(listTransactionsRequest(accessToken, account.id))
//       ])
//       .then(mondoData => {
//         const transactions = mondoData[1].transactions.filter(tx => tx.merchant)
//           .filter(createFilterFromQuery(request.query));
//         const data = {
//           account: account,
//           balance: mondoData[0],
//           transactions
//         };
//         switch (request.query.format) {
//         case 'json':
//           return response.send(data);
//         case 'expenses':
//           return response.render('expenses', data);
//         default:
//           return response.render('index', data);
//         }
//       });
//     })
//     .error((error) => console.error(error));

// });


