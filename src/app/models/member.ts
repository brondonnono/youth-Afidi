export class Member {
  private memberId: string = '';
  public schoolName: string = '';
  public className: string = '';
  private birthDate: string = '';
  private personId: string = '';
  private parentId!: string;
  private hasQrCode: boolean = false;
  private qrCodeLink: string = '';

  constructor(
    schoolName: string,
    className: string,
    birthDate: string,
    personId: string
  ) {
    this.schoolName = schoolName;
    this.className = className;
    this.setBirthDate = birthDate;
    this.setPersonId = personId;
  }

  public get getMemberId(): string {
    return this.memberId;
  }

  public get getBirthDate(): string {
    return this.birthDate;
  }

  public get getPersonId(): string {
    return this.personId;
  }

  public get getParentId(): string {
    return this.parentId;
  }

  public get getHasQrcode(): boolean {
    return this.hasQrCode;
  }

  public get getQrcodeLink(): string {
    return this.qrCodeLink;
  }

  public set setParentId(parentId: string) {
    this.parentId = parentId;
  }

  public set setBirthDate(birthDate: string) {
    this.birthDate = birthDate;
  }

  public set setHasQrCode(hasQrCode: boolean) {
    this.hasQrCode = hasQrCode;
  }

  public set setQrCodeLink(qrCodeLink: string) {
    this.qrCodeLink = qrCodeLink;
  }

  public set setPersonId(personId: string) {
    this.personId = personId;
  }
}
