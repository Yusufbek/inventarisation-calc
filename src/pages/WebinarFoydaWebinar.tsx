import { useEffect, useState } from "react";
import { WebinarHero } from "@/components/webinar/WebinarHero";
import { WebinarMission } from "@/components/webinar/WebinarMission";
import { WebinarTrust } from "@/components/webinar/WebinarTrust";
import { WebinarCTA } from "@/components/webinar/WebinarCTA";
import { WebinarSpeaker } from "@/components/webinar/WebinarSpeaker";
import { WebinarBonuses } from "@/components/webinar/WebinarBonuses";
import { WebinarRegistrationPopup } from "@/components/webinar/WebinarRegistrationPopup";
import { pageView } from "@/lib/fpixel";

const WebinarFoydaWebinar = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    pageView();
    window.scrollTo(0, 0);
  }, []);

  const openRegistration = () => setIsPopupOpen(true);

  return (
    <div className="min-h-screen bg-background">
      <WebinarHero onRegisterClick={openRegistration} />
      <WebinarMission onRegisterClick={openRegistration} />
      <WebinarTrust />
      <WebinarCTA onRegisterClick={openRegistration} />
      <WebinarSpeaker />
      <WebinarBonuses />
      <WebinarRegistrationPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
      />
    </div>
  );
};

export default WebinarFoydaWebinar;
