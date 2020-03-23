import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService) {}

  ngOnInit() {}

  login(loginData: any) {
    console.log(loginData);
    const redirect = this.route.snapshot.queryParamMap.get('redirect') || '/';
    // this.router.navigate(['/', id, 'post'])
    this.authService.login(loginData).subscribe({
      next: (result: any) => {
        if (result.user.token) {
          localStorage.setItem('token', result.user.token);
          // this.router.navigateByUrl('/');
          this.router.navigateByUrl(redirect);
        } else {
          alert('登入失敗');
        }
      },
      error: error => {
        console.log(error);
        alert('登入失敗');
      }
    });
  }
}
