var express = require('express');
var mysql = require('./dbcon.js');
var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 10040);


app.get('/',function(req,res,next){
  // var context = {};
  // mysql.pool.query('SELECT * FROM workouts', function(err, rows, fields){
  //   if(err){
  //     next(err);
  //     return;
  //   }
  //   context.results = JSON.stringify(rows);

    //console.log("rows is: " + rows);
    //console.log("fields is: " + fields);


    // res.render('home', context);     //for testing
    res.render('home');
    // res.render('oldHome', context);  //for testing
    // res.send(context.results);  //final code
  // });
});

//original get / route
// app.get('/',function(req,res,next){
//   var context = {};
//   mysql.pool.query('SELECT * FROM workouts', function(err, rows, fields){
//     if(err){
//       next(err);
//       return;
//     }
//     //console.log("rows is: " + rows);
//     //console.log("fields is: " + fields);
//     context.results = JSON.stringify(rows);
//     res.render('home', context);     //for testing
//     // res.render('oldHome', context);  //for testing
//   });
// });


//get data from server route
app.get('/data',function(req,res,next){
  var context = {};
  mysql.pool.query('SELECT * FROM workouts', function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    console.log("server /data route accessed...");
    //console.log(rows);
    context.results = JSON.stringify(rows);
    res.send(context.results);

  });
});

  //post route
  app.post('/', function(req,res){
    // console.log("using app.post and req.query is: " + JSON.stringify(req.query));
    // console.log("using app.post and req.body is: " + JSON.stringify(req.body));
    // console.log(req.get('Content-Type'));

    // var queryData = [];
    //   for (var p in req.query){
    //     queryData.push({'name':p,'value':req.query[p]})
    // }

    var bodyData = [];
    var itemValues = [];
    var keyValues = [];
      for (var p in req.body){
        bodyData.push({'name':p,'value':req.body[p]});
        keyValues.push(p);
        itemValues.push(req.body[p]);
        // console.log({'name':p,'value':req.body[p]});
        // console.log(p + " " + req.body[p]);
        //console.log(itemValues);
    }
        // console.log("keyValues contains:...   " + keyValues);
        // console.log("itemValues contains:...   " + itemValues);
        // console.log("bodyData contains...   " + bodyData);
        // console.log("bodyData as a string contains:...   " + JSON.stringify(bodyData));

    mysql.pool.query('INSERT INTO workouts (name,reps,weight,date,lbs) VALUES (?)', [itemValues]);
    console.log("insert query sent");
    // console.log("itemValues:   " + [itemValues]);

    //testing section
    // var context = {};
    // context.queryData = queryData;
    // context.bodyData = bodyData;
    // context.type = "POST";
    // res.render('home', context);
    var context = {};
    mysql.pool.query('SELECT * FROM workouts', function(err, rows, fields){
      if(err){
        next(err);
        return;
      }
      context.results = JSON.stringify(rows);
      context.table = rows;

      //console.log(rows);
      //console.log(context.results);
      // res.render('home', context);
      // res.render('oldHome', context);
      res.send(context.results);   //disabled for testing
      // res.send(context.table);
      //console.log("context.results is:  " + context.results);
    });
  });


  //post update route
  app.post('/update', function(req,res){
    // console.log("using app.post and req.query is: " + JSON.stringify(req.query));
    // console.log("using app.post and req.body is: " + JSON.stringify(req.body));
    // console.log(req.get('Content-Type'));

    // var queryData = [];
    //   for (var p in req.query){
    //     queryData.push({'name':p,'value':req.query[p]})
    // }

    var bodyData = [];
    var itemValues = [];
    var keyValues = [];
      for (var p in req.body){
        bodyData.push({'name':p,'value':req.body[p]});
        keyValues.push(p);
        itemValues.push(req.body[p]);
        // console.log({'name':p,'value':req.body[p]});
        // console.log(p + " " + req.body[p]);
        //console.log(itemValues);
    }
        // console.log("keyValues contains:...   " + keyValues);
        // console.log("itemValues contains:...   " + itemValues);
        // console.log("bodyData contains...   " + bodyData);
        // console.log("bodyData as a string contains:...   " + JSON.stringify(bodyData));

        mysql.pool.query("UPDATE workouts SET name=?, reps=?, weight=?, date=?, lbs=? WHERE id=? ",
          [req.body.name, req.body.reps, req.body.weight, req.body.date, req.body.lbs, req.body.id],
          function(err, result){
          if(err){
            next(err);
            return;
          }
    console.log("update query sent");
    // console.log("itemValues:   " + [itemValues]);

    //testing section
    // var context = {};
    // context.queryData = queryData;
    // context.bodyData = bodyData;
    // context.type = "POST";
    // res.render('home', context);
    var context = {};
    mysql.pool.query('SELECT * FROM workouts', function(err, rows, fields){
      if(err){
        next(err);
        return;
      }
      context.results = JSON.stringify(rows);
      context.table = rows;

      //console.log(rows);
      //console.log(context.results);
      // res.render('home', context);
      // res.render('oldHome', context);
      res.send(context.results);   //disabled for testing
      // res.send(context.table);
      //console.log("context.results is:  " + context.results);
    });
  });
});










//delete route
app.post('/delete', function(req,res,next){
  console.log("using app.post and req.query is: " + JSON.stringify(req.query));
  console.log("using app.post and req.body is: " + JSON.stringify(req.body));

  var bodyData = [];
  var itemValues = [];
  var keyValues = [];
    for (var p in req.body){
      bodyData.push({'name':p,'value':req.body[p]});
      keyValues.push(p);
      itemValues.push(req.body[p]);
  }

  mysql.pool.query('DELETE FROM workouts WHERE id=?', [req.body.id], function(err, result){
    if(err){
      next(err);
      return;
    }
  });
  console.log("delete query sent");

  var context = {};
  mysql.pool.query('SELECT * FROM workouts', function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    context.results = JSON.stringify(rows);
    context.table = rows;

    res.send(context.results);
  });
});












// reset-table route from instructor
app.get('/reset-table',function(req,res,next){
  var context = {};
  mysql.pool.query("DROP TABLE IF EXISTS workouts", function(err){
    var createString = "CREATE TABLE workouts("+
    "id INT PRIMARY KEY AUTO_INCREMENT,"+
    "name VARCHAR(255) NOT NULL,"+
    "reps INT,"+
    "weight INT,"+
    "date DATE,"+
    "lbs BOOLEAN)";
      //console.log(createString);  //look at createString
        mysql.pool.query(createString, function(err){
          context.results = "Table reset";
          res.render('home',context);
        })
  });
});





//populate table route for testing test1
app.get('/fill-table',function(req,res,next){
  // var testData = [{"name":"dumbell curls","reps":8,"weight":60,"date":"2017-03-15","lbs":1}];
  // var testData = "('dumbell curls',8,60,'2017-03-15',1)";
  var testData = "INSERT INTO workouts (name,reps,weight,date,lbs) VALUES ('dumbell curls',8,60,'2017-03-15',1);"
  var context = {};
  //mysql.pool.query("INSERT INTO workouts (`id`,`name`,`reps`,`weight`,`date`,`lbs`) VALUES (?)", (1,'dumbell curls',8,60,'2017-03-15',1), function(err,result){
  mysql.pool.query(testData, function(err,result){
  if(err){
      next(err);
      return;
    }
      context.results = JSON.stringify(testData);
      res.render('home',context);
      //console.log(testData);
    })
  });

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
