const mysql = require('mysql');
const dbConfig = require('./db');
const sqlMap = require('./sqlMap');

const pool = mysql.createPool({
  host: dbConfig.mysql.host,
  user: dbConfig.mysql.user,
  password: dbConfig.mysql.password,
  database: dbConfig.mysql.database,
  port: dbConfig.mysql.port,
  multipleStatements: true    // 多语句查询
});

module.exports = {
  getValue(req, res, next) {
    var user = req.query.user;
    pool.getConnection((err, connection) => {
      var sql = sqlMap.getValue;
      connection.query(sql, [user], (err, result) => {
          res.json(result);
          connection.release();
      })
    })
  },
  setValue(req, res, next) {
		console.log(req.body)
    var user = req.body.params.user, lat = req.body.params.lat, lng = req.body.params.lng ,address = req.body.params.address;
    pool.getConnection((err, connection) => {
      var sql = sqlMap.setValue;
      connection.query(sql, [lat, lng , address], (err, result) => {
          res.json(result);
          connection.release();
      })
    })
  },
	insertValue(req, res, next){
		console.log(req.body)
		var user = req.body.params.user, lat = req.body.params.lat , lng = req.body.params.lng ,address = req.body.params.address;
		pool.getConnection((err, connection) => {
		  var sql = sqlMap.insertValue;
		  connection.query(sql, [user,lat,lng,address], (err, result) => {
		      res.json(result);
		      connection.release();
		  })
		})
	},
}