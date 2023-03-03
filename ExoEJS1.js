const express = require('express');

const app = express();
app.listen(8000);

app.use('/', express.static(__dirname + "/httproot"));
app.set('view engine', 'ejs');

let voitures = [
    { fabricant: 'Fiat', modele: '500', annee: 2022},
    { fabricant: 'Ford', modele: 'Fiesta', annee: 2011},
    { fabricant: 'Mercedes', modele: 'C', annee: 2015}
   ];
app.set('view engine', 'ejs');
app.get('/mesVoitures', 
    function(request, response) {
        response.render('voitures.ejs', { cars : voitures });
});

app.get('/monNom',
    function(request, response){
        response.render('monpremier.ejs', { nom : "Eleonore"});
})