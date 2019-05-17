import { User } from './../../User.model';
import { ActivatedRoute } from '@angular/router';
import { HeroService, Role } from './../../shared/hero.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';


@Component({
  selector: 'app-manage-role',
  templateUrl: './manage-role.component.html',
  styleUrls: ['./manage-role.component.css']
})
export class ManageRoleComponent implements OnInit {

  userId: string;
  roles: Role[];
  roleForm: FormGroup;
  displayedColumns: string[] = ['select', 'id', 'name'];
  dataSource: MatTableDataSource<Role>;
  selection = new SelectionModel<Role>(true, []);
  constructor(private userService: HeroService, private route: ActivatedRoute, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('id');
    this.userService.getRolesForUser(this.userId).subscribe(data => {
      this.roles = data;
      this.dataSource = new MatTableDataSource(this.roles);
    });
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  masterToggle() {
    this.isAllSelected() ?
    this.selection.clear() :
    this.dataSource.data.forEach(row => this.selection.select(row));
  }


  }
