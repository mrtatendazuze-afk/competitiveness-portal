# Trade, Industry & Investment Competitiveness Dashboard — Zimbabwe 2026

Open-access, static dashboard. No login, no server code, no build step.

## Publish
Upload the whole folder to any web host and open `index.html`, or embed it:

    <iframe src="/tii-dashboard/index.html" title="Trade, Industry & Investment Competitiveness" style="width:100%;height:100vh;border:0"></iframe>

## The database: `data/database.js`
One file feeds every number, chart, tile and analysis text. Open it in a text editor, change a value, save, refresh.

| Section | What it controls |
|---|---|
| `meta` | Edition label, "Data as of" date, source line, citation, and `overview`: the four-sentence analysis on the home page |
| `pillars`, `domains` | Names of the three pillars and fourteen domains (`short` = matrix label) |
| `topics` | Colour-coded sections: label and colour |
| `quickFacts` | The eight Quick facts tiles |
| `keyFindings` | The nine Key findings cards and the section each links to. Keep every title near 33 characters and every description near 155 so all nine cards wrap to the same number of rows |
| `kpis` | Headline tiles at the top of each section |
| `charts` | Data behind every chart (`k` label, `v` value, `hl` highlight, `ph` placeholder, `d` display text, `c` colour) |
| `analysis` | Pop-up text behind each "Analysis" button, keyed by chart title |
| `comparisons` | Domain comparison analysis matrix, one entry per pair of domains in the same pillar, keyed `"domainA\|domainB"`. Keep `reading` at 35 words and `implication` at 15 words so every comparison reads the same length |
| `actions` | Policy actions and the indicators they are tracked against |
| `indicators` | The 95 scored indicators. `score` and `weight` drive all domain, pillar and index scores |

Scores are recalculated in the browser: domain = sum of weight x score; pillar = average of its domains; index = average of the pillars.
The opening sentence of each comparison analysis (scores, gap, stages) is written automatically from the live scores; `reading` (35 words) and `implication` (15 words) come from the matrix.
In `meta.overview`, `{tii}`, `{trade}`, `{industry}`, `{investment}` and any domain id such as `{5.2.2a}` are replaced with the live score when the page loads.

Chart titles, subtitles and source notes are in `js/app.js`.

## Pages (plain hash routes)
`#summary` (home), `#trade`, `#industry`, `#investment`, `#indicators`, `#recs`, `#method`

## Files
- `index.html` — shell, metadata, footer
- `data/database.js` — the database
- `js/data.js` — loads the database for the model (no data in it)
- `js/core.js` — scoring model and chart helpers (`hbar`, `cols`, `line`, `donut`, `sbar`, `prog`)
- `js/app.js` — pages, compare tool, navigation
- `css/styles.css`, `css/animations.css`, `js/transitions.js` — design, responsive rules, motion

## Before going live
- Placeholder values carry `"ph": 1` in the database and are drawn faded with an "Illustrative" tag.
- The Geist font loads from Google Fonts.
- Needs a current browser (Chrome/Edge 117+, Safari 16+, Firefox 110+).
