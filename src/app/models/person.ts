export class Person {
  private personId: string = '';
  public name: string = '';
  public surname: string = '';
  public country: string = 'CMR';
  public city: string = '';
  public quater: string = '';
  private havePhone: boolean = false;
  private numTel!: string;
  private haveAccount: boolean = false;
  private userId: string = '';

  constructor(
    name: string,
    surname: string,
    country?: string,
    city?: string,
    quater?: string
  ) {
    if (city) this.city = city;
    if(country) this.country = country;
    this.name = name;
    this.surname = surname;
    if (quater) this.quater = quater;
  }

  public get getHavePhone(): boolean {
    return this.havePhone;
  }

  public get getNumTel(): string {
    return this.numTel;
  }

  public get getHaveAccount(): boolean {
    return this.haveAccount;
  }

  public get getUserId(): string {
    return this.userId;
  }

  public get getPersonId(): string {
    return this.personId;
  }

  public set setUserId(userId: string) {
    this.userId = userId;
  }

  public set setHavePhone(havePhone: boolean) {
    this.havePhone = havePhone;
  }

  public set setHaveAccount(haveAccount: boolean) {
    this.haveAccount = haveAccount;
  }

  public set setPersonId(personId: string) {
    this.personId = personId;
  }

  public set setNumTel(numTel: string) {
    this.numTel = numTel;
  }

  public copyData(person: Person) {
    this.city = person.city;
    this.country = person.country;
    this.haveAccount = person.getHaveAccount;
    this.personId = person.getPersonId;
    this.surname = person.surname;
    this.havePhone = person.getHavePhone;
    this.name = person.name;
    this.numTel = person.getNumTel;
    this.quater = person.quater;
    this.userId = person.getUserId;
  }
}
