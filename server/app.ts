import { KEY_DALIYDATA } from "./consts";
import { dailyDataStore } from "./kv";
import logger from "./logger";
import { DailyDataResponse } from "./model";

export async function getDailyData() {
  const _date = new Date();
  const date = [
    _date.getFullYear(),
    _date.getMonth() + 1,
    _date.getDate(),
  ].join("-");
  logger.info(`date: ${date}`);
  const data = dailyDataStore.get(KEY_DALIYDATA);

  if (data === undefined || data.data.date !== date) {
    return await getDailyDataFromRemote();
  }

  return data;
}
async function getDailyDataFromRemote() {
  const token = process.env.TOKEN;
  if (!token) {
    throw "TOKEN is not defined";
  }

  const body = new URLSearchParams({ token: token, format: "json" }).toString();

  const data = await fetch("https://v2.alapi.cn/api/zaobao", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: body,
  })
    .then((res) => res.json())
    .then((res) => res as DailyDataResponse)
    .catch((err) => {
      throw err;
    });

  data.data.weiyu = data.data.weiyu.replace("【微语】", "");

  dailyDataStore.set(KEY_DALIYDATA, data);
  return data;
}
