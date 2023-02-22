export class History {
  private historyId: string = '';
  public type: 'coming' | 'going' = 'coming';
  public time: string = '';
  public day: string = '';
  public memberName: string = '';
  private parentId!: string;
  private memberId: string = '';

  constructor(
    type: 'coming' | 'going',
    time: string,
    day: string,
    memberId: string,
    memberName: string
  ) {
    this.type = type;
    this.day = day;
    this.time = time;
    this.memberName = memberName;
    this.setMemberId = memberId;
  }

  public get getMemberId(): string {
    return this.memberId;
  }

  public get getHistoryId(): string {
    return this.historyId;
  }

  public get getParentId(): string {
    return this.parentId;
  }

  public set setHistoryId(historyId: string) {
    this.historyId = historyId;
  }

  public set setMemberId(memberId: string) {
    this.memberId = memberId;
  }

  public set setParentId(parentId: string) {
    this.parentId = parentId;
  }
}
