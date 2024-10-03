const fs = require('fs/promises');
//const fsCallback = require('fs');
const path = require('path');

// helper function to create fileController error objects
// return value will be the object we pass into next, invoking global error handler
const createErr = (errInfo) => {
  const { method, type, err } = errInfo;
  return {
    log: `fileController.${method} ${type}: ERROR: ${
      typeof err === 'object' ? JSON.stringify(err) : err
    }`,
    message: {
      err: `Error occurred in fileController.${method}. Check server logs for more details.`,
    },
  };
};

const fileController = {};

// Middleware for saving phone number lookups
fileController.saveLookupData = (_req, res, next) => {
  if (!res.locals.apiData) {
    return next(
      createErr({
        method: 'saveLookupData',
        type: 'previous middleware error',
        err: 'incorrect info in res.locals',
      })
    );
  }
  //read from saved_lookups file
  fs.readFile(path.resolve(__dirname, '../data/saved_lookups.json'), 'UTF-8')
    .then((data) => {
      let lookupResult;
      const parsedData = JSON.parse(data);
      lookupResult = {
        dbID: parsedData.results.length,
        ...res.locals.apiData,
      }; // push the new lookup data into the saved lookups array
      parsedData.results.push(lookupResult);
      // write the new lookup response data to the saved lookups file as json
      fs.writeFile(
        path.resolve(__dirname, '../data/saved_lookups.json'),
        JSON.stringify(parsedData),
        'UTF-8'
      );
      return next();
    })
    .catch((err) =>
      next(
        createErr({
          method: 'saveLookupData',
          type: 'writing file',
          err,
        })
      )
    );
};

//Middleware for reading saved lookups data from json
fileController.getPastLookupData = (_req, res, next) => {
  fs.readFile(path.resolve(__dirname, '../data/saved_lookups.json'), 'UTF-8')
    .then((data) => {
      const parsedData = JSON.parse(data);
    ////   console.log('fileController.getPastLookupData - contents of parsedData fetched/read from json file: ', parsedData);
      // assign parsed data to res.locals
      res.locals.pastLookups = parsedData;
    ////   console.log('fileController.getPastLookupData - contents of res.locals.pastLookups: ', res.locals.pastLookups);
      return next();
    })
    .catch(
      (err) => {

          // send error object to error handler
          console.error(
              'Error fetching/reading past lookup data from json file: ',
              err
            ),
            next({
                log: `fileController.getPastLookupData errored attempting to retrieve/get/read past lookups.  Error: ${err}.`,
                status: 500,
                message: {
                    err: 'An error has occurred getting/reading past lookup data',
                },
            })
        }
    );
};

module.exports = fileController;
