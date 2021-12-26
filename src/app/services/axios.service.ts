import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AxiosService {

  constructor(
  ) { }

  async post(url, data, authReq = true) {
    let header = {};
    if (authReq == true) {
      header = {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      };
    }
    return axios.post(environment.base_url + url, data, header);
  }

  async put(url, data, authReq = true) {
    let header = {};
    if (authReq == true) {
      header = {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      };
    }
    return axios.put(environment.base_url + url, data, header);
  }

  async delete(url, authReq = true) {
    let header = {};
    if (authReq == true) {
      header = {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      };
    }
    return axios.delete(environment.base_url + url, header);
  }

  async get(url, data = {}, authReq = true) {
    //---------- how to use it ?-----
    // if want to pass the value like getbyid/1 or getbyname/somename then pass it inside the url only from
    // the parent component
    // and if want to send the query params then pass the json in the data param
    let header = {};
    if (authReq == true) {
      header = {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      };
    }
    var queryString = Object.keys(data)
      .map((key) => key + '=' + data[key])
      .join('&');

    return axios.get(environment.base_url + url + queryString, header);
  }

  resetToken() {
    const base_url = environment.base_url
    let data = {
      refresh_token: JSON.parse(localStorage.getItem('user')).refresh_token
    }
    return axios.post(base_url + '/auth/refresh', data);
  }
}
