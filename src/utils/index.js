const { ErrorMessage } = require('../constants/ErrorMessage');

function getKeyByValue(value) {
  return Object.keys(ErrorMessage).find(key => ErrorMessage[key] === value);
}
module.exports = {
  getKeyByValue,
};
