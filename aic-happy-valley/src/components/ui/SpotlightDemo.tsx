import { GlowCard } from "@/components/ui/spotlight-card";

export default function SpotlightDemo() {
  return (
    <div className="w-full min-h-screen bg-brand-darkGrey flex flex-col md:flex-row items-center justify-center gap-10 p-8">
      <GlowCard glowColor="blue">
        <div className="flex flex-col items-center justify-center h-full text-center p-6 text-white">
          <h3 className="text-xl font-black mb-2">Service Times</h3>
          <p className="text-sm font-medium opacity-60">Join us every Sunday morning for worship and fellowship.</p>
        </div>
      </GlowCard>
      
      <GlowCard glowColor="purple">
        <div className="flex flex-col items-center justify-center h-full text-center p-6 text-white">
          <h3 className="text-xl font-black mb-2">Bible Study</h3>
          <p className="text-sm font-medium opacity-60">Deepen your faith with our weekly community study sessions.</p>
        </div>
      </GlowCard>

      <GlowCard glowColor="orange">
        <div className="flex flex-col items-center justify-center h-full text-center p-6 text-white">
          <h3 className="text-xl font-black mb-2">Give Online</h3>
          <p className="text-sm font-medium opacity-60">Support our mission through secure and easy digital giving.</p>
        </div>
      </GlowCard>
    </div>
  );
}
