import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class TokenService {
    private readonly token = new BehaviorSubject<string>(this.getToken());
    token$ = this.token.asObservable();

    constructor() {
        setInterval(() => {
            this.token.next(this.getToken())
        }, 5000)
    }

    private getToken(): string {
        return Math.ceil(Math.random() * 10000000).toString();
    }
}