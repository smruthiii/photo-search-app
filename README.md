# photo-search-app

A simple app that uses Pexels API to find images

## To run this app, you will need to start the server as well as run the app in development mode

To start the server, navigate to the server directory and run:

### `APIKEY={your_api_key} npm start`

Starts the server using the api key that is passed in. The application will not be able to send requests to pexels unless the api key is supplemented in the start script.\
Open [http://localhost:3001](http://localhost:3001) to view it in your browser.

To run the app in client, navigate to the client directory and run:

### 'npm run start'

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The client will proxy the requests to the server and the server will be making requests to the Pexels APIs.
