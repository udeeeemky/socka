import { Link } from 'react-router-dom'
import { TrendingUp, TrendingDown, Target, Globe, Megaphone, Share2, Search, Paintbrush, Sparkles, ChevronDown, Mail, Phone, MapPin } from 'lucide-react'
import { useState } from 'react'

const CLIENTS = ['BMW', 'MINI', 'KFA Košice', 'Prosun', 'Qualident', 'Aquareina', 'Rubín']
const STATS = [
  { icon: TrendingUp, metric: '+312%', period: '/ 6 mes.', label: 'organický traffic' },
  { icon: TrendingDown, metric: '-28%', period: '/ 90 dní', label: 'CAC (náklady na akvizíciu)' },
  { icon: Target, metric: '5,2×', period: '/ 120 dní', label: 'ROAS' },
]
const SERVICES = [
  { icon: Globe, title: 'Tvorba webov', desc: 'Weby na mieru, ktoré menia návštevy na dopyty. UX, rýchlosť, konverzie.', href: '/tvorba-webov' },
  { icon: Megaphone, title: 'PPC správa', desc: 'Google Ads, Meta Ads a porovnávače. Hypotézy, A/B testy, týždenný reporting.', href: '/ppc-sprava' },
  { icon: Share2, title: 'Sociálne siete', desc: 'Stratégia, tvorba obsahu, reklamy a komunitný manažment. KPI, nie len dosah.', href: '/social-sprava' },
  { icon: Search, title: 'SEO optimalizácia', desc: 'Klasická optimalizácia pre vyhľadávače. Technické SEO, obsah a linkbuilding.', href: '/seo-optimalizacia' },
  { icon: Paintbrush, title: 'Grafické práce', desc: 'Vizuálna identita, bannery, social media grafika a všetko čo potrebuješ.', href: '/graficke-prace' },
  { icon: Sparkles, title: 'AI Search optimalizácia', desc: 'AEO a GEO optimalizácia pre AI vyhľadávače – ChatGPT, Perplexity, Gemini.', href: '/ai-search-optimalizacia', featured: true },
]
const TESTIMONIALS = [
  { quote: 'Grafiky i texty sú presne také, aké sme potrebovali — žiadne marketingové omáčky, len zmysluplná komunikácia.', initials: 'EK', company: 'Adaptiware' },
  { quote: 'Rýchla reakcia, jednoduchá komunikácia, výsledky, ktoré vidieť.', initials: 'MŠ', company: 'BMW Košice' },
  { quote: 'Konečne niekto, kto rozumie, čo potrebujeme a nerozpráva korporátnym jazykom. Spolupráca ako má byť.', initials: 'IT', company: 'NoName' },
]
const FAQS = [
  { q: 'Čo je PPC?', a: 'PPC (Pay-Per-Click) je forma platenej online reklamy, kde platíš len vtedy, keď niekto klikne na tvoju reklamu. Zahŕňa Google Ads, Meta Ads a porovnávače produktov.' },
  { q: 'Ako sa líši tvoja práca od agentúry?', a: 'S agentúrou komunikuješ cez account managera. So mnou komunikuješ priamo s tým, kto tvoju kampaň reálne spravuje. Žiadny overhead, žiadne zbytočné meetingy.' },
  { q: 'Koľko to stojí?', a: 'Cena závisí od rozsahu spolupráce. Konkrétnu ponuku dostanem po krátkej úvodnej konzultácii.' },
  { q: 'Ako dlho trvá, kým uvidím výsledky?', a: 'Pri PPC vidíš prvé výsledky do 2–4 týždňov. SEO sa zlepšuje za 3–6 mesiacov. Web spravíme za 4–8 týždňov.' },
  { q: 'Čo je AI Search optimalizácia a prečo ju potrebujem?', a: 'AEO/GEO optimalizácia zabezpečí, že tvoja firma sa objaví v odpovediach AI nástrojov ako ChatGPT, Perplexity alebo Gemini.' },
  { q: 'Pracuješ len s veľkými firmami?', a: 'Nie. Pracujem rovnako rád s malými lokálnymi podnikmi, e-shopmi aj stredne veľkými firmami.' },
  { q: 'Ako začneme spoluprácu?', a: 'Napíš mi email alebo vyplň kontaktný formulár. Dohodnem bezplatnú konzultáciu. Žiadne záväzky.' },
]

