"use client";
import Card from "@/components/Card";
import { DailyData, RestResp } from "@/server/model";
import { useEffect, useState } from "react";

export default function Home() {
  const [dailyDate, setDailyDate] = useState<DailyData | null>(null);
  useEffect(() => {
    const fetchDailyDate = async () => {
      const res = await fetch("/api/daily", {
        method: "POST",
      })
        .then((res) => res.json())
        .then((data) => data as RestResp);

      if (res.code === 200) {
        setDailyDate(res.data as DailyData);
      }
    };
    fetchDailyDate();
  }, []);

  if (!dailyDate) return;
  return (
    <div className="flex flex-col w-full">
      <div className="bg-error-container rounded-3xl mx-4 my-6 lg:mx-72 lg:my-10">
        <h1 className="text-center text-on-error-container text-xl lg:text-2xl">
          60 秒早报
        </h1>
        <div className="text-center pb-2 px-2 text-sm">{dailyDate.tip}</div>
      </div>
      <div className="px-4">
        {dailyDate.news.map((news, index) => (
          <Card key={index} news={news} />
        ))}
      </div>
    </div>
  );
}
