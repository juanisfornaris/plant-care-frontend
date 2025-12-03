# 🌱 Plant Care Debugger - Frontend Web

Frontend web en React para la aplicación de diagnóstico de plantas con IA.

## 📋 Requisitos Previos

- Node.js 18+ instalado
- npm o yarn
- Backend funcionando en Railway

## 🚀 Instalación

### Paso 1: Navegar al directorio
```bash
cd plant-care-frontend
```

### Paso 2: Instalar dependencias
```bash
npm install
```

### Paso 3: Verificar la URL del API
Abre el archivo `src/services/api.js` y confirma que la URL del backend es correcta:
```javascript
const API_BASE_URL = 'https://plant-care-api-production-52bf.up.railway.app/api';
```

## 🎯 Ejecutar en Desarrollo

```bash
npm run dev
```

La aplicación se abrirá automáticamente en `http://localhost:3000`

## 📦 Construir para Producción

```bash
npm run build
```

Los archivos de producción estarán en la carpeta `dist/`

## 🎨 Características

### 3 Pantallas Principales:

1. **Home/Upload** 🔍
   - Subir imagen de planta
   - Preview en tiempo real
   - Validación de archivos (máx 5MB)
   - Botón de análisis con loading state

2. **Resultado/Diagnóstico** 📊
   - Análisis completo de IA
   - Nivel de urgencia con colores:
     - 🚨 Alto (rojo)
     - ⚠️ Medio (amarillo)
     - ✅ Bajo (verde)
   - Identificación de la planta
   - Estado de salud
   - Diagnóstico detallado
   - Tratamiento recomendado
   - Prevención
   - Botones: Guardar y Analizar otra

3. **Historial** 📚
   - Lista de diagnósticos guardados
   - Filtros por nivel de urgencia
   - Expandir/contraer detalles
   - Ver información completa
   - Contador de análisis

## 🛠️ Tecnologías Utilizadas

- **React 18.2.0** - Framework principal
- **Vite** - Build tool y dev server
- **Tailwind CSS** - Framework de estilos
- **Fetch API** - Llamadas HTTP al backend

## 📁 Estructura del Proyecto

```
plant-care-frontend/
├── src/
│   ├── components/
│   │   ├── ImageUpload.jsx      # Pantalla de carga de imagen
│   │   ├── DiagnosisResult.jsx  # Pantalla de resultados
│   │   └── History.jsx           # Pantalla de historial
│   ├── services/
│   │   └── api.js                # Funciones para llamar al backend
│   ├── App.jsx                   # Componente principal
│   ├── main.jsx                  # Punto de entrada
│   └── index.css                 # Estilos globales
├── public/
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── README.md
```

## 🔗 Endpoints del Backend

- `POST /api/gemini/analizar-planta` - Análisis de imagen con IA
- `POST /api/users` - Crear usuario
- `GET /api/diagnostics` - Obtener diagnósticos
- `POST /api/plants` - Crear planta

## 💡 Consejos para Mejores Resultados

✓ Usa buena iluminación natural  
✓ Enfoca las partes afectadas de la planta  
✓ Asegúrate de que la imagen esté clara y nítida  
✓ Incluye hojas, tallos o flores en la foto

## 🐛 Solución de Problemas

### Error: "No se pudo conectar con el servidor"
- Verifica que el backend esté funcionando
- Confirma la URL del API en `src/services/api.js`
- Revisa la consola del navegador para más detalles

### Error: "La imagen es demasiado grande"
- Las imágenes deben ser menores a 5MB
- Reduce el tamaño o comprime la imagen

### La aplicación no se abre automáticamente
- Abre manualmente: `http://localhost:3000`
- Verifica que el puerto 3000 no esté en uso

## 📝 Notas

- El historial se guarda solo en el navegador (localStorage próximamente)
- Las imágenes se convierten automáticamente a base64
- El análisis puede tomar 5-15 segundos dependiendo del tamaño de la imagen

## 🎯 Próximas Mejoras

- [ ] Persistencia en backend
- [ ] Sistema de usuarios
- [ ] Exportar reportes en PDF
- [ ] Compartir diagnósticos
- [ ] Modo oscuro
- [ ] PWA para instalación móvil

## 👩‍💻 Desarrollado por

Juanis - UNAD Database & Software Quality Student

---

**Backend URL:** https://plant-care-api-production-52bf.up.railway.app  
**Version:** 1.0.0  
**Fecha:** Noviembre 2024
