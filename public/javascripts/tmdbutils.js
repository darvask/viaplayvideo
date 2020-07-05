const fetch = require('node-fetch');

const apiKey = '1392b9d0cde39d0809952e2549684710';

/*
* The function fetches the trailer information from
* TMDB given the IMDB ID retrieved from movie information
* object.
* If there are trailers in TMDB connected to the movie
* the function renders these, else the function renders
* the message that no related trailers were found for
* the movie in TMDB.
* */
const returnVideoUrl = (videoObj, res) => {
    const imdbID = retrieveImdbID(videoObj);
    const fetchUrl = 'https://api.themoviedb.org/3/movie/' + imdbID
        + '/videos?api_key=' + apiKey + '&language=en-US';

    fetch(fetchUrl) // Fetch trailer data from TMDB API using node-fetch
        .then((resp) => resp.json())
        .then((data) => {
            const trailers = createLinks(data)
            if(trailers) {
                res.send(trailers);
            } else {
                res.send("No trailers found for the suggested movie!");
            }
        })
        .catch((err) => {
            console.log("Error when fetching from TMDB API");
            throw err;
        });
};

/*
* Transforms the trailer data fetched from TMDB
* into a string. One movie may have several trailers
* attached to it and it is hence necessary to include
* all.
*
* @returns: trailer links:string
* */
const createLinks = (trailerData) => {
    const trailerLinks = [];
    const youtubeBaseUrl = 'https://www.youtube.com/watch?v=';
    if(trailerData.results) {
        trailerData.results.forEach(element => {
            trailerLinks.push(youtubeBaseUrl + element.key);
        });
    }
    return trailerLinks.toString();
};

/*
* Retrieves the IMDB id given the mvovie object
* received from the MongoDB database.
*
* @returns: IMDB ID:string
* */
const retrieveImdbID = (videoObj) => {
    let imdbId = "";
    if(videoObj && Object.keys(videoObj).length !== 0) {
        imdbId = videoObj._embedded['viaplay:blocks'][0]._embedded['viaplay:product'].content.imdb.id;
    }
    return imdbId;
};

module.exports = {
    returnVideoUrl,
    createLinks,
    retrieveImdbID
};