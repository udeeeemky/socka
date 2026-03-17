import { useState, useEffect } from 'react'

export default function CookieBar() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1000)
      return () => clearTimeout(timer)
    }
  }, [])

  const accept = () => { localStorage.setItem('cookie-consent', 'accepted'); setVisible(false) }
  const reject = () => { localStorage.setItem('cookie-consent', 'rejected'); setVisible(false) }

  if (!visible) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 max-w-xl mx-auto bg-white rounded-2xl border border-border-light shadow-xl p-5 animate-[slideUp_0.3s_ease-out]">
      <style>{`@keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }`}</style>
      <div className="flex items-start gap-3 mb-3">
        <span className="text-xl">🍪</span>
        <div>
          <h3 className="font-[var(--font-display)] font-bold text-sm text-text-main">Cookies</h3>
        </div>
      </div>
      <p className="text-sm text-text-secondary leading-relaxed mb-4">
        Táto stránka používa cookies na zlepšenie používateľského zážitku a analýzu návštevnosti. Používaním stránky súhlasíš s ich spracovaním podľa{' '}
        <a href="#" className="text-teal underline">zásad ochrany súkromia</a>.
      </p>
      <div className="flex gap-2 justify-end">
        <button onClick={reject} className="px-4 py-2 text-sm font-medium text-text-secondary border border-border-light rounded-full hover:bg-gray-50 transition-colors">
          Odmietnuť
        </button>
        <button onClick={accept} className="px-4 py-2 text-sm font-bold text-white bg-teal hover:bg-teal-dark rounded-full transition-colors">
          Súhlasím
        </button>
      </div>
    </div>
  )
}
