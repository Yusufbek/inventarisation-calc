import { useEffect } from "react";
import { WebinarHeroV2 } from "@/components/webinar/WebinarHeroV2";
import { WebinarSpeaker } from "@/components/webinar/WebinarSpeaker";
import { WebinarTopicsV2 } from "@/components/webinar/WebinarTopicsV2";
import { WebinarBonuses } from "@/components/webinar/WebinarBonuses";
import { WebinarInlineRegistrationV2 } from "@/components/webinar/WebinarInlineRegistrationV2";
import { pageView } from "@/lib/fpixel";

const scrollToRegistration = () => {
  document.getElementById("registration")?.scrollIntoView({ behavior: "smooth" });
};

const WebinarFoydaWebinarV2 = () => {
  useEffect(() => {
    pageView();
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <WebinarHeroV2 onRegisterClick={scrollToRegistration} />
      <WebinarTopicsV2 onRegisterClick={scrollToRegistration} />
      <WebinarBonuses />
      <WebinarSpeaker />
      <WebinarInlineRegistrationV2 />
    </div>
  );
};

export default WebinarFoydaWebinarV2;
