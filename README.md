# David Jelínek – portfolio

Jednostránkové portfolio v Reactu a Vite.

## Spuštění

Použijte Node.js 22 a npm.

```sh
npm install
npm run dev
```

Produkční sestavení vytvoří příkaz `npm run build` ve složce `dist`. Náhled sestavení spustíte příkazem `npm run preview`.

## Vercel

Importujte repozitář jako projekt s předvolbou Vite. Příkaz sestavení je `npm run build` a výstupní složka `dist`. Doménu přidejte v nastavení projektu až po kontrole náhledu.

## Kontakt a video

- `VITE_CONTACT_EMAIL` nastaví e-mail pro kontaktní tlačítko. Bez něj tlačítko vede na kontaktní formulář stávajícího webu. Před případným přesměrováním domény `djelinek.tech` nastavte e-mail, aby odkaz nepřišel o funkční cíl.
- `VITE_MAILING_VIDEO_URL` je volitelná přímá URL na MP4 nebo WebM. Soubor lze také vložit do `public/` a zadat např. `/mailing.mp4`. Bez URL se přehrávač skryje. Námět na krátkou ukázku: návrh šablony → výběr segmentu → nastavení automatizace → vyhodnocení kampaně.

Proměnné vložte lokálně do `.env.local` nebo do nastavení na Vercelu. Po změně vytvořte nové sestavení. Metriky v úvodním reportu jsou ilustrační.
