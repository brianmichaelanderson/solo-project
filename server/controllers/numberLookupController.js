const fetch = require('node-fetch');
require('dotenv').config(); // to assist in securing API key

const numberLookupKey = process.env.API_KEY;

const numberLookupController = {};

//  Middleware to get phone number lookup data:
numberLookupController.fetchNumberInfo = (req, res, next) => {
  //taken from API's documentation at https://apilayer.com/marketplace/number_verification-api
  const myHeaders = new Headers(); // taken directly from provider's documentation
  //   const myHeaders = new fetch.Headers(); // suggested by chatgpt
  myHeaders.append('apikey', numberLookupKey);

  //passing phone number as a query parameter
  const phoneNumber = req.query.number;

  const requestOptions = {
    method: 'GET',
    redirect: 'follow',
    // headers: {apikey: numberLookupKey},
    headers: myHeaders,
  };

  //Dynamically add phoneNumber to the URL
  fetch(
    `https://api.apilayer.com/number_verification/validate?number=${phoneNumber}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      console.log(
        'numberLookup.fetchNumberInfo - Data fetched from number lookup API: ',
        result
      );
      res.locals.apiData = result;
      return next();
    })
    .catch((err) => {
      // send error object to error handler
      console.error('Error fetching data from API: ', err);
      return next({
        log: `numberLookupController.fetchNumberInfo errored attempting to access the phone number lookup api.  Error: ${err}.`,
        status: 500,
        message: {
          err: 'An error has occurred fetching phone number lookup data',
        },
      });
    });
};

module.exports = numberLookupController;
