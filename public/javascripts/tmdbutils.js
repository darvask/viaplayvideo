const fetch = require('node-fetch');

const apiKey = '1392b9d0cde39d0809952e2549684710';

const returnVideoUrl = (videoObj, res) => {
    const imdbID = retrieveImdbID(videoObj);
    const fetchUrl = 'https://api.themoviedb.org/3/movie/' + imdbID
        + '/videos?api_key=' + apiKey + '&language=en-US';

    fetch(fetchUrl) // Fetch trailer data from TMDB API using node-fetch
        .then((resp) => resp.json())
        .then((data) => {
            const trailers = createLinks(data)
            res.send(trailers);
        })
        .catch((err) => {
            console.log("Error when fetching from TMDB API");
            throw err;
        });
};

const createLinks = (trailerData) => {
    const trailerLinks = [];
    const youtubeBaseUrl = 'https://www.youtube.com/watch?v=';
    trailerData.results.forEach(element => {
        trailerLinks.push(youtubeBaseUrl + element.key);
    });
    return trailerLinks.toString();
};

const retrieveImdbID = (videoObj) => {
    let imdbId = "";
    if(videoObj) {
        imdbId = videoObj._embedded['viaplay:blocks'][0]._embedded['viaplay:product'].content.imdb.id;
    }
    return imdbId;
};

module.exports = { returnVideoUrl };