# viaplayvideo
Given a viaplay video URL the app return a link to a trailer for the same movie. The app is build using NodeJS/ExpressJS framework.

Considerations:
The app is linked to a MongoDB in the cloud. The database collection that the app is using consists of one document, namely http://content.viaplay.se/pc-se/film/fargo-1996 which is used for the app development and testing purposes. However, in a real time scenario the database collection may include up to 50,000 movie objects and it hence important to built the app with this fact taken into consideration. The calls to the database (and to TMDB API) is made in an asyncrounous matter that is non-blocking and together with the nature of MongoDB, which can handle multiple requests simultaneouly, the app will be able to scale. One possible hosting alternative for the app may be fully in the cloud where the infrastructure (computing power, storage etc) may adapt to the usage load in an elastic manner.

How to start up: 
- Once pulled, run "npm install" in the root of ViaplayVideo project to set it up.
- Then simply run "npm start" to start up the app. The app will listen to localhost:3000, so navigate there in any browser of choice to find it there.

How to use and flow description:
The flow starts on localhost:3000. Navigate to localhost:3000/, fill in the Viaplay video URL (e.g. https://content.viaplay.se/pc-se/film/fargo-1996) and submit the form. The video URL is then queried towards a MongoDB Atlas database (AWS) in the cloud to return the full movie object where the video URL matches the one provided in the submission form. Once done, the movie object is searched for IMDB ID and once found, it is used to fetch the trailer information from TMDB. This information is used to construct the trailer links, which are then rendered to the you on the screen (localhost:3000/get-link). If no data is available the app will render this information.

Unit tests:
- Simply run "npm test" to run the unit tests and check console output for results. The tests are written using the Javascript testing framework Jest.

Further development:
- The app currently assumes that all the trailers from TMDB are linking to Youtube. Within the scope of this app it is considered to be acceptable, but further development should consider the possibility that other video hosting vendors, such as Vimeo, may be used.
- The front end/GUI is consisting of a set of simple .pug templates, as the focus of the app lies within presenting its functionality. The front end may hence be further developed to meet the required standards.
