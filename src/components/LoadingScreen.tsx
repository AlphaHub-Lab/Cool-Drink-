export default function LoadingScreen() {
  return (
    <div className="nf-loader fixed inset-0 z-[300] bg-[#0A0E27] flex items-center justify-center overflow-hidden pointer-events-none">
      <div className="flex flex-col items-center">
        <div className="overflow-hidden mb-2">
          <h1 className="nf-loader-word nf-loader-word-no font-condensed text-white text-7xl md:text-9xl leading-none">
            NO
          </h1>
        </div>
        <div className="overflow-hidden">
          <h1 className="nf-loader-word nf-loader-word-filter font-condensed text-white text-7xl md:text-9xl leading-none">
            FILTER
          </h1>
        </div>
        <div className="nf-loader-line h-px bg-white/20 mt-6 mb-4" />
        <p className="nf-loader-copy text-white/30 text-[9px] tracking-[0.5em] uppercase font-sans">
          Raw Juice
        </p>
      </div>
    </div>
  );
}
