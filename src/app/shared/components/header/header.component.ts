import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { AuthService } from '@core/services';
import { DropDownComponent } from '../drop-down/drop-down.component';
import { DropDownItem } from '../drop-down/drop-down.type';
import { IconComponent } from '../icon/icon.component';

@Component({
    selector: 'app-header',
    imports: [IconComponent, MatFormField, MatLabel, MatInput, MatButton, DropDownComponent, RouterLink],
    templateUrl: './header.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
    public authService = inject(AuthService);
    public dropDownItems: DropDownItem[] = [];

    ngOnInit(): void {
        this.dropDownItems = [
            {
                label: 'Profile',
                link: `/profile/${this.authService.authData()?._id}`
            },
            {
                label: 'Settings',
                link: `/profile/${this.authService.authData()?._id}/settings`
            },
            {
                label: 'Logout',
                click: () => this.authService.logout().subscribe()
            }
        ];
    }
}
