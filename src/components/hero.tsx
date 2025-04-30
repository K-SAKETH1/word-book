import Search from "./searchbar";

export default function Hero() {
  return (
    <div className="mx-auto max-w-7xl lg:pb-10">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-8 lg:pb-4">
          Word <span style={{ color: "#CF2CE7" }}>Book</span>
        </h1>
        <p className="lg:text-2xl p-1 text-xl">
          Your modern dictionary companion for everyday learning and language
          exploration.
        </p>
      </div>
      <Search />
    </div>
  );
}
