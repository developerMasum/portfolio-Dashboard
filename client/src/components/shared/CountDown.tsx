import React, { useEffect, useState } from "react";
import { Flipper, Flipped } from "react-flip-toolkit";

interface CountdownProps {
  targetDate: Date;
}

const Countdown: React.FC<CountdownProps> = ({ targetDate }) => {
  // Function to add 56 days to the target date
  const getNewTargetDate = (date: Date) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + 56);
    return newDate;
  };

  const newTargetDate = getNewTargetDate(targetDate);

  const calculateTimeLeft = () => {
    const difference = +new Date(newTargetDate) - +new Date();
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

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const renderFlipUnitContainer = (current: number, unit: string) => {
    return (
      <div className="flex flex-col items-center bg-gray-800 text-white p-4 rounded-md min-w-[20px] mt-3">
        <Flipper flipKey={current}>
          <Flipped flipId={`flip-${unit}-${current}`}>
            <span className="text-2xl font-bold">{current}</span>
          </Flipped>
        </Flipper>
        <span className="text-green-400 mt-2">{unit}</span>
      </div>
    );
  };

  return (
    <div className="flex justify-center gap-4">
      {renderFlipUnitContainer(timeLeft.days, "Days")}
      {renderFlipUnitContainer(timeLeft.hours, "Hours")}
      {renderFlipUnitContainer(timeLeft.minutes, "Mins")}
      {renderFlipUnitContainer(timeLeft.seconds, "Secs")}
    </div>
  );
};

export default Countdown;
