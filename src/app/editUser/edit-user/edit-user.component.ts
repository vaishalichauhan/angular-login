import { HeroService } from './../../shared/hero.service';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  editForm: FormGroup;
  firstName: string;
      lastName: string;
      userName: string;
      password: string;
      id: string;

  constructor(private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute, private userService: HeroService) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    this.editForm = this.formBuilder.group({
      firstName: new FormControl(),
      lastName: new FormControl(),
      userName: new FormControl(),
      password: new FormControl()
    });

    this.userService.getUserById(this.id).subscribe(data => {
    this.editForm.setValue({'firstName': data.firstName, 'lastName': data.lastName, 'userName': data.username, 'password': data.password});
  });
  }
  onSubmit() {
    if (this.editForm.invalid) {
      return;
    }
  }
  addRoles() {
   this.router.navigate(['/manageRole',]);
  }
}
