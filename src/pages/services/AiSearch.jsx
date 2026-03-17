import { Link } from 'react-router-dom'
export default function AiSearch() {
  return (<section className="py-16"><div className="max-w-3xl mx-auto px-4 text-center"><span className="inline-block text-[10px] font-bold uppercase bg-teal text-white px-3 py-1 rounded-full mb-4">Novinka 2026</span><h1 className="text-4xl font-extrabold text-text-main mb-4">AI Search <span className="text-teal">optimalizácia</span></h1><p className="text-text-secondary mb-8">AEO a GEO optimalizácia pre AI vyhľadávače — ChatGPT, Perplexity, Gemini a ďalšie. Buď viditeľný tam, kde ťa ľudia skutočne hľadajú.</p><Link to="/kontakt" className="inline-block bg-teal hover:bg-teal-dark text-white font-bold px-8 py-4 rounded-full transition-colors font-[var(--font-display)]">Mám záujem</Link></div></section>)
}
