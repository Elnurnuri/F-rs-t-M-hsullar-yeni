import React, { useState } from 'react';
import { 
  X, 
  Layers, 
  Sparkles, 
  Home, 
  Check, 
  Plus, 
  Bookmark, 
  BookmarkCheck, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Heart
} from 'lucide-react';
import type { Deal, ProductSaveState } from '../../types/deals.ts';
import { formatAZN } from '../../utils/formatters.ts';

interface SaveToModalProps {
  isOpen: boolean;
  onClose: () => void;
  deal: Deal | null;
  saveState: ProductSaveState;
  onToggleCollection: (dealId: string | number, collectionName: string) => void;
  onToggleAiMirror: (dealId: string | number) => void;
  onToggleAiDecor: (dealId: string | number) => void;
  allCollections: string[];
  onCreateCollection: (name: string) => void;
  onShowToast?: (message: string) => void;
}

export type SaveTab = 'collections' | 'mirror' | 'decor';

export const SaveToModal: React.FC<SaveToModalProps> = ({
  isOpen,
  onClose,
  deal,
  saveState,
  onToggleCollection,
  onToggleAiMirror,
  onToggleAiDecor,
  allCollections,
  onCreateCollection,
  onShowToast,
}) => {
  const [activeTab, setActiveTab] = useState<SaveTab>('collections');
  const [newCollectionName, setNewCollectionName] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  if (!isOpen || !deal) return null;

  const handleCreateCollection = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = newCollectionName.trim();
    if (!trimmed) return;
    onCreateCollection(trimmed);
    onToggleCollection(deal.id, trimmed);
    setNewCollectionName('');
    setIsCreating(false);
    onShowToast?.(`«${trimmed}» kolleksiyası yaradıldı və məhsul əlavə olundu`);
  };

  const handleCollectionClick = (name: string) => {
    const isCurrentlySaved = saveState.collections.includes(name);
    onToggleCollection(deal.id, name);
    onShowToast?.(
      isCurrentlySaved 
        ? `«${name}» kolleksiyasından çıxarıldı` 
        : `«${name}» kolleksiyasına qeyd edildi`
    );
  };

  const handleMirrorClick = () => {
    const nextState = !saveState.inAiMirror;
    onToggleAiMirror(deal.id);
    onShowToast?.(
      nextState 
        ? '«AI Mirror» virtual güzgüsünə əlavə olundu' 
        : '«AI Mirror» güzgüsündən silindi'
    );
  };

  const handleDecorClick = () => {
    const nextState = !saveState.inAiDecor;
    onToggleAiDecor(deal.id);
    onShowToast?.(
      nextState 
        ? '«AI Dekor» interyer planına qeyd edildi' 
        : '«AI Dekor» məkandan silindi'
    );
  };

  const totalSavedCount = 
    saveState.collections.length + 
    (saveState.inAiMirror ? 1 : 0) + 
    (saveState.inAiDecor ? 1 : 0);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/70 backdrop-blur-xs animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="save-modal-title"
    >
      <div 
        className="fixed inset-0" 
        onClick={onClose} 
      />
      
      <div className="relative w-full max-w-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl shadow-2xl z-10 overflow-hidden flex flex-col max-h-[92dvh]">
        
        {/* Header with product overview */}
        <div className="p-4 sm:p-5 border-b border-stone-100 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-900/60 flex items-start justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-14 h-14 rounded-2xl bg-white dark:bg-stone-800 border border-stone-200/80 dark:border-stone-700/80 p-1.5 shrink-0 flex items-center justify-center overflow-hidden">
              {deal.image ? (
                <img 
                  src={deal.image} 
                  alt={deal.name} 
                  className="w-full h-full object-contain" 
                />
              ) : (
                <Bookmark className="w-6 h-6 text-stone-400" />
              )}
            </div>
            <div className="min-w-0">
              <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 block truncate">
                {deal.seller}
              </span>
              <h3 id="save-modal-title" className="text-sm sm:text-base font-bold text-stone-900 dark:text-stone-100 truncate">
                {deal.name}
              </h3>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs sm:text-sm font-extrabold text-stone-900 dark:text-stone-100 tabular-nums">
                  {formatAZN(deal.price)}
                </span>
                {totalSavedCount > 0 && (
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300">
                    {totalSavedCount} məkanda saxlanılıb
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Quick 1-click Favorite Heart button inside popup */}
            <button
              type="button"
              onClick={() => handleCollectionClick('Sevimlilər')}
              className={`min-h-[38px] px-2.5 sm:px-3 py-1.5 rounded-xl border flex items-center gap-1.5 text-xs font-bold transition cursor-pointer shadow-2xs ${
                saveState.collections.includes('Sevimlilər')
                  ? 'bg-rose-50 text-rose-600 border-rose-300 dark:bg-rose-950/60 dark:border-rose-800 shadow-rose-500/10'
                  : 'bg-white hover:bg-stone-50 dark:bg-stone-800 dark:hover:bg-stone-750 text-stone-600 dark:text-stone-300 border-stone-200 dark:border-stone-700'
              }`}
              aria-label={saveState.collections.includes('Sevimlilər') ? 'Sevimlilərdən sil' : 'Sevimlilərə əlavə et'}
              title={saveState.collections.includes('Sevimlilər') ? 'Sevimlilərdən sil' : 'Sevimlilərə əlavə et'}
            >
              <Heart className={`w-4 h-4 ${saveState.collections.includes('Sevimlilər') ? 'fill-rose-500 text-rose-500' : 'text-stone-400'}`} />
              <span className="text-[11px] sm:text-xs">
                {saveState.collections.includes('Sevimlilər') ? 'Sevimlilərdə' : 'Sevimlilərə at'}
              </span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="min-h-[40px] min-w-[40px] flex items-center justify-center text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 rounded-full transition cursor-pointer"
              aria-label="Bağla"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 3 Nav Tabs: Kolleksiyalar, AI Mirror, AI Dekor */}
        <div className="flex items-center border-b border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 px-3 sm:px-4 shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('collections')}
            className={`flex-1 py-3 px-2 text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 border-b-2 transition-all cursor-pointer ${
              activeTab === 'collections'
                ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400'
                : 'border-transparent text-stone-500 hover:text-stone-800 dark:text-stone-400 dark:hover:text-stone-200'
            }`}
          >
            <Layers className="w-4 h-4 shrink-0" />
            <span>Kolleksiyalar</span>
            {saveState.collections.length > 0 && (
              <span className="w-4 h-4 rounded-full bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center">
                {saveState.collections.length}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('mirror')}
            className={`flex-1 py-3 px-2 text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 border-b-2 transition-all cursor-pointer ${
              activeTab === 'mirror'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-stone-500 hover:text-stone-800 dark:text-stone-400 dark:hover:text-stone-200'
            }`}
          >
            <Sparkles className="w-4 h-4 shrink-0 text-indigo-500" />
            <span>AI Mirror</span>
            {saveState.inAiMirror && (
              <span className="w-2 h-2 rounded-full bg-indigo-500" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('decor')}
            className={`flex-1 py-3 px-2 text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 border-b-2 transition-all cursor-pointer ${
              activeTab === 'decor'
                ? 'border-amber-600 text-amber-600 dark:text-amber-400'
                : 'border-transparent text-stone-500 hover:text-stone-800 dark:text-stone-400 dark:hover:text-stone-200'
            }`}
          >
            <Home className="w-4 h-4 shrink-0 text-amber-500" />
            <span>AI Dekor</span>
            {saveState.inAiDecor && (
              <span className="w-2 h-2 rounded-full bg-amber-500" />
            )}
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-4 sm:p-5 overflow-y-auto flex-1 space-y-4">
          
          {/* TAB 1: KOLLEKSİYALAR */}
          {activeTab === 'collections' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400 mb-1">
                <span>Məhsulu əlavə etmək istədiyiniz kolleksiyaları seçin:</span>
              </div>

              <div className="space-y-2">
                {allCollections.map((colName) => {
                  const isChecked = saveState.collections.includes(colName);
                  return (
                    <button
                      key={colName}
                      type="button"
                      onClick={() => handleCollectionClick(colName)}
                      className={`w-full p-3.5 rounded-2xl border transition-all text-left flex items-center justify-between gap-3 cursor-pointer ${
                        isChecked
                          ? 'border-emerald-500/80 bg-emerald-50/70 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-100'
                          : 'border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-850 hover:bg-stone-50 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-200'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                          colName === 'Sevimlilər'
                            ? (isChecked ? 'bg-rose-500 text-white shadow-2xs' : 'bg-rose-50 dark:bg-rose-950/60 text-rose-500 border border-rose-200 dark:border-rose-900/60')
                            : (isChecked ? 'bg-emerald-600 text-white' : 'bg-stone-100 dark:bg-stone-800 text-stone-500')
                        }`}>
                          {colName === 'Sevimlilər' ? (
                            <Heart className={`w-4 h-4 ${isChecked ? 'fill-current' : ''}`} />
                          ) : isChecked ? (
                            <BookmarkCheck className="w-4 h-4" />
                          ) : (
                            <Bookmark className="w-4 h-4" />
                          )}
                        </div>
                        <div className="truncate">
                          <span className="font-semibold text-xs sm:text-sm block truncate">
                            {colName}
                          </span>
                          <span className="text-[10px] text-stone-500 dark:text-stone-400 block">
                            {isChecked ? 'Məhsul bu kolleksiyadadır' : 'Əlavə etmək üçün klikləyin'}
                          </span>
                        </div>
                      </div>

                      <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                        isChecked 
                          ? 'bg-emerald-600 text-white' 
                          : 'border-2 border-stone-300 dark:border-stone-600'
                      }`}>
                        {isChecked && <Check className="w-3.5 h-3.5" />}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Create new collection */}
              {isCreating ? (
                <form onSubmit={handleCreateCollection} className="p-3 bg-stone-50 dark:bg-stone-850 rounded-2xl border border-stone-200 dark:border-stone-700 space-y-2 mt-3">
                  <label htmlFor="new-collection-input" className="text-xs font-semibold text-stone-700 dark:text-stone-300 block">
                    Yeni kolleksiya adı:
                  </label>
                  <div className="flex gap-2">
                    <input
                      id="new-collection-input"
                      type="text"
                      value={newCollectionName}
                      onChange={(e) => setNewCollectionName(e.target.value)}
                      placeholder="Məs: Qonaq otağı, Hədiyyəliklər..."
                      className="flex-1 px-3 py-2 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-xs sm:text-sm text-stone-900 dark:text-stone-100 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                      autoFocus
                    />
                    <button
                      type="submit"
                      disabled={!newCollectionName.trim()}
                      className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-xs font-bold rounded-xl transition cursor-pointer"
                    >
                      Yarat
                    </button>
                    <button
                      type="button"
                      onClick={() => { setIsCreating(false); setNewCollectionName(''); }}
                      className="px-2.5 py-2 text-stone-500 hover:text-stone-700 dark:text-stone-400 text-xs font-medium cursor-pointer"
                    >
                      Ləğv et
                    </button>
                  </div>
                </form>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsCreating(true)}
                  className="w-full py-2.5 px-3 rounded-2xl border border-dashed border-stone-300 dark:border-stone-700 text-stone-600 dark:text-stone-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:border-emerald-500 text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer mt-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Yeni kolleksiya yarat</span>
                </button>
              )}
            </div>
          )}

          {/* TAB 2: AI MIRROR */}
          {activeTab === 'mirror' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-50/80 via-white to-purple-50/50 dark:from-indigo-950/40 dark:via-stone-900 dark:to-purple-950/30 border border-indigo-200/80 dark:border-indigo-900/60 space-y-3">
                <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-400 font-bold text-xs sm:text-sm">
                  <Sparkles className="w-4 h-4" />
                  <span>AI Mirror — Virtual Dənəmə və Güzgü</span>
                </div>
                
                <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                  Məhsulu AI Mirror kabininizə göndərin. Geyim, aksessuar, saat və ya dəb əşyalarını öz fotonuz və ya 3D avatarınız üzərində dərhal virtual olaraq sınayın.
                </p>

                {/* Simulated Mirror preview box */}
                <div className="p-3 bg-white/80 dark:bg-stone-800/80 rounded-xl border border-indigo-100 dark:border-indigo-950 flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-950/80 flex items-center justify-center shrink-0 text-indigo-600 dark:text-indigo-400">
                    <Sparkles className="w-6 h-6 animate-pulse" />
                  </div>
                  <div className="min-w-0 flex-1 text-xs">
                    <span className="font-bold text-stone-900 dark:text-stone-100 block truncate">
                      {deal.name}
                    </span>
                    <span className="text-[11px] text-stone-500 dark:text-stone-400 block">
                      Status: {saveState.inAiMirror ? '🪞 Güzgü qarderobunda aktivdir' : 'Güzgüyə göndərilməyib'}
                    </span>
                  </div>
                </div>

                {/* Primary Action Button */}
                <button
                  type="button"
                  onClick={handleMirrorClick}
                  className={`w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition cursor-pointer shadow-xs ${
                    saveState.inAiMirror
                      ? 'bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-900'
                      : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                  }`}
                >
                  {saveState.inAiMirror ? (
                    <>
                      <X className="w-4 h-4" />
                      <span>AI Mirror-dan çıxar</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>AI Mirror-a əlavə et və yadda saxla</span>
                    </>
                  )}
                </button>
              </div>

              <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200/60 dark:border-stone-800 flex items-center gap-2 text-xs text-stone-600 dark:text-stone-400">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>AI Mirror-da yadda saxlanılan məhsullar seans zamanı dərhal tətbiq olunur.</span>
              </div>
            </div>
          )}

          {/* TAB 3: AI DEKOR */}
          {activeTab === 'decor' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-50/80 via-white to-orange-50/50 dark:from-amber-950/40 dark:via-stone-900 dark:to-orange-950/30 border border-amber-200/80 dark:border-amber-900/60 space-y-3">
                <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-bold text-xs sm:text-sm">
                  <Home className="w-4 h-4" />
                  <span>AI Dekor — Otaq və İnteryer Dizaynı</span>
                </div>
                
                <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                  Məhsulu AI Dekor planınıza əlavə edin. Otağınızın şəklinə 3D ölçü, işıqlandırma və perspektivlə yerləşdirərək məkanda necə görünəcəyini əvvəlcədən təyin edin.
                </p>

                {/* Simulated Room plan preview box */}
                <div className="p-3 bg-white/80 dark:bg-stone-800/80 rounded-xl border border-amber-100 dark:border-amber-950 flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-950/80 flex items-center justify-center shrink-0 text-amber-600 dark:text-amber-400">
                    <Home className="w-6 h-6" />
                  </div>
                  <div className="min-w-0 flex-1 text-xs">
                    <span className="font-bold text-stone-900 dark:text-stone-100 block truncate">
                      {deal.name}
                    </span>
                    <span className="text-[11px] text-stone-500 dark:text-stone-400 block">
                      Status: {saveState.inAiDecor ? '🛋️ İnteryer layihənizə qeyd edilib' : 'Otaq planına əlavə edilməyib'}
                    </span>
                  </div>
                </div>

                {/* Primary Action Button */}
                <button
                  type="button"
                  onClick={handleDecorClick}
                  className={`w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition cursor-pointer shadow-xs ${
                    saveState.inAiDecor
                      ? 'bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-900'
                      : 'bg-amber-600 hover:bg-amber-700 text-white'
                  }`}
                >
                  {saveState.inAiDecor ? (
                    <>
                      <X className="w-4 h-4" />
                      <span>AI Dekor planından çıxar</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>AI Dekor otaq planına qeyd et</span>
                    </>
                  )}
                </button>
              </div>

              <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200/60 dark:border-stone-800 flex items-center gap-2 text-xs text-stone-600 dark:text-stone-400">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>AI Dekor-da yadda saxlanılan əşyalar real otaq miqyası ilə tənzimlənir.</span>
              </div>
            </div>
          )}

        </div>

        {/* Footer actions */}
        <div className="p-3.5 sm:p-4 border-t border-stone-100 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-900/50 flex items-center justify-between shrink-0">
          <div className="text-[11px] text-stone-500 dark:text-stone-400">
            {totalSavedCount > 0 ? (
              <span className="text-emerald-700 dark:text-emerald-400 font-semibold flex items-center gap-1">
                <Check className="w-3.5 h-3.5" />
                Dəyişikliklər avtomatik qeyd olundu
              </span>
            ) : (
              <span>Heç bir bölmə seçilməyib</span>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-white text-white dark:text-stone-900 font-bold text-xs sm:text-sm transition cursor-pointer"
          >
            Tamam
          </button>
        </div>

      </div>
    </div>
  );
};
