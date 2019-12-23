import axios from 'axios';

const setAuthToken = token => {
  if (token) {
    //token from localstorage
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    console.log('EROROROROROROR');
    delete axios.defaults.headers.common['x-auth-token'];
  }
};

export default setAuthToken;
