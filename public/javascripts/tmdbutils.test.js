const tmdbUtils = require('./tmdbutils');
const testData = require('../../testvideodata.json');

describe('Correct Trailer link creation', () => {
    it('Creates a string with trailer links', () => {
        const data = {"id":275,"results":[{"id":"533ec653c3a3685448000242","iso_639_1":"en","iso_3166_1":"US","key":"h2tY82z3xXU","name":"Fargo Official Trailer #1 - Steve Buscemi Movie (1996) HD","site":"YouTube","size":1080,"type":"Trailer"},{"id":"5c7f3d94c3a3684e9bd3165f","iso_639_1":"en","iso_3166_1":"US","key":"oJsRRVXNj4M","name":"Fargo (1996) | THROWBACK TRAILER","site":"YouTube","size":720,"type":"Trailer"}]};
        expect(tmdbUtils.createLinks(data)).toEqual('https://www.youtube.com/watch?v=h2tY82z3xXU,https://www.youtube.com/watch?v=oJsRRVXNj4M');
    });
});

describe('No trailers available', () => {
    it('Creates a string with trailer links', () => {
        const data = {};
        expect(tmdbUtils.createLinks(data)).toEqual("");
    });
});

describe('Find IMDB ID from movie object', () => {
    it('Finds the IMDB ID field in the movie object given an expected movie object', () => {
        expect(tmdbUtils.retrieveImdbID(testData)).toEqual("tt0116282");
    });
});

describe('Cannot find the IMDB due to empty object', () => {
    it('Returns empty string since object is empty', () => {
        const data = {};
        expect(tmdbUtils.retrieveImdbID(data)).toEqual("");
    });
});