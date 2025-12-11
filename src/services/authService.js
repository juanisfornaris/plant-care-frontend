import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  onAuthStateChanged 
} from 'firebase/auth';
import { auth } from '../firebase/config';

// URL de tu API backend (cambiar según tu ambiente)
const API_URL = 'https://api.plantcaredebugger.com/api';// Para desarrollo local
// const API_URL = 'https://plant-care-api-production-52bf.up.railway.app/api'; // Para producción

export const authService = {
  // Registro de nuevo usuario
  register: async (email, password) => {
    try {
      // 1. Registrar en Firebase
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // 2. Guardar en PostgreSQL
      try {
        const response = await fetch(`${API_URL}/users/firebase/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            firebase_uid: user.uid,
            email: user.email,
            nombre: email.split('@')[0] // Usar la parte del email como nombre por defecto
          })
        });
        
        if (!response.ok) {
          console.warn('Usuario guardado en Firebase pero no en BD:', response.statusText);
        }
      } catch (dbError) {
        console.warn('Error al guardar en base de datos:', dbError);
        // No lanzamos error aquí porque el usuario ya está en Firebase
      }
      
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  // Inicio de sesión
  login: async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  // Cerrar sesión
  logout: async () => {
    try {
      await signOut(auth);
    } catch (error) {
      throw new Error(error.message);
    }
  },

  // Monitorear si el usuario está logueado o no
  onAuthChange: (callback) => {
    return onAuthStateChanged(auth, callback);
  }
};