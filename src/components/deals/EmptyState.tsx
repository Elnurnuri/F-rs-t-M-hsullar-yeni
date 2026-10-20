import { Inbox, SearchX, AlertCircle, RefreshCw } from 'lucide-react';

interface EmptyStateProps {
  type?: 'no_campaign' | 'tab_empty' | 'search_empty' | 'error';
  onReset?: () => void;
  tabLabel?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  type = 'no_campaign',
  onReset,
  tabLabel,
}) => {
  if (type === 'error') {
    return (
      <div 
        className="w-full py-16 px-4 text-center bg-white dark:bg-stone-900 border border-rose-200 dark:border-rose-950/70 rounded-3xl my-8 max-w-2xl mx-auto shadow-xs"
        role="alert"
      >
        <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center">
          <AlertCircle className="w-7 h-7" />
        </div>
        <h3 className="text-lg sm:text-xl font-bold text-stone-900 dark:text-stone-100 mb-2">
          Məlumatları yükləmək mümkün olmadı
        </h3>
        <p className="text-sm text-stone-600 dark:text-stone-300 max-w-md mx-auto mb-6">
          Server ilə əlaqə zamanı gözlənilməz xəta baş verdi. Zəhmət olmasa internet bağlantınızı yoxlayıb yenidən cəhd edin.
        </p>
        {onReset && (
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-2 px-5 py-2.5 min-h-[44px] rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-semibold text-sm transition shadow-sm cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Yenidən yoxla</span>
          </button>
        )}
      </div>
    );
  }

  if (type === 'search_empty') {
    return (
      <div className="w-full py-10 sm:py-16 px-4 text-center bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl sm:rounded-3xl my-4 sm:my-8 max-w-xl mx-auto shadow-xs">
        <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-stone-100 dark:bg-stone-800 text-stone-400 flex items-center justify-center">
          <SearchX className="w-7 h-7" />
        </div>
        <h3 className="text-lg sm:text-xl font-bold text-stone-900 dark:text-stone-100 mb-2">
          Axtarışa uyğun məhsul tapılmadı
        </h3>
        <p className="text-sm text-stone-600 dark:text-stone-300 max-w-sm mx-auto mb-6">
          Axtarış sözünü dəyişdirin və ya filtri sıfırlayaraq bütün fürsətlərə baxın.
        </p>
        {onReset && (
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-2 px-5 py-2.5 min-h-[44px] rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 font-semibold text-sm transition cursor-pointer"
          >
            Axtarışı təmizlə
          </button>
        )}
      </div>
    );
  }

  if (type === 'tab_empty') {
    return (
      <div className="w-full py-10 sm:py-16 px-4 text-center bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl sm:rounded-3xl my-4 sm:my-8 max-w-xl mx-auto shadow-xs">
        <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-stone-100 dark:bg-stone-800 text-stone-400 flex items-center justify-center">
          <Inbox className="w-7 h-7" />
        </div>
        <h3 className="text-lg sm:text-xl font-bold text-stone-900 dark:text-stone-100 mb-2">
          «{tabLabel || 'Bu bölmə'}» üzrə hazırda məhsul yoxdur
        </h3>
        <p className="text-sm text-stone-600 dark:text-stone-300 max-w-sm mx-auto mb-6">
          Seçilmiş filtrə uyğun aktiv kampaniya və ya endirim tapılmadı. Digər bölmələrə keçid edə bilərsiniz.
        </p>
        {onReset && (
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-2 px-5 py-2.5 min-h-[44px] rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition cursor-pointer"
          >
            Bütün fürsətlərə bax
          </button>
        )}
      </div>
    );
  }

  // Default: Total no campaign/deals
  return (
    <div className="w-full py-16 px-4 text-center bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl my-8 max-w-2xl mx-auto shadow-xs">
      <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
        <Inbox className="w-8 h-8" />
      </div>
      <h3 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100 mb-2">
        Hazırda kampaniya yoxdur
      </h3>
      <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 max-w-md mx-auto mb-6 leading-relaxed">
        Satıcılar endirim və ya flaş kampaniya başladanda məhsullar burada görünəcək.
      </p>
      {onReset && (
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-2 px-6 py-3 min-h-[44px] rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-semibold text-sm sm:text-base shadow-sm hover:shadow transition cursor-pointer"
        >
          Bütün məhsullara bax
        </button>
      )}
    </div>
  );
};
