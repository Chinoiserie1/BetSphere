import { ScrollArea } from "@/components/ui/scroll-area";
import GlimmerGrabs from "@/components/highlights/glimmer-grabs";

export default function Home() {
  return (
    <div className="h-full w-full flex flex-col">
      <ScrollArea className="flex-1 px-4 sm:px-8">
        <GlimmerGrabs />
      </ScrollArea>
    </div>
  );
}
