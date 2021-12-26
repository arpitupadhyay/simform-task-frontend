import { Injectable } from '@angular/core';

import { AxiosService } from './axios.service';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  userInfo: any = {
  };

  constructor(
    public axios: AxiosService
  ) { }

  async signUp(formInfo) {
    return new Promise((resolve, rejects) => {
      let payload = {
        firstName: formInfo.firstName,
        lastName: formInfo.lastName,
        email: formInfo.email,
        password: formInfo.password,
      }
      this.axios.post('/accounts/register', payload, false).then((apiRes) => {
        console.log("apiRes", apiRes);
        resolve(apiRes)
      }).catch((e) => {
        console.log("e", e);
        rejects(e)
      })
    })
  }

  async signIn(formInfo) {
    return new Promise((resolve, rejects) => {
      let payload = {
        email: formInfo.email,
        password: formInfo.password,
      }
      console.log("payload", payload);
      this.axios.post('/accounts/authenticate', payload, false).then((apiRes) => {
        console.log("apiRes", apiRes);
        this.userInfo = apiRes.data
        resolve(apiRes)
      }).catch((e) => {
        console.log("e", e);
        rejects(e)
      })
    })
  }

  async updateUser() {
    return new Promise((resolve, rejects) => {
      let payload = {
        firstName: this.userInfo.firstName,
        lastName: this.userInfo.lastName,
        email: this.userInfo.email,
        password: this.userInfo.password,
      }
      this.axios.put(`/accounts/${this.userInfo.id}`, payload).then((apiRes) => {
        console.log("apiRes", apiRes);
        this.userInfo = apiRes.data
        resolve(apiRes)
      }).catch((e) => {
        console.log("e", e);
        rejects(e)
      })
    })
  }

  async deleteUser(userId) {
    return new Promise((resolve, rejects) => {
      // let payload = {
      //   email: formInfo.email,
      //   password: formInfo.password,
      // }
      console.log("userId", userId);
      this.axios.delete('/', userId).then((apiRes) => {
        console.log("apiRes", apiRes);
      }).catch((e) => {
        console.log("e", e);
      })
    })
  }

  async getUserDetails() {
    return new Promise((resolve, rejects) => {
      this.axios.get('/accounts/user-details').then((apiRes) => {
        console.log("apiRes", apiRes);
        this.userInfo = apiRes.data
        resolve(apiRes)
      }).catch((e) => {
        console.log("e", e);
        rejects(e)
      })
    })
  }
}
