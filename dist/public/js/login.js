// import axios from '../../../node_modules/axios';
import { showAlert } from './alerts';

// const axios = require('axios');
// const { showAlert } = require('./alerts');

const login = async (email, password) => {
  showAlert('error', email);
  // try {
  //   const res = await axios({
  //     method: 'POST',
  //     url: 'http://127.0.0.1:3000/api/v1/users/login',
  //     data: {
  //       email,
  //       password
  //     }
  //   });

  //   if (res.data.status === 'success') {
  //     showAlert('success', 'Logged in successfully!');
  //     setTimeout(() => {
  //       location.assign('/');
  //     }, 1500);
  //   }
  // } catch (err) {
  //   showAlert('error', err.response.data.message);
  // }
};

// module.exports = {
//   login: login
// };
