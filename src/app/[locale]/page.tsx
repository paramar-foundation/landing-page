"use client";

import LandingPage from "./landing-page/page";

export default function Home() {
  // const [timeRemaining, setTimeRemaining] = useState(0);

  // useEffect(() => {
  //   const calculateTimeRemaining = () => {
  //     const launchDate = "2023-12-10T05:00:00Z";
  //     const currentDate = new Date();
  //     const targetDate = new Date(launchDate);
  //     const difference = targetDate.getTime() - currentDate.getTime();
  //     return Math.max(0, difference);
  //   };

  //   const interval = setInterval(() => {
  //     setTimeRemaining(calculateTimeRemaining());
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, []);

  return <LandingPage />;
}
