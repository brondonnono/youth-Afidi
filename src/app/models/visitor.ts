export class Visitor {
  private visitorId: string = '';
  private personId: string = '';
  public dateTime: string = '';

  constructor(personId: string, dateTime: string) {
    this.setPersonId = personId;
    this.dateTime = dateTime;
  }

  public get getvisitorId(): string {
    return this.visitorId;
  }

  public set setvisitorId(visitorId: string) {
    this.visitorId = visitorId;
  }

  public get getPersonId(): string {
    return this.personId;
  }

  public set setPersonId(personId: string) {
    this.personId = personId;
  }
}
