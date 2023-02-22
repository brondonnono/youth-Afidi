export class Parent {
  private parentId: string = '';
  private personId: string = '';

  constructor(personId: string) {
    this.setPersonId = personId;
  }

  public get getParentId(): string {
    return this.parentId;
  }

  public set setParentId(parentId: string) {
    this.parentId = parentId;
  }

  public get getPersonId(): string {
    return this.personId;
  }

  public set setPersonId(personId: string) {
    this.personId = personId;
  }
}
