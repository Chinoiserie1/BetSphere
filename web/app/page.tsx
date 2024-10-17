import { Card, CardContent, CardTitle } from "@/components/ui/card";
import TextRevealByWord from "@/components/ui/text-reveal";
import Image from "next/image";
import GlitteringSea from "@/components/ui/glittering-sea";
import MetaballsAnimation from "@/components/ui/metaballs-animation";
import Ripple from "@/components/ui/ripple";
import AnimatedShinyText from "@/components/ui/animated-shiny-text";
import { ChevronRight } from "lucide-react";

import Link from "next/link";
import MainPage from "@/components/landing-page/main-page";

import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <div className="w-screen h-screen">
      <div className="flex w-full h-full items-center justify-center flex-col">
        {/* <Card className="z-20 bg-white/60 rounded-none border-black border-4">
          <div className="flex items-center justify-center w-full h-full p-4">
            <h1 className="text-4xl font-extrabold text-center text-black">
              BETTER
            </h1>
          </div>
        </Card> */}
        {/* <h1 className="mt-8 text-center font-custom text-3xl">
          A Stronger bond
        </h1> */}
        {/* <div className="z-20 p-4 items-center justify-center">
          <Image
            src="/stronger-bond.svg"
            alt="A stronger bond"
            width={250}
            height={90}
          ></Image>
        </div> */}
        {/* <div
          className={cn(
            "z-20 group rounded-full border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800"
          )}
        >
          <Link href="/home">
            <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
              <span>✨ Open APP</span>
              <ChevronRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
            </AnimatedShinyText>
          </Link>
        </div> */}
        {/* <GlitteringSea /> */}
        {/* <MetaballsAnimation /> */}
        <MainPage />
      </div>
      <div className="flex h-[200vh] items-center justify-center">
        <TextRevealByWord
          text={`Step into BETTER!\nEmbark on an online gaming odyssey that taps into the electrifying essence of the crypto universe.\nHere, you'll discover a uniquely curated selection of gaming experiences and groundbreaking raffles.\nAt BETTER, we're committed to offering an unparalleled entertainment experience, enhanced by the security and innovation of blockchain technology. Enjoy exclusive rewards and elite customer service in a platform where every interaction is designed with your enjoyment and safety in mind.\nWelcome to the future of online gaming—welcome to BETTER!`}
        />
      </div>
      <div className="relative w-full h-full flex items-center justify-center">
        <Image src="/DREAM-BIG.jpg" fill objectFit="cover" alt="dream-big" />
        <div className="absolute p-2">
          <Card className="bg-transparent/40 p-4 xs:p-6 max-w-4xl">
            <CardTitle className="w-full p-4 sm:w-1/3 text-center sm:text-start">
              Playing for a BETTER world
            </CardTitle>
            <CardContent className="mt-2 w-full">
              <p className="text-lg flex flex-1 text-justify">
                In addition to our dedication to premier gaming and innovation,
                BETTER is proud to be a privileged partner of the Swiss
                Initiative GIVING BACK, which supports social and environmental
                projects globally. We commit 15% of our revenue from fees,
                transparently transferred via blockchain, directly to GIVING
                BACK. This ensures we know exactly how the funds are utilized,
                allowing you and us at BETTER to make a tangible impact on the
                world. Together, we&apos;re not just enjoying unique
                entertainment; we&apos;re actively making the world a better
                place.{" "}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
