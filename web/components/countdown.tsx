import { useEffect, useState } from "react";

const calculateTimeLeft = (targetTimestampInSecond: number) => {
  const difference = targetTimestampInSecond * 1000 - +new Date();
  let timeLeft = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  };

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  return timeLeft;
};

export default function Countdown({
  targetTimestampInSecond,
}: {
  targetTimestampInSecond: number;
}) {
  const [timeLeft, setTimeLeft] = useState(
    calculateTimeLeft(targetTimestampInSecond)
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft(targetTimestampInSecond));
    }, 1000);

    return () => clearTimeout(timer);
  });

  return (
    <div className="w-full text-center">
      <p className="text-xs">COUNTDOWN</p>
      <h1 className="text-blue-400 font-semibold">
        {timeLeft.days}d, {timeLeft.hours}h, {timeLeft.minutes}min,{" "}
        {timeLeft.seconds}sec
      </h1>
    </div>
  );
}
