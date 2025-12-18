const WEBHOOK_URL = "https://n8n.srv1192199.hstgr.cloud/webhook/e2b981b8-e691-4f70-a9b8-2b82cfa42386";

interface TrackEventData {
  storeType?: string;
  storeTypeLabel?: string;
  skuCount?: number;
  skuLabel?: string;
  inventoryFrequency?: string;
  frequencyLabel?: string;
  theftLevel?: string;
  theftLabel?: string;
  avgPrice?: number;
}

export const trackCalcEvent = (event: string, data?: TrackEventData) => {
  const payload = {
    event,
    timestamp: new Date().toISOString(),
    page: window.location.pathname,
    data: data || {},
  };

  // Fire and forget - don't block UI
  fetch(WEBHOOK_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    mode: "no-cors",
  }).catch((err) => {
    console.error("Failed to track event:", err);
  });
};
