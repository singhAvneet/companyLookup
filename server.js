//Install express server
const express = require('express');
const path = require('path');
const app = express();
var mysql = require('mysql');
var sql;
var con = mysql.createPool({
   connectionLimit : 100, //important
    host:"us-cdbr-iron-east-04.cleardb.net",
    user:"b1ccaab44f967c",
   password:"5b58fe31",
    database:"heroku_a8b56c41d8ac0e1",
  debug    :  false
});
// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist'));

app.get('/', function(req,res) {    
  res.sendFile(path.join(__dirname+'/dist/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);

//******************************************************************************************* */
app.get('/list_company', function (req, res) {
    if (req.query.id!=null){
        sql="SELECT * FROM `heroku_a8b56c41d8ac0e1`.`comapnies` where id="+req.query.id;
    }
    else{ sql="SELECT * FROM `heroku_a8b56c41d8ac0e1`.`comapnies`"; }
    try{
      con.getConnection(function(err,connection){
        if (err) {
          console.log("code : 100, status : Error in connection database");  return; 
        } 
        try{
      connection.query(sql, function (err, result, fields) {
          if (!err) { console.log(result);   res.send(result); return;  }       
        });
      }catch(err){console.log(err);}
      try{
        connection.on('error', function(err) {     console.log("code : 100, status : Error in connection database err"+err);
            return;     });
        }catch(err){console.log(err);}
      }); 
  }catch(err){console.log(err);} 
 });
 //******************************************************************************************* */
 app.get('/list_employee', function (req, res) {
  if (req.query.companyid!=null){
      sql="SELECT * FROM `heroku_a8b56c41d8ac0e1`.`employee` where companyid="+req.query.companyid;
  }
  else{ sql="SELECT * FROM `heroku_a8b56c41d8ac0e1`.`employee`"; }
  try{
    con.getConnection(function(err,connection){
      if (err) {
        console.log("code : 100, status : Error in connection database err"+err);  return; 
      }
      try{ 
      connection.query(sql, function (err, result, fields) {
          if (!err) { console.log(result);   res.send(result); return;  }       
        });
    }catch(err){console.log(err);}
    try{
      connection.on('error', function(err) {     console.log("code : 100, status : Error in connection database");
          return;     });
      }catch(err){console.log(err);}
    });  
}catch(err){console.log(err);}
});
//******************************************************************************************* */
app.get('/delete_employee', function (req, res) {
  if (req.query.id!=null){
      sql="DELETE FROM `heroku_a8b56c41d8ac0e1`.`employee` where id="+req.query.id;
  }
  try{  
    con.getConnection(function(err,connection){
      if (err) {
        console.log("code : 100, status : Error in connection database");  return; 
      }
      try{ 
      connection.query(sql, function (err, result, fields) {
          if (!err) { console.log(result);   res.send(result);  return; }       
        });
      }catch(err){console.log(err);}
      try{
      connection.on('error', function(err) {     console.log("code : 100, status : Error in connection database");
          return;     });
      }catch(err){console.log(err);}
    });    
}catch(err){console.log(err);}  
});
//******************************************************************************************* */
 app.get('/process_company', function (req, res) {
  // Prepare output in JSON format
   sql="INSERT INTO `heroku_a8b56c41d8ac0e1`.`comapnies` (`company`,`address`,`revenue`,`phone`)VALUES('"+req.query.company+"','"+req.query.address+"','"+req.query.revenue+"','"+req.query.phone+"');  ";
   try{
      con.getConnection(function(err,connection){
        if (err) {  console.log("code : 100, status : Error in connection database");
          return;
        }
        try{  
        connection.query(sql, function (err, result, fields) {
        if (!err) {
          console.log(result);res.send(result);return;}
          else{   console.log("not added, Name must be unique err"+err);return;  }    
          });
        }catch(err){console.log(err);}
        try{
        connection.on('error', function(err) {   console.log("code : 100, status : Error in connection database");
          return;     
          }); 
        }catch(err){console.log(err);}
      });
  }catch(err){console.log(err);}  
});
//******************************************************************************************* */
app.get('/process_employee', function (req, res) {
  // Prepare output in JSON format
   sql="INSERT INTO `heroku_a8b56c41d8ac0e1`.`employee` (`naming`,`address`,`companyid`,`company`)VALUES('"+req.query.naming+"','"+req.query.address+"','"+req.query.companyid+"','"+req.query.company+"');  ";
  try{
      con.getConnection(function(err,connection){
        if (err) {  console.log("code : 100, status : Error in connection database");   return;    }
        try{  
        connection.query(sql, function (err, result, fields) {
        if (!err) {
          console.log(result);  res.send(result);return;}
          else{   console.log("not added, Name must be unique "+err);return;  }    
          });
        }catch(err){console.log(err);}
        try{
        connection.on('error', function(err) {   console.log("code : 100, status : Error in connection database");
        return;     
        });
        }catch(err){console.log(err);}
      });
  }catch(err){console.log(err);}  
});
//******************************************************************************************* */
app.get('/update_get', function (req, res) {
  // Prepare output in JSON format
   sql="UPDATE `heroku_a8b56c41d8ac0e1`.`comapnies` SET `company`='"+req.query.company+"',`address`='"+req.query.address+"',`revenue`='"+req.query.revenue+"',`phone`='"+req.query.phone+"' WHERE `id`='"+req.query.id+"'"; 
  try{
    con.getConnection(function(err,connection){
      if (err) {  console.log("code : 100, status : Error in connection database");  return;  }
      try{  
      connection.query(sql, function (err, result, fields) {
      if (!err) {
        res.send(result);return;      }
        else{   res.send("not added, Name must be unique: "+err);return;   }    
        });
      }catch(err){console.log(err);}
      try{
    connection.on('error', function(err) {   res.json({"code" : 100, "status" : "Error in connection database"});
      return;     
      });
        }catch(err){console.log(err);}
    });
  }catch(err){console.log(err);}  
});
//******************************************************************************************* */
app.get('/update_employee', function (req, res) {
  // Prepare output in JSON format
  sql="UPDATE `heroku_a8b56c41d8ac0e1`.`employee` SET `naming`='"+req.query.naming+"',`address`='"+req.query.address+"',`company`='"+req.query.company+"',`companyid`='"+req.query.companyid+"' WHERE `id`='"+req.query.id+"'"; 
  try{
   con.getConnection(function(err,connection){
    if (err) {  console.log("code : 100, status : Error in connection database");  return;  }  
    try{
      connection.query(sql, function (err, result, fields) {
      if (!err) {
        console.log(result);  res.send(result);return;}
        else{   console.log("not added, Name must be unique: "+err); return;  }    
        });
      }catch(err){console.log(err);}
      try{
      connection.on('error', function(err) {    console.log("code : 100, status : Error in connection database");
      return; });
        }catch(err){console.log(err);}
   });
  }catch(err){console.log(err);}  
});

app.get('/sync_employee', function (req, res) {
    sql="UPDATE `heroku_a8b56c41d8ac0e1`.`employee` SET `company`='"+req.query.company+"' WHERE `companyid`='"+req.query.companyid+"'";
   try{
   con.getConnection(function(err,connection){
    if (err) {  console.log("code : 100, status : Error in connection database");  return;  }  
    try{
      connection.query(sql, function (err, result, fields) {
      if (!err) {
        console.log(result);  return;}
        else{   console.log("not added, Name must be unique: "+err); return;  }    
        });
      }catch(err){console.log(err);}
      try{
      connection.on('error', function(err) {    console.log("code : 100, status : Error in connection database");
      return; });
        }catch(err){console.log(err);}
   });
  }catch(err){console.log(err);}  
});



