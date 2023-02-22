export class User {
  private userId: string = '';
  public email: string = '';
  public language: string = '';
  private type: string = 'client';
  public img: string = 'https://firebasestorage.googleapis.com/v0/b/afidi-follow-child.appspot.com/o/img%2Fnoavatar.png?alt=media&token=d72f4918-be6d-4deb-882a-74a807c5975d';

  constructor(email: string, language: string, img?: string) {
    this.email = email;
    this.language = language;
    this.setType = 'client';
    if (img) this.img = img;
  }

  public get getUserId(): string {
    return this.userId;
  }

  public get getType(): string {
    return this.type;
  }

  public set setUserId(id: string) {
    this.userId = id;
  }

  public set setType(type: 'admin' | 'super' | 'client' | 'editor') {
    if (
      type != 'admin' &&
      type != 'super' &&
      type != 'client' &&
      type != 'editor'
    )
      type = 'client';
    this.type = type;
  }

  public copyData(user: User) {
    this.email = user.email;
    this.type = user.getType;
    this.userId = this.getUserId;
    this.img = user.img;
    this.language = user.language;
  }
}
