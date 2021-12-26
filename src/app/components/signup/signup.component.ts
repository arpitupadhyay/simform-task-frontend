import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Alert } from 'selenium-webdriver';

import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  formInfo: any = {};
  loading: Boolean = false;

  constructor(
    public api: ApiService,
    public router: Router
  ) { }

  ngOnInit(): void {
  }

  signUp() {
    this.loading = true
    this.api.signUp(this.formInfo).then((res) => {
      console.log("res", res);
      if (res) {
        this.loading = false
        localStorage.setItem("token", `${Date.now()}`)
        alert('Registration Successfull. Please click on okay to proceed.')
        this.router.navigate(['/signin'], { replaceUrl: true });
      } else {
        this.loading = false
        alert('Oops! Something went wrong.')
      }
    }).catch((e) => {
      this.loading = false
      console.log("e", e.response.status);
      console.log("e", e.response.data.message);
      alert(e.response.data.message)
    })
  }

}
