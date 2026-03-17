import { Check } from 'lucide-react'

const SECTIONS = [
  { title: 'Konzultácie', subtitle: 'Rýchla jasnozrivosť', items: [
    { name: 'Konzultácia – 60 min', desc: 'Povieš čo riešiš, ja poviem čo spraviť.', price: '79 €', features: ['3–5 konkrétnych odporúčaní', 'Krátke zhrnutie po hovore'] },
    { name: 'Audit sociálnych sietí', desc: 'Prejdem ti profil a poviem, čo je OK a čo je chaos.', price: '189 €', priceSuffix: '/ 1 profil', features: ['Bio, vizuál, obsah, frekvencia', 'CTA, návrhy', 'Mini plán na 30 dní'] },
    { name: 'Obsahová stratégia na 30 dní', desc: 'Aby si každý týždeň neriešil čo mám postnúť.', price: '249 €', features: ['Rubriky a témy', 'Tón komunikácie', '30 nápadov', 'Odporúčaný mix formátov'] },
  ]},
  { title: 'Správa sociálnych sietí', subtitle: 'V každom balíku je plán, publikovanie, základné odpovede a mesačný prehľad.', items: [
    { name: 'ŠTART', desc: 'Keď chceš, aby to žilo a vyzeralo normálne.', price: '390 €', priceSuffix: '/ mes', features: ['8× post', '8× story', '1× video', 'Mesačný prehľad + odporúčania'] },
    { name: 'RAST', desc: 'Keď chceš pravidelnosť + zmysluplný progres.', price: '690 €', priceSuffix: '/ mes', popular: true, features: ['12× post', '12× story', '2× video', 'Odpovede/DM', 'Mesačný prehľad + plán'] },
    { name: 'FULL SERVIS', desc: 'Keď chceš výkon a nechceš to riešiť ty.', price: '1 090 €', priceSuffix: '/ mes', features: ['16× post', '16× story', '4× video', 'Odpovede/DM (60 min denne)', 'Mini check konkurencie', '2× prehľad'] },
  ]},
]

export default function Pricing() {
  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4"><span className="text-teal">Cenník</span></h1>
          <p className="text-text-secondary text-lg">Keď nevieš, čo vybrať: daj si konzultáciu. Ušetríš čas aj peniaze.</p>
        </div>
        {SECTIONS.map((sec, si) => (
          <div key={si} className="mb-16">
            <h2 className="text-2xl font-extrabold text-text-main mb-1">{sec.title}</h2>
            <p className="text-sm text-text-muted mb-8">{sec.subtitle}</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {sec.items.map((item, i) => (
                <div key={i} className={`relative bg-white border rounded-2xl p-6 ${item.popular ? 'border-teal/40 shadow-lg' : 'border-border-light'}`}>
                  {item.popular && <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-bold uppercase bg-teal text-white px-3 py-1 rounded-full">Najobľúbenejší</span>}
                  <h3 className="font-[var(--font-display)] font-bold text-text-main mb-1">{item.name}</h3>
                  <p className="text-sm text-text-secondary mb-4">{item.desc}</p>
                  <div className="mb-4">
                    <span className="text-2xl font-extrabold text-text-main font-[var(--font-display)]">{item.price}</span>
                    {item.priceSuffix && <span className="text-sm text-text-muted ml-1">{item.priceSuffix}</span>}
                  </div>
                  <ul className="space-y-2">
                    {item.features.map((f, fi) => (
                      <li key={fi} className="flex items-start gap-2 text-sm text-text-secondary">
                        <Check size={14} className="text-teal mt-0.5 shrink-0" />{f}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
