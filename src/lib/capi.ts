import { FB_PIXEL_ID, access_token } from "./fpixel";

interface CapiEventData {
  eventName: string;
  eventId: string;
  emails?: string[];
  phones?: string[];
  clientIp?: string;
  userAgent?: string;
  fbp?: string;
  fbc?: string;
  customData?: any;
}

const getCookie = (name: string): string | null => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
  return null;
};

export const sendCapiEvent = async (data: CapiEventData) => {
  const fbp = data.fbp || getCookie("_fbp");
  const fbc = data.fbc || getCookie("_fbc");

  const payload = {
    data: [
      {
        event_name: data.eventName,
        event_time: Math.floor(Date.now() / 1000),
        action_source: "website",
        event_id: data.eventId,
        user_data: {
          em: data.emails,
          ph: data.phones,
          client_ip_address: data.clientIp,
          client_user_agent: data.userAgent || navigator.userAgent,
          fbp: fbp,
          fbc: fbc,
        },
        custom_data: data.customData,
      },
    ],
    // test_event_code: "TEST58852", // Uncomment for testing in Events Manager
  };

  try {
    const response = await fetch(
      `https://graph.facebook.com/v19.0/${FB_PIXEL_ID}/events?access_token=${access_token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      console.warn("CAPI Error:", result);
      return false;
    }

    console.log("CAPI Success:", result);
    return true;
  } catch (error) {
    console.error("CAPI Network Error:", error);
    return false;
  }
};
