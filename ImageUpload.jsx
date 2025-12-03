import { useState } from 'react';
import { analyzePlant, guardarEnHistorial } from '../services/api';

function ImageUpload({ onAnalysisComplete }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validar tamaño (10MB)
      if (file.size > 10 * 1024 * 1024) {
        setError('La imagen no debe superar 10MB');
        return;
      }

      // Validar tipo
      const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        setError('Solo se permiten imágenes PNG, JPG, JPEG o WEBP');
        return;
      }

      setSelectedImage(file);
      setError(null);

      // Crear preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedImage) {
      setError('Por favor selecciona una imagen primero');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Convertir imagen a base64
      const reader = new FileReader();
      reader.readAsDataURL(selectedImage);

      reader.onload = async () => {
        try {
          const base64String = reader.result.split(',')[1];
          const mimeType = selectedImage.type;

          // Analizar con Gemini
          const result = await analyzePlant(base64String, mimeType);

          if (result.success && result.analisis) {
            // NUEVO: Guardar automáticamente en BD
            try {
              const historialData = {
                imagenUrl: preview, // Guardar el preview en base64
                identificacion: result.analisis.identificacion,
                estadoSalud: result.analisis.estadoSalud,
                diagnostico: result.analisis.diagnostico,
                tratamiento: result.analisis.tratamiento,
                prevencion: result.analisis.prevencion,
                nivelUrgencia: result.analisis.nivelUrgencia
              };

              await guardarEnHistorial(historialData);
              console.log('✅ Diagnóstico guardado en BD');
            } catch (historialError) {
              console.error('⚠️ Error al guardar en historial:', historialError);
              // No mostramos error al usuario, el análisis sigue siendo válido
            }

            // Pasar resultado al componente padre
            onAnalysisComplete(result.analisis);

            // Limpiar formulario
            setSelectedImage(null);
            setPreview(null);
          } else {
            setError(result.error || 'Error al analizar la imagen');
          }
        } catch (analysisError) {
          setError('Error al analizar la imagen. Por favor intenta de nuevo.');
          console.error('Analysis error:', analysisError);
        } finally {
          setLoading(false);
        }
      };

      reader.onerror = () => {
        setError('Error al leer la imagen');
        setLoading(false);
      };
    } catch (err) {
      setError('Error al procesar la imagen');
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-green-700 mb-4">
        📸 Subir Imagen de tu Planta
      </h2>

      <div className="space-y-4">
        {/* Input de archivo */}
        <div>
          <label
            htmlFor="image-upload"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Selecciona una imagen (PNG, JPG, WEBP - máx 10MB)
          </label>
          <input
            id="image-upload"
            type="file"
            accept="image/png,image/jpeg,image/jpg,image/webp"
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100 cursor-pointer"
            disabled={loading}
          />
        </div>

        {/* Preview de la imagen */}
        {preview && (
          <div className="mt-4">
            <p className="text-sm font-medium text-gray-700 mb-2">Vista previa:</p>
            <img
              src={preview}
              alt="Preview"
              className="max-w-full h-auto rounded-lg border-2 border-gray-200"
              style={{ maxHeight: '400px' }}
            />
          </div>
        )}

        {/* Errores */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {/* Botón de análisis */}
        <button
          onClick={handleAnalyze}
          disabled={!selectedImage || loading}
          className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-colors ${
            !selectedImage || loading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Analizando con IA...
            </span>
          ) : (
            '🔍 Analizar Planta'
          )}
        </button>

        {loading && (
          <p className="text-sm text-gray-600 text-center">
            Esto puede tomar entre 5-15 segundos...
          </p>
        )}
      </div>
    </div>
  );
}

export default ImageUpload;
