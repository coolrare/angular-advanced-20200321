import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private router: Router) { }

  ngOnInit() {
  }

  login(loginData: any) {
    console.log(loginData);
    // TODO: login...
    // this.router.navigate(['/', id, 'post'])
    this.router.navigateByUrl('/');

  }

}
