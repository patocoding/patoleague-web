import Banner from "./components/home/Banner";
import Header from "./components/home/Header";
import HorizontalScrollMatches from "./components/matches/HorizontalScrollMatches";

export default function Home() {
  return (
    <div className=" p-4">
      <Header/>
      <HorizontalScrollMatches/>
      <Banner/>
    </div>
  );
}
