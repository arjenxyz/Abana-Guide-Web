"use client";

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import StayAndEat from "@/components/StayAndEat";
import Gallery from "@/components/Gallery";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import Chatbot from "@/components/Chatbot";
import DocumentMeta from "@/components/DocumentMeta";
import LocalizedChatbotProvider from "@/components/LocalizedChatbotProvider";
import { LanguageProvider } from "@/i18n/LanguageProvider";

export default function Home() {
  return (
    <LanguageProvider>
      <LocalizedChatbotProvider>
        <DocumentMeta />
        <Header />
        <Hero />
        <About />
        <StayAndEat />
        <Gallery />
        <Footer />
        <ScrollToTop />
        <Chatbot />
      </LocalizedChatbotProvider>
    </LanguageProvider>
  );
}
