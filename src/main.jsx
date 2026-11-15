import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import './style.css'

const portrait = '/david-jelinek.png'
const email = import.meta.env.VITE_CONTACT_EMAIL?.trim()
const contact = email ? `mailto:${email}` : 'https://djelinek.tech/#contact-form'
const video = import.meta.env.VITE_MAILING_VIDEO_URL?.trim()

const icons = {
  chart: 'M4 19V5m0 14h16M8 15l4-4 3 2 5-6',
  mail: 'M3 6h18v12H3zM3 7l9 6 9-6',
  ads: 'M4 11v4h4l9 4V7l-9 4H4zm4 4 2 5m10-7h2',
  web: 'M3 5h18v14H3zM3 9h18m-13 4h8',
  arrow: 'M6 18 18 6M8 6h10v10',
}

function Icon({ name }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={icons[name]} /></svg>
}

const reports = [
  { name: 'Návštěvnost', value: '8 240', label: 'Návštěvy za 8 týdnů', series: [620, 720, 850, 790, 970, 1180, 1430, 1680], note: 'Odkud lidé přicházejí a které kanály přivádějí relevantní návštěvy?' },
  { name: 'Konverze', value: '310', label: 'Konverze za 8 týdnů', series: [20, 27, 24, 35, 36, 47, 56, 65], note: 'Které zdroje vedou k objednávce nebo poptávce a kde lidé odpadají?' },
]

const services = [
  { id: 'analytics', icon: 'chart', title: 'Google Analytics 4', text: 'Zjistím, jestli web měří správně a co se z dat dá vyčíst. Dostanete přehled výsledků i konkrétní kroky, které můžete udělat jako první.', items: ['Kontrola měření, událostí a konverzí', 'Analýza zdrojů návštěvnosti a nákupní cesty', 'Přehledné reporty a doporučení'] },
  { id: 'mailing', icon: 'mail', title: 'E-mail marketing', text: 'Připravím jednorázové kampaně i automatické série. Od návrhu šablony až po vyhodnocení výsledků.', items: ['Responzivní šablony a příprava kampaní', 'Segmentace publika a péče o databázi', 'Uvítací série, opuštěný košík a automatizace'] },
  { id: 'ads', icon: 'ads', title: 'Google Ads', text: 'Převezmu nebo nastavím kampaně a budu sledovat, jak se investice promítá do objednávek nebo poptávek.', items: ['Kontrola účtu, kampaní a konverzí', 'Správa rozpočtu, inzerátů a klíčových slov', 'Průběžná optimalizace a vyhodnocení'] },
  { id: 'obsah', icon: 'web', title: 'Obsah webů a e-shopů', text: 'Postarám se o každodenní správu obsahu ve vašem redakčním nebo e-shopovém systému.', items: ['Úpravy produktů, kategorií a stránek', 'Aktualizace textů, obrázků a bannerů', 'Základní SEO a kontrola obsahu po zveřejnění'] },
]

function Report() {
  const [selected, setSelected] = useState(0)
  const report = reports[selected]
  const max = Math.max(...report.series)
  return <section className="report" aria-labelledby="report-title">
    <div className="report-header">
      <div className="report-title"><span className="report-icon"><Icon name="chart" /></span><h2 id="report-title">Přehled výkonu</h2></div>
      <span className="demo">Ukázková data</span>
    </div>
    <div className="report-switch" role="group" aria-label="Metrika reportu">
      {reports.map((item, index) => <button key={item.name} type="button" aria-pressed={index === selected}
        onClick={() => setSelected(index)}>{item.name}</button>)}
    </div>
    <div aria-live="polite">
      <div className="metric"><strong>{report.value}</strong><span>{report.label}</span></div>
      <div className="graph" aria-hidden="true">
        {report.series.map((value, index) => <span key={index} style={{ height: `${value / max * 100}%` }} />)}
      </div>
      <div className="axis" aria-hidden="true"><span>1. týden</span><span>8. týden</span></div>
      <p className="report-note">{report.note}</p>
    </div>
  </section>
}

function App() {
  return <>
    <a className="skip" href="#uvod">Přeskočit na obsah</a>
    <header className="site-header">
      <div className="wrap header-inner">
        <a className="brand" href="#uvod"><span>DJ</span>David Jelínek</a>
        <nav aria-label="Hlavní navigace">
          <a href="#sluzby">Služby</a>
          <a href="#o-mne">O mně</a>
          <a className="nav-contact" href="#kontakt">Kontakt <Icon name="arrow" /></a>
        </nav>
      </div>
    </header>
    <main id="uvod">
      <section className="wrap hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <div className="identity">
            <img src={portrait} alt="David Jelínek" width="78" height="78" />
            <div><strong>David Jelínek</strong><span>Webová analytika & online marketing</span></div>
          </div>
          <h1 id="hero-title">Co vám data říkají <em>o vašem webu?</em></h1>
          <p>V Google Analytics zjistím, odkud přicházejí zákazníci, kde se ztrácejí a co se vyplatí zlepšit. Pomůžu vám i s mailingem, Google Ads a obsahem webu nebo e-shopu.</p>
          <div className="actions">
            <a className="button primary" href="#kontakt">Probrat spolupráci <Icon name="arrow" /></a>
            <a className="button secondary" href="#sluzby">Prohlédnout služby</a>
          </div>
        </div>
        <Report />
      </section>
      <section className="services-section" id="sluzby">
        <div className="wrap">
          <h2>S čím vám pomůžu</h2>
          <div className="services">
            {services.map(service => <article className="service" id={service.id} key={service.id}>
              <span className="service-icon"><Icon name={service.icon} /></span>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
              <ul>{service.items.map(item => <li key={item}>{item}</li>)}</ul>
              {service.id === 'mailing' && video && <video controls preload="none" src={video} aria-label="Ukázka přípravy e-mailové kampaně" />}
            </article>)}
          </div>
        </div>
      </section>
      <section className="wrap about" id="o-mne">
        <div>
          <h2>O mně</h2>
          <p>Jsem David Jelínek a věnuji se webové analytice a online marketingu. Baví mě propojit to, co vidím v datech, s tím, co se dá upravit v kampani, newsletteru nebo přímo na webu.</p>
        </div>
        <div>
          <h2>Jak spolupráce probíhá</h2>
          <ol>
            <li><strong>Ujasníme si cíl.</strong> Probereme, co chcete zjistit nebo zlepšit.</li>
            <li><strong>Podívám se na současný stav.</strong> Zjistím, co už funguje a kde má změna největší smysl.</li>
            <li><strong>Domluvíme se na dalších krocích.</strong> Může jít o jednorázovou analýzu i průběžnou správu.</li>
          </ol>
        </div>
      </section>
      <section className="wrap contact" id="kontakt">
        <div className="contact-panel">
          <div><h2>Máte projekt na mysli?</h2><p>Napište mi, co řešíte a s čím potřebujete pomoct.</p></div>
          <a className="button contact-button" href={contact}>Napsat Davidovi <Icon name="arrow" /></a>
        </div>
      </section>
    </main>
    <footer className="wrap footer"><span>© {new Date().getFullYear()} David Jelínek</span><a href="#uvod">Zpět nahoru ↑</a></footer>
  </>
}

createRoot(document.getElementById('root')).render(<App />)
