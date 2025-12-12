import React from 'react';
import { useNavigate } from 'react-router-dom';
import { appData } from '../data';
import { ChevronLeftIcon } from '../components/Icon';

const Overview: React.FC = () => {
  const navigate = useNavigate();
  const { overviewTitle, overviewContent } = appData.meta;

  return (
    <div className="min-h-screen bg-paper flex flex-col relative">
      {/* Header */}
      <div className="bg-cinnabar p-4 pt-8 text-white flex items-center shadow-lg relative z-10">
        <button onClick={() => navigate(-1)} className="mr-4">
          <ChevronLeftIcon className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-ancient font-bold tracking-widest">景区总览</h1>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 relative overflow-y-auto">
        <div className="bg-white/60 p-6 rounded-lg shadow-sm border border-stone-200">
            <h2 className="text-2xl font-ancient font-bold text-cinnabar mb-4 text-center">{overviewTitle}</h2>
            
            <div className="w-full h-px bg-stone-300 mb-6"></div>
            
            <div className="text-stone-800 font-serif leading-loose text-justify whitespace-pre-wrap">
              {overviewContent}
            </div>
            
            {/* Decoration */}
            <div className="mt-8 flex justify-center opacity-50">
               <div className="w-16 h-16 border-4 border-cinnabar/20 rounded-full flex items-center justify-center">
                  <span className="text-cinnabar/40 font-ancient font-bold">山海</span>
               </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;