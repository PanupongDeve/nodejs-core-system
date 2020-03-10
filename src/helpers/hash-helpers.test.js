const hashHelpers = require('./hash-helpers');

const saltRoutes = hashHelpers.getSaltRouns();

console.log('saltRoutes', saltRoutes);

const hashedPassword = hashHelpers.hash('123456');

console.log('hashedPassword', hashedPassword);

const verifyPassword = hashHelpers.compareHash('123456', hashedPassword);

console.log('verifyPassword', verifyPassword);

const verifyPassword_incorrect = hashHelpers.compareHash('123456xxx', hashedPassword);

console.log('verifyPassword_incorrect', verifyPassword_incorrect);