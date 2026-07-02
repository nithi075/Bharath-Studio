import { Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import About from './components/About/About'
import Gallery from './components/Gallery/Gallery'
import Testimonials from './components/Testimonials/Testimonials'
import Contact from './components/Contact/Contact'
import Instagram from './components/instagram/instagram'
import FAQ from './components/FreequentQ/faq'
import Footer from './components/Footer/Footer'
import Portfolio from './components/Portfolio/Portfolio'
import ScrollToTop from './components/ScrollToTop'

import './App.css'
import Floating from './components/Floating/Floating'

function Home() {
  return (
    <main>
      <Hero />
      <About />
      
      <section id="gallery">

        <Gallery />

      </section>
      <Testimonials />
      <section id="contact">

        <Contact />

      </section>
      <Instagram />
      <FAQ />
      {/* <Floating/> */}
    </main>
  )
}

function App() {
  return (
    <div className="app">
      <ScrollToTop />

      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/portfolio" element={<Portfolio />} />


      </Routes>

      <Footer />
    </div>
  )
}

export default App