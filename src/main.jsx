import React, { useRef, useState } from 'react'
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
  { id: 'mailing', icon: 'mail', title: 'E-mail marketing', text: 'Připravím jednorázové kampaně i automatické série. Od návrhu šablony až po vyhodnocení výsledků.', items: ['Responzivní šablony a příprava kampaní', 'Nastavení odesílací domény a segmentace publika', 'Uvítací série, opuštěný košík a automatizace'] },
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


const channels = [
  { name: 'Organické vyhledávání', value: 42 },
  { name: 'Placené vyhledávání', value: 28 },
  { name: 'Přímé návštěvy', value: 20 },
  { name: 'E-mail', value: 10 },
]

function AnalyticsExample() {
  return <div className="service-example">
    <div className="example-head"><h4>Výkon webu za 8 týdnů</h4><span>Ukázková data</span></div>
    <dl className="analytics-stats">
      <div><dt>Návštěvy</dt><dd>8 240</dd></div>
      <div><dt>Aktivní uživatelé</dt><dd>5 680</dd></div>
      <div><dt>Klíčové události</dt><dd>310</dd></div>
    </dl>
    <h5>Zdroje návštěvnosti</h5>
    <ul className="channel-list">
      {channels.map(channel => <li key={channel.name}>
        <span>{channel.name}</span><strong>{channel.value} %</strong>
        <span className="channel-track" aria-hidden="true"><span style={{ width: `${channel.value}%` }} /></span>
      </li>)}
    </ul>
  </div>
}

function AdsExample() {
  return <div className="service-example">
    <div className="example-head"><h4>Struktura kampaně ve Vyhledávání</h4><span>Ukázka</span></div>
    <ul className="ads-tree">
      <li>
        <div><small>Kampaň</small><strong>Cyklistické vybavení</strong><span>Rozpočet · lokalita · strategie nabídek</span></div>
        <ul>
          <li>
            <div><small>Reklamní sestava</small><strong>Cyklistické helmy</strong><span>Klíčová slova · cílová stránka</span></div>
            <ul><li><div><small>Reklamy</small><strong>Helmy na silnici i do terénu</strong><span>Varianty titulků a popisů</span></div></li></ul>
          </li>
          <li>
            <div><small>Reklamní sestava</small><strong>Cyklistická světla</strong><span>Klíčová slova · cílová stránka</span></div>
            <ul><li><div><small>Reklamy</small><strong>Přední a zadní světla na kolo</strong><span>Varianty titulků a popisů</span></div></li></ul>
          </li>
        </ul>
      </li>
    </ul>
  </div>
}

const contentChanges = [
  ['Dámská běžecká bunda', 'Produkt', 'Upřesnění materiálu, doplnění velikostní tabulky a fotek.'],
  ['Výbava na běh', 'Kategorie', 'Přehlednější řazení produktů a krátký úvod pro zákazníky.'],
  ['Sezónní nabídka', 'Úvodní stránka', 'Výměna banneru, kontrola odkazu a zobrazení na mobilu.'],
]

function ContentExample() {
  return <div className="service-example">
    <div className="example-head"><h4>Co upravím v e-shopu</h4><span>Ukázka</span></div>
    <ul className="content-changes">
      {contentChanges.map(([title, type, change]) => <li key={title}>
        <small>{type}</small><strong>{title}</strong><span>{change}</span>
      </li>)}
    </ul>
  </div>
}

const mailingSteps = [
  ['Nastavení odesílací domény', 'Kontrola DNS záznamů SPF, DKIM a DMARC.'],
  ['Rozdělení publika', 'Noví odběratelé a vracející se zákazníci dostanou odlišné sdělení.'],
  ['Šablona a testování', 'Návrh e-mailu, který se dobře čte i na mobilu, a kontrola odkazů.'],
  ['Automatizace a vyhodnocení', 'Například uvítací série po přihlášení a vyhodnocení prokliků.'],
]

