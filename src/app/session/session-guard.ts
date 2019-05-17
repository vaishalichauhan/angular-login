import { HeroService } from '../shared/hero.service';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { SessionQuery } from './sessionquery';
import { CanActivate } from '@angular/router';

@Injectable({
 providedIn: 'root'
})
export class AuthGuard implements CanActivate {
constructor(private router: Router, private sessionQuery: SessionQuery, private authService: HeroService ) { }

canActivate(): boolean {

    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
    }
    return this.authService.isLoggedIn();

}
}
