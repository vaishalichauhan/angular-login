import { HeroService } from './../hero.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  userForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private heroService: HeroService, private route: Router) { }

  ngOnInit() {
 this.userForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['',  Validators.required],
      userName: ['',  Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.userForm.invalid) {
      return;
    }
    this.heroService.saveUser(this.userForm.value).subscribe(data => {
      this.route.navigate(['/header']);
    });



  }
}
