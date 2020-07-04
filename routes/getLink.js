const express = require('express');
const tmdbUtils = require("../public/javascripts/tmdbutils");
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert').strict;

router.post('/', (req, res) => {
    try {
        MongoClient.connect('mongodb://localhost:27017/', {}, function(err, client) {
            assert.equal(null, err);
            const db = client.db('mongo');

            const doFetch = () => {
                return new Promise((resolve, reject) => {
                    db
                        .collection('videodata')
                        .find({"_links.self.href": req.body.viaplaylink}) // find the document that matches the movie link provided as input
                        .limit(1)
                        .toArray(function(err, data) {
                            err
                                ? reject(err)
                                : resolve(data[0]); // the movie JSON object
                        });
                });
            };

            const getData = async () => {
                const result = await (doFetch());
                return result;
            };

            //Initiate the fetching procedure once everything is defined
            getData()
                .then(function(result) {
                    client.close();
                    tmdbUtils.returnVideoUrl(result, res); //when data is fetched from MongoDB we proceed checking the trailer url
                });
            });

    } catch (err) {
        console.log("Error when fetching from MongoDB");
    }
});
module.exports = router;