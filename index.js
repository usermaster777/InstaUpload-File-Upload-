var express = require('express')
var app = require('express')();
var http = require('http').Server(app);
const listdirec = require('serve-index');
const fileUpload = require('express-fileupload');
const path = require('path');
var bodyParser = require('body-parser');
var fs = require('fs-extra')

app.use(bodyParser())
app.use(fileUpload());
app.use(express.static(__dirname+'/uploads'))

/*app.get('/', function(req, res) {
  res.send(fs.readdirSync(__dirname+"/uploads").join("<br>"));
});*/

app.post('/', function(req, res) {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }
  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let sampleFile = req.files.sampleFile;

  console.log(sampleFile)
  datamb = sampleFile.data.length / 1000000
  console.log('File MB:',datamb)
  if (datamb > 200) return res.send('FILE IS TOO LARGE! (max is 200mb)')
  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv(__dirname+'/uploads/'+Math.floor(1000 + Math.random() * 9000)+''+sampleFile.name, function(err) {
    if (err)
      return res.status(500).send(err);

    res.send('File uploaded!');
  });
});

app.get('/', function(req, res) {
res.sendFile(__dirname+"/eee.html")
});
app.listen(8080, function() {
	console.log('Listening...');
});
