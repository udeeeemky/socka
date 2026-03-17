import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Contact from './pages/Contact'
import About from './pages/About'
import Pricing from './pages/Pricing'
import TvorbaWebov from './pages/services/TvorbaWebov'
import PpcSprava from './pages/services/PpcSprava'
import SocialSprava from './pages/services/SocialSprava'
import SeoOptimalizacia from './pages/services/SeoOptimalizacia'
import AiSearch from './pages/services/AiSearch'
import GrafickePrace from './pages/services/GrafickePrace'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/kontakt" element={<Contact />} />
        <Route path="/o-mne" element={<About />} />
        <Route path="/cennik" element={<Pricing />} />
        <Route path="/tvorba-webov" element={<TvorbaWebov />} />
        <Route path="/ppc-sprava" element={<PpcSprava />} />
        <Route path="/social-sprava" element={<SocialSprava />} />
        <Route path="/seo-optimalizacia" element={<SeoOptimalizacia />} />
        <Route path="/ai-search-optimalizacia" element={<AiSearch />} />
        <Route path="/graficke-prace" element={<GrafickePrace />} />
      </Routes>
    </Layout>
  )
}
