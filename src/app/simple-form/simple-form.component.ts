import { Component } from '@angular/core';
import { TitleService } from '../title.service';

@Component({
  selector: 'app-simple-form',
  templateUrl: './simple-form.component.html',
  styleUrls: ['./simple-form.component.sass'],
  providers: [TitleService]
})
export class SimpleFormComponent {

  firstName: string = ""
  lastName: string = ""
  termsConds: boolean = false
  selectedTitle: any;
  titlesArr: any;
  filteredTitles: any;
  specialCharacters: any = /[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g

  constructor(private service: TitleService) {}
  
  ngOnInit(): void {
    // Make titles available to IOC container
    this.service.getTitles()
      .subscribe((val: any) => this.titlesArr = val)
    
    // Remove "!" (also removes titles with any of the characters in the `specialCharacters` variable above)
    this.filteredTitles = this.titlesArr.filter((title: any) => !this.specialCharacters.test(title.name))

    // Sort Alphabetically
    this.filteredTitles.sort((a: any,b: any) => a.name > b.name ? 1 : -1)

    // Define the default title
    this.selectedTitle = this.filteredTitles.find((el: any) => el.isDefault === true).name
  }
  
  // Keep selectedTitle up to date based on user input
  onSelected(value: any): void {
    this.selectedTitle = value
  }
  
  printFormValues(): void {
    console.log({
      title: this.selectedTitle,
      firstName: this.firstName,
      lastName: this.lastName,
      acceptTerms: this.termsConds
    })
  }
}
