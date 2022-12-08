const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https")

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");

});
app.post("/", function(req, res) {
  var firstName = req.body.fName;
  var lastName = req.body.lName;
  var email = req.body.email;
  console.log(firstName, lastName, email);
  const data = {
    members: [{
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName
      }
    }]
  };
  const jsonData = JSON.stringify(data);
  const url = "https://us14.api.mailchimp.com/3.0/lists/8787bd6320";
  const options = {

    method: "POST",
    auth: "aditya:d0323b44e786f8c6625f265c1c4628b8-us14"
  }
  const request = https.request(url, options, function(response) {
    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/fail.html");
    }
    response.on("data", function(data) {
      console.log(JSON.parse((data)));

    })

  })
  request.write(jsonData);
  request.end();
});
app.post("/failure", function(req, res) {
  res.redirect("/")
})
app.listen(process.env.PORT || 3000, function() {
  console.log("server is running on port 80");
});



// api key d0323b44e786f8c6625f265c1c4628b8-us14

// unique id 8787bd6320


// https://us14.api.mailchimp.com/3.0/lists/8787bd6320
