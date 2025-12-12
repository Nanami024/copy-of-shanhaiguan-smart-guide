import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { appData } from '../data';
import { ChevronLeftIcon } from '../components/Icon';

const Passport: React.FC = () => {
  const navigate = useNavigate();
  const [collectedIds, setCollectedIds] = useState<number[]>([]);
  const [showCompletion, setShowCompletion] = useState(false);
  
  // 控制重置确认弹窗
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  // 控制重置成功提示
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  useEffect(() => {
    const storedStamps = localStorage.getItem('my_stamps');
    if (storedStamps) {
      const ids = JSON.parse(storedStamps);
      setCollectedIds(ids);
      
      // Check for completion
      if (ids.length === appData.spots.length) {
        setTimeout(() => setShowCompletion(true), 500);
      }
    }
  }, []);

  // 1. 点击按钮，显示确认弹窗
  const handleResetClick = () => {
    setShowResetConfirm(true);
  };

  // 2. 执行重置（纯 React 状态更新，不刷新页面）
  const performReset = () => {
    // A. 清除物理缓存
    localStorage.removeItem('my_stamps');
    
    // B. 更新 React 状态 -> 界面立即变灰
    setCollectedIds([]);
    setShowCompletion(false);
    
    // C. 关闭确认窗，显示成功提示
    setShowResetConfirm(false);
    setShowSuccessToast(true);
    
    // D. 2秒后自动隐藏成功提示
    setTimeout(() => {
      setShowSuccessToast(false);
    }, 2000);
  };

  const progress = `${collectedIds.length}/${appData.spots.length}`;
  const percentage = (collectedIds.length / appData.spots.length) * 100;

  return (
    <div className="min-h-screen bg-paper relative flex flex-col">
      {/* Header (z-20 to stay on top) */}
      <div className="bg-cinnabar p-4 pt-8 text-white flex items-center shadow-lg relative z-20">
        <button onClick={() => navigate('/')} className="mr-4 active:scale-95 transition-transform">
          <ChevronLeftIcon className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-ancient font-bold tracking-widest">通关文牒</h1>
      </div>

      {/* Paper Texture Overlay (Background) */}
      <div className="absolute inset-0 opacity-10 pointer-events-none z-0" 
           style={{ backgroundImage: 'radial-gradient(#888 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
      </div>

      {/* Content (z-10 ensures it is ABOVE the background layer) */}
      <div className="flex-1 p-6 flex flex-col items-center relative z-10">
        
        {/* Progress Card */}
        <div className="w-full bg-white/60 border-2 border-stone-300 p-6 rounded-lg mb-8 shadow-sm">
           <div className="flex justify-between items-end mb-2">
             <span className="text-stone-600 font-bold font-ancient">当前进度</span>
             <span className="text-3xl text-cinnabar font-bold font-ancient">{progress} <span className="text-sm text-stone-500">关</span></span>
           </div>
           <div className="w-full bg-stone-200 h-3 rounded-full overflow-hidden">
             <div 
                className="bg-cinnabar h-full transition-all duration-1000 ease-out"
                style={{ width: `${percentage}%` }}
             ></div>
           </div>
        </div>

        {/* Stamps Grid */}
        <div className="grid grid-cols-2 gap-6 w-full pb-20">
          {appData.spots.map(spot => {
            const isCollected = collectedIds.includes(spot.id);
            
            return (
              <div key={spot.id} className="flex flex-col items-center">
                <div 
                  className={`w-32 h-32 rounded-full border-4 flex items-center justify-center relative transition-all duration-500
                    ${isCollected 
                      ? 'border-cinnabar bg-white shadow-xl rotate-0 scale-100' 
                      : 'border-stone-300 bg-stone-100 grayscale opacity-60 scale-95'
                    }`}
                >
                  <div className={`absolute inset-2 border-2 border-dashed rounded-full ${isCollected ? 'border-cinnabar/30' : 'border-stone-300'}`}></div>
                  
                  <div className="flex flex-col items-center text-center p-2">
                     <span className={`text-3xl font-ancient font-bold leading-none ${isCollected ? 'text-cinnabar' : 'text-stone-400'}`}>
                       {isCollected ? '通关' : '未到'}
                     </span>
                     <span className={`text-xs mt-1 font-bold ${isCollected ? 'text-cinnabar-light' : 'text-stone-400'}`}>
                       {spot.name}
                     </span>
                     {isCollected && (
                        <span className="text-[10px] text-cinnabar/60 mt-1 scale-75 border border-cinnabar px-1 rounded transform -rotate-6">
                          已核销
                        </span>
                     )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Footer Decoration & Reset Button */}
        <div className="mt-auto pt-4 pb-6 flex flex-col items-center gap-6 relative z-30">
           <div className="text-center font-ancient text-stone-500 text-sm opacity-50">
             —— 山海关智慧导览 ——
           </div>
           
           <button 
             onClick={handleResetClick}
             className="px-6 py-3 bg-stone-200 text-stone-600 rounded-full text-xs font-bold hover:bg-red-100 hover:text-red-600 border border-transparent hover:border-red-200 transition-all shadow-sm active:scale-95 cursor-pointer select-none"
           >
             🗑️ 重置打卡进度
           </button>
        </div>
      </div>

      {/* ==================== 1. 自定义重置确认弹窗 ==================== */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-paper border-4 border-double border-stone-400 p-6 rounded-lg shadow-2xl w-full max-w-xs text-center animate-bounce-in relative">
             <div className="mb-4 text-4xl">⚠️</div>
             <h3 className="text-xl font-ancient font-bold text-stone-800 mb-2">重置确认</h3>
             <p className="text-stone-600 text-sm mb-6 leading-relaxed">
               您确定要销毁当前的【通关文牒】吗？<br/>
               <span className="text-cinnabar font-bold">所有已盖印章将消失。</span>
             </p>
             
             <div className="flex justify-between gap-4">
               <button 
                 onClick={() => setShowResetConfirm(false)}
                 className="flex-1 py-2 bg-stone-200 text-stone-600 rounded font-bold hover:bg-stone-300 transition-colors"
               >
                 取消
               </button>
               <button 
                 onClick={performReset}
                 className="flex-1 py-2 bg-cinnabar text-white rounded font-bold hover:bg-red-800 shadow-lg transition-colors"
               >
                 确认销毁
               </button>
             </div>
          </div>
        </div>
      )}

      {/* ==================== 2. 重置成功提示 (Toast) ==================== */}
      {showSuccessToast && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/80 text-white px-6 py-4 rounded-xl flex flex-col items-center gap-2 shadow-2xl z-[70] animate-bounce-in">
           <div className="text-3xl">🗑️</div>
           <span className="font-bold">已清空记录</span>
        </div>
      )}

      {/* ==================== 3. 通关成功弹窗 (Existing) ==================== */}
      {showCompletion && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-6 animate-fade-in">
          <div className="bg-paper p-1 rounded-xl shadow-2xl max-w-sm w-full animate-bounce-in">
             <div className="border-4 border-cinnabar border-double rounded-lg p-6 flex flex-col items-center text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-cinnabar rounded-tl-xl opacity-50"></div>
                <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-cinnabar rounded-tr-xl opacity-50"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-cinnabar rounded-bl-xl opacity-50"></div>
                <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-cinnabar rounded-br-xl opacity-50"></div>

                <div className="mb-4 text-5xl">🎉</div>
                <h2 className="text-2xl font-ancient font-bold text-cinnabar mb-4 tracking-widest">
                  {appData.meta.completionTitle}
                </h2>
                <div className="w-16 h-1 bg-cinnabar mb-4 rounded-full"></div>
                
                <p className="text-stone-700 font-serif font-bold text-lg leading-loose mb-8 whitespace-pre-wrap">
                  {appData.meta.completionDesc}
                </p>

                <button 
                  onClick={() => setShowCompletion(false)}
                  className="bg-cinnabar text-white px-8 py-2 rounded-full font-bold shadow-lg hover:bg-cinnabar-light transition-colors z-10"
                >
                  收入囊中
                </button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Passport;