import Image from "next/image";
import Landing from "./components/Landing";
import Features from "./components/Features";
import { poppins } from "./library/font";
import Workflow from "./components/Workflow";
import Services from "./components/Services";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className={`w-[100vw] h-max bg-[#06060A] text-white ${poppins.className}`}>
      <Landing />
      <Features />
      <Workflow />
      <Services />
      <Footer />
    </div>
  );
}
