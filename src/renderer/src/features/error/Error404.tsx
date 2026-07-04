// src/renderer/src/features/error/Error404.tsx
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import './Error404.css'

// Importa la imagen del logo (asegúrate de que la ruta sea correcta)
import ivssLogo from '@renderer/assets/ivss.png'

export function Error404() {
  const navigate = useNavigate()
  const rootRef = useRef<HTMLDivElement | null>(null)

  // Alternar tema claro/oscuro solo en este componente
  const toggleTheme = () => {
    rootRef.current?.classList.toggle('light-mode')
  }

  // Volver atrás o redirigir al dashboard
  const handleGoBack = () => {
    if (window.history.length > 2) {
      window.history.back()
    } else {
      navigate('/dashboard', { replace: true })
    }
  }

  return (
    <div ref={rootRef} className="error-404-mode">
      <div className="lab-station">
        {/* ===== HEADER ===== */}
        <div className="lab-header">
          <div className="status-indicator alert">
            <span className="pulse-dot red"></span>
            <span className="status-text text-red">STATUS: ERROR 404</span>
          </div>
          <div className="system-title">IVSS BIO-SEARCH v2.6</div>
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label="Cambiar Modo de Iluminación"
            title="Cambiar Modo"
          >
            <span className="toggle-icon"></span>
          </button>
        </div>

        {/* ===== ÁREA PRINCIPAL ===== */}
        <div className="main-experimental-area">
          {/* Telemetría */}
          <div className="telemetry-panel">
            <div className="data-group">
              <span className="data-label">SEARCH_TARGET</span>
              <span className="data-value text-cyan">PAGE_PENSION</span>
            </div>
            <div className="data-group">
              <span className="data-label">EFFORT_REACH</span>
              <span className="data-value text-green">100%</span>
            </div>
            <div className="data-group">
              <span className="data-label">PROBABILITY</span>
              <span className="data-value text-pulse">0.00%</span>
            </div>
          </div>

          {/* Aparato: hámster y señuelo */}
          <div className="apparatus-shield">
            <div className="bait-system">
              <div className="blue-node"></div>
              <div className="vacuum-tube"></div>
              <div className="bait-holder">
                {/* ✅ Ahora la imagen se muestra con tamaño natural (sin comprimir) */}
                <img src={ivssLogo} alt="Señuelo IVSS" className="ivss-target" />
              </div>
            </div>

            <div className="laser-scanner"></div>

            {/* Hámster en la rueda */}
            <div
              className="wheel-and-hamster"
              aria-label="Hamster intentando alcanzar el IVSS en vano"
              role="img"
            >
              <div className="wheel">
                <div className="spoke"></div>
                <div className="spoke"></div>
                <div className="spoke"></div>
                <div className="spoke"></div>
              </div>
              <div className="hamster">
                <div className="hamster__body">
                  <div className="hamster__head">
                    <div className="hamster__ear"></div>
                    <div className="hamster__eye"></div>
                    <div className="hamster__nose"></div>
                  </div>
                  <div className="hamster__limb hamster__limb--fr"></div>
                  <div className="hamster__limb hamster__limb--fl"></div>
                  <div className="hamster__limb hamster__limb--br"></div>
                  <div className="hamster__limb hamster__limb--bl"></div>
                  <div className="hamster__tail"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ===== FOOTER ===== */}
        <div className="lab-footer">
          <div className="vent-line"></div>
          <div className="vent-line"></div>
          <div className="text-error-code">ESTA PÁGINA NO ESTÁ DISPONIBLE</div>
          <button className="btn-regresar" onClick={handleGoBack}>
            <span className="btn-scan-line"></span>
            REGRESAR
          </button>
        </div>
      </div>
    </div>
  )
}