/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts.mjs';

export const login = async (email, password) => {
  console.log(`email: ${email}, password: ${password}`);
  try {
    
    const res = await axios({
      method: 'POST',
      url: '/api/users/login',
      data: {
        username: email,
        password
      }
    });
    console.log('test api')
    if (res.data.status === 'success') {
      console.log('login successfull');
      //showAlert('success', 'Logged in successfully!');
      // window.setTimeout(() => {
      //   location.assign('/');
      // }, 1500);
    }
  } catch (err) {
    console.log('error: ', err);
    //showAlert('error', err.response.data.message);
  }
};

export const logout = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: '/api/user/logout'
    });
    if ((res.data.status = 'success')) location.reload(true);
  } catch (err) {
    console.log(err.response);
    showAlert('error', 'Error logging out! Try again.');
  }
};
