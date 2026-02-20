import { useEffect } from "react";
import { WebinarHero } from "@/components/webinar/WebinarHero";
import { WebinarSpeaker } from "@/components/webinar/WebinarSpeaker";
import { WebinarTopics } from "@/components/webinar/WebinarTopics";
import { WebinarBonuses } from "@/components/webinar/WebinarBonuses";
import { WebinarCTA } from "@/components/webinar/WebinarCTA";
import { WebinarInlineRegistration } from "@/components/webinar/WebinarInlineRegistration";
import { pageView } from "@/lib/fpixel";

const scrollToRegistration = () => {
  document.getElementById("registration")?.scrollIntoView({ behavior: "smooth" });
};

const WebinarFoydaWebinar = () => {
  useEffect(() => {
    pageView();
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <WebinarHero onRegisterClick={scrollToRegistration} />
      <WebinarSpeaker />
      <WebinarTopics onRegisterClick={scrollToRegistration} />
      <WebinarBonuses />
      <WebinarCTA onRegisterClick={scrollToRegistration} />
      <WebinarInlineRegistration />
    </div>
  );
};

export default WebinarFoydaWebinar;
