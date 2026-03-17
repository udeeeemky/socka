import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ChevronDown, Menu, X, Sun, Moon } from 'lucide-react'

const SERVICES = [
  { label: 'Tvorba webov', href: '/tvorba-webov' },
  { label: 'PPC správa', href: '/ppc-sprava' },
  { label: 'Sociálne siete', href: '/social-sprava' },
  { label: 'SEO optimalizácia', href: '/seo-optimalizacia' },
  { label: 'AI Search optimalizácia', href: '/ai-search-optimalizacia' },
  { label: 'Grafické práce', href: '/graficke-prace' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const location = useLocation()

  return (
    <>
      {/* Announcement banner */}
      <div className="bg-bg-light border-b border-border-light">
        <div className="max-w-6xl mx-auto px-4 py-2 flex items-center justify-center gap-2 text-xs sm:text-sm">
          <span className="bg-teal text-white text-[10px] font-bold uppercase px-2 py-0.5 rounded-full tracking-wider">Novinka</span>
          <Link to="/ai-search-optimalizacia" className="text-text-secondary hover:text-teal transition-colors">
            AI Search optimalizácia – buďte viditeľní v AI vyhľadávačoch
            <span className="ml-1">→</span>
          </Link>
        </div>
      </div>

      {/* Main nav */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-border-light">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2" onClick={() => setMobileOpen(false)}>
            <div className="w-8 h-8 bg-teal rounded-lg flex items-center justify-center text-white text-xs font-black font-[var(--font-display)]">CC</div>
            <span className="font-[var(--font-display)] font-extrabold text-lg text-text-main">socka</span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            <div className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-text-secondary hover:text-text-main transition-colors rounded-lg hover:bg-gray-50">
                Služby <ChevronDown size={14} />
              </button>
              {servicesOpen && (
                <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-xl border border-border-light shadow-lg py-2 z-50">
                  {SERVICES.map(s => (
                    <Link key={s.href} to={s.href} className="block px-4 py-2 text-sm text-text-secondary hover:text-teal hover:bg-teal-50 transition-colors">
                      {s.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <Link to="/cennik" className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${location.pathname === '/cennik' ? 'text-teal' : 'text-text-secondary hover:text-text-main hover:bg-gray-50'}`}>Cenník</Link>
            <Link to="/o-mne" className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${location.pathname === '/o-mne' ? 'text-teal' : 'text-text-secondary hover:text-text-main hover:bg-gray-50'}`}>O mne</Link>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Link to="/kontakt" className="bg-teal hover:bg-teal-dark text-white font-bold text-sm px-5 py-2.5 rounded-full transition-colors font-[var(--font-display)]">
              Kontakt
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button className="md:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-border-light bg-white px-4 py-4 space-y-1">
            <p className="text-xs font-semibold text-text-muted uppercase tracking-wider px-3 mb-2">Služby</p>
            {SERVICES.map(s => (
              <Link key={s.href} to={s.href} onClick={() => setMobileOpen(false)} className="block px-3 py-2 text-sm text-text-secondary hover:text-teal rounded-lg hover:bg-teal-50 transition-colors">
                {s.label}
              </Link>
            ))}
            <div className="border-t border-border-light my-2" />
            <Link to="/cennik" onClick={() => setMobileOpen(false)} className="block px-3 py-2 text-sm font-medium text-text-secondary hover:text-teal rounded-lg">Cenník</Link>
            <Link to="/o-mne" onClick={() => setMobileOpen(false)} className="block px-3 py-2 text-sm font-medium text-text-secondary hover:text-teal rounded-lg">O mne</Link>
            <Link to="/kontakt" onClick={() => setMobileOpen(false)} className="block mt-3 bg-teal text-white text-center font-bold text-sm py-3 rounded-full">Kontakt</Link>
          </div>
        )}
      </nav>
    </>
  )
}
