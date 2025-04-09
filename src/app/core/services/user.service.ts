import { inject, Injectable, signal } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { GetUsersResponse, User } from '@core/models/user';
import { BehaviorSubject, catchError, finalize, Observable, tap, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { HttpService } from './http.service';
import { UploadImagesService } from './upload-images.service';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private http = inject(HttpService);
    public readonly authService = inject(AuthService);
    private snackbar = inject(MatSnackBar);
    private uplImg = inject(UploadImagesService);
    private router = inject(Router);
    private _loading = signal<boolean>(false);
    private loading = this._loading.asReadonly();
    private suggestUsersSubject$ = new BehaviorSubject<User[]>([]);
    public readonly suggestUsers$ = this.suggestUsersSubject$.asObservable();
    private readonly usersSubject$ = new BehaviorSubject<User[]>([]);
    private userSubject$ = new BehaviorSubject<User | null>(null);
    public readonly user$ = this.userSubject$.asObservable();
    public readonly users$ = this.usersSubject$.asObservable();

    public suggestUsers(): Observable<GetUsersResponse> {
        this._loading.set(true);
        return this.http.get<GetUsersResponse>('/suggestionsUser').pipe(
            tap(res => {
                this.suggestUsersSubject$.next([...res.users]);
            }),
            catchError(error => {
                return throwError(() => new Error("Couldn't get users", error));
            }),
            finalize(() => this._loading.set(false))
        );
    }

    public getUserById(_id: string) {
        this._loading.set(true);
        return this.http.get<{ user: User }>(`/user/${_id}`).pipe(
            tap(res => {
                this.usersSubject$.next([...this.usersSubject$.value, res.user]);
                this.userSubject$.next(res.user);
            }),
            catchError(error => {
                return throwError(() => new Error("Couldn't get user", error));
            }),
            finalize(() => this._loading.set(false))
        );
    }

    public selectedUser(data: User) {
        this.userSubject$.next(data);
    }
}
