import Landing from "./components/home/Landing";
import Features from "./components/home/Features";
import { poppins } from "./library/font";
import Workflow from "./components/home/Workflow";
import Services from "./components/home/Services";
import Footer from "./components/home/Footer";
import Navbar from "./components/home/Navbar";

export default function Home() {
  return (
    <div className={`w-[100vw] h-max bg-[#06060A] text-white ${poppins.className}`}>
      <Navbar />
      <Landing />
      <Features />
      <Workflow />
      <Services />
      <Footer />
    </div>
  );
}
