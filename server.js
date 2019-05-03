
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express(); 
const db = require('./models');
const routes = require('./routes/apiRoutes.js');
const hbs = require('express-handlebars');



const PORT = parseInt(process.env.PORT, 10) || 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type : 'application/vnd.api+json'}));



//to  access images

app.use(express.static(path.join(__dirname, 'public')));



// view engine setup
app.engine('hbs', hbs({extname: 'hbs', layoutsDir:__dirname+'/views'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


routes(app,db);
//use promisses
db.sequelize.sync().then( function() {
    app.listen (PORT ,function(){
        
        console.log('listen port 8000 & connect database');
     });
    
}).catch((err)=>{
        console.log('can not connect to database');
        });

// app.listen (PORT ,function(){
        
//             console.log('listen port 8000 & connect database');
//          });

module.exports = app;