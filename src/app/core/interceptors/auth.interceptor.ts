import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LocalStorageService } from '@core/services/local-storage.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const storage = inject(LocalStorageService);

    const token = storage.get('token');

    if (token) {
        req = req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    return next(req);
};
