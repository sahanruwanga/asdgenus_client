import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';

export interface ComponentCanDeactivate {
    canDeactivate: () => boolean | Observable<boolean>;
}

@Injectable({
    providedIn: 'root'
})
export class NavigationGuard implements CanDeactivate<ComponentCanDeactivate> {

    canDeactivate(component: ComponentCanDeactivate): boolean | Observable<boolean> {
        return component.canDeactivate() ?
            true :
            confirm('WARNING: You are trying to leave this page while uploading your data, ' +
                'process will finish if you press Ok ' +
                'and you will need to re-do. Press Cancel if you want to stay here.');
    }
}
