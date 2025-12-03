# 🌱 GUÍA DE INSTALACIÓN PASO A PASO
## Plant Care Debugger - Frontend Web

---

## ⚡ INSTALACIÓN RÁPIDA (3 PASOS)

### PASO 1: Copiar el proyecto
1. Descarga todos los archivos del proyecto
2. Crea una carpeta llamada `plant-care-frontend` en tu computadora
3. Copia todos los archivos dentro de esa carpeta

### PASO 2: Instalar dependencias
```bash
cd plant-care-frontend
npm install
```
⏳ Esto tomará 1-2 minutos

### PASO 3: Iniciar la aplicación
```bash
npm run dev
```
✅ La app se abrirá automáticamente en http://localhost:3000

---

## 📋 INSTALACIÓN DETALLADA

### Requisitos Previos

**¿Tienes Node.js instalado?**
```bash
node --version
```
Si ves algo como `v18.x.x` o superior, ¡ya lo tienes! ✅

**Si NO tienes Node.js:**
1. Ve a https://nodejs.org/
2. Descarga la versión LTS (recomendada)
3. Instala siguiendo los pasos del instalador
4. Reinicia tu terminal
5. Verifica: `node --version`

---

### Estructura de Carpetas

Después de copiar todos los archivos, tu carpeta debe verse así:

```
plant-care-frontend/
├── src/
│   ├── components/
│   │   ├── ImageUpload.jsx
│   │   ├── DiagnosisResult.jsx
│   │   └── History.jsx
│   ├── services/
│   │   └── api.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
├── .gitignore
└── README.md
```

---

### Instalación de Dependencias

1. **Abre tu terminal** (CMD, PowerShell, Terminal, etc.)

2. **Navega a la carpeta del proyecto:**
```bash
cd ruta/donde/guardaste/plant-care-frontend
```

3. **Instala las dependencias:**
```bash
npm install
```

📦 Esto instalará:
- React 18.2.0
- Vite (build tool)
- Tailwind CSS
- Y todas las dependencias necesarias

⏳ Espera 1-2 minutos mientras se instala todo

✅ Verás un mensaje: "added XXX packages"

---

### Configurar la URL del Backend

**IMPORTANTE:** Verifica que la URL del backend esté correcta

1. Abre el archivo: `src/services/api.js`

2. En la primera línea verás:
```javascript
const API_BASE_URL = 'https://plant-care-api-production-52bf.up.railway.app/api';
```

3. Si tu backend está en otra URL, cámbiala aquí

---

### Iniciar la Aplicación en Modo Desarrollo

```bash
npm run dev
```

🎉 Verás algo como:

```
VITE v5.0.8  ready in 850 ms

➜  Local:   http://localhost:3000/
➜  Network: http://192.168.1.X:3000/
➜  press h to show help
```

La aplicación se abrirá automáticamente en tu navegador en:
**http://localhost:3000**

---

## 🎯 CÓMO USAR LA APLICACIÓN

### Pantalla 1: Analizar Planta
1. Haz clic en el área de carga de imagen
2. Selecciona una foto de tu planta (máx 5MB)
3. Verás un preview de la imagen
4. Haz clic en "🔍 Analizar Planta"
5. Espera 5-15 segundos mientras la IA analiza

### Pantalla 2: Ver Resultados
- Verás el nivel de urgencia con colores
- Identificación de la planta
- Estado de salud
- Diagnóstico completo
- Tratamiento recomendado
- Prevención

**Opciones:**
- 💾 Guardar en Historial
- 🔄 Analizar Otra Planta

### Pantalla 3: Historial
- Ve todos tus diagnósticos guardados
- Filtra por nivel de urgencia (Alto/Medio/Bajo)
- Haz clic en cualquier diagnóstico para ver detalles
- Contador de análisis realizados

---

## 🔧 COMANDOS ÚTILES

### Iniciar en modo desarrollo
```bash
npm run dev
```

### Construir para producción
```bash
npm run build
```
Los archivos estarán en la carpeta `dist/`

### Ver la versión de producción
```bash
npm run preview
```

### Detener el servidor
Presiona `Ctrl + C` en la terminal

