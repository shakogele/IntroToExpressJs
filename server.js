const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

// http Routes
hbs.registerPartials(__dirname+'/views/partials');
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});
hbs.registerHelper('capitalizeString', (text) => {
  return text.toUpperCase();
});

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));
app.use((reqest, response, next) => {
  var now = new Date().toString();

  var log = `${now}: ${reqest.method} ${reqest.url}`;
  fs.appendFile('server.log', log +"\n", (err) => {
    if(err){
      console.log('Unable to Append to Log File');
    }
  });
  next();
});

app.use( (request, response, next) => {
  var data = {
    page: "Maintennace",
    year: 2018,
    welcomeMessage: "Welcome to Express. Maintennace"
  }
  response.render('maintenanse.hbs', data);
});

app.get('/', (request, response) => {
  var data = {
    page: "Home Page",
    year: 2018,
    welcomeMessage: "Welcome to Express"
  }
  response.render('home.hbs', data);
});

app.get('/about', (request, response) => {
  var data = {
    page: "About Page",
    year: 2018
  }
  response.render('about.hbs', data);
});

app.get('/bad', (request, response) => {
  var error={
    error: 'Unable to fulfill this request'
  };
  response.send(error);
});

app.listen(3000, () => {
  console.log("Server is up on port 3000")
});
