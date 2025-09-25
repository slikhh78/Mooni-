import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Volume2, VolumeX, Play, Pause, Waves, Wind, CloudRain, Flame, Trees } from 'lucide-react';
import Card from './shared/Card';
import { Sound } from '../types';

const SOUNDS: Sound[] = [
  { id: 'ocean', name: 'Ocean Waves', icon: Waves, src: 'https://cdn.pixabay.com/audio/2022/02/04/audio_d132b2600b.mp3' },
  { id: 'rain', name: 'Gentle Rain', icon: CloudRain, src: 'https://cdn.pixabay.com/audio/2022/03/24/audio_282a096c4d.mp3' },
  { id: 'forest', name: 'Forest Night', icon: Trees, src: 'https://cdn.pixabay.com/audio/2023/09/27/audio_82c61234c8.mp3' },
  { id: 'fireplace', name: 'Fireplace', icon: Flame, src: 'https://cdn.pixabay.com/audio/2022/09/16/audio_96c1672322.mp3' },
];

const SoundPlayer: React.FC<{ sound: Sound }> = ({ sound }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };
  
  useEffect(() => {
    const audio = audioRef.current;
    if(audio) {
        audio.loop = true;
    }
    return () => {
        audio?.pause();
    };
  }, []);

  return (
    <Card className="p-4 flex flex-col items-center justify-center space-y-3">
      {/* FIX: Replaced non-standard 'size' prop with 'width' and 'height' to match the SVGProps type definition. */}
      <sound.icon width={36} height={36} className="text-lavender-mist" />
      <h3 className="text-white font-semibold">{sound.name}</h3>
      <audio ref={audioRef} src={sound.src} preload="auto" />
      <button onClick={togglePlay} className="p-3 bg-celestial-blue/30 rounded-full text-white hover:bg-celestial-blue/50 transition-colors">
        {isPlaying ? <Pause size={20} /> : <Play size={20} />}
      </button>
      <div className="w-full flex items-center space-x-2 pt-2">
        <VolumeX size={16} />
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          className="w-full h-1 bg-celestial-blue/50 rounded-lg appearance-none cursor-pointer"
        />
        <Volume2 size={16} />
      </div>
    </Card>
  );
};


const SleepSounds: React.FC = () => {
  return (
    <div className="animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white">Sleep Sounds</h1>
        <p className="text-lavender-mist mt-2">Mix sounds to create your perfect sleep environment.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {SOUNDS.map(sound => (
          <SoundPlayer key={sound.id} sound={sound} />
        ))}
      </div>
    </div>
  );
};

export default SleepSounds;