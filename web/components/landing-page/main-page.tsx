"use client";
import Image from "next/image";
import { Card } from "../ui/card";
import AnimatedShinyText from "@/components/ui/animated-shiny-text";
import { ChevronRight } from "lucide-react";
import Ripple from "@/components/ui/ripple";
import Link from "next/link";

import { cn } from "@/lib/utils";

export default function MainPage() {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center bg-background md:shadow-xl overflow-hidden">
      <Card className="z-10 bg-white/60 rounded-none border-black border-4">
        <div className="flex items-center justify-center w-full h-full p-4">
          <h1 className="text-4xl font-extrabold text-center text-black">
            BETTER
          </h1>
        </div>
      </Card>
      <div className="z-10 p-4 items-center justify-center">
        <Image
          src="/stronger-bond.svg"
          alt="A stronger bond"
          width={250}
          height={90}
        ></Image>
      </div>
      <Link href="/home">
        <div
          className={cn(
            "z-10 group rounded-full border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800 mt-4"
          )}
        >
          <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
            <span>✨ Open APP</span>
            <ChevronRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
          </AnimatedShinyText>
        </div>
      </Link>
      <Ripple
        mainCircleSize={450}
        numCircles={16}
        mainCircleOpacity={0.2}
        mainOpacity={0.015}
        className="pointer-events-none"
      />
    </div>
  );
}
