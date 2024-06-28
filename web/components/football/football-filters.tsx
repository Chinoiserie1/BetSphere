"use client";

import { useState, MouseEvent, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SlidersHorizontal } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";

interface FilterOption {
  id: string;
  label: string;
  queryParam: string;
}

const filterOptions: FilterOption[] = [
  {
    id: "1",
    label: "World Cup",
    queryParam: "world-cup",
  },
  {
    id: "2",
    label: "UEFA Champions League",
    queryParam: "uefa-champions-league",
  },
  { id: "3", label: "UEFA Europa League", queryParam: "uefa-europa-league" },
  { id: "4", label: "Euro Championship", queryParam: "euro-championship" },
  {
    id: "6",
    label: "Africa Cup of Nations",
    queryParam: "africa-cup-of-nations",
  },
  {
    id: "9",
    label: "Copa America",
    queryParam: "copa-america",
  },
  { id: "39", label: "Premier League", queryParam: "premier-league" },
  { id: "61", label: "Ligue 1", queryParam: "ligue-1" },
  { id: "71", label: "Serie A", queryParam: "serie-a" },
];

type FiltersState = {
  [key: string]: boolean;
};

export default function FootballFilters() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [filters, setFilters] = useState<FiltersState>(
    filterOptions.reduce((acc, filter) => {
      acc[filter.id] = false;
      return acc;
    }, {} as FiltersState)
  );

  useEffect(() => {
    const currentFilters = filterOptions.reduce((acc, filter) => {
      const isChecked = searchParams.getAll("league").includes(filter.id);
      acc[filter.id] = isChecked;
      return acc;
    }, {} as FiltersState);
    setFilters(currentFilters);
  }, [searchParams]);

  const handleCheckboxChange = (id: string, checked: boolean) => {
    // console.log(id, checked);
    setFilters((prevFilters) => ({
      ...prevFilters,
      [id]: checked,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const query = new URLSearchParams();
    filterOptions.forEach((filter) => {
      if (filters[filter.id]) {
        query.append("league", filter.id);
      }
    });
    console.log(query.toString());
    router.push(`/football/?${query.toString()}`);
    router.refresh();
  };

  return (
    <Sheet>
      <TooltipProvider disableHoverableContent>
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            <SheetTrigger asChild>
              <Button className={cn("py-2 px-6")} variant="outline">
                <SlidersHorizontal className="w-[1.2rem] h-[1.2rem]" />
              </Button>
            </SheetTrigger>
          </TooltipTrigger>
          <TooltipContent side="bottom">Filters</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <SheetContent>
        <form onSubmit={handleSubmit}>
          <SheetHeader>
            <SheetTitle>Select filters</SheetTitle>
          </SheetHeader>

          <div className="mt-6" />
          {filterOptions.map((filter) => (
            <div key={filter.id} className="flex items-center space-x-2 pt-2">
              <Checkbox
                id={filter.id}
                checked={filters[filter.id]}
                onCheckedChange={(checked: boolean) =>
                  handleCheckboxChange(filter.id, checked)
                }
              />
              <label
                htmlFor={filter.id}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {filter.label}
              </label>
            </div>
          ))}
          <SheetClose asChild>
            <Button type="submit" className={cn("mt-4")}>
              Submit
            </Button>
          </SheetClose>
        </form>
      </SheetContent>
    </Sheet>
  );
}
