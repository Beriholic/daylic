import Card from "@/components/Card";
import { fetchDailyData } from "@/server/service/60s";

export default async function Home() {
  const dailyData = await fetchDailyData();
  if (!dailyData) {
    return (
      <div className="flex flex-col w-full h-screen items-center justify-center">
        <div className="text-4xl bg-surface-container p-12 rounded-3xl">
          你来早了，今天的早报还未发布
        </div>
      </div>
    );
  }
  return (
    <div className={`flex flex-col w-full transition-all animate-fade-in`}>
      <div className="bg-error-container rounded-3xl mx-4 my-6 lg:mx-72 lg:my-10">
        <h1 className="text-center text-on-error-container text-xl lg:text-2xl">
          60 秒早报
        </h1>
        <div className="text-center pb-2 px-2 text-sm text-on-error-container">
          {dailyData.tip}
        </div>
      </div>
      <div className="px-4">
        {dailyData.news.map((news, index) => (
          <Card key={index} news={news} />
        ))}
      </div>
    </div>
  );
}
