import { Buildings } from "@/components/Buildings";
import { EvidenceChain } from "@/components/EvidenceChain";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { PilotBand } from "@/components/PilotBand";
import { Principles } from "@/components/Principles";
import { Problem } from "@/components/Problem";
import { Team } from "@/components/Team";

// Home sections in CONTENT.md order. Team renders only while flags.showTeam is true.
export default function HomePage() {
  return (
    <>
      <Hero />
      <Problem />
      <HowItWorks />
      <EvidenceChain />
      <Principles />
      <Buildings />
      <Team />
      <PilotBand />
    </>
  );
}
