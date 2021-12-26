import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  loading: Boolean = false;

  constructor(
    public api: ApiService,
    public router: Router
  ) { }

  ngOnInit(): void {
    console.log("this.api.userInfo", this.api.userInfo);
    this.getUserProfile();
  }

  myProfile() {
    this.router.navigate(['/myprofile'], { replaceUrl: false })
  }

  getUserProfile() {
    this.loading = true
    this.api.getUserDetails().then((res) => {
      console.log("res", res);
      if (res) {
        this.loading = false
        // this.router.navigate(['/homepage'], { replaceUrl: true });
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

  logOut() {
    localStorage.clear();
    localStorage.removeItem('token');
    this.router.navigate(['/signin'], { replaceUrl: true })
  }

}
