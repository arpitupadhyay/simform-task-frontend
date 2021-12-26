import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  formInfo: any = {};
  loading: Boolean = false;

  constructor(
    public api: ApiService,
    public router: Router
  ) { }

  ngOnInit(): void {
  }

  login() {
    this.loading = true
    this.api.signIn(this.formInfo).then((res) => {
      console.log("res", res);
      if (res) {
        localStorage.setItem("token", this.api.userInfo.jwtToken)
        this.loading = false
        this.router.navigate(['/homepage'], { replaceUrl: true });
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

  signUp() {
    this.router.navigate(['/signup'], { replaceUrl: false })
  }

}
