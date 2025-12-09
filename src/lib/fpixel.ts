// No changes needed for fpixel.ts as it already accepts an options object which can contain external_id
export const FB_PIXEL_ID = "1526114357923558";
export const access_token =
  "EAAJNJJSYTDEBOzR9PeiZBHHvbe2Mtgujg8M4azC4Enr1h8wlh66ZBPrJvuHJfw8Dw8i28P8z2tIc4AAfX5p9uvZAjcKfXMN1J6b7arRqKoOIUFgqnq6Qj0ZCRbOZAV15TRd15miwBethPZCUVFdw2zULFniR2rAtL1Nsfu5ejR8CvNbg3ZAI178KfeLaPdwdAZDZD";

export const pageView = () => {
  if (!!window?.fbq) window?.fbq("track", "PageView");
};

declare global {
  interface Window {
    fbq: (
      type: string,
      eventName: string,
      params?: any,
      options?: { eventID?: string }
    ) => void;
  }
}

// https://developers.facebook.com/docs/facebook-pixel/advanced/
// https://developers.facebook.com/docs/facebook-pixel/advanced/
export const event = (name: string, options = {}, eventId?: string) => {
  if (!!window?.fbq) {
    const params = eventId ? { eventID: eventId } : {};
    window?.fbq("track", name, options, params);
  }
};

export const eventCustom = (name: string, options = {}, eventId?: string) => {
  if (!!window?.fbq) {
    const params = eventId ? { eventID: eventId } : {};
    window?.fbq("trackCustom", name, options, params);
  }
};
