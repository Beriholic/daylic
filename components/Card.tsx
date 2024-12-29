export default function Card({ news }: { news: string }) {
  return (
    <div className="bg-surface-dim mx-4 my-2 p-4 pl-6 rounded-2xl lg:mx-28 sm:pl-8">
      <p className="text-base hover:underline lg:text-xl">{news}</p>
    </div>
  );
}