export default function Home() {
  const [openFaq, setOpenFaq] = useState(null)
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-teal-50/50 to-transparent pointer-events-none" />
        <div className="max-w-6xl mx-auto px-4 pt-28 sm:pt-36 pb-20 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white border border-border-light rounded-full px-4 py-1.5 text-sm text-text-secondary mb-8 shadow-sm">
            <Sparkles size={14} className="text-teal" />
            Digitálny marketing bez bullshitu
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-text-main mb-6 leading-[1.1]">
            Socka, čo ti naozaj<br /><span className="text-teal">pomôže rásť online</span>
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed">
            Toto nie je agentúra plná powerpointov a corporate bullshitov. Toto je socka, čo ti spravuje marketing tak, ako by to spravil kamarát — bez zbytočných kecov a s reálnymi výsledkami.
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap mb-16">
            <Link to="/kontakt" className="bg-teal hover:bg-teal-dark text-white font-bold px-7 py-3.5 rounded-full transition-colors font-[var(--font-display)] text-sm">
              Napíš mi →
            </Link>
            <a href="#sluzby" className="border border-border-light hover:border-teal/30 text-text-main font-bold px-7 py-3.5 rounded-full transition-colors font-[var(--font-display)] text-sm bg-white">
              Čo ti viem dať
            </a>
          </div>
          {/* Stats row */}
          <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-border-light shadow-sm p-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-border-light">
              {STATS.map((s, i) => (
                <div key={i} className="flex items-center gap-3 px-4 py-3 sm:py-0 justify-center">
                  <div className="w-10 h-10 bg-teal-50 rounded-xl flex items-center justify-center shrink-0">
                    <s.icon size={18} className="text-teal" />
                  </div>
                  <div className="text-left">
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-extrabold text-teal font-[var(--font-display)]">{s.metric}</span>
                      <span className="text-xs text-text-muted">{s.period}</span>
                    </div>
                    <p className="text-xs text-text-secondary">{s.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Client ticker */}
      <section className="border-y border-border-light bg-white py-5 overflow-hidden">
        <div className="flex items-center gap-3 mb-0">
          <p className="text-xs font-semibold text-text-muted uppercase tracking-wider pl-4 shrink-0">Dôverujú nám</p>
        </div>
        <div className="mt-3 overflow-hidden">
          <div className="flex gap-12 animate-ticker" style={{ width: 'max-content' }}>
            {[...CLIENTS, ...CLIENTS, ...CLIENTS].map((c, i) => (
              <span key={i} className="text-sm font-semibold text-text-muted/60 whitespace-nowrap uppercase tracking-wider">{c}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="sluzby" className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Moje služby</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-text-main mb-3">Všetko pre rast online</h2>
          <p className="text-text-secondary mb-12 max-w-lg">Weby, kampane a sociálne siete. Jedno miesto, jeden kontakt, reálne výsledky.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SERVICES.map((s, i) => (
              <Link key={i} to={s.href} className={`group relative bg-white border rounded-2xl p-6 transition-all hover:shadow-lg hover:-translate-y-0.5 ${s.featured ? 'border-teal/30 bg-teal-50/30 sm:col-span-2 lg:col-span-1' : 'border-border-light hover:border-teal/20'}`}>
                {s.featured && <span className="absolute top-4 right-4 text-[10px] font-bold uppercase bg-teal text-white px-2 py-0.5 rounded-full">Novinka</span>}
                <div className="w-10 h-10 bg-teal-50 rounded-xl flex items-center justify-center mb-4">
                  <s.icon size={20} className="text-teal" />
                </div>
                <h3 className="font-[var(--font-display)] font-bold text-text-main mb-2">{s.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed mb-4">{s.desc}</p>
                <span className="text-sm font-semibold text-teal group-hover:underline">Viac info →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Čo povedali klienti</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-text-main mb-3">Bez omáčok, len pravda</h2>
          <p className="text-text-secondary mb-12">Reálne reakcie od ľudí, s ktorými spolupracujem</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="bg-bg-light border border-border-light rounded-2xl p-6">
                <blockquote className="text-sm text-text-main leading-relaxed mb-6 italic">"{t.quote}"</blockquote>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-teal/10 text-teal rounded-full flex items-center justify-center text-xs font-bold">{t.initials}</div>
                  <span className="text-sm font-medium text-text-secondary">{t.company}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About teaser */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <blockquote className="text-xl sm:text-2xl font-bold text-text-main leading-relaxed max-w-3xl mx-auto mb-8 font-[var(--font-display)]">
            "Nechcem sa hrať na agentúru. Chcem ti naozaj pomôcť."
          </blockquote>
          <div className="grid grid-cols-3 gap-4 max-w-md mx-auto mb-8">
            {[['20+', 'rokov v reklame'], ['10+', 'rokov v digitále'], ['500+', 'projektov']].map(([n, l]) => (
              <div key={l}>
                <span className="text-3xl font-extrabold text-teal font-[var(--font-display)]">{n}</span>
                <p className="text-xs text-text-muted mt-1">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">FAQ</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-text-main mb-3">Často kladené otázky</h2>
          <p className="text-text-secondary mb-10">Odpovede bez omáčok</p>
          <div className="space-y-2">
            {FAQS.map((f, i) => (
              <div key={i} className={`border rounded-xl overflow-hidden transition-colors ${openFaq === i ? 'border-teal/30 bg-teal-50/20' : 'border-border-light'}`}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between px-5 py-4 text-left">
                  <span className="font-[var(--font-display)] font-bold text-sm text-text-main">{f.q}</span>
                  <ChevronDown size={16} className={`text-text-muted shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-4">
                    <p className="text-sm text-text-secondary leading-relaxed">{f.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA + Contact */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-text-main mb-4">Ozvi sa, poďme sa porozprávať</h2>
          <p className="text-text-secondary max-w-xl mx-auto mb-10">Ak chceš posunúť svoje sociálne siete, reklamu alebo web hore bez zbytočných kecov, napíš mi.</p>
          <Link to="/kontakt" className="inline-block bg-teal hover:bg-teal-dark text-white font-bold px-8 py-4 rounded-full transition-colors font-[var(--font-display)] mb-12">Napíš mi</Link>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
            {[
              { icon: Mail, label: 'Email', value: 'ahoj@socka.sk', href: 'mailto:ahoj@socka.sk' },
              { icon: Phone, label: 'Telefón', value: '0908 289 774', href: 'tel:+421908289774' },
              { icon: MapPin, label: 'Lokalita', value: 'Slovensko', href: null },
            ].map((c, i) => (
              <div key={i} className="bg-white border border-border-light rounded-xl p-4 text-center">
                <c.icon size={20} className="text-teal mx-auto mb-2" />
                <p className="text-xs text-text-muted mb-1">{c.label}</p>
                {c.href ? <a href={c.href} className="text-sm font-medium text-text-main hover:text-teal transition-colors">{c.value}</a> : <p className="text-sm font-medium text-text-main">{c.value}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
