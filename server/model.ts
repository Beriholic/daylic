export class RestResp {
  code: number;
  msg: string;
  data: object | null;

  constructor(code: number, msg: string) {
    this.code = code;
    this.msg = msg;
    this.data = null;
  }

  setCode(code: number) {
    this.code = code;
    return this;
  }
  setMsg(msg: string) {
    this.msg = msg;
    return this;
  }
  setData(data: object) {
    this.data = data;
    return this;
  }
}

export interface DailyData {
  news: string[];
  tip: string;
  updated: number;
  url: string;
  cover: string;
}
