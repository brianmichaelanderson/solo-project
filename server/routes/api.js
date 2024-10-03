const express = require('express');
const router = express.Router();
const numberLookupController = require('../controllers/numberLookupController');
const fileController = require('../controllers/fileController');

// render past lookups on page load route handler
router.get('/', fileController.getPastLookupData, (_req, res) => {
    //   console.log(
    //     'api.js - Sending Response (res.locals.pastLookups): ',
    //     res.locals.pastLookups
    //   );
  res.status(200).json(res.locals.pastLookups);
});

// get number-lookup-data request route handler
router.get(
  '/lookup',
  numberLookupController.fetchNumberInfo,
  fileController.saveLookupData,
  //send fetched phone number data response as json & status 200
  (_req, res) => {
    console.log(
      'api.js - Sending Response (res.locals.apiData): ',
      res.locals.apiData
    );
    res.status(200).json(res.locals.apiData);
  }
);

module.exports = router;
