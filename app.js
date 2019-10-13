const express    = require('express');
const bodyParser = require('body-parser');
const request    = require('request');

const app = express();
app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname+"/signup.html");
});

app.post("/", function(req, res){
var firstName = req.body.fName;
var lastName = req.body.lName;
var email = req.body.email;
var data = {
  members:[{
    email_address: email,
    status: "subscribed",
    merge_fields:{
      FNAME: firstName,
      LNAME: lastName
    }
  }
]
};
var jsonData = JSON.stringify(data);
var options = {
  url: "https://us20.api.mailchimp.com/3.0/lists/c432dbf348",
  method: "POST",
  headers: {
    "Authorization": "SandeshNaga 47b97c1a79086e81aaf454d28935a653-us20"
  },
  body: jsonData
};
request(options, function(error, response, body){
  if (error) {
    console.log(error);
  }else {
    console.log(response.statusCode);
  }

});
});








app.listen(3000, function(){
  console.log("listening on port 3000");
});

//API  47b97c1a79086e81aaf454d28935a653-us20
//LIst id  c432dbf348