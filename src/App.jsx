import { useState, useEffect } from 'react';
import ImageUpload from './components/ImageUpload';
import DiagnosisResult from './components/DiagnosisResult';
import History from './components/History';
import Footer from './components/Footer';
import { obtenerHistorial } from './services/api';

function App() {
  const [currentView, setCurrentView] = useState('upload');
  const [currentDiagnosis, setCurrentDiagnosis] = useState(null);
  const [historialCount, setHistorialCount] = useState(null);

  useEffect(() => {
    cargarContador();
  }, []);

  const cargarContador = async () => {
    try {
      const response = await obtenerHistorial();
      if (response.success) {
        setHistorialCount(response.count || 0);
      }
    } catch (error) {
      console.error('Error al cargar contador:', error);
    }
  };

  
   const handleAnalysisComplete = (diagnosis) => {
    console.log('🎯 handleAnalysisComplete llamada con:', diagnosis);
    setCurrentDiagnosis(diagnosis);
    console.log('📝 currentDiagnosis actualizado');
    setCurrentView('result');
    console.log('👁️ Vista cambiada a: result');
    setTimeout(cargarContador, 500);
  };

  const handleViewHistory = () => {
    setCurrentView('history');
    cargarContador();
  };

  const handleSelectDiagnosis = (diagnosis) => {
    setCurrentDiagnosis(diagnosis);
    setCurrentView('result');
  };

  const handleNewAnalysis = () => {
    setCurrentDiagnosis(null);
    setCurrentView('upload');
  };

  const handleLogoClick = () => {
    setCurrentDiagnosis(null);
    setCurrentView('upload');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex flex-col">
      <header className="bg-gradient-to-r from-white to-emerald-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div 
              className="flex items-center space-x-4 cursor-pointer hover:opacity-80 transition-opacity"
              onClick={handleLogoClick}
            >
              <span className="text-5xl animate-bounce-soft">🌱</span>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Plant Care Debugger</h1>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-semibold rounded-full">✓ Online</span>
                  <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">🤖 AI Activa</span>
                </div>
              </div>
            </div>
            
            <nav className="flex space-x-3">
              {currentView === 'history' && (
                <button
                  onClick={() => setCurrentView('upload')}
                  className="px-5 py-2.5 rounded-lg font-medium bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md hover:shadow-lg hover:scale-105 transition-all"
                >
                  ✨ Analizar
                </button>
              )}
              
              <button
                onClick={handleViewHistory}
                className={`px-5 py-2.5 rounded-lg font-medium transition-colors ${
                  currentView === 'history'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-emerald-700 bg-emerald-100 hover:bg-emerald-200'
                }`}
              >
                📊 Historial ({historialCount === null ? '...' : historialCount})
              </button>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentView === 'upload' && (
          <ImageUpload onAnalysisComplete={handleAnalysisComplete} />
        )}
        {currentView === 'result' && currentDiagnosis && (
          <DiagnosisResult
            diagnosis={currentDiagnosis}
            onNewAnalysis={handleNewAnalysis}
          />
        )}
        {currentView === 'history' && (
          <History 
            onSelectDiagnosis={handleSelectDiagnosis}
            onHistoryChange={cargarContador}
          />
        )}
      </main>

      <Footer />

      <style jsx>{`
        @keyframes bounce-soft {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        .animate-bounce-soft {
          animation: bounce-soft 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

export default App;
