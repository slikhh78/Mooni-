
import { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react'; // Example icons

// Simplified moon phase calculation
const getMoonPhase = (date: Date): { name: string, emoji: string } => {
    const LUNAR_CYCLE = 29.530588853;
    const getJulianDate = (d: Date) => (d.getTime() / 86400000) + 2440587.5;

    // A known new moon date (e.g., Jan 20, 2023)
    const KNOWN_NEW_MOON = new Date('2023-01-21T20:53:00Z');
    const julianDate = getJulianDate(date);
    const knownNewMoonJulian = getJulianDate(KNOWN_NEW_MOON);
    
    const daysSinceNewMoon = julianDate - knownNewMoonJulian;
    const phase = (daysSinceNewMoon % LUNAR_CYCLE) / LUNAR_CYCLE;

    if (phase < 0.03 || phase > 0.97) return { name: "New Moon", emoji: "🌑" };
    if (phase < 0.23) return { name: "Mooni", emoji: "🌒" };
    if (phase < 0.27) return { name: "First Quarter", emoji: "🌓" };
    if (phase < 0.48) return { name: "Waxing Gibbous", emoji: "🌔" };
    if (phase < 0.52) return { name: "Full Moon", emoji: "🌕" };
    if (phase < 0.73) return { name: "Waning Gibbous", emoji: "🌖" };
    if (phase < 0.77) return { name: "Last Quarter", emoji: "🌗" };
    return { name: "Waning Crescent", emoji: "🌘" };
};


export const useMoonPhase = () => {
    const [moonPhase, setMoonPhase] = useState({ name: 'Loading...', emoji: '🌙' });

    useEffect(() => {
        setMoonPhase(getMoonPhase(new Date()));
    }, []);

    return moonPhase;
};