import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';

export interface ResultCanDeactivate {
  canDeactivate: () => boolean | Observable<boolean>;
}

@Injectable({
  providedIn: 'root'
})
export class UnsavedResultGuard implements CanDeactivate<ResultCanDeactivate> {

  canDeactivate(component: ResultCanDeactivate): boolean | Observable<boolean> {
    return component.canDeactivate() ?
        true :
        confirm('WARNING: You are trying to leave this page without saving the result, ' +
            'result will be discarded if you press Ok. Press Cancel if you want to save and leave.');
  }
}
