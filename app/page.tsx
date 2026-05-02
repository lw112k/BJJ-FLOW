import BjjApp from '@/components/BjjApp';

export default function Home() {
  return (
    <main className="min-h-[100dvh] md:h-[100dvh] bg-slate-100 p-2 sm:p-4 md:p-8 flex flex-col">
      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col md:min-h-0">
        <header className="mb-3 md:mb-6 shrink-0">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">BJJ Flow Map</h1>
          <p className="text-sm md:text-base text-slate-600 mt-1">Explore positions, transitions, and submissions.</p>
        </header>
        
        <div className="flex-1 bg-white rounded-xl md:rounded-2xl shadow-sm border border-slate-200 md:overflow-hidden flex flex-col md:min-h-0">
          <BjjApp />
        </div>
      </div>
    </main>
  );
}
