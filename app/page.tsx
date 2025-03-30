import Landing from "./components/Landing";
import Features from "./components/Features";
import { poppins } from "./library/font";
import Workflow from "./components/Workflow";
import Services from "./components/Services";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

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
