const jwtHelpers = require('./jwt-helpers');

const jwtSecret = jwtHelpers.getJWTSecret();

console.log('jwtSecret', jwtSecret);

const testToken = jwtHelpers.generate('hello-wrold');

console.log('testToken', testToken);

const decodedData = jwtHelpers.verify(testToken);

console.log('decodedData', decodedData);