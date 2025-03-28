import { AbstractControl, ValidationErrors } from '@angular/forms';

export const confirmPassword = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get(['password'])?.value;
    const confirmPassword = control.get(['confirmPassword'])?.value;

    if (password !== confirmPassword) {
        return { notMatch: "Passwords don't match" };
    }

    return null;
};
