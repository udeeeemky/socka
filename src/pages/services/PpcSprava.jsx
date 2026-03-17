import { Link } from 'react-router-dom'
export default function PpcSprava() {
  return (<section className="py-16"><div className="max-w-3xl mx-auto px-4 text-center"><h1 className="text-4xl font-extrabold text-text-main mb-4">PPC <span className="text-teal">správa</span></h1><p className="text-text-secondary mb-8">Google Ads, Meta Ads a porovnávače. Data-driven prístup s A/B testami a týždenným reportingom.</p><Link to="/kontakt" className="inline-block bg-teal hover:bg-teal-dark text-white font-bold px-8 py-4 rounded-full transition-colors font-[var(--font-display)]">Mám záujem</Link></div></section>)
}
