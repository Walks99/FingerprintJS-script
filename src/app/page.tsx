"use client";

import React, { useEffect, useState } from "react";
import styles from "./page.module.scss";
import * as FingerprintJS from "@fingerprintjs/fingerprintjs";

export default function Home() {
  // State to store the fingerprint
  const [fingerprint, setFingerprint] = useState<string | null>(null);
  const [screenResolution, setScreenResolution] = useState<string | null>(null);
  const [timezone, setTimezone] = useState<string | null>(null);
  const [orientation, setOrientation] = useState<string | null>(null);
  const [aspectRatio, setAspectRatio] = useState<string | null>(null);

  useEffect(() => {
    const loadFingerprint = async () => {
      try {
        const fp = await FingerprintJS.load();
        const result = await fp.get();
        const typedResult = result as any;
        const width = typedResult.components.screenResolution.value[0];
        const height = typedResult.components.screenResolution.value[1];

        // Use window.matchMedia to check the orientation
        const isPortrait = window.matchMedia("(orientation: portrait)").matches;
        const orientation = isPortrait ? "Portrait" : "Landscape";

        const actualRatio = width / height;
        const commonRatios = [
          { name: "4/3", value: 4 / 3 },
          { name: "16/9", value: 16 / 9 },
          { name: "16/10", value: 16 / 10 },
          { name: "1/1", value: 1 },
          { name: "21/9", value: 21 / 9 },
          { name: "32/9", value: 32 / 9 },
          { name: "5/4", value: 5 / 4 },
          { name: "3/2", value: 3 / 2 },
          { name: "2/1", value: 2 },
        ];
        const closestRatio = commonRatios.reduce((prev, curr) =>
          Math.abs(curr.value - actualRatio) <
          Math.abs(prev.value - actualRatio)
            ? curr
            : prev
        );
        setScreenResolution(`${width}x${height}`);
        setFingerprint(typedResult.visitorId);
        setOrientation(orientation);
        setTimezone(typedResult.components.timezone.value);
        setAspectRatio(closestRatio.name);
      } catch (err) {
        console.log("Failed to load fingerprint or device information.");
      }
    };
    loadFingerprint();
  }, []);

  return (
    <main className={styles.main}>
      <img
        src="/fingerprint.png"
        alt="fingerprint"
        width="200px"
        height="auto"
      />
      {fingerprint ? (
        <div className={styles.fingerprintInfoContainer}>
          <div className={styles.fingerprintInfoChild}>
            <p>Your device fingerprint is:</p>
            <p>
              <strong>{fingerprint}</strong>
            </p>
          </div>
          <div className={styles.fingerprintInfoChild}>
            <p>Screen Resolution: </p>
            <p>
              <strong>{screenResolution}</strong>
            </p>
          </div>
          <div className={styles.fingerprintInfoChild}>
            <p>Screen orientation: </p>
            <p>
              <strong>{orientation}</strong>
            </p>
          </div>
          <div className={styles.fingerprintInfoChild}>
            <p>Timezone: </p>
            <p>
              <strong>
                {timezone} |{" "}
                {new Date().toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                })}
              </strong>
            </p>
          </div>
          <div className={styles.fingerprintInfoChild}>
            <p>Aspect Ratio: </p>
            <p>
              <strong>{aspectRatio}</strong>
            </p>
          </div>
        </div>
      ) : (
        <p className={styles.loadingFingerprint}>Loading fingerprint...</p>
      )}
    </main>
  );
}
