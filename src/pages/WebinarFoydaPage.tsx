import { useState, useEffect } from "react";
import { pageView } from "@/lib/fpixel";
import { WebinarHero } from "@/components/webinar/WebinarHero";
import { WebinarTrust } from "@/components/webinar/WebinarTrust";
import { WebinarMission } from "@/components/webinar/WebinarMission";
import { WebinarSpeaker } from "@/components/webinar/WebinarSpeaker";
import { WebinarCTA } from "@/components/webinar/WebinarCTA";
import { WebinarRegistrationDialog } from "@/components/webinar/WebinarRegistrationDialog";

// Get next Friday from today
const getNextFriday = () => {
  const today = new Date();
  const dayOfWeek = today.getDay();
  // If today is Friday (5), get next Friday (7 days ahead)
  // Otherwise calculate days until next Friday
  const daysUntilFriday = dayOfWeek === 5 ? 7 : (5 - dayOfWeek + 7) % 7 || 7;
  const nextFriday = new Date(today);
  nextFriday.setDate(today.getDate() + daysUntilFriday);
  return nextFriday;
};

const WebinarFoydaPage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const nextFriday = getNextFriday();

  useEffect(() => {
    pageView();
    window.scrollTo(0, 0);
  }, []);

  const handleRegisterClick = () => {
    setIsDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <WebinarHero onRegisterClick={handleRegisterClick} />
      <WebinarTrust />
      <WebinarMission />
      <WebinarSpeaker />
      <WebinarCTA onRegisterClick={handleRegisterClick} nextFriday={nextFriday} />
      
      <WebinarRegistrationDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        nextFriday={nextFriday}
      />

      {/* Footer */}
      <footer className="py-8 bg-secondary/30 text-center">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} BILLZ. Barcha huquqlar himoyalangan.
        </p>
      </footer>
    </div>
  );
};

export default WebinarFoydaPage;
