import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { appData } from '../data';
import { ChevronLeftIcon } from '../components/Icon';
import { Fortune as FortuneType } from '../types';

const Fortune: React.FC = () => {
  const navigate = useNavigate();
  const [result, setResult] = useState<FortuneType | null>(null);
  const [isShaking, setIsShaking] = useState(false);

  const drawFortune = () => {
    // Vibrate if supported (mimic wx.vibrateShort)
    if (navigator.vibrate) {
      navigator.vibrate(200);
    }

    setIsShaking(true);
    setResult(null);

    // Animation delay
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * appData.fortunes.length);
      setResult(appData.fortunes[randomIndex]);
      setIsShaking(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-stone-900 relative flex flex-col items-center overflow-hidden">
      {/* Background Effect (Low Z-index) */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-stone-900 to-cinnabar-light opacity-80 z-0"></div>

      {/* Header - Fixed Z-Index and Navigation to Home */}
      <div className="w-full p-4 pt-8 flex items-center z-40 relative">
        <button 
          onClick={() => navigate('/')} 
          className="text-white/80 hover:text-white p-2 -ml-2 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
        >
           <ChevronLeftIcon className="w-8 h-8" />
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center z-10 w-full px-6 relative">
        
        {/* Title */}
        <h1 className="text-3xl text-yellow-500 font-ancient font-bold mb-8 tracking-widest drop-shadow-lg">
          孟姜女庙祈福
        </h1>

        {/* The Cylinder Container */}
        <div className="relative mb-12">
           {/* Shaking Animation Container */}
           <div className={`transition-transform duration-100 ${isShaking ? 'animate-bounce' : ''}`}>
              {/* Cylinder Image Placeholder */}
              <div className="w-48 h-64 bg-gradient-to-r from-yellow-700 to-yellow-600 rounded-t-lg rounded-b-3xl border-4 border-yellow-800 shadow-2xl flex items-center justify-center relative overflow-hidden">
                <span className="text-6xl text-yellow-900/50 font-bold opacity-30">签</span>
                <div className="absolute top-0 w-full h-4 bg-yellow-900/40"></div>
                {/* Sticks */}
                <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-32 h-20 flex justify-center items-end gap-1">
                   <div className="w-2 h-16 bg-yellow-200 rounded-t"></div>
                   <div className="w-2 h-20 bg-yellow-200 rounded-t"></div>
                   <div className="w-2 h-14 bg-yellow-200 rounded-t"></div>
                </div>
              </div>
           </div>
        </div>

        {/* Result Card (Overlay) - Highest Z-Index */}
        {result && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-6 animate-fade-in">
             <div className="bg-paper text-stone-800 p-8 rounded-lg shadow-2xl max-w-sm w-full border-8 border-cinnabar relative text-center">
                {/* Close Button */}
                <button 
                  onClick={() => setResult(null)}
                  className="absolute top-2 right-2 text-stone-400 hover:text-cinnabar font-bold text-xl p-2 cursor-pointer"
                >
                  ×
                </button>
                
                <h2 className="text-2xl font-ancient font-bold text-cinnabar mb-4">祈福灵签</h2>
                <div className="w-full h-px bg-stone-300 mb-6"></div>
                
                <p className="text-xl font-serif leading-loose font-bold mb-6">
                  {result.text}
                </p>
                
                <div className="w-full h-px bg-stone-300 mt-6 mb-4"></div>
                <p className="text-xs text-stone-500">长按截屏保存，好运常伴</p>
             </div>
          </div>
        )}

        {/* Action Button */}
        <button
          onClick={drawFortune}
          disabled={isShaking}
          className="bg-gradient-to-r from-cinnabar to-red-600 text-yellow-100 px-10 py-4 rounded-full text-xl font-bold shadow-lg border-2 border-yellow-500/50 hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:scale-100 cursor-pointer"
        >
          {isShaking ? "摇签中..." : "点击抽签"}
        </button>

      </div>
    </div>
  );
};

export default Fortune;