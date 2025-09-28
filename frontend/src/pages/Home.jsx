import { useNavigate } from "react-router-dom";
import Features from "../components/homepage/Features";
import HeroSection from "../components/homepage/HeroSection";
import LastSection from "../components/homepage/LastSection";
import CustomerReviews from "../components/homepage/CustomerReviews";

function Home() {
  const navigate = useNavigate();
  return (
    <main className="bg-white w-full relative">
      <HeroSection navigate={navigate} />
      <Features />
      <CustomerReviews />
      <LastSection />
    </main>
  );
}

export default Home;
