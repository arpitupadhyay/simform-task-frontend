import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.scss']
})
export class MyprofileComponent implements OnInit {

  formInfo: any = {};
  loading: Boolean = false;

  constructor(
    public api: ApiService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.getUserProfile();
  }

  updateProfile() {
    this.loading = true
    this.api.updateUser().then((res) => {
      console.log("res", res);
      if (res) {
        this.loading = false
        alert('Profile Updated!')
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

  getUserProfile() {
    this.loading = true
    this.api.getUserDetails().then((res) => {
      console.log("res", res);
      if (res) {
        this.loading = false
      } else {
        this.loading = false
        alert('Oops! Something went wrong.')
      }
    }).catch((e) => {
      this.loading = false
      console.log("e", e.response.status);
      if (e.response.status === 401) {
        this.router.navigate(['/signin'], { replaceUrl: true });
      }
      console.log("e", e.response.data.message);
      alert(e.response.data.message)
    })
  }

}
