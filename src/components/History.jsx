import { useState, useEffect } from 'react';
import { obtenerHistorial, eliminarDiagnostico } from '../services/api';

function History({ onSelectDiagnosis, onHistoryChange }) {
  const [historial, setHistorial] = useState([]);
  const [filtroUrgencia, setFiltroUrgencia] = useState('Todos');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarHistorial();
  }, []);

  const cargarHistorial = async () => {
    setLoading(true);
    try {
      const response = await obtenerHistorial();
      if (response.success) {
        setHistorial(response.historial || []);
        console.log(`✅ ${response.count} diagnósticos cargados desde BD`);
        if (onHistoryChange) {
          onHistoryChange();
        }
      }
    } catch (err) {
      console.error('Error loading history:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este diagnóstico?')) {
      try {
        await eliminarDiagnostico(id);
        cargarHistorial();
      } catch (err) {
        console.error('Error deleting:', err);
        alert('Error al eliminar el diagnóstico');
      }
    }
  };

  const historialFiltrado = filtroUrgencia === 'Todos'
    ? historial
    : historial.filter(item => item.nivelUrgencia === filtroUrgencia);

  const getUrgenciaColor = (nivel) => {
    switch (nivel?.toLowerCase()) {
      case 'alto':
        return { bg: 'bg-red-100', text: 'text-red-800', badge: 'bg-red-500', icon: '🚨' };
      case 'medio':
        return { bg: 'bg-yellow-50', text: 'text-yellow-800', badge: 'bg-yellow-500', icon: '⚠️' };
      case 'bajo':
        return { bg: 'bg-green-50', text: 'text-green-800', badge: 'bg-green-500', icon: '✓' };
      default:
        return { bg: 'bg-gray-50', text: 'text-gray-800', badge: 'bg-gray-500', icon: 'ℹ️' };
    }
  };

  const formatearFecha = (fecha) => {
    const date = new Date(fecha);
    return date.toLocaleDateString('es-ES', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const truncarTexto = (texto, maxLength = 100) => {
    if (!texto) return '';
    if (texto.length <= maxLength) return texto;
    return texto.substring(0, maxLength) + '...';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-800">📊 Historial de Diagnósticos</h2>
          <button
            onClick={cargarHistorial}
            className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg font-medium hover:shadow-lg transition-all"
          >
            🔄 Actualizar
          </button>
        </div>

        <div className="flex space-x-2 mb-4">
          {['Todos', 'Alto', 'Medio', 'Bajo'].map((filtro) => (
            <button
              key={filtro}
              onClick={() => setFiltroUrgencia(filtro)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filtroUrgencia === filtro
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {filtro}
            </button>
          ))}
        </div>

        <p className="text-sm text-gray-600">
          Mostrando {historialFiltrado.length} de {historial.length} diagnósticos
        </p>
      </div>

      {historialFiltrado.length === 0 ? (
        <div className="bg-white rounded-xl shadow-lg p-12 text-center">
          <span className="text-6xl mb-4 block">🌱</span>
          <p className="text-xl text-gray-600">No hay diagnósticos en el historial</p>
        </div>
      ) : (
        <div className="space-y-4">
          {historialFiltrado.map((item) => {
            const colors = getUrgenciaColor(item.nivelUrgencia);
            return (
              <div
                key={item.id}
                className="bg-white rounded-xl p-5 shadow-lg hover:shadow-xl transition-all cursor-pointer border-2 border-transparent hover:border-emerald-200"
              >
                <div className="flex items-start space-x-4">
                  <div className="relative flex-shrink-0">
                    <img
                      src={item.imagenUrl}
                      alt={item.nombrePlanta}
                      className="w-20 h-20 object-cover rounded-xl shadow-md"
                    />
                    <div className={`absolute -bottom-2 -right-2 ${colors.badge} text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg`}>
                      {colors.icon}
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-800 text-lg">
                          {item.nombrePlanta}
                        </h3>
                        {item.nombreCientifico && (
                          <p className="text-sm text-gray-600 italic mt-0.5">
                            {item.nombreCientifico}
                          </p>
                        )}
                      </div>
                      <span className={`px-3 py-1 ${colors.bg} ${colors.text} text-xs font-bold rounded-full ml-2 flex-shrink-0`}>
                        {item.nivelUrgencia?.toUpperCase()}
                      </span>
                    </div>

                    <div className={`${colors.bg} rounded-lg p-3 mb-3`}>
                      <p className="text-xs text-gray-700 leading-relaxed">
                        🩺 <strong>Estado:</strong> {item.estadoSalud}<br />
                        💡 <strong>Diagnóstico:</strong> {truncarTexto(item.diagnostico, 120)}<br />
                        🎯 <strong>Tratamiento:</strong> {truncarTexto(item.tratamiento, 100)}
                      </p>
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500">
                        📅 {formatearFecha(item.fecha)}
                      </span>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => onSelectDiagnosis(item)}
                          className="text-emerald-600 font-medium hover:underline"
                        >
                          Ver completo →
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(item.id);
                          }}
                          className="text-red-600 font-medium hover:underline"
                        >
                          🗑️ Eliminar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default History;
