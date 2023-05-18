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
  
  titlesArr: any = [];
  specialCharacters: any = /[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g

  ngOnInit(): void {
    this.service.getTitles()
      .subscribe((val: any) => this.titlesArr = val)
    
    // Remove "!" (also removes titles with any of the characters in the `specialCharacters` variable above)
    this.titlesArr = this.titlesArr.filter((title: any) => !this.specialCharacters.test(title.name))

    // Sort Alphabetically
    this.titlesArr.sort((a: any,b: any) => a.name > b.name ? 1 : -1)
  }
}
