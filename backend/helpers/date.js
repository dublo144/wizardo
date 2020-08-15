const moment = require('moment');

exports.dateToString = (date) => date && moment(date).format('Do MMM YYYY');
