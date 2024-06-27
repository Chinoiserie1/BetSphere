import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import Header from "./header/header";
import SideBar from "@/components/side-bar/side-bar";

export default function BetLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-screen h-screen overflow-hidden">
      <div className="flex flex-col h-full">
        <Header />
        <ResizablePanelGroup direction="horizontal" className="flex-1 border-0">
          <ResizablePanel defaultSize={20} minSize={10} maxSize={30}>
            <SideBar />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={80}>{children}</ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
}
