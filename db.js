const mysql = require('mysql');

const config = {
  host:'10.128.0.10',
  user:'root',
  password:'root',
  database:'cmpt470'
};

const connection = mysql.createConnection(config);

connection.connect(function(err) {
  if (err) {
    return console.error('error: ' + err.message);
  }

  console.log('Connected to the MySQL server!');
  console.log('Connected to db : rectangledb');

  const createTable = `create table if not exists rectangle (
                         id INT primary key auto_increment,
                         width INT NOT NULL,
                         height INT NOT NULL,
                         color VARCHAR(255) NOT NULL,
                         bWidth INT NOT NULL,
                         bColor VARCHAR(255) NOT NULL,
                         radius INT NOT NULL
                     )`;


  connection.query(createTable, function(err, res, fields) {
    if (err) {
      return console.log(err.message);
    }
    console.log('create or find rectangle table');
    connection.end();
  });
});



module.exports = config;
