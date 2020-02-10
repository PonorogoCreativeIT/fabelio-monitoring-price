const accounting = require('accounting');

exports.formatCurrency = (amount, currency = '', isFront = true, precission = 0) => {
  if (amount !== undefined && amount !== null && amount !== '') {
    if (isFront) {
      return `${currency} ${accounting.formatNumber(amount, precission, '.', ',')}`;
    }
    return `${accounting.formatNumber(amount, precission, '.', ',')} ${currency} `;
  }
  return '-';
};
