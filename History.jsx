import { useState, useEffect } from 'react';
import { obtenerHistorial, eliminarDelHistorial } from '../services/api';

function History({ onSelectDiagnosis }) {
  const [historial, setHistorial] = useState([]);
  const [filtroUrgencia, setFiltroUrgencia] = useState('Todos');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // NUEVO: Cargar historial desde BD al montar componente
  useEffect(() => {
    cargarHistorial();
  }, []);

  const cargarHistorial = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await obtenerHistorial();
      
      if (response.success) {
        setHistorial(response.historial || []);
        console.log(`✅ ${response.count} diagnósticos cargados desde BD`);
      } else {
        setError('Error al cargar el historial');
      }
    } catch (err) {
      console.error('Error loading history:', err);
      setError('No se pudo conectar con el servidor');
    } finally {
      setLoading(false);
    }
  };

  const handleEliminar = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar este diagnóstico?')) {
      return;
    }

    try {
      const response = await eliminarDelHistorial(id);
      
      if (response.success) {
        // Eliminar del estado local
        setHistorial(historial.filter(item => item.id !== id));
        console.log('✅ Diagnóstico eliminado de BD');
      } else {
        alert('Error al eliminar el diagnóstico');
      }
    } catch (err) {
      console.error('Error deleting:', err);
      alert('No se pudo eliminar el diagnóstico');
    }
  };

  const historialFiltrado = filtroUrgencia === 'Todos'
    ? historial
    : historial.filter(item => item.nivelUrgencia === filtroUrgencia);

  const getUrgenciaColor = (urgencia) => {
    switch (urgencia) {
      case 'Alto':
        return 'bg-red-100 border-red-300 text-red-800';
      case 'Medio':
        return 'bg-yellow-100 border-yellow-300 text-yellow-800';
      case 'Bajo':
        return 'bg-green-100 border-green-300 text-green-800';
      default:
        return 'bg-gray-100 border-gray-300 text-gray-800';
    }
  };

  const getUrgenciaIcon = (urgencia) => {
    switch (urgencia) {
      case 'Alto':
        return '🚨';
      case 'Medio':
        return '⚠️';
      case 'Bajo':
        return '✅';
      default:
        return '📋';
    }
  };

  const formatearFecha = (fecha) => {
    const date = new Date(fecha);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-green-700 mb-4">
          📚 Historial de Diagnósticos
        </h2>
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          <p className="mt-4 text-gray-600">Cargando historial...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-green-700 mb-4">
          📚 Historial de Diagnósticos
        </h2>
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          ⚠️ {error}
          <button
            onClick={cargarHistorial}
            className="ml-4 text-sm underline hover:no-underline"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-green-700">
          📚 Historial de Diagnósticos
        </h2>
        <button
          onClick={cargarHistorial}
          className="text-sm text-green-600 hover:text-green-700 underline"
        >
          🔄 Actualizar
        </button>
      </div>

      {/* Filtros */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Filtrar por urgencia:
        </label>
        <div className="flex gap-2 flex-wrap">
          {['Todos', 'Bajo', 'Medio', 'Alto'].map((filtro) => (
            <button
              key={filtro}
              onClick={() => setFiltroUrgencia(filtro)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filtroUrgencia === filtro
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {filtro === 'Todos' && '📋'}
              {filtro === 'Bajo' && '✅'}
              {filtro === 'Medio' && '⚠️'}
              {filtro === 'Alto' && '🚨'}
              {' '}{filtro}
            </button>
          ))}
        </div>
      </div>

      {/* Lista de diagnósticos */}
      {historialFiltrado.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <p className="text-lg mb-2">📭 No hay diagnósticos</p>
          <p className="text-sm">
            {filtroUrgencia === 'Todos'
              ? 'Analiza tu primera planta para comenzar'
              : `No hay diagnósticos con urgencia ${filtroUrgencia}`}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-sm text-gray-600 mb-4">
            Total: {historialFiltrado.length} diagnóstico(s)
          </p>
          
          {historialFiltrado.map((item) => (
            <div
              key={item.id}
              className={`border-2 rounded-lg p-4 cursor-pointer transition-all hover:shadow-lg ${getUrgenciaColor(
                item.nivelUrgencia
              )}`}
              onClick={() => onSelectDiagnosis(item)}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">{getUrgenciaIcon(item.nivelUrgencia)}</span>
                    <h3 className="font-bold text-lg">
                      {item.identificacion || 'Planta sin identificar'}
                    </h3>
                  </div>
                  
                  <p className="text-sm mb-2">
                    {item.diagnostico?.substring(0, 100)}...
                  </p>
                  
                  <div className="flex items-center gap-4 text-xs text-gray-600">
                    <span>📅 {formatearFecha(item.fecha)}</span>
                    <span className="px-2 py-1 bg-white bg-opacity-70 rounded">
                      {item.nivelUrgencia}
                    </span>
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEliminar(item.id);
                  }}
                  className="ml-4 text-red-600 hover:text-red-800 text-xl"
                  title="Eliminar"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default History;
