import { Link } from 'react-router-dom'
import { Target, Users, Zap, Award } from 'lucide-react'

const STATS = [['20+', 'ROKOV V REKLAME'], ['10+', 'ROKOV V DIGITÁLE'], ['500+', 'PROJEKTOV'], ['0', 'BULLSHITOV']]
const HOW = [
  { icon: Target, title: 'Výsledky, nie výhovorky', desc: 'Meriam všetko. Ak niečo nefunguje, poviem ti to a opravím.' },
  { icon: Users, title: 'Priamy kontakt', desc: 'Žiadni account manageri medzi. Komunikuješ priamo so mnou.' },
  { icon: Zap, title: 'Bez bullshitov', desc: 'Žiadne korporátne kecy. Hovorím na rovinu, robím rýchlo.' },
  { icon: Award, title: '20+ rokov skúseností', desc: 'Kombinácia tradičnej reklamy a moderného digitálu.' },
]

export default function About() {
  return (
    <>
      <section className="py-16 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-text-main mb-4">Marketing bez <span className="text-teal">bullshitu</span></h1>
          <p className="text-lg text-text-secondary mb-12">Toto nie je agentúra plná powerpointov. Toto je socka, čo ti spravuje marketing tak, ako by to spravil kamarát.</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {STATS.map(([n, l]) => (
              <div key={l} className="bg-white border border-border-light rounded-2xl p-6">
                <span className="text-3xl font-extrabold text-teal font-[var(--font-display)] block">{n}</span>
                <p className="text-[10px] font-semibold text-text-muted uppercase tracking-wider mt-2">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-extrabold text-text-main text-center mb-12">Ako pracujem</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {HOW.map((h, i) => (
              <div key={i} className="bg-bg-light border border-border-light rounded-2xl p-6">
                <div className="w-10 h-10 bg-teal-50 rounded-xl flex items-center justify-center mb-4"><h.icon size={20} className="text-teal" /></div>
                <h3 className="font-[var(--font-display)] font-bold text-text-main mb-2">{h.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 text-center">
        <div className="max-w-xl mx-auto px-4">
          <h2 className="text-3xl font-extrabold text-text-main mb-4">Poďme sa spoznať</h2>
          <p className="text-text-secondary mb-8">15 minút, bez záväzkov. Povieme si, čo potrebuješ a či ti viem pomôcť.</p>
          <Link to="/kontakt" className="inline-block bg-teal hover:bg-teal-dark text-white font-bold px-8 py-4 rounded-full transition-colors font-[var(--font-display)]">Dohodnúť stretnutie</Link>
        </div>
      </section>
    </>
  )
}
