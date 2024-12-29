export interface DailyDataResponse {
  code: number;
  msg: string;
  data: DailyData;
}

export interface DailyData {
  date: string;
  news: string[];
  weiyu: string;
  image: string;
  head_image: string;
}
