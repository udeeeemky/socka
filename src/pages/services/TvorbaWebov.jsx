import { Link } from 'react-router-dom'
export default function TvorbaWebov() {
  return (<section className="py-16"><div className="max-w-3xl mx-auto px-4 text-center"><h1 className="text-4xl font-extrabold text-text-main mb-4">Tvorba <span className="text-teal">webov</span></h1><p className="text-text-secondary mb-8">Weby na mieru, ktoré menia návštevy na dopyty. UX-first prístup, Core Web Vitals, on-page SEO.</p><Link to="/kontakt" className="inline-block bg-teal hover:bg-teal-dark text-white font-bold px-8 py-4 rounded-full transition-colors font-[var(--font-display)]">Mám záujem</Link></div></section>)
}
