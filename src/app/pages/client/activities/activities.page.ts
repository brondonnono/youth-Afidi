import { TranslationService } from './../../../services/translation.service';
import { Component, OnInit } from '@angular/core';
import { Activity } from 'src/app/models/activity';
import { DateParserService } from 'src/app/services/date-parser.service';
import { UtilService } from 'src/app/services/util.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.page.html',
  styleUrls: ['./activities.page.scss'],
})
export class ActivitiesPage implements OnInit {

  activities: Activity[] = [];
  date: Date = new Date();

  public translate: any = {};
  constructor(
    private translationService: TranslationService,
    private utilService: UtilService,
    private dateParser: DateParserService,
    private userService: UserService,
  ) { }

  async ngOnInit() {
    this.translate = this.translationService.getTranslation(this.userService.language);
    await this.utilService.showLoader();
    this.getActivities();
    await this.utilService.dismiss();
  }

  getActivities() {
    let titles = ["Cours d'initiation à l'informatique", "Apprentissage de la langue Chinoise", "Cours de soutien en mathématiques", "Initiation à la musique (piano)"];
    for (let i = 0; i < titles.length; i++) {
      let date = this.dateParser.getLocalFormatedDate(new Date());
      this.activities.push(new Activity(titles[i], titles[i], date, "10h00", "12h00"))
    }
  }
  
  ionViewWillEnter() {
    this.translate = this.translationService.getTranslation(this.userService.language);
  }

}
