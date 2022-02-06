var mysql = require('mysql');

var con = mysql.createConnection({ ALTER USER ‘root’@’localhost’ IDENTIFIED WITH mysql_native_password by ‘stevendebbybenjioscar’;
  });


con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "CREATE TABLE steven (ID int NOT NULL AUTO_INCREMENT, location VARCHAR(255), mot VARCHAR(255), date VARCHAR(255), time VARCHAR(255), PRIMARY KEY (ID))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
});