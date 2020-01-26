var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'mysql.eecs.oregonstate.edu',
  user            : 'cs290_rosatig',
  password        : '0038',
  database        : 'cs290_rosatig'
});

module.exports.pool = pool;
