var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "stevendebbybenjioscar",
  database: "db1"
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