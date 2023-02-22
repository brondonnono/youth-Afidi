export class Activity {
  private activityId: string = '';
  public title: string = '';
  private tabStaffId: string[] = [''];
  public description: string = '';
  public day: string = '';
  public startTime: string = '';
  public endTime: string = '';
  public coverImg: string = 'assets/img/tutorials/cover/3.png';

  constructor(title: string, description: string, day: string, startTime: string, endTime: string) {
    this.title = title;
    this.description = description;
    this.day = day;
    this.endTime = endTime;
    this.startTime = startTime;
  }

  public get getActivityId(): string {
    return this.activityId;
  }

  public get getTabStaffId(): string[] {
    return this.tabStaffId;
  }

  public set setActivityId(activityId: string) {
    this.activityId = activityId;
  }

  public set setTabStaffId(tabStaffId: string[]) {
    this.tabStaffId = tabStaffId;
  }
}
