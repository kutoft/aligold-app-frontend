import feathers from '@feathersjs/client';
import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
const app = feathers();
const restClient = feathers.rest(axios.defaults.baseURL);
app.configure(restClient.axios(axios));
const options = {
  type: 'jwt',
  storage: window.localStorage // Passing a WebStorage-compatible object to enable automatic storage on the client.
};
app.configure(feathers.authentication(options));

export default app;
