const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const router = express.Router();
const logger = require('../../logger');
var natural = require('natural');
const Message = require('../../models/Message');
var classifier = new natural.BayesClassifier();
const parse = require('csv-parse/lib/sync'); //include
const fs = require("fs");


//Loading data from the file
var global_data = fs.readFileSync("train.csv").toString();

//The dataset
const input = global_data;

//Calling the npm package and save to records
const records = parse(input, {
  columns: true,
  skip_empty_lines: true
});

//Map the output from csv-parse to the column


var train = function (req, res, next) {


  const comment_text = records.map(rec => rec["comment_text"]);
  const toxic = records.map(rec => rec["toxic"]);
  const severe_toxic = records.map(rec => rec["severe_toxic"]);
  const obscene = records.map(rec => rec["obscene"]);
  const threat = records.map(rec => rec["threat"]);
  const insult = records.map(rec => rec["insult"]);
  const identity_hate = records.map(rec => rec["identify_hate"]);



  var output = "";
  for(var i = 0; i <= 1000; i++){
    if(identity_hate[i] == 1)
      output = "identity_hate";
    else if(insult[i] == 1)
      output = "insult";
    else if (threat[i] == 1)
      output = "threat";
    else if (obscene[i] == 1)
      output = "obscene";
    else if (severe_toxic[i] == 1)
      output = "severe_toxic";
    else if (toxic[i] == 1)
      output = "toxic";

      if(output)
      {
        classifier.addDocument(comment_text[i],output);
        output = "";
      }

  }

  // Train
  classifier.train();

  next();
}


var newarr = [];
var count = 0;
var hate = 0,ins = 0,thr = 0,obs = 0,sev = 0,tox = 0;
//var hardwarepercent,softwarepercent;

router.get("/",train,function(req,res){
  Message.find({},function(err,messages){
       if(err){console.log(err);}
       else{
           messages.forEach(message => {
             count++;
             var output = classifier.classify(message.body);
             if(output === "identity_hate"){
               hate++;
             }
             else if(output === "insult"){
               ins++;
             }
             else if(output === "threat"){
               thr++;
             }
             else if(output === "obscene"){
               obs++;
             }
             else if(output === "severe_toxic"){
               sev++;
             }
             else if(output === "toxic"){
               tox++;
             }
             newarr.push(output);
          });

          // hardwarepercent = (hardwarecount/count) * 100;
          // softwarepercent = (softwarecount/count) * 100;
          var insper = (ins/count) * 100;
          var hateper = (hate/count) * 100;
          var thrper = (thr/count) * 100;
          var obsper = (obs/count) * 100;
          var sevper = (sev/count) * 100;
          var toxper = (tox/count) * 100;
          res.render("analysis",{messages:newarr,ip:ins,hp:hate,tp:thr,op:obs,sp:sev,top:tox,ips:insper,hps:hateper,tps:thrper,ops:obsper,sps:sevper,tops:toxper});
       }
   })
 });


 module.exports = router;
