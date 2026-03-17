import { Mail, Phone, MapPin } from 'lucide-react'

export default function Contact() {
  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-text-main mb-2">Poďme sa<br /><span className="text-teal">porozprávať.</span></h1>
            <p className="text-text-secondary mb-8">Odpíšeme do 24 h. Žiadny spam.</p>
            <div className="space-y-3">
              {[
                { icon: Mail, label: 'E-mail', value: 'ahoj@socka.sk', href: 'mailto:ahoj@socka.sk' },
                { icon: Phone, label: 'Telefón', value: '0908 289 774', href: 'tel:+421908289774' },
                { icon: MapPin, label: 'Adresa', value: 'Košice, Slovensko' },
              ].map((c, i) => (
                <div key={i} className="flex items-center gap-4 p-4 bg-white border border-border-light rounded-xl">
                  <div className="w-10 h-10 bg-teal-50 rounded-xl flex items-center justify-center shrink-0"><c.icon size={18} className="text-teal" /></div>
                  <div>
                    <p className="text-xs text-text-muted">{c.label}</p>
                    {c.href ? <a href={c.href} className="text-sm font-medium text-text-main hover:text-teal">{c.value}</a> : <p className="text-sm font-medium text-text-main">{c.value}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white border border-border-light rounded-2xl p-8">
            <h2 className="font-[var(--font-display)] font-bold text-lg mb-6">Kontaktné údaje</h2>
            <p className="text-sm text-text-secondary">Pre rýchly kontakt napíš na <a href="mailto:ahoj@socka.sk" className="text-teal font-medium">ahoj@socka.sk</a> alebo zavolaj na <a href="tel:+421908289774" className="text-teal font-medium">0908 289 774</a>.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