---

## ❗ SOLUCIÓN DE PROBLEMAS

### Problema: "npm no es reconocido como comando"
**Solución:** Node.js no está instalado o no está en el PATH
1. Instala Node.js desde https://nodejs.org/
2. Reinicia tu terminal
3. Intenta de nuevo

### Problema: "Puerto 3000 ya está en uso"
**Solución:** Otro programa está usando ese puerto
1. Cierra otros servidores que estén corriendo
2. O cambia el puerto en `vite.config.js`:
```javascript
server: {
  port: 3001, // Cambia a otro puerto
  open: true
}
```

### Problema: "No se pudo conectar con el servidor"
**Solución:** El backend no está respondiendo
1. Verifica que el backend esté funcionando
2. Abre: https://plant-care-api-production-52bf.up.railway.app/api/health
3. Si no responde, revisa tu backend en Railway
4. Verifica la URL en `src/services/api.js`

### Problema: "La imagen es demasiado grande"
**Solución:** Reduce el tamaño de la imagen
1. Usa una herramienta para comprimir la imagen
2. O toma una foto con menor resolución
3. Máximo: 5MB

### Problema: Pantalla en blanco
**Solución:**
1. Abre la consola del navegador (F12)
2. Ve a la pestaña "Console"
3. Busca errores en rojo
4. Si dice "Failed to fetch", verifica la URL del backend

---

## 📱 ACCEDER DESDE TU MÓVIL (MISMA RED)

1. **En la terminal verás algo como:**
```
➜  Network: http://192.168.1.X:3000/
```

2. **Desde tu móvil:**
   - Conéctate a la misma WiFi que tu computadora
   - Abre el navegador
   - Escribe la URL que viste en "Network"
   - ¡Listo! Ya puedes usar la app desde tu móvil

---

## 🎨 PERSONALIZACIÓN

### Cambiar colores
Edita `tailwind.config.js` para agregar tus colores personalizados

### Cambiar el puerto
Edita `vite.config.js` en la sección `server`

### Cambiar el título
Edita `index.html` en la etiqueta `<title>`

---

## 📊 MÉTRICAS DEL PROYECTO

- ⚡ Tiempo de carga: ~850ms
- 📦 Tamaño bundle: ~200KB (gzipped)
- 🎨 Componentes: 3 principales
- 🔌 Endpoints usados: 4

---

## ✅ CHECKLIST DE VERIFICACIÓN

Antes de empezar a usar la app, verifica:

- [ ] Node.js instalado (v18+)
- [ ] Dependencias instaladas (`npm install`)
- [ ] Backend funcionando en Railway
- [ ] URL del backend correcta en `api.js`
- [ ] Servidor de desarrollo iniciado (`npm run dev`)
- [ ] Aplicación abierta en el navegador
- [ ] Sin errores en la consola

---

## 🆘 ¿NECESITAS AYUDA?

### Problemas comunes y soluciones rápidas:

1. **¿No instala las dependencias?**
   - Prueba: `npm cache clean --force`
   - Luego: `npm install`

2. **¿Errores de permisos?**
   - Windows: Ejecuta la terminal como Administrador
   - Mac/Linux: Usa `sudo npm install`

3. **¿Lentitud al analizar?**
   - Es normal, la IA de Gemini puede tomar 5-15 segundos
   - Depende del tamaño de la imagen

4. **¿No guarda el historial?**
   - Actualmente se guarda en memoria del navegador
   - Se borra al recargar la página
   - Próxima versión: guardado en backend

---

## 🎯 PRÓXIMOS PASOS

Una vez que tengas la app funcionando:

1. ✅ Prueba analizar una planta
2. ✅ Guarda el diagnóstico
3. ✅ Revisa el historial
4. ✅ Prueba los filtros de urgencia
5. ✅ Accede desde tu móvil

---

## 📞 SOPORTE

Si tienes problemas:
1. Revisa esta guía completa
2. Verifica la sección de "Solución de Problemas"
3. Revisa la consola del navegador (F12)
4. Verifica que el backend esté funcionando

---

¡Listo! Ahora tienes tu Plant Care Debugger funcionando 🌱✨
```
