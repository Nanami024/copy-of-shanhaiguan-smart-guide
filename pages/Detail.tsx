import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { appData } from '../data';
import { ChevronLeftIcon, PlayIcon, PauseIcon, PencilIcon } from '../components/Icon';

interface Comment {
  id: number;
  text: string;
  date: string;
}

const Detail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const spot = appData.spots.find(s => s.id === Number(id));
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [showToast, setShowToast] = useState(false);

  // Guestbook State
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");

  // Load Data & Audio
  useEffect(() => {
    if (spot) {
      // Auto Check-in logic
      const storedStamps = localStorage.getItem('my_stamps');
      const stamps: number[] = storedStamps ? JSON.parse(storedStamps) : [];
      if (!stamps.includes(spot.id)) {
        const newStamps = [...stamps, spot.id];
        localStorage.setItem('my_stamps', JSON.stringify(newStamps));
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
      }

      // Load Comments
      const storedComments = localStorage.getItem(`comments_${spot.id}`);
      if (storedComments) {
        setComments(JSON.parse(storedComments));
      } else {
        // Explicitly clear comments if storage is empty (important for reset scenarios)
        setComments([]);
      }
    }
  }, [spot]);

  const toggleAudio = () => {
    if (!audioRef.current) {
      if (spot?.audio) {
        audioRef.current = new Audio(spot.audio);
        audioRef.current.onended = () => setIsPlaying(false);
      } else {
        alert("暂无语音讲解");
        return;
      }
    }
    isPlaying ? audioRef.current.pause() : audioRef.current.play();
    setIsPlaying(!isPlaying);
  };
  
  useEffect(() => {
    return () => {
      if (audioRef.current) audioRef.current.pause();
    };
  }, []);

  const handlePostComment = () => {
    if (!newComment.trim()) return;
    
    const commentObj: Comment = {
      id: Date.now(),
      text: newComment.trim(),
      date: new Date().toLocaleDateString()
    };
    
    const updatedComments = [commentObj, ...comments];
    setComments(updatedComments);
    setNewComment("");
    
    if (spot) {
      localStorage.setItem(`comments_${spot.id}`, JSON.stringify(updatedComments));
    }
  };

  if (!spot) return <div className="p-10 text-center">景点不存在</div>;

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header Image */}
      <div className="relative h-64 w-full">
        <img src={spot.image} alt={spot.name} className="w-full h-full object-cover" />
        <button 
          onClick={() => navigate(-1)} 
          className="absolute top-4 left-4 bg-black/40 text-white p-2 rounded-full backdrop-blur-sm hover:bg-black/60 transition-colors z-20"
        >
          <ChevronLeftIcon className="w-6 h-6" />
        </button>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <h1 className="text-3xl text-white font-ancient font-bold">{spot.name}</h1>
        </div>
      </div>

      <div className="p-6 space-y-8">
        {/* Intro Section */}
        <section>
          {/* Audio Player Bar */}
          <div className="flex items-center justify-between bg-white border border-gray-100 p-4 rounded-xl mb-6 shadow-sm">
            <div className="text-sm text-gray-600 font-medium">语音讲解</div>
            <button 
              onClick={toggleAudio}
              className="flex items-center gap-2 bg-cinnabar text-white px-4 py-2 rounded-lg shadow hover:bg-cinnabar-light transition-colors"
            >
              {isPlaying ? <PauseIcon className="w-5 h-5" /> : <PlayIcon className="w-5 h-5" />}
              <span className="text-sm font-bold">{isPlaying ? "暂停" : "播放"}</span>
            </button>
          </div>

          <h2 className="text-lg font-bold text-gray-900 mb-2 border-l-4 border-cinnabar pl-3">简介</h2>
          <p className="text-gray-600 mb-6 leading-relaxed">{spot.desc}</p>
          
          <h2 className="text-lg font-bold text-gray-900 mb-2 border-l-4 border-cinnabar pl-3">历史故事</h2>
          <p className="text-gray-700 leading-relaxed text-justify font-serif">
            {spot.content}
          </p>
        </section>

        {/* Guestbook Section */}
        <section className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
           <div className="flex items-center gap-2 mb-4">
              <PencilIcon className="w-5 h-5 text-cinnabar" />
              <h2 className="text-lg font-bold text-gray-900">印象留言</h2>
           </div>

           {/* Input */}
           <div className="mb-6">
             <textarea 
               value={newComment}
               onChange={(e) => setNewComment(e.target.value)}
               placeholder="写下你对这里的印象..."
               className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cinnabar/20 focus:border-cinnabar transition-all"
               rows={3}
             />
             <div className="flex justify-end mt-2">
               <button 
                 onClick={handlePostComment}
                 disabled={!newComment.trim()}
                 className="bg-cinnabar text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-md disabled:opacity-50 disabled:shadow-none"
               >
                 发布留言
               </button>
             </div>
           </div>

           {/* List */}
           <div className="space-y-4">
             {comments.length === 0 ? (
               <p className="text-center text-gray-400 text-sm py-4">暂无留言，快来抢沙发吧~</p>
             ) : (
               comments.map(c => (
                 <div key={c.id} className="border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                    <p className="text-gray-800 text-sm mb-1">{c.text}</p>
                    <p className="text-xs text-gray-400">{c.date}</p>
                 </div>
               ))
             )}
           </div>
        </section>
      </div>

      {/* Footer Button: Fortune */}
      <div className="fixed bottom-6 right-6 z-30">
        <button 
          onClick={() => navigate('/fortune')}
          className="bg-cinnabar text-white px-6 py-3 rounded-full shadow-2xl font-ancient font-bold text-lg flex items-center gap-2 animate-pulse hover:animate-none hover:scale-105 transition-transform"
        >
          <span>🏯 求签祈福</span>
        </button>
      </div>

      {/* Custom Toast Notification */}
      {showToast && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/80 text-white px-6 py-4 rounded-xl flex flex-col items-center gap-2 shadow-2xl z-50 animate-bounce">
          <div className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-yellow-400 font-bold text-xl">✓</div>
          <span className="font-bold text-sm">打卡成功！</span>
          <span className="text-xs text-gray-300">已点亮【{spot.name}】印章</span>
        </div>
      )}
    </div>
  );
};

export default Detail;