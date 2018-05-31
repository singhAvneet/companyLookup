//Install express server
const express = require('express');
const path = require('path');
const app = express();
var mysql = require('mysql');
var sql;
var con = mysql.createPool({
  //mysql://b1ccaab44f967c:5b58fe31@us-cdbr-iron-east-04.cleardb.net/heroku_a8b56c41d8ac0e1?reconnect=true
  connectionLimit : 100, //important
  // host: "us-cdbr-iron-east-04.cleardb.net",
  host:"us-cdbr-iron-east-04.cleardb.net",
  // user: "b4a0c25955550e",
  user:"b1ccaab44f967c",
  // password: "7e427aa6",
  password:"5b58fe31",
  // database: "heroku_9473040638a9d16",
  database:"heroku_a8b56c41d8ac0e1",
  debug    :  false
});
// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist'));

app.get('/', function(req,res) {
    
res.sendFile(path.join(__dirname+'/dist/index.html'));
});


  app.get('/list_pets', function (req, res) {   

    if (req.query.id!=null){
        sql="SELECT * FROM `heroku_a8b56c41d8ac0e1`.`pet` where id="+req.query.id;
    }
    else{
        sql="SELECT * FROM `heroku_a8b56c41d8ac0e1`.`pet`";
    }

    con.getConnection(function(err,connection){
      if (err) {
        res.json({"code" : 100, "status" : "Error in connection database"});
        return;
      } 

      connection.query(sql, function (err, result, fields) {
        // connection.release();
        if (!err) {
          console.log(result);
          res.send(result);
          }
       
      });

      connection.on('error', function(err) {    res.json({"code" : 100, "status" : "Error in connection database"});
        return;     
  });

    });

  
 });



// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);

// // const cool = require('cool-ascii-faces')
// const express = require('express')
// const path = require('path')
// const PORT = process.env.PORT || 8080
// var mysql = require('mysql');
// var sql;
// var con = mysql.createPool({
//   //mysql://b1ccaab44f967c:5b58fe31@us-cdbr-iron-east-04.cleardb.net/heroku_a8b56c41d8ac0e1?reconnect=true
//   connectionLimit : 100, //important
//   // host: "us-cdbr-iron-east-04.cleardb.net",
//   host:"us-cdbr-iron-east-04.cleardb.net",
//   // user: "b4a0c25955550e",
//   user:"b1ccaab44f967c",
//   // password: "7e427aa6",
//   password:"5b58fe31",
//   // database: "heroku_9473040638a9d16",
//   database:"heroku_a8b56c41d8ac0e1",
//   debug    :  false
// });

// express()
//   .use(express.static(path.join(__dirname, 'public')))
//   .set('src', path.join(__dirname, 'src'))
//   .set('src engine', 'html')
//   .get('/', (req, res) => res.render('app/index'))    
//   .get('/list_pets', function (req, res) {   

//     if (req.query.id!=null){
//         sql="SELECT * FROM `heroku_a8b56c41d8ac0e1`.`pet` where id="+req.query.id;
//     }
//     else{
//         sql="SELECT * FROM `heroku_a8b56c41d8ac0e1`.`pet`";
//     }

//     con.getConnection(function(err,connection){
//       if (err) {
//         res.json({"code" : 100, "status" : "Error in connection database"});
//         return;
//       } 

//       connection.query(sql, function (err, result, fields) {
//         // connection.release();
//         if (!err) {
//           console.log(result);
//           res.send(result);
//           }
       
//       });

//       connection.on('error', function(err) {    res.json({"code" : 100, "status" : "Error in connection database"});
//         return;     
//   });

//     });

  
//  })
//  .get('/process_get', function (req, res) {
//   // Prepare output in JSON format
//    sql="INSERT INTO `heroku_a8b56c41d8ac0e1`.`pet` (`name`,`type`,`breed`,`location`,`lat`,`longi`)VALUES('"+req.query.name+"','"+req.query.type+"','"+req.query.breed+"','"+req.query.location+"','"+req.query.latitude+"','"+req.query.longitude+"');  ";
//    con.getConnection(function(err,connection){
//     if (err) {      res.json({"code" : 100, "status" : "Error in connection database"});
//       return;
//     }
  
  
//     connection.query(sql, function (err, result, fields) {
//     // connection.release();
//     if (!err) {
//       console.log(result);
//       res.send(
//         "<a href='/'>Home</a>");
      
//       }
//       else{
//         res.send("not added, Name must be unique");
//       }
    
//   });

//   connection.on('error', function(err) {   res.json({"code" : 100, "status" : "Error in connection database"});
//     return;     
//     });

//    });
  
// })
// .listen(PORT, () => console.log(`Listening on0 ${ PORT }`))




