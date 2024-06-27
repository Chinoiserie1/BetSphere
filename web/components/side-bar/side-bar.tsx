import prisma from "@/lib/db";
import { cn } from "@/lib/utils";
import Link from "next/link";

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { ScrollArea } from "../ui/scroll-area";

const SideBar = async () => {
  return (
    <Command>
      <CommandInput placeholder="Search category" />
      <CommandList>
        <ScrollArea className="h-full">
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Sports">
            <CommandItem asChild>
              <Link href={"football"}>Football</Link>
            </CommandItem>
            <CommandItem>Basketball</CommandItem>
            <CommandItem>Tennis</CommandItem>
          </CommandGroup>
          <CommandGroup heading="ESports">
            <CommandItem>Counter Strike</CommandItem>
            <CommandItem>League of legends</CommandItem>
          </CommandGroup>
        </ScrollArea>
      </CommandList>
    </Command>
  );
};

export default SideBar;
