import { Component } from '@angular/core';
import { TitleService } from '../title.service';

@Component({
  selector: 'app-simple-form',
  templateUrl: './simple-form.component.html',
  styleUrls: ['./simple-form.component.sass'],
  providers: [TitleService]
})
export class SimpleFormComponent {
name: any;
  constructor(private service: TitleService) {}
  
  titlesArr: any = []

  ngOnInit(): void {
    this.service.getTitles()
      .subscribe((val: any) => this.titlesArr = val)
  }
}
