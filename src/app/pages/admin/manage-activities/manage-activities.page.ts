import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MenuController } from '@ionic/angular';
import { Activity } from 'src/app/models/activity';
import { AuthService } from 'src/app/services/auth.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { TranslationService } from 'src/app/services/translation.service';
import { UserService } from 'src/app/services/user.service';
import { UtilService } from 'src/app/services/util.service';
import { ManageActivitiesValidator } from './manageActivitiesFormsValidators';

@Component({
  selector: 'app-manage-activities',
  templateUrl: './manage-activities.page.html',
  styleUrls: ['./manage-activities.page.scss'],
})
export class ManageActivitiesPage
  extends ManageActivitiesValidator
  implements OnInit
{
  translate: any = {};
  isOpen: boolean = false;
  isAdding: boolean = false;
  dataDetails: string = '';
  minDate = new Date().toISOString();
  minHour = new Date().getHours();

  currentActivity: Activity = new Activity('', '', '', '', '');
  activities = [] as Activity[];

  constructor(
    private menu: MenuController,
    protected form: FormBuilder,
    private authService: AuthService,
    private navigationService: NavigationService,
    private userService: UserService,
    private utilService: UtilService,
    private translationService: TranslationService
  ) {
    super(form);
  }

  ngOnInit() {
    this.translate = this.translationService.getTranslation(
      this.userService.language
    );
    this.activities = this.getActivities();
  }

  public ionViewWillEnter(): void {
    this.translate = this.translationService.getTranslation(
      this.userService.language
    );
    this.menu.enable(false);
  }

  ionViewWillLeave() {
    this.menu.enable(true);
  }

  logout() {
    this.authService.logout();
    this.navigationService.goto('/login');
  }

  showDetails(id: string) {
    this.isOpen = true;
    this.currentActivity = this.getActivityById(id);
  }

  showAddModal() {
    this.isAdding = true;
  }

  closeModal() {
    this.isOpen = false;
    this.isAdding = false;
  }

  delete(elem: any) {
    elem.hidden = true;
  }

  getActivities(): Activity[] {
    for (let i = 1; i < 3; i++) {
      let tmp = new Activity('', '', new Date().toLocaleDateString('fr-FR'), new Date().toTimeString().slice(0, 8), new Date().toTimeString().slice(0, 8));
      tmp.setActivityId = i.toString();
      tmp.title = 'Activité ' + i.toString();

      tmp.description =
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit expedita quasi illo id. Veniam, quaerat aliquid ducimus, perferendis ut iusto repellendus distinctio nostrum perspiciatis vel voluptate est dolor quia maxime?';
      this.activities.push(tmp);
    }
    return this.activities;
  }

  getActivityById(id: string): Activity {
    let result = this.activities.find(
      (item: Activity) => item.getActivityId === id
    );
    if (result !== undefined) return result;
    result = new Activity('-1', '-1', '-1', '-1', '-1');
    result.setActivityId = '-1';
    return result;
  }

  updateActivity(id: string, newActivity: Activity): boolean {
    let result = this.getActivityById(id);
    if (result.getActivityId === '-1') return false;
    result = newActivity;
    return true;
  }

  deleteActivity(id: string) {
    let index = this.activities.findIndex(
      (item: Activity) => item.getActivityId === id
    );
    if (index !== -1) this.activities.splice(index, 1);
  }

  async createActivity() {
    await this.utilService.showLoader();
    console.log(this.activityForm.value);
    await this.utilService.dismiss();
  }
}
