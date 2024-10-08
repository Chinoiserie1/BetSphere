"use client";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Progress } from "../ui/progress";

import Countdown from "../countdown";

type GlimmerGrabCardProps = {
  imgPath: string;
  title: string;
  description: string;
  price: string;
  id: number;
  timestamp: number;
};

export default function GlimmerGrabCard({
  imgPath,
  title,
  description,
  price,
  id,
  timestamp,
}: GlimmerGrabCardProps) {
  return (
    <Card style={{ minWidth: "15rem" }}>
      <CardContent className="flex flex-col sm:flex-row p-4 w-full">
        <div className="relative w-full sm:w-1/3 min-w-40 min-h-40 h-60">
          <Image
            src={imgPath}
            alt={title}
            fill
            style={{ objectFit: "cover" }}
            className="rounded-lg"
          />
        </div>
        <div className="flex flex-1 flex-col ml-0 sm:ml-4 w-full mt-4 sm:mt-0">
          <h2 className="text-xl font-bold">{title}</h2>
          <p className="text-md text-pink-500">Value: {price}</p>
          <p
            className="text-md overflow-hidden text-ellipsis"
            style={{
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 8,
              maxHeight: "12em",
            }}
          >
            {description}
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row w-full">
        <div className="flex w-full sm:w-1/3">
          <Countdown targetTimestampInSecond={new Date(timestamp).getTime()} />
        </div>
        <div className="flex flex-1 flex-col ml-4 mt-2 sm:mt-0">
          <Progress value={50} />
          <div className="relative flex flex-row items-center justify-between text-xs text-muted-foreground w-full">
            <p>0</p>
            <p className="absolute left-1/2 transform -translate-x-1/2">
              Activated
            </p>
            <p>Max Players</p>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
