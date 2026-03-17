import { Link } from 'react-router-dom'

const SERVICES = [
  { label: 'Tvorba webov', href: '/tvorba-webov' },
  { label: 'PPC správa', href: '/ppc-sprava' },
  { label: 'Sociálne siete', href: '/social-sprava' },
]

const COMPANY = [
  { label: 'Cenník', href: '/cennik' },
  { label: 'O mne', href: '/o-mne' },
  { label: 'Kontakt', href: '/kontakt' },
]

export default function Footer() {
  return (
    <footer className="border-t border-border-light bg-white">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-teal rounded-lg flex items-center justify-center text-white text-xs font-black font-[var(--font-display)]">CC</div>
              <span className="font-[var(--font-display)] font-extrabold text-lg text-text-main">socka</span>
            </Link>
            <p className="text-sm text-text-muted leading-relaxed">Digitálny marketing bez bullshitu. Weby, PPC a sociálne siete pre lokálne firmy.</p>
          </div>
          <div>
            <h4 className="font-[var(--font-display)] font-bold text-sm text-text-main mb-4">Služby</h4>
            <ul className="space-y-2">
              {SERVICES.map(s => (
                <li key={s.href}><Link to={s.href} className="text-sm text-text-muted hover:text-teal transition-colors">{s.label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-[var(--font-display)] font-bold text-sm text-text-main mb-4">Spoločnosť</h4>
            <ul className="space-y-2">
              {COMPANY.map(s => (
                <li key={s.href}><Link to={s.href} className="text-sm text-text-muted hover:text-teal transition-colors">{s.label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-[var(--font-display)] font-bold text-sm text-text-main mb-4">Kontakt</h4>
            <ul className="space-y-2 text-sm text-text-muted">
              <li>Košice, Slovensko</li>
              <li><a href="mailto:ahoj@socka.sk" className="hover:text-teal transition-colors">ahoj@socka.sk</a></li>
              <li><a href="tel:+421908289774" className="hover:text-teal transition-colors">0908 289 774</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border-light pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-text-muted">
          <p>© {new Date().getFullYear()} socka.sk. Všetky práva vyhradené.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-teal transition-colors">Facebook</a>
            <a href="#" className="hover:text-teal transition-colors">Instagram</a>
            <a href="#" className="hover:text-teal transition-colors">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
