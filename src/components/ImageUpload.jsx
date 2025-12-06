import { useState } from 'react';
import { analizarPlanta, guardarEnHistorial } from '../services/api';

function ImageUpload({ onAnalysisComplete }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleImageSelect = (file) => {
    console.log('📸 Imagen seleccionada:', file);
    if (file && file.type.startsWith('image/')) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        console.log('✅ Preview generado');
      };
      reader.readAsDataURL(file);
      setError(null);
    } else {
      setError('Por favor selecciona un archivo de imagen válido');
    }
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleImageSelect(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      handleImageSelect(file);
    }
  };

  const handleAnalyze = async () => {
    console.log('🔍 Iniciando análisis...');
    if (!selectedImage) {
      setError('Por favor selecciona una imagen primero');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      console.log('📤 Enviando imagen a la API...');
      const result = await analizarPlanta(selectedImage);
      console.log('📥 Respuesta recibida:', result);
      
      if (result.success) {
        console.log('✅ Análisis exitoso');
        
        // Agregar la imagen URL y nombrePlanta al diagnóstico
        const diagnosticoCompleto = {
          ...result.analisis,
          imagenUrl: preview, // Agregamos la imagen en base64
          nombrePlanta: result.analisis.identificacion, // Agregamos nombrePlanta
          nombreCientifico: result.analisis.identificacion.match(/\(([^)]+)\)/)?.[1] || null
        };
        
        console.log('💾 Guardando en historial...');
        // Guardar en el historial
        const saveResult = await guardarEnHistorial(diagnosticoCompleto);
        console.log('✅ Guardado en historial:', saveResult);
        
        // Pasar al componente padre
        onAnalysisComplete(diagnosticoCompleto);
      } else {
        console.error('❌ Error en respuesta:', result.error);
        setError(result.error || 'Error al analizar la imagen');
      }
    } catch (err) {
      console.error('❌ Error en handleAnalyze:', err);
      setError('Error de conexión. Por favor intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSelectedImage(null);
    setPreview(null);
    setError(null);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">
          🌿 Analiza tu Planta
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Sube una foto y obtén un diagnóstico completo con IA
        </p>

        {!preview ? (
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border-4 border-dashed rounded-xl p-12 text-center transition-all cursor-pointer ${
              isDragging
                ? 'border-emerald-500 bg-emerald-50 scale-105'
                : 'border-emerald-300 hover:border-emerald-500 hover:bg-emerald-50'
            }`}
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleFileInput}
              className="hidden"
              id="image-upload"
            />
            <label
              htmlFor="image-upload"
              className="cursor-pointer block"
            >
              <div className="flex flex-col items-center space-y-4">
                <span className="text-7xl">📸</span>
                <div>
                  <p className="text-xl font-bold text-gray-800 mb-2">
                    Arrastra tu imagen aquí
                  </p>
                  <p className="text-lg text-emerald-600 font-semibold mb-1">
                    o haz click para seleccionar
                  </p>
                  <p className="text-sm text-gray-500">
                    PNG, JPG o JPEG (máx. 10MB)
                  </p>
                </div>
              </div>
            </label>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="relative rounded-xl overflow-hidden shadow-xl border-4 border-emerald-200">
              <img
                src={preview}
                alt="Preview"
                className="w-full h-96 object-cover"
              />
            </div>

            <div className="space-y-3">
              <button
                onClick={handleAnalyze}
                disabled={loading}
                className={`w-full px-8 py-5 rounded-xl font-bold text-xl transition-all duration-300 ${
                  loading
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg hover:shadow-2xl hover:scale-105 hover:from-emerald-600 hover:to-teal-600'
                }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin h-6 w-6 mr-3" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Analizando con IA...
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    <span className="text-2xl mr-2">🔍</span>
                    Analizar Planta
                  </span>
                )}
              </button>
              
              <button
                onClick={handleReset}
                disabled={loading}
                className="w-full px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium border-2 border-gray-300 hover:bg-gray-200 hover:scale-102 transition-all disabled:opacity-50"
              >
                ❌ Cambiar Imagen
              </button>
            </div>
          </div>
        )}

        {error && (
          <div className="mt-4 p-4 bg-red-50 border-l-4 border-red-500 rounded">
            <p className="text-red-700 font-medium">⚠️ {error}</p>
          </div>
        )}
      </div>

      <div className="mt-6 bg-blue-50 border-l-4 border-blue-400 p-4 rounded-lg shadow-sm">
        <p className="text-sm text-blue-700">
          <strong>💡 Tip:</strong> Para mejores resultados, toma fotos claras de las hojas, flores o partes afectadas de tu planta con buena iluminación.
        </p>
      </div>
    </div>
  );
}

export default ImageUpload;
