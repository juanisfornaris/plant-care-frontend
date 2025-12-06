import { useState } from 'react';

function Footer() {
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(false);

  return (
    <>
      <footer className="bg-white mt-auto border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-gray-600 text-sm mb-3">
              Plant Care Debugger © 2025 - Diagnóstico inteligente de plantas con IA
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-500">
              <button
                onClick={() => setShowTerms(true)}
                className="hover:text-emerald-600 hover:underline transition-colors"
              >
                Términos y Condiciones
              </button>
              <span className="text-gray-300">|</span>
              <button
                onClick={() => setShowPrivacy(true)}
                className="hover:text-emerald-600 hover:underline transition-colors"
              >
                Política de Privacidad
              </button>
              <span className="text-gray-300">|</span>
              <button
                onClick={() => setShowDisclaimer(true)}
                className="hover:text-emerald-600 hover:underline transition-colors"
              >
                Descargo de Responsabilidad
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Modal Términos y Condiciones */}
      {showTerms && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowTerms(false)}>
          <div className="bg-white rounded-xl max-w-2xl max-h-[80vh] overflow-y-auto p-8" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">📜 Términos y Condiciones</h2>
            
            <div className="space-y-4 text-sm text-gray-700">
              <section>
                <h3 className="font-bold text-gray-800 mb-2">1. ACEPTACIÓN DE TÉRMINOS</h3>
                <p>Al usar Plant Care Debugger, aceptas estos términos. Si no estás de acuerdo, no uses el servicio.</p>
              </section>

              <section>
                <h3 className="font-bold text-gray-800 mb-2">2. NATURALEZA DEL SERVICIO</h3>
                <p>Plant Care Debugger utiliza Inteligencia Artificial (Google Gemini) para analizar imágenes de plantas. El servicio es completamente automatizado y no involucra revisión humana individual de cada diagnóstico.</p>
              </section>

              <section>
                <h3 className="font-bold text-gray-800 mb-2">3. LIMITACIONES</h3>
                <p>Los diagnósticos son orientativos y no sustituyen la consulta con un profesional especializado. La precisión puede variar según la calidad de la imagen y otros factores.</p>
              </section>

              <section>
                <h3 className="font-bold text-gray-800 mb-2">4. USO DEL SERVICIO</h3>
                <p>Puedes usar el servicio para fines personales y no comerciales. No está permitido el uso automatizado masivo o la reventa del servicio.</p>
              </section>

              <section>
                <h3 className="font-bold text-gray-800 mb-2">5. PROPIEDAD INTELECTUAL</h3>
                <p>Todo el contenido, diseño y funcionalidad del servicio son propiedad de Plant Care Debugger y están protegidos por leyes de propiedad intelectual.</p>
              </section>

              <section>
                <h3 className="font-bold text-gray-800 mb-2">6. MODIFICACIONES</h3>
                <p>Nos reservamos el derecho de modificar estos términos en cualquier momento. El uso continuado del servicio constituye aceptación de los cambios.</p>
              </section>
            </div>

            <button
              onClick={() => setShowTerms(false)}
              className="mt-6 w-full px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg font-medium hover:shadow-lg transition-all"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      {/* Modal Política de Privacidad */}
      {showPrivacy && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowPrivacy(false)}>
          <div className="bg-white rounded-xl max-w-2xl max-h-[80vh] overflow-y-auto p-8" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">🔒 Política de Privacidad</h2>
            
            <div className="space-y-4 text-sm text-gray-700">
              <section>
                <h3 className="font-bold text-gray-800 mb-2">1. INFORMACIÓN QUE RECOPILAMOS</h3>
                <p><strong>Imágenes:</strong> Las fotos que subes se procesan mediante Google Gemini AI. Las imágenes se almacenan temporalmente para proporcionar el servicio.</p>
                <p><strong>Diagnósticos:</strong> Guardamos el historial de tus diagnósticos para que puedas consultarlos posteriormente.</p>
                <p><strong>Datos técnicos:</strong> Recopilamos información técnica básica (navegador, dispositivo) para mejorar el servicio.</p>
              </section>

              <section>
                <h3 className="font-bold text-gray-800 mb-2">2. USO DE LA INFORMACIÓN</h3>
                <p>Usamos tu información para:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Proporcionar el servicio de diagnóstico</li>
                  <li>Mejorar la precisión de nuestros modelos de IA</li>
                  <li>Mantener tu historial de diagnósticos</li>
                  <li>Comunicarnos contigo sobre el servicio</li>
                </ul>
              </section>

              <section>
                <h3 className="font-bold text-gray-800 mb-2">3. COMPARTIR INFORMACIÓN</h3>
                <p>No vendemos tu información personal. Compartimos datos solo con:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li><strong>Google Gemini:</strong> Para procesar análisis de imágenes</li>
                  <li><strong>Proveedores de hosting:</strong> Para almacenar tu historial</li>
                </ul>
              </section>

              <section>
                <h3 className="font-bold text-gray-800 mb-2">4. SEGURIDAD</h3>
                <p>Implementamos medidas de seguridad para proteger tu información, incluyendo encriptación SSL y almacenamiento seguro en servidores protegidos.</p>
              </section>

              <section>
                <h3 className="font-bold text-gray-800 mb-2">5. TUS DERECHOS</h3>
                <p>Tienes derecho a:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Acceder a tu información</li>
                  <li>Eliminar tu historial</li>
                  <li>Solicitar la eliminación de tus datos</li>
                </ul>
              </section>

              <section>
                <h3 className="font-bold text-gray-800 mb-2">6. COOKIES</h3>
                <p>Usamos cookies técnicas esenciales para el funcionamiento del sitio. No usamos cookies de seguimiento publicitario.</p>
              </section>
            </div>

            <button
              onClick={() => setShowPrivacy(false)}
              className="mt-6 w-full px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg font-medium hover:shadow-lg transition-all"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      {/* Modal Descargo de Responsabilidad */}
      {showDisclaimer && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowDisclaimer(false)}>
          <div className="bg-white rounded-xl max-w-2xl max-h-[80vh] overflow-y-auto p-8" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">⚠️ Descargo de Responsabilidad</h2>
            
            <div className="space-y-4 text-sm text-gray-700">
              <section>
                <h3 className="font-bold text-gray-800 mb-2">1. NATURALEZA DEL SERVICIO</h3>
                <p>Plant Care Debugger utiliza tecnología de Inteligencia Artificial (IA) proporcionada por Google Gemini para analizar imágenes de plantas y proporcionar diagnósticos. El servicio es completamente automatizado y no involucra revisión humana individual de cada diagnóstico.</p>
              </section>

              <section>
                <h3 className="font-bold text-gray-800 mb-2">2. PRECISIÓN Y LIMITACIONES</h3>
                <p>Si bien nuestra IA ha sido entrenada con millones de imágenes y proporciona resultados de alta precisión, los diagnósticos deben considerarse como <strong>orientación educativa</strong> y no sustituyen la consulta con un profesional especializado en casos graves.</p>
              </section>

              <section>
                <h3 className="font-bold text-gray-800 mb-2">3. NO ES ASESORAMIENTO PROFESIONAL</h3>
                <p>Este servicio NO constituye:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Asesoramiento profesional de botánica</li>
                  <li>Servicio de consultoría agrícola certificado</li>
                  <li>Garantía de resultados específicos</li>
                </ul>
              </section>

              <section>
                <h3 className="font-bold text-gray-800 mb-2">4. LIMITACIÓN DE RESPONSABILIDAD</h3>
                <p>Plant Care Debugger no se hace responsable de:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Daños o pérdidas de plantas resultantes del uso de nuestras recomendaciones</li>
                  <li>Diagnósticos incorrectos o incompletos</li>
                  <li>Decisiones tomadas basándose exclusivamente en nuestro servicio</li>
                </ul>
              </section>

              <section>
                <h3 className="font-bold text-gray-800 mb-2">5. USO BAJO TU PROPIO RIESGO</h3>
                <p>Al usar este servicio, aceptas que lo haces bajo tu propio riesgo y responsabilidad. Recomendamos siempre consultar con profesionales especializados para casos críticos o valiosos.</p>
              </section>

              <section>
                <h3 className="font-bold text-gray-800 mb-2">6. PRODUCTOS QUÍMICOS Y TRATAMIENTOS</h3>
                <p>Cualquier recomendación de productos químicos, fertilizantes o tratamientos debe ser verificada con las regulaciones locales y aplicada siguiendo las instrucciones del fabricante.</p>
              </section>

              <section>
                <h3 className="font-bold text-gray-800 mb-2">7. SIN GARANTÍAS</h3>
                <p>El servicio se proporciona "tal cual" sin garantías de ningún tipo, expresas o implícitas, incluyendo pero no limitado a garantías de precisión, adecuación o comerciabilidad.</p>
              </section>
            </div>

            <button
              onClick={() => setShowDisclaimer(false)}
              className="mt-6 w-full px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg font-medium hover:shadow-lg transition-all"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Footer;
