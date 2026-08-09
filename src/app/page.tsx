import { LandingHeader } from "@/features/landing/components/LandingHeader";
import { Hero } from "@/features/landing/components/Hero";
import { Capabilities } from "@/features/landing/components/Capabilities";
import { SupportedLanguages } from "@/features/landing/components/SupportedLanguages";
import { ContextAwareAI } from "@/features/landing/components/ContextAwareAI";
import { Pricing } from "@/features/landing/components/Pricing";
import { LandingFooter } from "@/features/landing/components/LandingFooter";

export default function Home() {
  return (
    <>
      <LandingHeader />
      <main className="w-full pt-16 bg-[#09090B]">
        <div className="flex flex-col w-full text-on-surface">
          <Hero />
          <Capabilities />
          <SupportedLanguages />
          <ContextAwareAI />
          <Pricing />
        </div>
      </main>
      <LandingFooter />
    </>
  );
}
