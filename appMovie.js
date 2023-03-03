const express = require('express');
const mongo = require('mongodb');
const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://127.0.0.1:27017';
const app = express();

app.listen(8000);

app.use('/', express.static(__dirname + "/httproot"));
app.use(express.urlencoded({ extended: false }));

// préciser à express que nous utilisons ejs comme moteur de templating 
app.set('view engine', "ejs");

app.get('/movies', function (request, response) {

    MongoClient.connect(url, { useNewUrlParser: true },
        function (err, dbMongo) {

            // créer un objet qui recoit la db des médias
            const dbMedia = dbMongo.db('Media');
            dbMedia.collection("Movies").find({}).toArray(
                function (err, result) {

                    response.setHeader('Content-type', 'text/html');
                    response.render('movies.ejs', { movies : result });

                    //ANCIENNE VERSION AVANT TEMPLATE EJS
                    // let resultToSend = "<html><head><script src='fetchDetails.js'></script><link rel='stylesheet' href='./style/style.css'></head><body><h2>Top 50 movies</h2><ol>";
                    // for (i = 0; i < 50; i++) {
                    //     resultToSend += `<li><a href="javascript:getDetailsMovie('${result[i]._id}')">${result[i].Series_Title}</a></li>`;
                    // }
                    // resultToSend += "</ol><a href='/createMovie.html' id='btnEnter'>Ajouter un film</a><div id='detail'></div></body></html>";
                    // response.send(resultToSend)

                    dbMongo.close();
                });
        });
});

app.post('/movies', function (request, response) {

    MongoClient.connect(url, { useNewUrlParser: true },
        function (err, dbMongo) {
            const dbMedia = dbMongo.db('Media');
            let newMovie = {
                Series_Title: request.body.title,
                Released_Year: request.body.year,
                Director: request.body.director
            };
            dbMedia.collection("Movies").insertOne(newMovie,
                function (err, res) {
                    if (err) throw err;
                    console.log("1 document inserted");
                    response.redirect("/movies");
                });
        });
});

app.get('/movies/:id', function (request, response) {

    MongoClient.connect(url, function (err, dbMongo) {
        const dbMedia = dbMongo.db('Media');

        let query = { _id: mongo.ObjectId(request.params.id) };

        dbMedia.collection("Movies").find(query).toArray(

            function (err, resultFromDB) {
                response.setHeader('Content-type', 'application/json');
                response.send(JSON.stringify(resultFromDB));
                dbMongo.close();
            });
    });
});

app.delete('/movies/:id', function (request, response) {
    console.log("delete");
    MongoClient.connect(url, function (err, dbMongo) {
        const dbMedia = dbMongo.db('Media');
        const query = { _id: mongo.ObjectID(request.params.id.replace(":", "")) };
        dbMedia.collection("Movies").deleteOne(query,
            function (err, result) {
                if (err) throw console.log(err);
                response.send("Deleted");
            });
    });
});