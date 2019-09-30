var sqlMap = {
  getValue: 'SELECT * FROM distance WHERE user = ?',
  setValue: 'UPDATE `distance` SET `lat`=?,`lng`=?,`address`=? WHERE user=?',
	insertValue: 'insert into distance (user,lat,lng,address) value(?,?,?,?)',
}

module.exports = sqlMap;