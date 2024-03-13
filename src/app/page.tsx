"use client";

import React, { useEffect, useState } from 'react';
import styles from './page.module.scss';
import * as FingerprintJS from '@fingerprintjs/fingerprintjs';

export default function Home() {
  // State to store the fingerprint
  const [fingerprint, setFingerprint] = useState<string | null>(null);
  
  const [screenResolution, setScreenResolution] = useState<string | null>(null);
  const [timezone, setTimezone] = useState<string | null>(null);
  const [orientation, setOrientation] = useState<string | null>(null);
  const [aspectRatio, setAspectRatio] = useState<string | null>(null);

  useEffect(() => {
    const loadFingerprint = async () => {
      const fp = await FingerprintJS.load();
      const result = await fp.get();
      const typedResult = result as any;
      console.log(typedResult);
      const width = typedResult.components.screenResolution.value[0];
      const height = typedResult.components.screenResolution.value[1];
      const orientation = width > height ? 'Landscape' : 'Portrait';
    
  // Calculate the actual aspect ratio
  const actualRatio = width / height;

  // List of common aspect ratios
  const commonRatios = [
    { name: '4/3', value: 4 / 3 },
    { name: '16/9', value: 16 / 9 },
    { name: '16/10', value: 16 / 10 },
    { name: '1/1', value: 1 }, // Square screens
    { name: '21/9', value: 21 / 9 }, // Ultrawide monitors
    { name: '32/9', value: 32 / 9 }, // Super ultrawide monitors
    { name: '5/4', value: 5 / 4 }, // Older monitors
    { name: '3/2', value: 3 / 2 }, // Some tablets, mobile devices, and laptops
    { name: '2/1', value: 2 }, // Some mobile devices
  ];

  // Find the common ratio that is closest to the actual ratio
  const closestRatio = commonRatios.reduce((prev, curr) =>
    Math.abs(curr.value - actualRatio) < Math.abs(prev.value - actualRatio) ? curr : prev
  );

      setScreenResolution(`${typedResult.components.screenResolution.value[0]}x${typedResult.components.screenResolution.value[1]}`);
      setFingerprint(typedResult.visitorId);
      setOrientation(orientation);
      setTimezone(typedResult.components.timezone.value);
      setAspectRatio(closestRatio.name);
    };
    loadFingerprint();
  }, []); 

  return (
    <main className={styles.main}>
      <img src="/fingerprint.png" alt="fingerprint" width="200px" height="auto" />
      {fingerprint ? (
        <div>
          <p>Your device fingerprint is: <strong>{fingerprint}</strong></p>
          <p>Screen Resolution: <strong>{screenResolution}</strong></p>
          <p>Screen orientation: <strong>{orientation}</strong></p>
          <p>Timezone: <strong>{timezone} | {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })}</strong></p>
          <p>Aspect Ratio: <strong>{aspectRatio}</strong></p>
        </div>
      ) : (
        <p>Loading fingerprint...</p>
      )}
    </main>
  );
};
