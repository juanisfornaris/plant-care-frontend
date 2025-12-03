// API Service - Actualizado con historial persistente

const API_BASE_URL = 'https://plantcaredebugger.com/api';

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

// ========================================
// NUEVO: Guardar diagnóstico en historial (BD)
// ========================================
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

// ========================================
// NUEVO: Obtener historial desde BD
// ========================================
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

// ========================================
// NUEVO: Eliminar diagnóstico del historial
// ========================================
export const eliminarDelHistorial = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/historial/${id}`, {
      method: 'DELETE',
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
    console.error('Error deleting from history:', error);
    throw error;
  }
};
