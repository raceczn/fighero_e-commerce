"use client";

import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";

export default function SyncClerkUser() {
  const { user, isSignedIn } = useUser();

  useEffect(() => {
    if (!isSignedIn || !user) return;

    // Call your API to sync user data
    fetch("/api/syncUser", { method: "POST" })
      .then((res) => res.json())
      .then((data) => console.log("User sync:", data))
      .catch((err) => console.error("Sync error:", err));
  }, [isSignedIn, user]);

  return null;
}
