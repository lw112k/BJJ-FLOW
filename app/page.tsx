import BjjApp from '@/components/BjjApp';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto h-[calc(100vh-4rem)] flex flex-col">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">BJJ Flow Map</h1>
          <p className="text-slate-600 mt-1">Explore positions, transitions, and submissions.</p>
        </header>
        
        <div className="flex-1 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <BjjApp />
        </div>
      </div>
    </main>
  );
}
