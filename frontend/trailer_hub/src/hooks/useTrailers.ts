import { useEffect, useState } from "react";
import { api } from "../services/api";

export function useTrailers() {
  const [homeFeed, setHomeFeed] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchHome() {
    const response = await api.get("/trailers/home");
    setHomeFeed(response.data);
  }

  useEffect(() => {
    fetchHome().finally(() => setLoading(false));
  }, []);

  async function registerTrailer(data: any) {
    setLoading(true);

    try {
      const response = await api.post("/trailers", data);
      return response.data;
    } finally {
      setLoading(false);
    }
  }

  return {
    homeFeed,
    registerTrailer,
    loading,
    fetchHome,
  };
}
