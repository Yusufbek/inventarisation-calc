import { useEffect } from "react";
import { ThankYou as ThankYouComponent } from "@/components/ThankYou";
import { pageView } from "@/lib/fpixel";

const ThankYou = () => {
  useEffect(() => {
    pageView();
  }, []);

  return <ThankYouComponent />;
};

export default ThankYou;
