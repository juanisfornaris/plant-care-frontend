import { useState } from 'react';

function DiagnosisResult({ diagnosis, onSave, onNewAnalysis }) {
  const [isSaved, setIsSaved] = useState(false);

  // Determinar el nivel de urgencia y sus colores
  const getUrgencyInfo = (urgencia) => {
    const urgenciaLower = urgencia?.toLowerCase() || 'bajo';
    
    if (urgenciaLower.includes('alto') || urgenciaLower.includes('urgente')) {
      return {
        level: 'ALTO',
        color: 'bg-red-100 border-red-400 text-red-800',
        icon: '🚨',
        message: 'Atención inmediata requerida'
      };
    } else if (urgenciaLower.includes('medio') || urgenciaLower.includes('moderado')) {
      return {
        level: 'MEDIO',
        color: 'bg-yellow-100 border-yellow-400 text-yellow-800',
        icon: '⚠️',
        message: 'Requiere atención pronto'
      };
    } else {
      return {
        level: 'BAJO',
        color: 'bg-green-100 border-green-400 text-green-800',
        icon: '✅',
        message: 'Monitoreo regular suficiente'
      };
    }
  };

  const urgencyInfo = getUrgencyInfo(diagnosis.nivelUrgencia);

  const handleSave = () => {
    onSave(diagnosis);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header con imagen */}
        <div className="relative h-64 bg-gradient-to-br from-emerald-400 to-emerald-600">
          {diagnosis.imagePreview && (
            <img
              src={diagnosis.imagePreview}
              alt="Planta analizada"
              className="w-full h-full object-cover opacity-40"
            />
          )}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white">
              <h2 className="text-4xl font-bold mb-2">Análisis Completo</h2>
              <p className="text-emerald-100">Diagnóstico generado por IA</p>
            </div>
          </div>
        </div>

        <div className="p-8 space-y-6">
          {/* Nivel de Urgencia */}
          <div className={`border-2 rounded-xl p-6 ${urgencyInfo.color}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-3xl">{urgencyInfo.icon}</span>
                <div>
                  <p className="text-sm font-medium opacity-80">Nivel de Urgencia</p>
                  <p className="text-2xl font-bold">{urgencyInfo.level}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">{urgencyInfo.message}</p>
              </div>
            </div>
          </div>

          {/* Identificación */}
          {diagnosis.identificacion && (
            <div className="bg-emerald-50 rounded-xl p-6">
              <h3 className="text-xl font-bold text-emerald-800 mb-3 flex items-center space-x-2">
                <span>🌿</span>
                <span>Identificación de la Planta</span>
              </h3>
              <p className="text-gray-700 leading-relaxed">{diagnosis.identificacion}</p>
            </div>
          )}

          {/* Estado de Salud */}
          {diagnosis.estadoSalud && (
            <div className="bg-blue-50 rounded-xl p-6">
              <h3 className="text-xl font-bold text-blue-800 mb-3 flex items-center space-x-2">
                <span>🩺</span>
                <span>Estado de Salud</span>
              </h3>
              <p className="text-gray-700 leading-relaxed">{diagnosis.estadoSalud}</p>
            </div>
          )}

          {/* Diagnóstico */}
          {diagnosis.diagnostico && (
            <div className="bg-purple-50 rounded-xl p-6">
              <h3 className="text-xl font-bold text-purple-800 mb-3 flex items-center space-x-2">
                <span>🔬</span>
                <span>Diagnóstico</span>
              </h3>
              <p className="text-gray-700 leading-relaxed">{diagnosis.diagnostico}</p>
            </div>
          )}

          {/* Tratamiento */}
          {diagnosis.tratamiento && (
            <div className="bg-orange-50 rounded-xl p-6">
              <h3 className="text-xl font-bold text-orange-800 mb-3 flex items-center space-x-2">
                <span>💊</span>
                <span>Tratamiento Recomendado</span>
              </h3>
              <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                {diagnosis.tratamiento}
              </div>
            </div>
          )}

          {/* Prevención */}
          {diagnosis.prevencion && (
            <div className="bg-teal-50 rounded-xl p-6">
              <h3 className="text-xl font-bold text-teal-800 mb-3 flex items-center space-x-2">
                <span>🛡️</span>
                <span>Prevención</span>
              </h3>
              <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                {diagnosis.prevencion}
              </div>
            </div>
          )}

          {/* Información de análisis */}
          <div className="border-t pt-6">
            <p className="text-sm text-gray-500 text-center">
              Análisis realizado el{' '}
              {new Date(diagnosis.analyzedAt).toLocaleString('es-ES', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>

          {/* Botones de acción */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            <button
              onClick={handleSave}
              disabled={isSaved}
              className={`py-4 rounded-xl font-semibold text-lg transition-all ${
                isSaved
                  ? 'bg-green-500 text-white'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white hover:shadow-lg'
              }`}
            >
              {isSaved ? (
                <span className="flex items-center justify-center space-x-2">
                  <span>✓</span>
                  <span>Guardado en Historial</span>
                </span>
              ) : (
                <span className="flex items-center justify-center space-x-2">
                  <span>💾</span>
                  <span>Guardar en Historial</span>
                </span>
              )}
            </button>

            <button
              onClick={onNewAnalysis}
              className="py-4 rounded-xl font-semibold text-lg bg-gray-100 hover:bg-gray-200 text-gray-700 transition-all hover:shadow-lg"
            >
              <span className="flex items-center justify-center space-x-2">
                <span>🔄</span>
                <span>Analizar Otra Planta</span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DiagnosisResult;
