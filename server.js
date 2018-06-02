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
    con.getConnection(function(err,connection){
      if (err) {
        res.json({"code" : 100, "status" : "Error in connection database"});  return; 
      } 
    connection.query(sql, function (err, result, fields) {
        if (!err) { console.log(result);   res.send(result);   }       
      });
    connection.on('error', function(err) {    res.json({"code" : 100, "status" : "Error in connection database"});
        return;     });
    });  
 });
 //******************************************************************************************* */
 app.get('/list_employee', function (req, res) {
  if (req.query.companyid!=null){
      sql="SELECT * FROM `heroku_a8b56c41d8ac0e1`.`employee` where companyid="+req.query.companyid;
  }
  else{ sql="SELECT * FROM `heroku_a8b56c41d8ac0e1`.`employee`"; }
  con.getConnection(function(err,connection){
    if (err) {
      res.json({"code" : 100, "status" : "Error in connection database"});  return; 
    } 
  connection.query(sql, function (err, result, fields) {
      if (!err) { console.log(result);   res.send(result);   }       
    });
  connection.on('error', function(err) {    res.json({"code" : 100, "status" : "Error in connection database"});
      return;     });
  });  
});
//******************************************************************************************* */
app.get('/delete_employee', function (req, res) {
  if (req.query.id!=null){
      sql="DELETE FROM `heroku_a8b56c41d8ac0e1`.`employee` where id="+req.query.id;
  }  
  con.getConnection(function(err,connection){
    if (err) {
      res.json({"code" : 100, "status" : "Error in connection database"});  return; 
    } 
  connection.query(sql, function (err, result, fields) {
      if (!err) { console.log(result);   res.send(result);   }       
    });
  connection.on('error', function(err) {    res.json({"code" : 100, "status" : "Error in connection database"});
      return;     });
  });  
});
//******************************************************************************************* */
 app.get('/process_company', function (req, res) {
  // Prepare output in JSON format
   sql="INSERT INTO `heroku_a8b56c41d8ac0e1`.`comapnies` (`company`,`address`,`revenue`,`phone`)VALUES('"+req.query.company+"','"+req.query.address+"','"+req.query.revenue+"','"+req.query.phone+"');  ";
   con.getConnection(function(err,connection){
    if (err) { res.json({"code" : 100, "status" : "Error in connection database"});
      return;
    }  
    connection.query(sql, function (err, result, fields) {
    if (!err) {
      console.log(result);
      res.send(result);}
      else{   res.send("not added, Name must be unique");   }    
       });
  connection.on('error', function(err) {   res.json({"code" : 100, "status" : "Error in connection database"});
    return;     
    });
   });  
});
//******************************************************************************************* */
app.get('/process_employee', function (req, res) {
  // Prepare output in JSON format
   sql="INSERT INTO `heroku_a8b56c41d8ac0e1`.`employee` (`naming`,`address`,`companyid`,`company`)VALUES('"+req.query.naming+"','"+req.query.address+"','"+req.query.companyid+"','"+req.query.company+"');  ";
   con.getConnection(function(err,connection){
    if (err) { res.json({"code" : 100, "status" : "Error in connection database"});
      return;
    }  
    connection.query(sql, function (err, result, fields) {
    if (!err) {
      console.log(result);
      res.send(result);}
      else{   res.send("not added, Name must be unique "+err);   }    
       });
  connection.on('error', function(err) {   res.json({"code" : 100, "status" : "Error in connection database"});
    return;     
    });
   });  
});
//******************************************************************************************* */
app.get('/update_get', function (req, res) {
  // Prepare output in JSON format
   sql="UPDATE `heroku_a8b56c41d8ac0e1`.`comapnies` SET `company`='"+req.query.company+"',`address`='"+req.query.address+"',`revenue`='"+req.query.revenue+"',`phone`='"+req.query.phone+"' WHERE `id`='"+req.query.id+"'"; 
   con.getConnection(function(err,connection){
    if (err) { res.json({"code" : 100, "status" : "Error in connection database"});
      return;
    }  
    connection.query(sql, function (err, result, fields) {
    if (!err) {
      res.send(result);
     }
      else{   res.send("not added, Name must be unique: "+err);   }    
       });
  connection.on('error', function(err) {   res.json({"code" : 100, "status" : "Error in connection database"});
    return;     
    });
   });  
});
//******************************************************************************************* */
app.get('/update_employee', function (req, res) {
  // Prepare output in JSON format
   sql="UPDATE `heroku_a8b56c41d8ac0e1`.`employee` SET `naming`='"+req.query.naming+"',`address`='"+req.query.address+"',`company`='"+req.query.company+"',`companyid`='"+req.query.companyid+"' WHERE `id`='"+req.query.id+"'"; 
   con.getConnection(function(err,connection){

    if (err) { res.json({"code" : 100, "status" : "Error in connection database"});
    return;
  }  
  connection.query(sql, function (err, result, fields) {
  if (!err) {
    console.log(result);
    res.send(result);}
    else{   res.send("not added, Name must be unique: "+err);   }    
     });
  connection.on('error', function(err) {   res.json({"code" : 100, "status" : "Error in connection database"});
  return;     
  });


   });  
});



