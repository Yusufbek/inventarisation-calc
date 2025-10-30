import { useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import { ThankYou as ThankYouComponent } from "@/components/ThankYou";
import { pageView } from "@/lib/fpixel";

const ThankYouVariant = () => {
  const { variant } = useParams<{ variant: string }>();

  useEffect(() => {
    pageView();
  }, []);

  // Validate variant
  if (!variant || !["main", "lite", "formwall", "gamified"].includes(variant)) {
    return <Navigate to="/404" replace />;
  }

  return <ThankYouComponent />;
};

export default ThankYouVariant;
