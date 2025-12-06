import { useState } from 'react';

function DiagnosisResult({ diagnosis, onNewAnalysis }) {
  const [showFullDiagnosis, setShowFullDiagnosis] = useState(false);
  const [showFullTreatment, setShowFullTreatment] = useState(false);

  const getUrgenciaColor = (nivel) => {
    switch (nivel?.toLowerCase()) {
      case 'alto':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'medio':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'bajo':
        return 'bg-green-100 text-green-800 border-green-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getUrgenciaIcon = (nivel) => {
    switch (nivel?.toLowerCase()) {
      case 'alto':
        return '🚨';
      case 'medio':
        return '⚠️';
      case 'bajo':
        return '✅';
      default:
        return 'ℹ️';
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header con imagen */}
        <div className="relative h-64 bg-gradient-to-br from-emerald-400 to-teal-500">
          {diagnosis.imagenUrl && (
            <img
              src={diagnosis.imagenUrl}
              alt={diagnosis.nombrePlanta}
              className="w-full h-full object-cover opacity-90"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h1 className="text-3xl font-bold mb-2">🌿 {diagnosis.nombrePlanta}</h1>
            {diagnosis.nombreCientifico && (
              <p className="text-lg italic opacity-90">{diagnosis.nombreCientifico}</p>
            )}
          </div>
        </div>

        {/* Contenido */}
        <div className="p-8 space-y-6">
          {/* Estado de Salud */}
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 border-l-4 border-blue-500">
            <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
              <span className="text-2xl mr-2">🩺</span>
              Estado de Salud
            </h2>
            <p className="text-gray-700 text-lg">{diagnosis.estadoSalud}</p>
          </div>

          {/* Nivel de Urgencia */}
          <div className={`rounded-xl p-6 border-2 ${getUrgenciaColor(diagnosis.nivelUrgencia)}`}>
            <h2 className="text-xl font-bold mb-3 flex items-center">
              <span className="text-2xl mr-2">{getUrgenciaIcon(diagnosis.nivelUrgencia)}</span>
              Nivel de Urgencia
            </h2>
            <p className="text-2xl font-bold">{diagnosis.nivelUrgencia?.toUpperCase()}</p>
          </div>

          {/* Diagnóstico */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border-l-4 border-purple-500">
            <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
              <span className="text-2xl mr-2">🔍</span>
              Diagnóstico
            </h2>
            <div className="text-gray-700 leading-relaxed">
              {showFullDiagnosis ? (
                <p className="whitespace-pre-line">{diagnosis.diagnostico}</p>
              ) : (
                <p className="whitespace-pre-line">
                  {diagnosis.diagnostico?.substring(0, 300)}
                  {diagnosis.diagnostico?.length > 300 && '...'}
                </p>
              )}
              {diagnosis.diagnostico?.length > 300 && (
                <button
                  onClick={() => setShowFullDiagnosis(!showFullDiagnosis)}
                  className="mt-2 text-purple-600 font-medium hover:underline"
                >
                  {showFullDiagnosis ? '← Ver menos' : 'Ver más →'}
                </button>
              )}
            </div>
          </div>

          {/* Tratamiento */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border-l-4 border-green-500">
            <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
              <span className="text-2xl mr-2">💊</span>
              Tratamiento Recomendado
            </h2>
            <div className="text-gray-700 leading-relaxed">
              {showFullTreatment ? (
                <p className="whitespace-pre-line">{diagnosis.tratamiento}</p>
              ) : (
                <p className="whitespace-pre-line">
                  {diagnosis.tratamiento?.substring(0, 300)}
                  {diagnosis.tratamiento?.length > 300 && '...'}
                </p>
              )}
              {diagnosis.tratamiento?.length > 300 && (
                <button
                  onClick={() => setShowFullTreatment(!showFullTreatment)}
                  className="mt-2 text-green-600 font-medium hover:underline"
                >
                  {showFullTreatment ? '← Ver menos' : 'Ver más →'}
                </button>
              )}
            </div>
          </div>

          {/* Prevención */}
          {diagnosis.prevencion && (
            <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl p-6 border-l-4 border-amber-500">
              <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
                <span className="text-2xl mr-2">🛡️</span>
                Prevención
              </h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {diagnosis.prevencion}
              </p>
            </div>
          )}

          {/* Botón para nuevo análisis */}
          <div className="pt-4">
            <button
              onClick={onNewAnalysis}
              className="w-full px-6 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all"
            >
              🌱 Analizar Otra Planta
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DiagnosisResult;