function MailingExample() {
  return <div className="service-example">
    {video ? <>
      <div className="example-head"><h4>Ukázka přípravy e-mailové kampaně</h4></div>
      <video controls preload="none" src={video} aria-label="Ukázka přípravy e-mailové kampaně" />
    </> : <>
      <div className="example-head"><h4>Jak vzniká e-mailová kampaň</h4><span>Ukázka</span></div>
      <ol className="mailing-steps">
        {mailingSteps.map(([title, description]) => <li key={title}>
          <div><strong>{title}</strong><span>{description}</span></div>
        </li>)}
      </ol>
    </>}
  </div>
}

const examples = {
  analytics: AnalyticsExample,
  mailing: MailingExample,
  ads: AdsExample,
  obsah: ContentExample,
}

function Services() {
  const [selected, setSelected] = useState(0)
  const tabs = useRef([])

  function moveBetweenTabs(event, index) {
    const positions = {
      ArrowLeft: (index - 1 + services.length) % services.length,
      ArrowRight: (index + 1) % services.length,
      Home: 0,
      End: services.length - 1,
    }
    const next = positions[event.key]
    if (typeof next !== 'number') return
    event.preventDefault()
    setSelected(next)
    tabs.current[next].focus()
  }

  return <section className="services-section" id="sluzby">
    <div className="wrap">
      <h2 id="services-title">S čím vám pomůžu</h2>
      <div className="service-tabs" role="tablist" aria-labelledby="services-title">
        {services.map((service, index) => <button key={service.id} type="button" role="tab"
          id={`tab-${service.id}`} aria-controls={service.id} aria-selected={selected === index}
          tabIndex={selected === index ? 0 : -1} ref={element => { tabs.current[index] = element }}
          onKeyDown={event => moveBetweenTabs(event, index)} onClick={() => setSelected(index)}>
          <span className="service-icon"><Icon name={service.icon} /></span>
          {service.title}
        </button>)}
      </div>
      {services.map((service, index) => {
        const Example = examples[service.id]
        return <div className="service" role="tabpanel" id={service.id} key={service.id}
          aria-labelledby={`tab-${service.id}`} hidden={selected !== index} tabIndex={0}>
          {selected === index && <>
            <div className="service-copy">
              <h3><span className="service-icon"><Icon name={service.icon} /></span>{service.title}</h3>
              <p>{service.text}</p>
              <ul>{service.items.map(item => <li key={item}>{item}</li>)}</ul>
            </div>
            <Example />
          </>}
        </div>
      })}
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
      <Services />
      <section className="wrap about" id="o-mne">
        <div>
          <h2>O mně</h2>
          <p>Jsem David Jelínek. Webové analytice a online marketingu se věnuji přes pět let. Baví mě propojit to, co vidím v datech, s tím, co se dá upravit v kampani, newsletteru nebo přímo na webu.</p>
        </div>
        <div>
          <h2>Jak spolupráce probíhá</h2>
          <ol>
            <li><strong>Řeknete mi, co potřebujete.</strong> Probereme třeba nový newsletter, úpravu e-shopu nebo kampaň, kterou chcete rozjet.</li>
            <li><strong>Domluvíme se na zadání.</strong> Ujasníme si rozsah, termín a podklady, které budu potřebovat.</li>
            <li><strong>Pustím se do práce.</strong> Výsledek spolu projdeme. Podle potřeby můžeme navázat průběžnou správou.</li>
          </ol>
        </div>
      </section>
      <section className="wrap contact" id="kontakt">
        <div className="contact-panel">
          <div><h2>S čím vám můžu pomoct?</h2><p>Rád vám pomůžu vyřešit konkrétní problém nebo navrhnu, co zlepšit na webu, v kampaních či mailingu.</p></div>
          <a className="button contact-button" href={contact}>Napište mi <Icon name="arrow" /></a>
        </div>
      </section>
    </main>
    <footer className="wrap footer"><span>© {new Date().getFullYear()} David Jelínek</span><a href="#uvod">Zpět nahoru ↑</a></footer>
  </>
}

createRoot(document.getElementById('root')).render(<App />)
