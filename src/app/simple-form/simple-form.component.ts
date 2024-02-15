import { Component } from '@angular/core';
import { TitleServiceService } from '../services/title-service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-simple-form',
  templateUrl: './simple-form.component.html',
  styleUrls: ['./simple-form.component.sass'],
})
export class SimpleFormComponent {
  titles: string[] = [];
  finalTitles: {
    title: string;
    default: boolean;
  }[] = [];

  customerForm: FormGroup;
  inValidEmail: boolean | undefined;

  constructor(private titleService: TitleServiceService) {
    this.customerForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required]),
      acceptTerms: new FormControl(false, Validators.requiredTrue),
      title: new FormControl(''),
    });
  }

  ngOnInit() {
    this.titleService
      .getTitles()
      .subscribe((_titles) => (this.titles = _titles));
    this.curateAndSortTitleList();
    this.finalTitles = this.titles.map((title) => {
      const finalTitle = { title, default: false };
      if (title === 'Dr') {
        finalTitle.default = true;
      }
      return finalTitle;
    });
  }

  curateAndSortTitleList() {
    this.titles.sort().splice(this.titles.indexOf('!'), 1);
  }
  onSubmit() {
    let errorString = '';
    if (this.customerForm.valid) {
      const email = this.customerForm.get('email')?.value;
      const regexEmail = /@.*\.com$/;
      if (!regexEmail.test(email)) {
        errorString = errorString + 'Invalid Email \n';
        //return alert(errorString);
        this.inValidEmail = true;
      }
      return console.log(this.customerForm.value);
    }
  }

  showError(controlName: string) {
    const control = this.customerForm.get(controlName);
    return control?.invalid && (control.dirty || control.touched);
  }
}
