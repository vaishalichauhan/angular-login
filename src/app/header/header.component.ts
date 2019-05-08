import { HeroService, UserResponse } from './../hero.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { fromEvent } from 'rxjs';
import { of } from 'rxjs';
import {
  debounceTime,
  map,
  distinctUntilChanged,
  filter
} from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @ViewChild('movieSearchInput') movieSearchInput: ElementRef;
  users: UserResponse[] = [];
  constructor(private heroService: HeroService, private router: Router ) { }
  ngOnInit() {
    fromEvent(this.movieSearchInput.nativeElement, 'keyup').pipe(
      // get value
      map((event: any) => {
        return event.target.value;
      })
      // if character length greater then 2
      , filter(res => res.length > 1)
      // Time in milliseconds between key events
      , debounceTime(1000)
      // If previous query is diffent from current
      , distinctUntilChanged()
      // subscription for response
      ).subscribe(data => {
           this.heroService.getAllUsers(data).subscribe(data1 => {
              this.users = data1;
           });
      });
  }

  logout() {
    if (confirm('Are you sure to log out?')) {
      this.heroService.logout();
      this.router.navigate(['\login']);
    }
  }

  }
