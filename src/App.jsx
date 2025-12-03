import { useState, useEffect } from 'react';
import ImageUpload from './components/ImageUpload';
import DiagnosisResult from './components/DiagnosisResult';
import History from './components/History';
import { obtenerHistorial } from './services/api';

function App() {
  const [currentView, setCurrentView] = useState('upload'); // 'upload', 'result', 'history'
  const [currentDiagnosis, setCurrentDiagnosis] = useState(null);
  const [historialCount, setHistorialCount] = useState(0);

  // Cargar contador de historial al iniciar
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
    setCurrentDiagnosis(diagnosis);
    setCurrentView('result');
    // Recargar contador después de guardar
    setTimeout(cargarContador, 500);
  };

  const handleViewHistory = () => {
    setCurrentView('history');
    // Recargar contador al abrir historial
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-4xl">🌱</span>
              <h1 className="text-2xl font-bold text-emerald-700">Plant Care Debugger</h1>
            </div>
            <nav className="flex space-x-4">
              <button
                onClick={() => setCurrentView('upload')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  currentView === 'upload'
                    ? 'bg-emerald-600 text-white'
                    : 'text-emerald-600 hover:bg-emerald-50'
                }`}
              >
                Analizar
              </button>
              <button
                onClick={handleViewHistory}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  currentView === 'history'
                    ? 'bg-emerald-600 text-white'
                    : 'text-emerald-600 hover:bg-emerald-50'
                }`}
              >
                Historial ({historialCount})
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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

      {/* Footer */}
      <footer className="bg-white mt-12 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-gray-600 text-sm">
            Plant Care Debugger © 2024 - Diagnóstico inteligente de plantas con IA
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
