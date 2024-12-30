import { DailyData } from "./model";

class KVCache<T> {
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

  has(key: string) {
    return this.data.has(key);
  }
}

export const dailyDataCache = new KVCache<DailyData>();
