import { useEffect, useMemo, useState } from "react";
import { fetchVaultData } from "../services/vaultService";

export const useVault = () => {
  const [records, setRecords] = useState([]);
  const [reminder, setReminder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const loadVaultData = async () => {
      try {
        setLoading(true);
        setError("");

        const vaultData = await fetchVaultData();

        if (isMounted) {
          setRecords(vaultData.records);
          setReminder(vaultData.reminder);
        }
      } catch {
        if (isMounted) {
          setError("Failed to load health vault data.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadVaultData();

    return () => {
      isMounted = false;
    };
  }, []);

  const activePrescriptionCount = useMemo(() => {
    return records.filter((record) => record.type === "prescription").length;
  }, [records]);

  return {
    activePrescriptionCount,
    error,
    loading,
    records,
    reminder,
  };
};
