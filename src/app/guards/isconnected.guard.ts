import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class IsconnectedGuard implements CanActivate {
  constructor(
    private router: Router,
    private storageService: StorageService,
  ) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkIsconnected();
  }

  async checkIsconnected() {
    return this.storageService.getData('isConnected').then(res => {
      if (res === 'true') {
        this.storageService.getObject('userData').then(user => {
          if (user.type === 'admin' || user.type === 'super' || user.type === 'editor') this.router.navigate(['tabAdmin']);
          else this.router.navigate(['tabAdmin']);
        });
        return false;
      } else {
        return true;
      }
    });
  }

}
