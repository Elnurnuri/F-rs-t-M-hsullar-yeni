import React from 'react';
import { X, ShieldCheck, Clock, AlertTriangle, Truck } from 'lucide-react';

interface RulesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RulesModal: React.FC<RulesModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="rules-modal-title"
    >
      <div 
        className="fixed inset-0" 
        onClick={onClose} 
      />
      
      <div className="relative w-full max-w-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-5 sm:p-6 shadow-2xl z-10 max-h-[90dvh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-stone-100 dark:border-stone-800">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h3 id="rules-modal-title" className="text-base sm:text-lg font-bold text-stone-900 dark:text-stone-100">
              Panshop Fürsət Qaydaları
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="min-h-[44px] min-w-[44px] -m-2 flex items-center justify-center text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 rounded-full transition-colors cursor-pointer"
            aria-label="Bağla"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Campaign rules arranged side-by-side (yan-yana 2 sütun) */}
        <div className="py-4 grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
          <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/70 dark:border-stone-750">
            <Clock className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <strong className="block text-stone-900 dark:text-stone-100 font-semibold mb-1">
                Dürüst geri sayım siyasəti
              </strong>
              Flaş kampaniyalar mərkəzi server vaxtı (Asia/Baku) ilə sinxronlaşır. Kampaniya bitdikdə endirim avtomatik bağlanır, saxta sayğac qətiyyən istifadə olunmur.
            </div>
          </div>

          <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/70 dark:border-stone-750">
            <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="block text-stone-900 dark:text-stone-100 font-semibold mb-1">
                Məhdud stok fürsətləri
              </strong>
              Stoku 5 və daha az qalan məhsullar «Məhdud» bölməsində vurğulanır. Stok tükəndikdə sifariş qəbulu dayandırılır.
            </div>
          </div>

          <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/70 dark:border-stone-750">
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <strong className="block text-stone-900 dark:text-stone-100 font-semibold mb-1">
                Qarantiyalı satıcılar
              </strong>
              Bütün məhsullar Panshop tərəfindən verifikasiya olunmuş rəsmi yerli mağazalar tərəfindən təqdim edilir.
            </div>
          </div>

          <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/70 dark:border-stone-750">
            <Truck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <strong className="block text-stone-900 dark:text-stone-100 font-semibold mb-1">
                Bakı və bölgələrə çatdırılma
              </strong>
              Fürsət məhsullarına standart çatdırılma və 14 gün ərzində qanuni qaytarılma hüququ tam şamil olunur.
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-stone-100 dark:border-stone-800 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 min-h-[44px] rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm transition cursor-pointer"
          >
            Anladım
          </button>
        </div>
      </div>
    </div>
  );
};
