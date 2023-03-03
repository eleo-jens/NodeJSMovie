function getDetailsMovie(id) {
    fetch('http://localhost:8000/movies/' + id)
        .then(function (response) {
            return response.json();
        })
        .then(function (film) {
            // return ne fonctionne pas car on est dans de l'asynchrone
            console.log(film);

            let detail = document.getElementById('detail');
            if (document.getElementById('container')) detail.removeChild(document.getElementById('container'));
            let div = document.createElement('div');
            div.setAttribute("id", "container");

            let title = document.createElement('h1');
            title.innerHTML = film[0].Series_Title + `   <a href='javascript:deleteMovie("${id}")' id='delete'>X</a>`;
            div.append(title);

            let director = document.createElement('p');
            director.innerText = film[0].Director;
            div.append(director);

            let genre = document.createElement('p');
            genre.innerText = film[0].Genre;
            div.append(genre);

            let imdbRating = document.createElement('p');
            imdbRating.innerText = film[0].IMDB_Rating;
            div.append(imdbRating);

            let overview = document.createElement('p');
            overview.innerText = film[0].Overview;
            div.append(overview);

            let year = document.createElement('p');
            year.innerText = film[0].Released_Year;
            div.append(year);

            let runtime = document.createElement('p');
            runtime.innerText = film[0].Runtime;
            div.append(runtime);

            let star1 = document.createElement('p');
            star1.innerText = film[0].Star1;
            div.append(star1);

            let star2 = document.createElement('p');
            star2.innerText = film[0].Star2;
            div.append(star2);

            let star3 = document.createElement('p');
            star3.innerText = film[0].Star3;
            div.append(star3);

            let star4 = document.createElement('p');
            star4.innerText = film[0].Star4;
            div.append(star4);

            let poster = document.createElement('img');
            poster.src = film[0].Poster_Link;
            div.append(poster);

            detail.append(div);

        })
        .catch(function (err) {
            console.log("Something went wrong!", err);
        });
}

function deleteMovie(id) {
    fetch('/movies/:' + id, { method: 'DELETE' })
        .then(function (response) {
           if (response.status == 200) window.location = "/movies";
        });
}