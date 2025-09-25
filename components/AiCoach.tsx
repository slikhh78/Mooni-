
import React, { useState, useEffect } from 'react';
import { SleepData } from '../types';
import { getSleepCoachingTip } from '../services/geminiService';
import { BrainCircuit, Loader } from 'lucide-react';
import Card from './shared/Card';

interface AiCoachProps {
  sleepData: SleepData | null;
}

const AiCoach: React.FC<AiCoachProps> = ({ sleepData }) => {
  const [tip, setTip] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (sleepData) {
      setIsLoading(true);
      setTip(null);
      getSleepCoachingTip(sleepData).then(generatedTip => {
        setTip(generatedTip);
        setIsLoading(false);
      });
    }
  }, [sleepData]);

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white">AI Sleep Coach</h1>
        <p className="text-lavender-mist mt-2">Personalized insights to improve your rest.</p>
      </div>

      <Card className="p-6">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <div className="p-3 bg-celestial-blue/30 rounded-full">
              <BrainCircuit size={28} className="text-lunar-gold" />
            </div>
          </div>
          <div className="flex-grow">
            <h3 className="text-xl font-bold text-white mb-2">Mooni's Memo</h3>
            {isLoading && (
              <div className="flex items-center space-x-2 text-lavender-mist">
                <Loader className="animate-spin" />
                <span>Analyzing your sleep patterns...</span>
              </div>
            )}
            {!isLoading && !sleepData && (
              <p className="text-lavender-mist">
                Complete a sleep session to receive personalized advice from your AI coach. Sweet dreams await!
              </p>
            )}
            {!isLoading && tip && (
              <p className="text-lavender-mist text-lg leading-relaxed">{tip}</p>
            )}
          </div>
        </div>
      </Card>
       <div className="text-center mt-6 text-sm text-celestial-blue">
         <p>Remember, Mooni is an AI assistant and not a medical professional.</p>
         <p>Always consult a doctor for health concerns.</p>
       </div>
    </div>
  );
};

export default AiCoach;
