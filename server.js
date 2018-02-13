var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var request = require('request');
var ejs = require('ejs');
//var pd = require('pretty-data');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');

var port = process.env.PORT || 8497;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

var customURL = "https://jsonplaceholder.typicode.com/posts";



  router.get('/posts', function(req, res){
    request(customURL, function (error, response, body) {
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        //console.log('body:', body); // Print the HTML for the Google homepage.
   
   
  // var final_result  = res.json({body});
  
  //var sttt = document.innerHTML("\n"); 
   
  // var modified = body.replace(/\n/gi, sttt);
   
   var modified = body.split("\n").join("<br />");
   
   var final_result = res.json({modified});

  //final_result = body.replace("\n", "@");
   html = ejs.render('<%- final_result %>', {final_result: final_result});
   
  
      res.render("index", {

        final_result: final_result
      });


  });});
  
// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});



// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
