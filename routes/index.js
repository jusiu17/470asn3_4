const db_config  = require('../db');
const mysql = require('mysql');
const express = require('express');
const router = express.Router();

router.get('/', function(req,res) {
  const connection = mysql.createConnection(db_config);
  const selectString = `SELECT * FROM rectangle`;

  connection.query(selectString, (err, db_res, fields) => {
    if (err) {
      return console.log(err.message);
    }
    console.log('Select for display Success!!');
    connection.end();
    console.log('get display!!');
    res.render('pages/rectangle', {
      db : db_res
    })
  })
})

router.get('/add', function(req, res) {
  console.log('get add!!');
  res.render('pages/add');
});

router.get('/list', function(req, res) {
  const connection = mysql.createConnection(db_config);
  const selectString = `SELECT * FROM rectangle`;

  connection.query(selectString, (err, db_res, fields) => {
    if (err) {
      return console.log(err.message);
    }
    console.log('Select for list Success!!');
    connection.end();
    console.log('get list!!');
    res.render('pages/list', {
      db : db_res
    })
  })
});

router.post('/edit', function(req, res) {
  const id = req.body.editID;
  const connection = mysql.createConnection(db_config);
  const selectString = `SELECT * FROM rectangle WHERE id = ${id}`;

  connection.query(selectString, (err, db_res, fields) => {
    if (err) {
      return console.log(err.message);
    }
    connection.end();
    console.log(`get edit ${id}!!`);
    res.render('pages/edit',{
      id: db_res[0].id,
      width: db_res[0].width,
      height: db_res[0].height,
      color: db_res[0].color,
      bWidth: db_res[0].bWidth,
      bColor: db_res[0].bColor,
      radius: db_res[0].radius
    })
  })
});

router.post('/addRect', function(req,res){
  const connection = mysql.createConnection(db_config);
  const insertString = `INSERT INTO rectangle(width, height, color, bWidth, bColor, radius)
          VALUE (${req.body.width}, ${req.body.height},"${req.body.color}",
          ${req.body.bWidth}, "${req.body.bColor}", ${req.body.radius})`;

  connection.query(insertString, (err, db_res, fields) => {
    if (err) {
      return console.log(err.message);
    }
    console.log('Insert Success!!');
    connection.end();
    res.redirect('/');
  });
});

router.post('/deleteRect', function(req,res){
  const connection = mysql.createConnection(db_config);
  const deleteString = `DELETE FROM rectangle WHERE id = ${req.body.delID}`;

  connection.query(deleteString, (err, db_res, fields) => {
    if (err) {
      return console.log(err.message);
    }
    connection.end();
    console.log('Delete Success!!');
    res.redirect('/list');
  });
});

router.post('/editRect', function(req,res){
  const connection = mysql.createConnection(db_config);
  const editString = `UPDATE rectangle
                      SET width=${req.body.width}, height=${req.body.height}, color="${req.body.color}",
                          bWidth=${req.body.bWidth}, bColor="${req.body.bColor}", radius=${req.body.radius}
                      WHERE id = ${req.body.editID}`;

  connection.query(editString, (err, db_res, fields) => {
    if (err) {
      return console.log(err.message);
    }
    connection.end();
    console.log('Edit Success!!');
    res.redirect('/list');
  });
});

module.exports = router;
