import { useState, useEffect } from "react";
import { WebinarHero } from "@/components/webinar/WebinarHero";
import { WebinarTrust } from "@/components/webinar/WebinarTrust";
import { WebinarMission } from "@/components/webinar/WebinarMission";
import { WebinarSpeaker } from "@/components/webinar/WebinarSpeaker";
import { WebinarCTA } from "@/components/webinar/WebinarCTA";
import { WebinarRegistrationPopup } from "@/components/webinar/WebinarRegistrationPopup";
import { pageView } from "@/lib/fpixel";

const WebinarFoydaWebinar = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    // Fire page view on mount
    pageView();
    
    // Scroll to top
    window.scrollTo(0, 0);
  }, []);

  const handleRegisterClick = () => {
    setIsPopupOpen(true);
  };

  return (
    <div className="min-h-screen bg-background font-gilroy">
      <WebinarHero onRegisterClick={handleRegisterClick} />
      <WebinarTrust />
      <WebinarMission />
      <WebinarSpeaker />
      <WebinarCTA onRegisterClick={handleRegisterClick} />
      
      <WebinarRegistrationPopup 
        isOpen={isPopupOpen} 
        onClose={() => setIsPopupOpen(false)} 
      />
    </div>
  );
};

export default WebinarFoydaWebinar;
