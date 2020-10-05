const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

//static to include the css files and images
app.use(express.static("public"));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
})

app.post("/", function(req, res){
  const firstName = req.body.FName;
  const lastName = req.body.LName;
  const email = req.body.email;
  const data = {
    members: [ {
      email_address: email,
      status: "subscribed",
      merge_fields: {
      FNAME: firstName,
      LNAME: lastName
    }

      }

  ]
};
const JsonData = JSON.stringify(data);
const url = "https://us2.api.mailchimp.com/3.0/lists/1031c4f5d6";
const options = {
  method: "POST",
  auth: "OmarNegm:64403369398a5803d5bec074a0375f86-us2"
}
const request = https.request(url, options, function(response){
  response.on("data", function(data){
    console.log(JSON.parse(data));
    if(response.statusCode === 200 ){
      res.sendFile(__dirname + "/Success.html")
    }else{
      res.sendFile(__dirname + "/failure.html")
    }
    console.log(response.statusCode)
  })
})
request.write(JsonData);
request.end();

});

app.post("/failure.html", function(req, res){
  res.redirect("/");
})


app.listen(process.env.PORT || 3000, function(){
  console.log("server is runing on port 3000");
})

//api key
//64403369398a5803d5bec074a0375f86-us2
//list id
//1031c4f5d6
