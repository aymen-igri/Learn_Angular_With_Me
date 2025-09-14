import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { RippleModule } from 'primeng/ripple';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-user-nav',
    templateUrl: './user-nav.component.html',
    styleUrls: ['./user-nav.component.scss'],
    standalone: true,
    imports: [MenubarModule, BadgeModule, AvatarModule, InputTextModule, RippleModule, CommonModule],
    encapsulation: ViewEncapsulation.None,
})
export class UserNavComponent implements OnInit {
    items: MenuItem[] | undefined;

    logOut: boolean = false;

    router = inject(Router);

    logout(){
      this.router.navigate(['login']);
      localStorage.removeItem('userToken');
    }

    ngOnInit() {
        this.items = [
            {
                label: 'Home',
                icon: 'pi pi-home',
                path: 'home',
            },
            {
                label: 'Products',
                icon: 'pi pi-th-large',
                path: 'products',
            },
            {
                label: 'Categories',
                icon: 'pi pi-sparkles',
                path: 'categories',
            },
        ];
    }
}
