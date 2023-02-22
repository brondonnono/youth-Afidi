export class Staff {
  private staffId: string = '';
  private personId: string = '';
  public fonction: string = '';

  constructor(personId: string, fonction: string) {
    this.setPersonId = personId;
    this.fonction = fonction;
  }

  public get getStaffId(): string {
    return this.staffId;
  }

  public set setStaffId(staffId: string) {
    this.staffId = staffId;
  }

  public get getPersonId(): string {
    return this.personId;
  }

  public set setPersonId(personId: string) {
    this.personId = personId;
  }
}
