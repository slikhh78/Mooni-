
import React, { useState, useEffect } from 'react';
import { SleepData, SleepStage, SleepStageData } from '../types';
import { Zap, Moon, Sun } from 'lucide-react';
import Card from './shared/Card';

interface SleepTrackerProps {
  onSessionComplete: (data: SleepData) => void;
}

const generateSleepData = (): SleepData => {
    const totalSleepTime = 420 + Math.floor(Math.random() * 120); // 7-9 hours
    let remainingTime = totalSleepTime;
    const stages: SleepStageData[] = [];
    let awakenings = 0;

    // Proportions for a typical night
    const proportions = {
        [SleepStage.Deep]: 0.20,
        [SleepStage.Light]: 0.55,
        [SleepStage.REM]: 0.25,
    };

    while (remainingTime > 0) {
        const stageType = Math.random();
        let stage: SleepStage;
        if (stageType < proportions[SleepStage.Deep]) stage = SleepStage.Deep;
        else if (stageType < proportions[SleepStage.Deep] + proportions[SleepStage.REM]) stage = SleepStage.REM;
        else stage = SleepStage.Light;

        let duration = Math.min(remainingTime, 30 + Math.floor(Math.random() * 60));
        
        // Simulate awakenings
        if (Math.random() > 0.95 && remainingTime > duration) {
            const awakeTime = 2 + Math.floor(Math.random() * 5);
            if(remainingTime - duration - awakeTime > 0) {
                stages.push({ stage: SleepStage.Awake, duration: awakeTime });
                remainingTime -= awakeTime;
                awakenings++;
            }
        }

        stages.push({ stage, duration });
        remainingTime -= duration;
    }

    const deepSleepRatio = stages.filter(s => s.stage === SleepStage.Deep).reduce((acc, s) => acc + s.duration, 0) / totalSleepTime;
    const remSleepRatio = stages.filter(s => s.stage === SleepStage.REM).reduce((acc, s) => acc + s.duration, 0) / totalSleepTime;
    
    // Calculate score (simple algorithm)
    let sleepScore = 0;
    sleepScore += (totalSleepTime / 480) * 50; // 50 points for 8 hours
    sleepScore += (deepSleepRatio / 0.2) * 25; // 25 points for 20% deep sleep
    sleepScore += (remSleepRatio / 0.25) * 25; // 25 points for 25% rem sleep
    sleepScore -= awakenings * 5; // Penalty for awakenings
    sleepScore = Math.max(0, Math.min(100, Math.round(sleepScore)));
    
    return { totalSleepTime, stages, sleepScore, awakenings };
}

const SleepTracker: React.FC<SleepTrackerProps> = ({ onSessionComplete }) => {
  const [isSleeping, setIsSleeping] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isSleeping) {
      const sleepDuration = 5000; // 5 seconds simulation
      const interval = 50;
      const steps = sleepDuration / interval;
      let currentStep = 0;

      timer = setInterval(() => {
        currentStep++;
        setProgress((currentStep / steps) * 100);
        if (currentStep >= steps) {
          clearInterval(timer);
          const data = generateSleepData();
          onSessionComplete(data);
          setIsSleeping(false);
        }
      }, interval);
    }
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSleeping]);


  if (isSleeping) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center animate-fade-in">
        <Moon size={64} className="text-lunar-gold animate-pulse" />
        <h1 className="text-4xl font-bold text-white mt-4">Dreaming...</h1>
        <p className="text-lavender-mist mt-2">Simulating your night's rest.</p>
        <div className="w-full max-w-sm bg-space-cadet rounded-full h-2.5 mt-8">
            <div className="bg-lunar-gold h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-full text-center animate-fade-in">
      <Sun size={64} className="text-lunar-gold" />
      <h1 className="text-4xl font-bold text-white mt-4">Ready for Bed?</h1>
      <p className="text-lavender-mist mt-2 max-w-md mx-auto">
        When you're ready to sleep, press the button below. We'll simulate your sleep session and provide you with a detailed analysis and AI coaching in the morning.
      </p>
      <button 
        onClick={() => setIsSleeping(true)}
        className="mt-8 flex items-center justify-center px-8 py-4 bg-celestial-blue text-white font-bold rounded-full text-lg shadow-lg hover:bg-indigo-500 transition-transform transform hover:scale-105"
      >
        <Zap className="mr-2" />
        Start Sleep Session
      </button>
    </div>
  );
};

export default SleepTracker;
