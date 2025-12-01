import { useEffect, useState } from "react";

export const useSSE = (url: string) => {
  const [eventData, setEventData] = useState<any>(null);

  useEffect(() => {
    let es: EventSource | null = null;
    let closed = false;

    const connect = () => {
      es = new EventSource(url);

      es.onmessage = (event) => {
        try {
          const json = JSON.parse(event.data);
          setEventData(json);
        } catch (err) {
          console.error("Error parsing SSE message", err);
        }
      };

      es.onerror = () => {
        console.warn("SSE error. Cerrando y reintentando...");
        es?.close();
        if (!closed) setTimeout(connect, 3000);
      };
    };

    connect();

    return () => {
      closed = true;
      es?.close();
    };
  }, [url]);

  return eventData;
};