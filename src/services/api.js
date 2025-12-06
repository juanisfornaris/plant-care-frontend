// API Service - Actualizado con historial persistente

const API_BASE_URL = 'https://api.plantcaredebugger.com/api';

export const analyzePlant = async (imageBase64, mimeType) => {
  try {
    const response = await fetch(`${API_BASE_URL}/gemini/analizar-planta`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        imageBase64,
        mimeType
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error analyzing plant:', error);
    throw error;
  }
};

export const guardarEnHistorial = async (diagnostico) => {
  try {
    const response = await fetch(`${API_BASE_URL}/historial`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        imagenUrl: diagnostico.imagenUrl || null,
        identificacion: diagnostico.identificacion,
        estadoSalud: diagnostico.estadoSalud,
        diagnostico: diagnostico.diagnostico,
        tratamiento: diagnostico.tratamiento,
        prevencion: diagnostico.prevencion,
        nivelUrgencia: diagnostico.nivelUrgencia
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error saving to history:', error);
    throw error;
  }
};

export const obtenerHistorial = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/historial`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching history:', error);
    throw error;
  }
};

export const eliminarDiagnostico = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/historial/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error('Error al eliminar diagnóstico');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error eliminando diagnóstico:', error);
    throw error;
  }
};

export const analizarPlanta = async (imageFile) => {
  try {
    const reader = new FileReader();
    
    return new Promise((resolve, reject) => {
      reader.onloadend = async () => {
        try {
          const base64String = reader.result.split(',')[1];
          const mimeType = imageFile.type;
          
          const result = await analyzePlant(base64String, mimeType);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      };
      
      reader.onerror = () => reject(new Error('Error al leer la imagen'));
      reader.readAsDataURL(imageFile);
    });
  } catch (error) {
    console.error('Error en analizarPlanta:', error);
    throw error;
  }
};

// Alias para compatibilidad
export const eliminarDelHistorial = eliminarDiagnostico;
