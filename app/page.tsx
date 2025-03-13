"use client";
import Hero from "@/app/components/Hero";
import Forms from "@/app/components/Forms";
import Working from "@/app/components/Workings";
import Footer from "@/app/components/Footer";
import { outfit } from "@/app/library/font";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

export default function Home() {

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className={`main w-full h-full bg-green-400  ${outfit.className}`}>
      <div className="w-full h-full ">
        <Hero />
        <Forms />
        <Working />
        <Footer />
      </div>
    </div>
  );
}
