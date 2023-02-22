import { AuthService } from 'src/app/services/auth.service';
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
    private authService: AuthService,
  ) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkIsconnected();
  }

  async checkIsconnected() {
    let result: boolean = false;
    this.authService.isLoggedIn().then((res: boolean) => {
      result = res;
    })
      .catch(error => console.log(error));

    if (result) {
      this.storageService.getObject('userData').then(user => {
        if (user.type === 'admin' || user.type === 'super' || user.type === 'editor') this.router.navigate(['tabAdmin']);
        else this.router.navigate(['home']);
      });
    }
    return result;
    // return this.storageService.getData('isConnected').then(res => {
    //   if (res === 'true') {
    //     this.storageService.getObject('userData').then(user => {
    //       if (user.type === 'admin' || user.type === 'super' || user.type === 'editor') this.router.navigate(['tabAdmin']);
    //       else this.router.navigate(['home']);
    //     });
    //     return false;
    //   } else {
    //     return true;
    //   }
    // });
  }

}
