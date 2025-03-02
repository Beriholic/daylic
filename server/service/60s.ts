import { dailyDataCache as cache } from "../kv";
import { DailyData } from "../model";

interface Response {
  status: number;
  message: string;
  data: DailyData;
}

function getLocaleTodayString(
  timestamp = Date.now(),
  locale = "zh-CN",
  timeZone = "Asia/Shanghai"
) {
  const today = new Date(timestamp);

  const formatter = new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone,
  });

  return formatter.format(today);
}

export async function fetchDailyData() {
  const api = "https://60s.viki.moe/60s?v2=1";
  const today = getLocaleTodayString();

  let cacheData = cache.get(today);

  if (cacheData) return cacheData;

  const data = await fetch(api)
    .then((res) => res.json())
    .then((data) => data as Response);

  if (data.status !== 200) {
    console.error(`fetch daily data error: ${data.message}`);
    return null;
  }
  console.info(`cache build, data for ${today}`);
  cache.clear();
  cache.set(today, data.data);
  cacheData = data.data;
  return cacheData;
}
