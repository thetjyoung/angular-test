import { Component } from '@angular/core';
import {TitleService} from "../title.service";
import {Title} from "../title.model";
import {Contact} from "../contact";

@Component({
  selector: 'app-simple-form',
  templateUrl: './simple-form.component.html',
  styleUrls: ['./simple-form.component.sass'],
  providers: [ TitleService ]
})
export class SimpleFormComponent {
  public titleList: Title[] | undefined;
  public model = new Contact();
  public clickedInactiveButton = false;
  constructor( private titleSvc: TitleService) {
  }
  ngOnInit() {
    this.titleSvc.getTitles().subscribe((titles) => {
      this.titleList = titles.filter(title => title.name !== '!').sort();
      this.model.title = titles.find(title => title.isDefault)?.name;
    });
  }

  onSubmit(isValid: boolean) {
    if(isValid) {
      console.log(this.model);
    } else {
      console.log('invalid click'); this.clickedInactiveButton = true;
  } }
}
