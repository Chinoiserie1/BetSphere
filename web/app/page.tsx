import RetroGrid from "@/components/ui/retro-grid";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import AnimatedRibbonBackground from "@/components/ui/animate-background";
import AnimatedBlob from "@/components/ui/animated-blob";
import TextRevealByWord from "@/components/ui/text-reveal";
import Image from "next/image";

export default function Home() {
  return (
    <div className="w-screen h-screen">
      <div className="flex h-full items-center justify-center flex-col">
        <div>
          <Card className="z-10 bg-white/60 rounded-none border-black border-4">
            <div className="flex items-center justify-center w-full h-full p-4">
              <h1 className="text-4xl font-extrabold text-center text-black">
                BETTER
              </h1>
            </div>
          </Card>
        </div>
        <h1 className="mt-8 text-center font-custom text-3xl">
          A Stronger bond
        </h1>
        <AnimatedRibbonBackground />
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
                world. Together, we're not just enjoying unique entertainment;
                we're actively making the world a better place.{" "}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
