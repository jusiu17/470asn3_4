const express = require('express');
const path = require('path');
const db_config  = require('./db');
const routes = require('./routes')

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded( {extended:false} ));

app.use('/css', express.static(path.join(__dirname, 'views/stylesheets')));
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')));


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'/views'));

app.use('/', routes);

app.listen(port, ()=> {console.log(`listening to ${ port }`)});
