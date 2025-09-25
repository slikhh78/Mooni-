
import React, { useState, useEffect } from 'react';
import { SleepData } from '../types';
import { useMoonPhase } from '../hooks/useMoonPhase';
import { getMoonPhaseTip } from '../services/geminiService';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts';
import { CheckSquare, Square, Droplet, Book, Wind } from 'lucide-react';
import Card from './shared/Card';

interface DashboardProps {
  sleepData: SleepData | null;
}

const MoonPhaseCard: React.FC = () => {
  const moonPhase = useMoonPhase();
  const [tip, setTip] = useState("Embrace the quiet of the cosmos...");

  useEffect(() => {
    if (moonPhase.name !== 'Loading...') {
      getMoonPhaseTip(moonPhase.name).then(setTip);
    }
  }, [moonPhase.name]);

  return (
    <Card className="p-6 flex items-center space-x-4">
      <div className="text-6xl">{moonPhase.emoji}</div>
      <div>
        <h3 className="text-xl font-bold text-white">{moonPhase.name}</h3>
        <p className="text-lavender-mist italic text-sm mt-1">{tip}</p>
      </div>
    </Card>
  );
};

const SleepSummaryCard: React.FC<{ sleepData: SleepData | null }> = ({ sleepData }) => {
    const stageColors: { [key: string]: string } = {
        DEEP: '#7A79B8',
        LIGHT: '#D8D4F2',
        REM: '#a78bfa',
        AWAKE: '#fca5a5',
    };
    
    if (!sleepData) {
        return (
            <Card className="p-6 flex flex-col items-center justify-center h-64">
                <h3 className="text-xl font-bold text-white">No Sleep Data</h3>
                <p className="text-lavender-mist text-center mt-2">Complete a sleep session to see your results here.</p>
            </Card>
        );
    }
    
    const chartData = sleepData.stages.map(s => ({ name: s.stage.substring(0,1), value: s.duration }));

    return (
        <Card className="p-6">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-xl font-bold text-white">Last Night's Sleep</h3>
                    <p className="text-lavender-mist">{Math.floor(sleepData.totalSleepTime / 60)}h {sleepData.totalSleepTime % 60}m</p>
                </div>
                <div className="text-center">
                    <p className="text-sm text-lavender-mist">Score</p>
                    <p className="text-4xl font-bold text-lunar-gold">{sleepData.sleepScore}</p>
                </div>
            </div>
             <div className="h-32 mt-4">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                        <XAxis type="number" hide />
                        <YAxis type="category" dataKey="name" tickLine={false} axisLine={false} tick={{ fill: '#D8D4F2' }} />
                        <Bar dataKey="value" stackId="a" radius={[10, 10, 10, 10]}>
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={stageColors[sleepData.stages[index].stage]} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </Card>
    );
};


const BedtimeRoutineCard: React.FC = () => {
    const initialRoutines = [
        { id: 1, text: 'Hydrate', icon: <Droplet size={20}/>, done: true },
        { id: 2, text: 'Journal', icon: <Book size={20}/>, done: false },
        { id: 3, text: 'Breathing', icon: <Wind size={20}/>, done: false },
        { id: 4, text: 'Turn off screens', icon: <div className="w-5 h-5 bg-deep-purple border-2 border-current rounded-sm"></div>, done: true },
    ];
    const [routines, setRoutines] = useState(initialRoutines);

    const toggleRoutine = (id: number) => {
        setRoutines(routines.map(r => r.id === id ? { ...r, done: !r.done } : r));
    };

    return (
        <Card className="p-6">
            <h3 className="text-xl font-bold text-white mb-4">Bedtime Routine</h3>
            <div className="space-y-3">
                {routines.map(routine => (
                    <div key={routine.id} className="flex items-center cursor-pointer" onClick={() => toggleRoutine(routine.id)}>
                        {routine.done ? <CheckSquare size={24} className="text-lunar-gold"/> : <Square size={24} className="text-celestial-blue"/>}
                        <span className={`ml-3 ${routine.done ? 'line-through text-celestial-blue' : 'text-lavender-mist'}`}>{routine.text}</span>
                         <div className="ml-auto text-lavender-mist">{routine.icon}</div>
                    </div>
                ))}
            </div>
        </Card>
    );
};


const Dashboard: React.FC<DashboardProps> = ({ sleepData }) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-4xl font-bold text-white">Good Evening</h1>
        <p className="text-lavender-mist">Ready for a peaceful night's rest?</p>
      </div>
      <MoonPhaseCard />
      <SleepSummaryCard sleepData={sleepData} />
      <BedtimeRoutineCard />
    </div>
  );
};

export default Dashboard;
