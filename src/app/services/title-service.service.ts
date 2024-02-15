import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TitleServiceService {
  constructor() {}

  getTitles(): Observable<string[]> {
    const strings: string[] = ['Mr', 'Mrs', 'Miss', '!', 'Dr', 'Prof'];
    return of(strings);
  }
}
