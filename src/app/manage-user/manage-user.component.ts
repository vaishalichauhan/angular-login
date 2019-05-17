import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatTableDataSource} from '@angular/material';
import { HeroService, UserResponse } from '../shared/hero.service';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.css']
})
export class ManageUserComponent implements OnInit {

  dataSource: MatTableDataSource<UserResponse>;
  displayedColumns = ['firstName', 'lastName', 'username', 'actions'];
  users: UserResponse[];
  message: string;
  @ViewChild('alert') alert: ElementRef;

  constructor(private userService: HeroService, private route: Router) {

  }

  ngOnInit() {
    this.refreshUserList();
  }

  refreshUserList() {
    this.userService.getAllUsersList().subscribe(data => {
      this.users = data;
      this.dataSource = new MatTableDataSource(this.users);
    });

  }
  editUser(row) {
    console.log(row);
    this.route.navigate(['editUser', row.id]);


  }
  deleteUser(row) {
    // tslint:disable-next-line:prefer-const
    let userId = row.id;
    this.userService.deleteUser(userId).subscribe( response => {
      console.log(response);
      this.message = `Delete of Todo ${userId} Successful!`;
      this.refreshUserList();
    });
  }

  manageRoles(row){
    let userId = row.id;
    this.route.navigate(['roles', row.id]);
  }
  closeMessage(){

  }
  }

