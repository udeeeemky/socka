import { useState, useEffect, useRef } from 'react'
import './App.css'

/* ─── Reveal wrapper ─── */
function Reveal({ children, delay = 0, className = '', tag: Tag = 'div', ...rest }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Already in viewport on mount → show immediately
    const rect = el.getBoundingClientRect()
    if (rect.top < window.innerHeight + 80 && rect.bottom > 0) {
      setVisible(true)
      return
    }

    // Below fold → watch with IntersectionObserver
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold: 0, rootMargin: '0px 0px -40px 0px' }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      className={`reveal${visible ? ' in' : ''}${className ? ' ' + className : ''}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  )
}

/* ─── Data ─── */
const CLIENTS = ['KFA Košice', 'Prosun', 'Qualident', 'AquaReina', 'Rubín', 'BMW', 'Adaptiware', 'NoName Solutions']

const SERVICES = [
  { slot: 'bento-1', icon: '🌐', title: 'Tvorba webov',       desc: 'Weby na mieru, ktoré konvertujú. UX-first prístup, Core Web Vitals, on-page SEO a merateľné výsledky — nie len pekný pixel.',     tags: ['UI/UX Design', 'Core Web Vitals', 'On-page SEO', 'CRO'] },
  { slot: 'bento-2', icon: '📢', title: 'PPC kampane',         desc: 'Google Ads, Meta Ads a porovnávače. Data-driven prístup. Žiadne hádzanie peňazí do tmy.',                                            tags: ['Google Ads', 'Meta Ads', 'A/B testy'] },
  { slot: 'bento-3', icon: '🔍', title: 'SEO optimalizácia',   desc: 'Technické SEO, obsah a linkbuilding. Organický rast, ktorý funguje aj bez reklamy.',                                                   tags: ['Tech SEO', 'Linkbuilding', 'Lokálne SEO'] },
  { slot: 'bento-4', icon: '📱', title: 'Sociálne siete',      desc: 'Stratégia, obsah a platená propagácia. Meriam KPI, nie len dosah.',                                                                     tags: ['Stratégia', 'Tvorba obsahu', 'Community'] },
  { slot: 'bento-5', icon: '🎨', title: 'Grafické práce',      desc: 'Vizuálna identita a social media grafika. Konzistentný brand, ktorý ťa odlíši.',                                                       tags: ['Brand identity', 'Bannery', 'Social'] },
]

const CASE_STUDIES = [
  { metric: '+312%', period: '6 mesiacov', name: 'Organický traffic',        client: 'E-shop s nábytkom', detail: 'Technické SEO + obsahová stratégia + linkbuilding' },
  { metric: '-28%',  period: '90 dní',     name: 'Náklady na akvizíciu',     client: 'Lokálna klinika',   detail: 'Reštrukturalizácia Google Ads kampaní + nové publiká' },
  { metric: '5,2×',  period: '120 dní',    name: 'ROAS (návratnosť reklamy)', client: 'Fashion e-shop',   detail: 'Meta Ads + dynamické produktové reklamy + retargeting' },
]

const TESTIMONIALS = [
  { quote: 'Grafiky i texty sú presne také, aké sme potrebovali — žiadne marketingové omáčky, len zmysluplná komunikácia.', name: 'Eva Kováčová',  role: 'Marketing manažérka, Adaptiware',  initials: 'EK', cls: '' },
  { quote: 'Rýchla reakcia, jednoduchá komunikácia, výsledky, ktoré vidieť. Konečne niekto, kto drží slovo.',               name: 'Martin Mináč',  role: 'Obchodný riaditeľ, BMW Košice',    initials: 'MM', cls: 't-avatar-b' },
  { quote: 'Konečne niekto, kto rozumie, čo potrebujeme a nerozpráva korporátnym jazykom. Spolupráca ako má byť.',          name: 'Ivan Takáč',    role: 'CEO, NoName Solutions',            initials: 'IT', cls: 't-avatar-c' },
]

const FAQS = [
  { q: 'Čo je PPC reklama?',                                   a: 'PPC (Pay-Per-Click) je forma platenej online reklamy, kde platíš len vtedy, keď niekto klikne na tvoju reklamu. Zahŕňa Google Ads, Meta Ads (Facebook/Instagram) a porovnávače produktov. Cieľom je získať relevantných návštevníkov za čo najnižšiu cenu.' },
  { q: 'Ako sa líši tvoja práca od agentúry?',                  a: 'S agentúrou komunikuješ cez account managera, ktorý si ťa prepíše ďalej. So mnou komunikuješ priamo s tým, kto tvoju kampaň reálne spravuje. Nie je tu overhead, nie sú zbytočné meetingy — len výsledky a priama komunikácia.' },
  { q: 'Koľko stojí digitálny marketing?',                      a: 'Cena závisí od rozsahu spolupráce — jednorazová tvorba webu, mesačná správa kampaní alebo kompletný digitálny marketing. Konkrétnu ponuku dostanem po krátkej úvodnej konzultácii.' },
  { q: 'Ako dlho trvá, kým uvidím výsledky?',                   a: 'Pri PPC kampaniach vidíš prvé výsledky do 2–4 týždňov. SEO optimalizácia je dlhodobejšia — prvé pozície sa typicky zlepšujú za 3–6 mesiacov. Web spravíme za 4–8 týždňov.' },
  { q: 'Čo je AI Search optimalizácia a prečo ju potrebujem?',  a: 'AI Search optimalizácia (AEO/GEO) zabezpečí, že tvoja firma sa objaví v odpovediach AI nástrojov ako ChatGPT, Perplexity alebo Gemini. Stále viac ľudí hľadá cez AI — a ty tam musíš byť viditeľný.' },
  { q: 'Pracuješ len s veľkými firmami?',                       a: 'Nie. Pracujem rovnako rád s malými lokálnymi podnikmi, e-shopmi aj stredne veľkými firmami. Dôležité je, že vieš čo chceš dosiahnuť — zvyšok vymyslíme spolu.' },
  { q: 'Ako začneme spoluprácu?',                               a: 'Napíš mi email alebo vyplň kontaktný formulár. Dohodnem bezplatnú konzultáciu (online alebo osobne), kde preberiem tvoje ciele, súčasný stav a možnosti. Žiadne záväzky.' },
]

const PLANS = [
  { name: 'Štart',    pop: false, cta: 'Pýtaj sa na cenu',  desc: 'Pre malé firmy a živnostníkov, ktorí chcú začať svoju prítomnosť online.',          items: ['Úvodná konzultácia a audit', 'Nastavenie 1 kanála', 'Mesačný reporting', 'Priama komunikácia'] },
  { name: 'Rast',     pop: true,  cta: 'Napíš mi →',        desc: 'Kompletný digitálny marketing pre firmy, ktoré chcú merateľne rásť.',                items: ['Web + PPC + Sociálne siete', 'SEO optimalizácia', 'Týždenný reporting', 'Prioritná komunikácia', 'A/B testovanie'] },
  { name: 'Na mieru', pop: false, cta: 'Porozprávajme sa',  desc: 'Pre firmy s individuálnymi potrebami a väčším rozsahom spolupráce.',                 items: ['Všetko z Rast balíka', 'AI Search optimalizácia', 'Grafické práce', 'Individuálna dohoda'] },
]

const NAV_LINKS = [
  { label: 'Služby',   href: '#sluzby' },
  { label: 'Výsledky', href: '#vysledky' },
  { label: 'O mne',    href: '#o-mne' },
  { label: 'Cenník',   href: '#cennik' },
  { label: 'FAQ',      href: '#faq' },
]

/* ─── Navbar ─── */
function Navbar() {
  const [open, setOpen] = useState(false)
  return (
    <nav role="navigation" aria-label="Hlavná navigácia" style={{ padding: '.75rem 1.25rem', position: 'sticky', top: 0, zIndex: 100 }}>
      <div className="navbar-inner">
        <a href="/" className="logo" aria-label="Socka – domovská stránka">
          <div className="logo-mark" aria-hidden="true">CC</div>
          socka
        </a>
        <ul className="nav-links" role="list">
          {NAV_LINKS.map(l => <li key={l.href}><a href={l.href}>{l.label}</a></li>)}
        </ul>
        <a href="#kontakt" className="btn btn-lime nav-cta" style={{ padding: '.55rem 1.3rem', fontSize: '.85rem' }}>
          Napíš mi →
        </a>
        <button
          className={`hamburger${open ? ' hamburger--open' : ''}`}
          aria-label={open ? 'Zatvoriť menu' : 'Otvoriť menu'}
          aria-expanded={open}
          onClick={() => setOpen(v => !v)}
        >
          <span /><span /><span />
        </button>
      </div>
      {open && (
        <div className="mobile-menu" role="dialog" aria-modal="true">
          <ul role="list">
            {NAV_LINKS.map(l => (
              <li key={l.href}><a href={l.href} onClick={() => setOpen(false)}>{l.label}</a></li>
            ))}
            <li><a href="#kontakt" className="btn btn-lime" onClick={() => setOpen(false)}>Napíš mi →</a></li>
          </ul>
        </div>
      )}
    </nav>
  )
}

/* ─── Hero ─── */
function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-h1">
      <div className="hero-blob hero-blob-1" aria-hidden="true" />
      <div className="hero-blob hero-blob-2" aria-hidden="true" />
      <div className="container">
        <div className="hero-grid">
          <div className="hero-content">
            <Reveal className="hero-pill-row" tag="div">
              <span className="pill">
                <span className="pill-dot" aria-hidden="true" />
                Dostupný pre nové projekty
              </span>
            </Reveal>
            <Reveal delay={80}>
              <h1 id="hero-h1">
                Marketing,{' '}
                <span className="lime hero-line-accent">ktorý naozaj</span>
                <br />funguje.
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="hero-sub">
                Som freelance digitálny marketér na Slovensku. Weby, PPC, SEO
                a sociálne siete — bez korporátnej omáčky, s priamou komunikáciou
                a merateľnými výsledkami.
              </p>
            </Reveal>
            <Reveal delay={240} className="hero-ctas">
              <a href="#kontakt" className="btn btn-lime btn-lg">Bezplatná konzultácia →</a>
              <a href="#sluzby" className="btn btn-outline btn-lg">Čo robím</a>
            </Reveal>
            <Reveal delay={320} className="hero-trust">
              <div className="hero-avatars" aria-hidden="true">
                <div className="hero-avatar">EK</div>
                <div className="hero-avatar">MM</div>
                <div className="hero-avatar">IT</div>
              </div>
              <p className="hero-trust-text">Dôverujú mi klienti ako BMW, KFA Košice a ďalší</p>
            </Reveal>
          </div>

          <aside className="hero-deco" aria-hidden="true">
            {CASE_STUDIES.map((cs, i) => (
              <Reveal key={i} delay={i * 100}>
                <div className="hero-stat-card">
                  <span className="hero-stat-num">{cs.metric}</span>
                  <span className="hero-stat-label">{cs.name}</span>
                  <span className="hero-stat-meta">{cs.client} · {cs.period}</span>
                </div>
              </Reveal>
            ))}
          </aside>
        </div>
      </div>
    </section>
  )
}

/* ─── Ticker ─── */
function Ticker() {
  const items = [...CLIENTS, ...CLIENTS]
  return (
    <div className="ticker-wrap" aria-label="Klienti">
      <div className="ticker-track" aria-hidden="true">
        {items.map((c, i) => (
          <div key={i} className="ticker-item">
            <span className="ticker-dot" />
            {c}
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─── Stats ─── */
function Stats() {
  return (
    <section className="stats-section" id="vysledky" aria-labelledby="stats-h">
      <div className="container">
        <Reveal className="section-header">
          <p className="eyebrow" id="stats-h">Reálne výsledky</p>
          <h2>Čísla, nie prísľuby.</h2>
          <p>Každá metrika je z reálneho projektu, nie z prezentácie.</p>
        </Reveal>
        <div className="stats-grid" role="list">
          {CASE_STUDIES.map((cs, i) => (
            <Reveal key={i} delay={i * 90} tag="article" role="listitem" className="stat-block">
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '.4rem' }}>
                <span className="stat-big">{cs.metric}</span>
                <span style={{ fontSize: '.78rem', color: 'var(--text-3)' }}>/ {cs.period}</span>
              </div>
              <p className="stat-name">{cs.name}</p>
              <div className="stat-context-row">
                <span className="stat-client-name">{cs.client}</span>
                <span className="stat-client-detail">{cs.detail}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Services bento ─── */
function Services() {
  return (
    <section className="bento-section" id="sluzby" aria-labelledby="services-h">
      <div className="container">
        <Reveal className="section-header">
          <p className="eyebrow" id="services-h">Moje služby</p>
          <h2>Všetko pre rast online,<br /><span className="lime">na jednom mieste.</span></h2>
        </Reveal>
        <div className="bento-grid">
          {SERVICES.map((s, i) => (
            <Reveal key={i} delay={i * 70} tag="article" className={`bento-card bento-card--lime ${s.slot}`}>
              <div className="bento-icon" aria-hidden="true">{s.icon}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <div className="bento-features" aria-label="Zahŕňa">
                {s.tags.map(t => <span key={t} className="bento-tag">{t}</span>)}
              </div>
              <a href="#kontakt" className="bento-link">Mám záujem →</a>
            </Reveal>
          ))}

          <Reveal tag="article" className="bento-card bento-card--featured bento-6">
            <div className="bento-6-inner">
              <div className="bento-6-text">
                <div style={{ marginBottom: '.75rem' }}><span className="badge">Novinka 2026</span></div>
                <div className="bento-icon" aria-hidden="true">✨</div>
                <h3>AI Search optimalizácia</h3>
                <p style={{ maxWidth: '480px', marginTop: '.5rem' }}>
                  AEO a GEO optimalizácia pre AI vyhľadávače. Buď viditeľný tam, kde ťa ľudia
                  skutočne hľadajú — v ChatGPT, Perplexity, Gemini a ďalších.
                </p>
                <a href="#kontakt" className="bento-link" style={{ marginTop: '1rem', display: 'inline-flex' }}>
                  Zistiť viac →
                </a>
              </div>
              <div className="bento-6-right">
                <div className="bento-ai-chips" aria-label="AI nástroje">
                  {['ChatGPT', 'Perplexity', 'Gemini', 'Copilot', 'Claude'].map(a => (
                    <div key={a} className="bento-ai-chip">{a}</div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ─── Testimonials ─── */
function Testimonials() {
  return (
    <section className="testimonials-section" aria-labelledby="t-h">
      <div className="container">
        <Reveal className="section-header section-header--center">
          <p className="eyebrow" id="t-h">Referencie</p>
          <h2>Čo hovoria klienti.</h2>
          <p>Žiadne vymyslené citáty. Len reálne reakcie od ľudí, s ktorými spolupracujem.</p>
        </Reveal>
        <div className="testimonials-grid">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={i} delay={i * 100} tag="figure" className="testimonial-card">
              <div className="testimonial-stars" aria-label="5 hviezdičiek">★★★★★</div>
              <blockquote className="testimonial-quote">"{t.quote}"</blockquote>
              <figcaption className="testimonial-author">
                <div className={`t-avatar ${t.cls}`} aria-hidden="true">{t.initials}</div>
                <div>
                  <span className="t-name">{t.name}</span>
                  <span className="t-role">{t.role}</span>
                </div>
              </figcaption>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── About ─── */
function About() {
  return (
    <section className="about-section" id="o-mne" aria-labelledby="about-h">
      <div className="container">
        <div className="about-inner">
          <Reveal className="about-left">
            <p className="eyebrow" id="about-h">Prečo práve ja</p>
            <h2 className="about-quote">
              Nechcem sa hrať na agentúru.{' '}
              <span className="lime">Chcem ti naozaj pomôcť.</span>
            </h2>
            <div className="about-nums" role="list">
              {[['20+', 'rokov v reklame'], ['10+', 'rokov v digitále'], ['500+', 'projektov']].map(([n, l]) => (
                <div key={l} className="about-num-block" role="listitem">
                  <span className="about-num">{n}</span>
                  <span className="about-num-label">{l}</span>
                </div>
              ))}
            </div>
            <div className="about-checklist" role="list">
              {[
                'Komunikuješ priamo so mnou, nie s juniorom',
                'Žiadny zbytočný overhead a korporátny slovník',
                'Transparentný reporting každý týždeň',
                'Rozumiem biznisu, nielen nástrojom',
              ].map(item => (
                <div key={item} className="about-check" role="listitem">
                  <div className="check-icon" aria-hidden="true">✓</div>
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <a href="#kontakt" className="btn btn-lime">Spoznajme sa →</a>
          </Reveal>

          <Reveal delay={180} className="about-right">
            <div className="about-card-big">
              <p className="about-card-motto">
                "Volajú ma Udemky. Robím digitálny marketing už roky — nie preto, lebo je to trendy,
                ale preto, lebo mi záleží na výsledkoch."
              </p>
              <p className="about-card-body">
                Nechcel som byť ďalší „digitálny expert" s prezentáciami. Chcel som robiť veci
                jednoducho, poctivo a tak, aby to aj fungovalo. Som niekto, komu napíšeš večer, lebo
                si nie si istý, čo dáš zajtra na Instagram — a dostanem ti odpoveď.
              </p>
              <div style={{ display: 'flex', gap: '.75rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
                <span className="pill">🎯 Data-driven prístup</span>
                <span className="pill">🤝 Priama komunikácia</span>
                <span className="pill">📊 Reálne výsledky</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ─── Pricing ─── */
function Pricing() {
  return (
    <section className="pricing-section" id="cennik" aria-labelledby="pricing-h">
      <div className="container">
        <Reveal className="section-header section-header--center">
          <p className="eyebrow" id="pricing-h">Cenník</p>
          <h2>Transparentné ceny,<br />žiadne prekvapenia.</h2>
          <p>Konkrétnu cenu dostanem vždy po krátkej konzultácii.</p>
        </Reveal>
        <div className="pricing-grid">
          {PLANS.map((p, i) => (
            <Reveal key={i} delay={i * 100} tag="article" className={`pricing-card${p.pop ? ' pricing-card--pop' : ''}`}>
              {p.pop && <div style={{ marginBottom: '.25rem' }}><span className="badge">Najobľúbenejší</span></div>}
              <p className="pricing-label">{p.name}</p>
              <p className="pricing-desc">{p.desc}</p>
              <div className="pricing-divider" />
              <ul className="pricing-items" role="list">
                {p.items.map(item => (
                  <li key={item} className="pricing-item" role="listitem">
                    <span className="pricing-item-icon">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <a href="#kontakt" className={`btn btn-full ${p.pop ? 'btn-lime' : 'btn-outline'}`} style={{ marginTop: 'auto' }}>
                {p.cta}
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── FAQ ─── */
function FAQ() {
  const [open, setOpen] = useState(null)
  return (
    <section className="faq-section" id="faq" aria-labelledby="faq-h">
      <div className="container">
        <div className="faq-inner">
          <Reveal className="faq-left">
            <p className="eyebrow" id="faq-h">FAQ</p>
            <h2>Máš otázky?<br /><span className="lime">Mám odpovede.</span></h2>
            <p>Zozbierané najčastejšie otázky od klientov. Ak nenájdeš čo hľadáš, napíš mi priamo.</p>
            <a href="#kontakt" className="btn btn-lime">Napíš mi priamo →</a>
          </Reveal>
          <div className="faq-list" role="list">
            {FAQS.map((item, i) => (
              <Reveal key={i} delay={i * 50} className={`faq-item${open === i ? ' faq-item--open' : ''}`} role="listitem">
                <button
                  className="faq-btn"
                  aria-expanded={open === i}
                  onClick={() => setOpen(open === i ? null : i)}
                >
                  <span>{item.q}</span>
                  <span className="faq-chevron" aria-hidden="true">
                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                      <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </button>
                {open === i && (
                  <div className="faq-body">
                    <p>{item.a}</p>
                  </div>
                )}
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Contact ─── */
function Contact() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '' })
  const up = f => e => setForm({ ...form, [f]: e.target.value })

  return (
    <section className="contact-section" id="kontakt" aria-labelledby="contact-h">
      <div className="container">
        <div className="contact-inner">
          <Reveal className="contact-left">
            <p className="eyebrow" id="contact-h">Kontakt</p>
            <h2>Poďme sa<br /><span className="lime">porozprávať.</span></h2>
            <p>Chceš posunúť marketing alebo web? Napíš mi. Prvá konzultácia je bezplatná a bez záväzkov. Odpisujem do 24 hodín.</p>
            <div className="contact-links">
              {[
                { icon: '📧', text: 'ahoj@socka.sk', href: 'mailto:ahoj@socka.sk' },
                { icon: '📞', text: '0908 289 774',   href: 'tel:+421908289774' },
                { icon: '📍', text: 'Slovensko',       href: null },
              ].map((l, i) => (
                <div key={i} className="contact-link-item">
                  <span className="contact-link-icon" aria-hidden="true">{l.icon}</span>
                  {l.href ? <a href={l.href}>{l.text}</a> : <span>{l.text}</span>}
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '.5rem', flexWrap: 'wrap' }}>
              <span className="pill">✓ Odpoveď do 24 hodín</span>
              <span className="pill">✓ Bez záväzkov</span>
            </div>
          </Reveal>

          <Reveal delay={150} className="contact-form-box">
            {sent ? (
              <div className="form-success" role="status" aria-live="polite">
                <div className="form-success-check" aria-hidden="true">✓</div>
                <h3>Správa odoslaná!</h3>
                <p>Ozvem sa ti do 24 hodín. Ďakujem!</p>
              </div>
            ) : (
              <form aria-label="Kontaktný formulár" noValidate onSubmit={e => { e.preventDefault(); setSent(true) }}>
                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label" htmlFor="name">Meno *</label>
                    <input id="name" className="form-input" type="text" required placeholder="Ján Novák" value={form.name} onChange={up('name')} />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="email">Email *</label>
                    <input id="email" className="form-input" type="email" required placeholder="jan@firma.sk" value={form.email} onChange={up('email')} />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="phone">Telefón</label>
                    <input id="phone" className="form-input" type="tel" placeholder="0900 000 000" value={form.phone} onChange={up('phone')} />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="service">Záujem o</label>
                    <select id="service" className="form-input" value={form.service} onChange={up('service')}>
                      <option value="">Vyber...</option>
                      <option>Tvorba webu</option>
                      <option>PPC kampane</option>
                      <option>Sociálne siete</option>
                      <option>SEO optimalizácia</option>
                      <option>AI Search optimalizácia</option>
                      <option>Kompletný marketing</option>
                    </select>
                  </div>
                  <div className="form-group form-group--full">
                    <label className="form-label" htmlFor="message">Správa *</label>
                    <textarea id="message" className="form-input" required rows="5" placeholder="Povedz mi niečo o tvojej firme a čo chceš dosiahnuť..." value={form.message} onChange={up('message')} />
                  </div>
                </div>
                <div className="form-submit">
                  <button type="submit" className="btn btn-lime btn-full">Odoslať správu →</button>
                </div>
                <p className="form-note">* Povinné polia. Tvoje dáta neposkytujem tretím stranám.</p>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ─── Footer ─── */
function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <a href="/" className="logo" aria-label="Socka – domovská stránka">
              <div className="logo-mark" aria-hidden="true">CC</div>
              socka
            </a>
            <p>Digitálny marketing bez bullshitu. Slovensko.</p>
          </div>
          <div className="footer-col">
            <h4>Navigácia</h4>
            <ul role="list">
              {NAV_LINKS.map(l => <li key={l.href}><a href={l.href}>{l.label}</a></li>)}
            </ul>
          </div>
          <div className="footer-col">
            <h4>Kontakt</h4>
            <ul role="list">
              <li><a href="mailto:ahoj@socka.sk">ahoj@socka.sk</a></li>
              <li><a href="tel:+421908289774">0908 289 774</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Právne</h4>
            <ul role="list">
              <li><a href="/gdpr">Ochrana osobných údajov</a></li>
              <li><a href="/cookies">Cookies</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Socka. Všetky práva vyhradené.</p>
          <p>Postavené s ☕ na Slovensku</p>
        </div>
      </div>
    </footer>
  )
}

/* ─── App ─── */
export default function App() {
  return (
    <>
      <a href="#hlavny-obsah" className="skip-link">Preskočiť na hlavný obsah</a>
      <Navbar />
      <main id="hlavny-obsah">
        <Hero />
        <Ticker />
        <Stats />
        <Services />
        <Testimonials />
        <About />
        <Pricing />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
