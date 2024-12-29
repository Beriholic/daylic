import { DailyDataResponse } from "./model";

class KV<T> {
  private data: Map<string, T> = new Map();

  constructor() {}

  set(key: string, value: T) {
    this.data.set(key, value);
  }

  get(key: string) {
    return this.data.get(key);
  }

  delete(key: string) {
    this.data.delete(key);
  }

  clear() {
    this.data.clear();
  }
}

export const dailyDataStore = new KV<DailyDataResponse>();
