import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { appData } from '../data';
import { BookIcon, MapPinIcon, InfoIcon } from '../components/Icon';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [showHint, setShowHint] = useState(true);
  const [showQR, setShowQR] = useState(false);
  const [installPrompt, setInstallPrompt] = useState<any>(null);
  const [isLocalhost, setIsLocalhost] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  
  // Menu State: Default to CLOSED now
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // 1. Check if localhost
    const hostname = window.location.hostname;
    if (hostname === 'localhost' || hostname === '127.0.0.1' || hostname.startsWith('192.168.')) {
      setIsLocalhost(true);
    }

    // 2. Check if already installed (Standalone Mode)
    const isApp = window.matchMedia('(display-mode: standalone)').matches;
    if (isApp) {
      setIsStandalone(true);
      setIsMenuOpen(false); // Always closed in app mode initially
    } else {
      // 3. If NOT app mode, check if it's the first visit
      const hasSeenMenu = localStorage.getItem('has_seen_home_menu');
      if (!hasSeenMenu) {
        // First time ever! Open the menu.
        setIsMenuOpen(true);
        // Mark as seen for next time
        localStorage.setItem('has_seen_home_menu', 'true');
      }
    }

    // 4. Listen for PWA install event
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setInstallPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!installPrompt) return;
    installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;
    if (outcome === 'accepted') {
      setInstallPrompt(null);
    }
  };

  // Generate QR Code URL
  const currentUrl = 'https://nanami024.github.io/copy-of-shanhaiguan-smart-guide/';
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&bgcolor=fef3c7&color=991b1b&data=${encodeURIComponent(currentUrl)}`;

  return (
    <div className="relative w-full h-screen bg-wall-gray flex flex-col select-none">
      {/* 1. Map Container */}
      <div className="flex-1 relative overflow-hidden bg-emerald-100">
        <img 
          src={`${import.meta.env.BASE_URL}image/picture5.jpg`} 
          alt="Shanhaiguan Map" 
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-wall-gray/30 pointer-events-none" />

        {/* 2. Spots */}
        {appData.spots.map(spot => (
          <button
            key={spot.id}
            onClick={() => navigate(`/detail/${spot.id}`)}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 group z-20"
            style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
          >
            <div className="flex flex-col items-center">
              <div className="bg-cinnabar text-white p-2 rounded-full shadow-lg animate-bounce border-2 border-white">
                <MapPinIcon className="w-6 h-6" />
              </div>
              <span className="mt-1 px-2 py-0.5 bg-white/90 text-cinnabar text-xs font-bold rounded shadow-md whitespace-nowrap font-ancient">
                {spot.name}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* 3. Bottom Bar Buttons */}
      <div className="absolute bottom-6 left-4 right-4 z-30 flex justify-between items-end">
        <button 
          onClick={() => navigate('/overview')}
          className="p-3 rounded-full shadow-xl bg-blue-600 text-white transform hover:scale-110 transition-transform"
        >
          <div className="flex items-center gap-1 font-bold px-2">
            <InfoIcon className="w-5 h-5" />
            <span className="text-xs">景区总览</span>
          </div>
        </button>

        <button 
          onClick={() => navigate('/passport')}
          className="flex flex-col items-center gap-1"
        >
          <div className="bg-cinnabar text-white p-4 rounded-full shadow-2xl border-4 border-yellow-100 transform hover:scale-105 transition-transform">
             <BookIcon className="w-8 h-8" />
          </div>
          <span className="text-cinnabar font-ancient font-bold bg-white/80 px-2 rounded text-sm shadow-sm">通关文牒</span>
        </button>
      </div>
      
      {/* 4. Top Right Menu */}
      <div className="absolute top-6 right-4 z-40 flex flex-col items-end pointer-events-none">
        {isMenuOpen ? (
          // EXPANDED STATE
          <div className="pointer-events-auto bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-xl border border-stone-200 flex flex-col gap-3 animate-fade-in w-64 max-w-[80vw]">
             {/* Header */}
             <div className="flex justify-between items-center border-b border-stone-200 pb-2 mb-1">
                <h1 className="text-lg font-ancient font-extrabold text-cinnabar tracking-widest">
                  山海关导览
                </h1>
                <button 
                  onClick={() => setIsMenuOpen(false)} 
                  className="text-stone-400 hover:text-stone-600 p-1 -mr-2"
                >
                  <span className="text-xs font-sans border border-stone-300 rounded px-1">收起</span>
                </button>
             </div>

             {/* Hint - Only show if hint hasn't been dismissed */}
             {showHint && (
                <div className="bg-amber-50 text-amber-800 text-xs p-2 rounded border border-amber-100 relative">
                  {appData.meta.homeHint}
                  <button onClick={() => setShowHint(false)} className="absolute top-1 right-2 text-amber-400 font-bold">×</button>
                </div>
             )}
             
             {/* Action Buttons */}
             {/* If already installed (standalone), we hide the install buttons to keep it clean */}
             {!isStandalone && (
               <div className="flex flex-col gap-2">
                 {installPrompt && (
                   <button 
                     onClick={handleInstallClick}
                     className="bg-cinnabar text-white text-xs font-bold py-2 rounded-lg shadow-sm flex items-center justify-center gap-2 hover:bg-cinnabar-light"
                   >
                     <span>⬇️</span> 安装 APP
                   </button>
                 )}

                 <button 
                   onClick={() => setShowQR(true)}
                   className="bg-stone-100 text-stone-700 text-xs font-bold py-2 rounded-lg border border-stone-200 flex items-center justify-center gap-2 hover:bg-stone-200"
                 >
                   <span>📱</span> 手机体验 / 分享
                 </button>
               </div>
             )}
             
             {isStandalone && (
               <div className="text-center text-xs text-stone-400 py-1">
                 已安装最新版本
               </div>
             )}
          </div>
        ) : (
          // COLLAPSED STATE
          <button 
            onClick={() => setIsMenuOpen(true)}
            className="pointer-events-auto bg-white/90 backdrop-blur text-cinnabar font-ancient font-bold px-4 py-2 rounded-full shadow-lg border border-cinnabar/20 flex items-center gap-2 transform hover:scale-105 transition-transform"
          >
            <span>🏰 导览菜单</span>
          </button>
        )}
      </div>

      {/* QR Code Modal */}
      {showQR && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm p-6 animate-fade-in" onClick={() => setShowQR(false)}>
          <div className="bg-paper p-6 rounded-xl shadow-2xl max-w-sm w-full flex flex-col items-center text-center animate-bounce-in" onClick={e => e.stopPropagation()}>
             <h3 className="text-xl font-ancient font-bold text-cinnabar mb-2">扫码带走长城</h3>
             
             {isLocalhost ? (
                <div className="bg-orange-100 text-orange-800 p-3 rounded-lg text-xs text-left mb-4 border border-orange-200">
                  <p className="font-bold mb-1">⚠️ 链接不可用</p>
                  <p>检测到您正在使用 <code>localhost</code> (本地环境)。</p>
                  <p className="mt-1">手机无法通过此二维码访问您的电脑。请先将项目 <strong>部署 (Deploy)</strong> 到 Vercel 或 Netlify 获得公开链接。</p>
                </div>
             ) : (
                <p className="text-xs text-stone-500 mb-4">微信 / 浏览器 扫一扫即可在手机使用</p>
             )}
             
             <div className={`bg-white p-2 rounded-lg shadow-inner mb-4 ${isLocalhost ? 'opacity-20 grayscale' : ''}`}>
               <img src={qrCodeUrl} alt="Scan to open on mobile" className="w-48 h-48" />
             </div>
             
             <div className="text-left text-xs text-stone-600 bg-stone-100 p-3 rounded space-y-1 mb-6 w-full">
                {installPrompt ? (
                   <p className="text-cinnabar font-bold">✨ 检测到可用环境，直接点击菜单中的“⬇️ 安装APP”即可！</p>
                ) : (
                  <>
                    <p><strong>推荐:</strong> 扫码后使用系统浏览器打开</p>
                    <p><strong>iOS:</strong> 点击分享 <span className="text-xl leading-none">⎋</span> &gt; 添加到主屏幕</p>
                    <p><strong>Android:</strong> 点击菜单 &gt; 安装应用</p>
                  </>
                )}
             </div>

             <button 
               onClick={() => setShowQR(false)}
               className="bg-stone-800 text-white px-8 py-2 rounded-full font-bold shadow-lg"
             >
               关闭
             </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;