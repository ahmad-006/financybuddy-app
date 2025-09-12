import { useNavigate } from "react-router-dom";
import Features from "../components/homepage/Features";
import HeroSection from "../components/homepage/HeroSection";
import LastSection from "../components/homepage/LastSection";
import CustomerReviews from "../components/homepage/CustomerReviews";

function Home() {
  const navigate = useNavigate();
  return (
    <main
      className="bg-gradient-to-b from-gray-950 to-gray-900 min-h-screen w-full relative"
      style={{ backgroundColor: "#111827" }}
    >
      <HeroSection navigate={navigate} />
      <Features />
      <CustomerReviews />
      <LastSection />
    </main>
  );
}

export default Home;
