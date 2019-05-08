import { single } from './data';
import { TokenStorageService } from './../token-storage.service';
import { HeroService } from './../hero.service';
import { User } from './../User.model';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Route, Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User = {
    usernameOrEmail: '',
    password: ''
  };
  myForm: FormGroup;
  userName: string;
  password: string;
  single: any[];
  multi: any[];

  view: any[] = [500, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Country';
  showYAxisLabel = true;
  yAxisLabel = 'Population';
   colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor(private heroService: HeroService, private route: Router, private token: TokenStorageService) {
    Object.assign(this, { single });
  }

  ngOnInit() {
    this.myForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }
  onSelect(event) {
    console.log(event);
  }
  onSubmit() {
    this.user.usernameOrEmail = this.myForm.get('username').value;
    this.user.password = this.myForm.get('password').value;
    this.heroService.jwtAuthenticateUer(this.user).subscribe(data => {
      console.log(data.accessToken);
      this.token.saveToken(data.accessToken);
      this.route.navigate(['/header']);

    },
    error => {
      console.log('sdfsddf');
    });


  }
  getErrorMessage() {
    if (this.myForm.controls['username'].hasError('required')) {
    return 'You must enter a value' ;
    }
  }
}
