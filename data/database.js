/* =====================================================================================
   TRADE, INDUSTRY & INVESTMENT COMPETITIVENESS DASHBOARD — DATABASE
   This one file feeds every number, chart, tile and analysis text on the dashboard.

   How to edit
   - Open it in any text editor, change a value, save, and refresh the browser.
   - Keep the punctuation: text in "double quotes", numbers without quotes,
     a comma between items, and no comma after the last item in a list.
   - Changing an indicator's "score" or "weight" recalculates the domain, pillar
     and index scores everywhere.
   - Values marked "ph": 1 are placeholders and are drawn faded. Delete the "ph": 1
     when you replace one with a reported figure.
   - If the page goes blank after an edit, a comma or quote is out of place:
     undo the last change, or paste the file into jsonlint.com from the first { to the last }.
   ===================================================================================== */
window.TII_DB = {

  /* ---- meta ----
     Titles, edition label, data date and citation. "overview" is the four-sentence summary under the overall score; {tii}, {trade}, {industry}, {investment} and a domain id such as {5.2.2a} are replaced with the live scores. */
  "meta": {
    "title": "Trade, Industry & Investment",
    "edition": "2026",
    "country": "Zimbabwe",
    "dataAsOf": "October 2026",
    "publisher": "National Competitiveness Commission",
    "source": "NCC calculations based on the ZCR 2026 Scoring Framework.",
    "citation": "National Competitiveness Commission (2026). Zimbabwe Competitiveness Report 2026: Trade, Industry and Investment. Harare: NCC.",
    "overview": ["Zimbabwe scores {tii} out of 100 for trade, industry and investment competitiveness, with Trade ({trade}) ahead of Investment ({investment}) and Industry ({industry}).", "The score is lifted by the systems that administer trade and investment: Trade Facilitation ({5.1.3}), Investment Performance ({5.3.1a}), Investment Facilitation ({5.3.2}) and Standards ({5.1.5}) all score above 70.", "It is held back by productive outcomes, where Value Addition ({5.2.2a}), Pipeline and Conversion ({5.3.1b}) and Repatriation and Retention ({5.3.1c}) are the three weakest domains.", "Export earnings grew strongly but rest largely on gold, so further gains depend on diversifying exports, processing more output locally and turning approved investment into operating capacity."]
  },

  /* ---- pillars ----
     The three pillars. "key" is the page address (#trade, #industry, #investment). */
  "pillars": [
    {"id": "5.1", "key": "trade", "name": "Trade Competitiveness", "role": "Outward market gate"},
    {"id": "5.2", "key": "industry", "name": "Industry Competitiveness", "role": "Domestic production engine"},
    {"id": "5.3", "key": "investment", "name": "Investment Competitiveness", "role": "Capital enabler"}
  ],

  /* ---- domains ----
     The fourteen scored domains. "short" is the label used in the comparison matrix. */
  "domains": [
    {"id": "5.1.1", "name": "Export Performance", "pillar": "5.1", "short": "Exports"},
    {"id": "5.1.2", "name": "Trade Balance and Resilience", "pillar": "5.1", "short": "Balance"},
    {"id": "5.1.3", "name": "Trade Facilitation", "pillar": "5.1", "short": "Facilitation"},
    {"id": "5.1.4", "name": "Market Access", "pillar": "5.1", "short": "Market access"},
    {"id": "5.1.5", "name": "Standards and SPS", "pillar": "5.1", "short": "Standards"},
    {"id": "5.2.1", "name": "Manufacturing Capability", "pillar": "5.2", "short": "Manufacturing"},
    {"id": "5.2.2a", "name": "Value Addition", "pillar": "5.2", "short": "Value addition"},
    {"id": "5.2.2b", "name": "Extractives and Beneficiation", "pillar": "5.2", "short": "Extractives"},
    {"id": "5.2.3", "name": "Enterprise Environment and Innovation", "pillar": "5.2", "short": "Enterprise"},
    {"id": "5.3.1a", "name": "Investment Performance", "pillar": "5.3", "short": "Performance"},
    {"id": "5.3.1b", "name": "Pipeline and Conversion", "pillar": "5.3", "short": "Pipeline"},
    {"id": "5.3.1c", "name": "Repatriation and Retention", "pillar": "5.3", "short": "Retention"},
    {"id": "5.3.2", "name": "Investment Facilitation", "pillar": "5.3", "short": "Facilitation"},
    {"id": "5.3.3a", "name": "Investment Structure", "pillar": "5.3", "short": "Structure"}
  ],

  /* ---- topics ----
     Colour-coded sections. "id" is the section anchor, "page" the page it sits on, "colour" any CSS colour. */
  "topics": [
    {"id": "s-5-1-1", "page": "trade", "label": "Exports", "colour": "#2a78d6"},
    {"id": "s-5-1-2", "page": "trade", "label": "Trade balance", "colour": "#0097a7"},
    {"id": "s-5-1-3", "page": "trade", "label": "Border & customs", "colour": "#6250d6"},
    {"id": "s-5-1-4", "page": "trade", "label": "Market access", "colour": "#d55181"},
    {"id": "s-5-1-5", "page": "trade", "label": "Standards", "colour": "#7f9a1c"},
    {"id": "s-5-2-1", "page": "industry", "label": "Manufacturing", "colour": "#2a78d6"},
    {"id": "s-5-2-2a", "page": "industry", "label": "Value addition", "colour": "#e8875a"},
    {"id": "s-gold", "page": "industry", "label": "Gold", "colour": "#d9a514"},
    {"id": "s-5-2-2b", "page": "industry", "label": "Mineral beneficiation", "colour": "#0097a7"},
    {"id": "s-5-2-3", "page": "industry", "label": "Power, finance & innovation", "colour": "#6250d6"},
    {"id": "s-5-3-1a", "page": "investment", "label": "FDI & conversion", "colour": "#2a78d6"},
    {"id": "s-5-3-1c", "page": "investment", "label": "Retention", "colour": "#0097a7"},
    {"id": "s-5-3-2", "page": "investment", "label": "Licensing & facilitation", "colour": "#6250d6"},
    {"id": "s-5-3-3a", "page": "investment", "label": "Sector & location", "colour": "#7f9a1c"}
  ],

  /* ---- quickFacts ----
     The eight tiles in the Quick facts band. Keep the count a multiple of 4 so the grid stays full. */
  "quickFacts": [
    {"label": "Goods exports", "value": "$9.71 bn", "note": "+30.2% on 2024"},
    {"label": "Nominal GDP", "value": "$35.05 bn", "note": "2025"},
    {"label": "Net FDI inflows", "value": "$380 mn", "note": "1.9% of GDP"},
    {"label": "Current account", "value": "+6.0%", "note": "of GDP · $2.1 bn surplus"},
    {"label": "Manufacturing value added", "value": "11.5%", "note": "of GDP · 12.9% in 2021"},
    {"label": "Capacity utilisation", "value": "61.2%", "note": "up from 57.0%"},
    {"label": "Gold export earnings", "value": "$4.61 bn", "note": "47% of goods exports"},
    {"label": "Reserve cover", "value": "1.6 months", "note": "of imports"}
  ],

  /* ---- keyFindings ----
     The nine Key findings cards. "topic" is the id of the section the card links to. */
  "keyFindings": [
    {"title": "Administration leads performance", "text": "Trade facilitation scores 77.8 and investment facilitation 75.0, while export performance reaches only 43.8 and the conversion of licensed projects just 31.3.", "topic": "s-5-1-1"},
    {"title": "Export growth rests on one metal", "text": "Gold delivered 92.6% of the 2025 rise in export earnings, and three commodities together generate 75.5% of receipts, leaving the base narrow and exposed.", "topic": "s-gold"},
    {"title": "Value addition is the weakest link", "text": "Value addition scores 22.9, the lowest of the fourteen domains: processed agricultural exports reach only 0.14 for every 1 of raw exports leaving the country.", "topic": "s-5-2-2a"},
    {"title": "Licences are not becoming capital", "text": "US$3.26 billion of licensed projects produced US$380 million of net foreign investment, a conversion rate of 11.7% once approvals reach operating capacity.", "topic": "s-5-3-1a"},
    {"title": "Borders clear faster than peers", "text": "Export consignments clear customs in 3.3 days and imports in 2.6, against Sub-Saharan medians of 6.4 and 10.4 days, making the border a genuine strength.", "topic": "s-5-1-3"},
    {"title": "Continental preferences go unused", "text": "97% of tariff lines sit in the AfCFTA schedule, yet preference utilisation stands at 0.00% and only 15 exporters hold authorised economic operator status.", "topic": "s-5-1-4"},
    {"title": "Factories run well below capacity", "text": "Capacity utilisation is 61.2%, leaving two-fifths of plant idle, and medium- and high-technology goods make up only 9.5% of manufacturing value added here.", "topic": "s-5-2-1"},
    {"title": "Capital enters fast, leaves slowly", "text": "A construction permit takes 6.7 days, the fastest among all peers, while dividend repatriation still takes 120 days against a regional 30-day benchmark.", "topic": "s-5-3-1c"},
    {"title": "Unreliable power holds back industry", "text": "52.5% of formal firms report outages averaging 3.8 a month, and 78.3% of fixed assets are funded internally because bank credit reaches few manufacturers.", "topic": "s-5-2-3"}
  ],

  /* ---- kpis ----
     Headline tiles shown at the top of each section: label, value, note and optional unit. */
  "kpis": {
    "export_value_2025": [
      {"label": "Export value, 2025", "value": "$9.71", "note": "+30.2% on 2024", "unit": "bn"},
      {"label": "4-year export CAGR", "value": "12.6%", "note": "SADC average 1.7%", "unit": ""},
      {"label": "Top-3 commodity share", "value": "75.5%", "note": "Gold, nickel mattes, tobacco · reformer target &lt;60%", "unit": ""},
      {"label": "Gold share of 2025 growth", "value": "92.6%", "note": "Non-gold exports added $0.165 bn", "unit": ""}
    ],
    "goods_trade_balance_2025": [
      {"label": "Goods trade balance 2025", "value": "−$414", "note": "from −$2.10 bn in 2024", "unit": "mn"},
      {"label": "Current account", "value": "+6.0%", "note": "of GDP · $2.1 bn surplus", "unit": ""},
      {"label": "Reserve cover", "value": "1.6", "note": "months of imports · $1.6 bn", "unit": ""},
      {"label": "Capital goods share of imports", "value": "18.3%", "note": "benchmark 25%", "unit": ""},
      {"label": "Largest import source", "value": "37.6%", "note": "risk ceiling 50%", "unit": ""},
      {"label": "Largest export destination", "value": "48.7%", "note": "UAE gold shipments", "unit": ""}
    ],
    "afcfta_preference_utilisation": [
      {"label": "AfCFTA preference utilisation", "value": "0.00%", "note": "0.05% (≈$1.37 mn) lifts it off zero", "unit": ""},
      {"label": "Tariff lines in AfCFTA schedule", "value": "97%", "note": "implementing SIs still in draft", "unit": ""},
      {"label": "OSBP corridor coverage", "value": "100%", "note": "active corridors", "unit": ""},
      {"label": "AEO certified exporters", "value": "15", "note": "Kenya 370 · South Africa 831", "unit": ""}
    ],
    "sadcas_accredited_laboratories": [
      {"label": "SADCAS-accredited laboratories", "value": "47", "note": "not the binding constraint", "unit": ""},
      {"label": "Standards harmonised", "value": "2,400", "note": "South Africa 7,000+ · Kenya 7,900", "unit": ""},
      {"label": "e-Phyto / e-SPS hub", "value": "Pilot", "note": "Kenya, South Africa fully digital", "unit": ""},
      {"label": "Perishable clearance index", "value": "Planning", "note": "UNTF 2025 stage", "unit": ""}
    ],
    "manufacturing_output_growth": [
      {"label": "Manufacturing output growth", "value": "4.3%", "note": "annualised 2024–Q1 2026 · benchmark &gt;5%", "unit": ""},
      {"label": "Manufacturing share of employment", "value": "4.9%", "note": "SADC aggregate 5.0%", "unit": ""},
      {"label": "UNIDO CIP rank", "value": "108th", "note": "score 0.01098 · ambition top 100", "unit": ""},
      {"label": "Capacity utilisation", "value": "61.2%", "note": "<span class=\"up\">▲</span> from 57.0% · 2026 target 58%", "unit": ""}
    ],
    "gold_export_earnings_2025": [
      {"label": "Gold export earnings 2025", "value": "$4.61", "note": "almost tripled since 2021", "unit": "bn"},
      {"label": "Gold output 2025", "value": "46.7", "note": "tonnes · earnings outpaced volume", "unit": ""},
      {"label": "Artisanal &amp; small-scale share", "value": "74.6%", "note": "34.87 t of deliveries", "unit": ""},
      {"label": "Share of fiscal revenue", "value": "22.0%", "note": "generated by small-scale gold production", "unit": ""}
    ],
    "firms_affected_by_outages": [
      {"label": "Firms affected by outages", "value": "52.5%", "note": "of formal firms", "unit": ""},
      {"label": "Outages per month", "value": "3.8", "note": "average", "unit": ""},
      {"label": "Management practices", "value": "54.8", "note": "SSA average 47.5", "unit": ""},
      {"label": "Product innovation", "value": "31.6%", "note": "of firms", "unit": ""},
      {"label": "Process innovation", "value": "19.4%", "note": "of firms", "unit": ""},
      {"label": "Fixed assets funded internally", "value": "78.3%", "note": "bank credit reaches 23.1% of firms", "unit": ""}
    ],
    "net_fdi_inflows": [
      {"label": "Net FDI inflows", "value": "$380", "note": "below $500 mn NDS2 target", "unit": "mn"},
      {"label": "Inward FDI stock", "value": "$8.45", "note": "75.8% of inward stock is FDI", "unit": "bn"},
      {"label": "FDI share of private inflows", "value": "79.5%", "note": "dominant external capital", "unit": ""},
      {"label": "Outward greenfield 2021–25", "value": "$157", "note": "nine projects", "unit": "mn"}
    ],
    "repatriation_wait_time": [
      {"label": "Repatriation wait time", "value": "120 days", "note": "from 180 days in 2022 · SADC &lt;30", "unit": ""},
      {"label": "Net foreign capital retention", "value": "0.65", "note": "SSA median ≈0.55", "unit": ""},
      {"label": "Dividends &amp; remittances", "value": "32.5%", "note": "of FDI inflows", "unit": ""},
      {"label": "Debt service to dividends", "value": "1.85x", "note": "retention friction ≈0.14x", "unit": ""}
    ],
    "investment_licences": [
      {"label": "Investment licences", "value": "665", "note": "2024 · from 267 in 2022", "unit": ""},
      {"label": "e-Regulations · OSISC", "value": "100%", "note": "12 of 12 agencies co-located", "unit": ""}
    ],
    "beneficiation_alignment_index": [
      {"label": "Beneficiation Alignment Index", "value": "0.28x", "note": "$0.28 to manufacturing per $1 to mining", "unit": ""},
      {"label": "Active source countries", "value": "24", "note": "target &gt;40", "unit": ""},
      {"label": "Origin concentration (HHI)", "value": "3,800", "note": "target &lt;3,000", "unit": ""},
      {"label": "Investment outside Harare &amp; Bulawayo", "value": "38%", "note": "benchmark 50%", "unit": ""}
    ]
  },

  /* ---- charts ----
     Data behind every chart. k = label, v = value, hl = 1 highlights Zimbabwe, ph = 1 marks a placeholder value (shown faded), d = display text that overrides the formatted value, c = colour. */
  "charts": {
    "export_growth_peers": [
      {"k": "Uganda", "v": 33.2},
      {"k": "Zimbabwe", "v": 12.6, "hl": 1},
      {"k": "Mozambique", "v": 9.1},
      {"k": "Kenya", "v": 6.3},
      {"k": "Zambia", "v": 4.7},
      {"k": "SADC average", "v": 1.7},
      {"k": "South Africa", "v": -1.1},
      {"k": "Malawi", "v": -1.6}
    ],
    "export_intensity_peers": [
      {"k": "Zambia", "v": 44.4},
      {"k": "Mozambique", "v": 32.2},
      {"k": "South Africa", "v": 29.6},
      {"k": "Zimbabwe", "v": 27.7, "hl": 1},
      {"k": "Uganda", "v": 14.3},
      {"k": "Malawi", "v": 8.2},
      {"k": "Kenya", "v": 6.9}
    ],
    "export_concentration": {
      "hhi": {
        "lab": "HHI (normalised, 0–1)",
        "dec": 2,
        "rows": [
          {"k": "Malawi", "v": 0.64},
          {"k": "Uganda", "v": 0.53},
          {"k": "Zimbabwe", "v": 0.51, "hl": 1},
          {"k": "Zambia", "v": 0.5},
          {"k": "Tanzania", "v": 0.45},
          {"k": "Mozambique", "v": 0.33},
          {"k": "South Africa", "v": 0.13}
        ],
        "max": 0.7,
        "ticks": [0, 0.2, 0.4, 0.6]
      },
      "theil": {
        "lab": "Theil index",
        "dec": 2,
        "rows": [
          {"k": "Malawi", "v": 6.74},
          {"k": "Zimbabwe", "v": 6.57, "hl": 1},
          {"k": "Uganda", "v": 6.19},
          {"k": "Zambia", "v": 6.09},
          {"k": "Mozambique", "v": 5.86},
          {"k": "Tanzania", "v": 5.5},
          {"k": "South Africa", "v": 3.37}
        ],
        "max": 7.5,
        "ticks": [0, 2, 4, 6]
      },
      "rsca": {
        "lab": "Product lines with RSCA > 0",
        "dec": 0,
        "rows": [
          {"k": "South Africa", "v": 924},
          {"k": "Tanzania", "v": 332},
          {"k": "Zambia", "v": 196},
          {"k": "Mozambique", "v": 151},
          {"k": "Zimbabwe", "v": 140, "hl": 1},
          {"k": "Malawi", "v": 109}
        ],
        "max": 1000,
        "ticks": [0, 250, 500, 750, 1000]
      }
    },
    "price_volume_effects": [
      {"k": "Gold (semi-manufactured)", "p": 1417, "vol": 668, "net": 2085, "pc": "+82.7%"},
      {"k": "Nickel mattes", "p": -128.5, "vol": 552.7, "net": 424.2, "pc": "+42.9%"},
      {"k": "Lithium-type products", "p": -45, "vol": 174.3, "net": 129.3, "pc": "+45.8%"}
    ],
    "export_portfolio_quadrants": [
      {"k": "Vulnerables", "s": "RSCA > 0 · CAGR < 0", "n": 55, "sh": 4.43, "usd": "$429.7 mn", "c": "var(--c2)", "e": "Industrial diamonds, nickel ores, unwrought platinum, crude granite, unmanufactured cotton"},
      {"k": "Anchors", "s": "RSCA > 0 · CAGR > 0", "n": 78, "sh": 90.88, "usd": "$8.821 bn", "c": "var(--c1)", "e": "Gold, nickel mattes, unmanufactured tobacco, ferro-chromium"},
      {"k": "Exclusions", "s": "RSCA < 0 · CAGR < 0", "n": 208, "sh": 0.34, "usd": "$32.9 mn", "c": "var(--c4)", "e": "Plastic packaging, insulated conductors, diesel generating sets, copper ores, wooden furniture"},
      {"k": "High-Potentials", "s": "RSCA < 0 · CAGR > 0", "n": 240, "sh": 3.64, "usd": "$353.1 mn", "c": "var(--c3)", "e": "Ammonium nitrate, electrical energy, iron and steel bars, unwrought gold"}
    ],
    "trade_balance_peers": [
      {"k": "SADC average", "v": 1.4},
      {"k": "Zambia", "v": 0.5},
      {"k": "Zimbabwe", "v": -1.3, "hl": 1},
      {"k": "Mozambique", "v": -7.4},
      {"k": "Uganda", "v": -10.6},
      {"k": "Kenya", "v": -11.2},
      {"k": "Malawi", "v": -28}
    ],
    "border_clearance_times": {
      "exp": {
        "lab": "Export customs release",
        "ref": 6.4,
        "rows": [
          {"k": "Kenya", "v": 5.8},
          {"k": "Mozambique", "v": 4.2},
          {"k": "Zimbabwe", "v": 3.3, "hl": 1},
          {"k": "Malawi", "v": 3},
          {"k": "Zambia", "v": 1.6},
          {"k": "Uganda", "v": 1.5}
        ]
      },
      "imp": {
        "lab": "Import customs release",
        "ref": 10.4,
        "rows": [
          {"k": "Kenya", "v": 6.7},
          {"k": "Uganda", "v": 5.4},
          {"k": "Mozambique", "v": 3.2},
          {"k": "Malawi", "v": 2.9},
          {"k": "Zimbabwe", "v": 2.6, "hl": 1},
          {"k": "Zambia", "v": 2}
        ]
      },
      "lic": {
        "lab": "Import licence",
        "ref": 18.5,
        "rows": [
          {"k": "Malawi", "v": 16.6},
          {"k": "Zambia", "v": 14.5},
          {"k": "Kenya", "v": 12.7},
          {"k": "Mozambique", "v": 12.2},
          {"k": "Uganda", "v": 9.7},
          {"k": "Zimbabwe", "v": 5.6, "hl": 1}
        ]
      }
    },
    "ntb_sla_compliance": [
      {"k": "Rwanda", "v": 66.7},
      {"k": "Zambia", "v": 20},
      {"k": "Zimbabwe — outbound", "v": 14.3, "hl": 1, "t": "1 of 7 cases"},
      {"k": "Zimbabwe — inbound", "v": 0, "hl": 1, "t": "0 of 6 cases"},
      {"k": "South Africa", "v": 0},
      {"k": "Tanzania", "v": 0}
    ],
    "ntb_resolution_days": [
      {"k": "Zimbabwe — inbound", "v": 1029.2, "hl": 1},
      {"k": "Zambia", "v": 539.4},
      {"k": "Zimbabwe — outbound", "v": 412.4, "hl": 1},
      {"k": "Malawi", "v": 340.5},
      {"k": "Uganda", "v": 205}
    ],
    "mva_per_capita_peers": [
      {"k": "Zimbabwe", "v": 298, "hl": 1},
      {"k": "SADC average", "v": 181},
      {"k": "Kenya", "v": 159},
      {"k": "Uganda", "v": 153},
      {"k": "Zambia", "v": 85}
    ],
    "mva_share_gdp_peers": [
      {"k": "Uganda", "v": 15.5},
      {"k": "Malawi", "v": 11.8},
      {"k": "Zimbabwe", "v": 11.5, "hl": 1},
      {"k": "SADC average", "v": 10.1},
      {"k": "Zambia", "v": 7.9},
      {"k": "Kenya", "v": 6.9}
    ],
    "capacity_utilisation_peers": [
      {"k": "South Africa", "v": 75},
      {"k": "Kenya", "v": 68},
      {"k": "Zambia", "v": 62},
      {"k": "Zimbabwe", "v": 61.2, "hl": 1}
    ],
    "management_practices_peers": [
      {"k": "Kenya", "v": 61.4},
      {"k": "Zimbabwe", "v": 54.8, "hl": 1},
      {"k": "Zambia", "v": 52.7},
      {"k": "SSA average", "v": 47.5}
    ],
    "export_quality_peers": [
      {"k": "Kenya", "v": 0.354},
      {"k": "Zimbabwe", "v": 0.262, "hl": 1},
      {"k": "Zambia", "v": 0.253},
      {"k": "SADC average", "v": 0.207}
    ],
    "technology_intensity_peers": [
      {"k": "Zambia", "v": 18.6},
      {"k": "Kenya", "v": 16.4},
      {"k": "SSA average", "v": 11.1},
      {"k": "Zimbabwe", "v": 9.5, "hl": 1}
    ],
    "grid_connection_days_peers": [
      {"k": "SSA average", "v": 30.4},
      {"k": "Zimbabwe", "v": 19.6, "hl": 1},
      {"k": "Kenya", "v": 13.8},
      {"k": "Zambia", "v": 10.3}
    ],
    "local_value_retention_peers": [
      {"k": "South Africa", "v": 65},
      {"k": "Zambia", "v": 45},
      {"k": "Zimbabwe", "v": 32, "hl": 1}
    ],
    "fdi_inflows_peers": {
      "usd": {
        "lab": "Net FDI inflows, US$ million",
        "rows": [
          {"k": "Mozambique", "v": 5690},
          {"k": "Zambia", "v": 1290},
          {"k": "Zimbabwe", "v": 380, "hl": 1}
        ],
        "o": {
          "unit": "usd",
          "ref": {"v": 500, "label": "2026 NDS2 target $500 mn"},
          "max": 6200,
          "ticks": [0, 2000, 4000, 6000]
        }
      },
      "gdp": {
        "lab": "Net FDI inflows, % of GDP",
        "rows": [
          {"k": "Mozambique", "v": 12},
          {"k": "Zambia", "v": 4.5},
          {"k": "SSA median", "v": 3.5},
          {"k": "Zimbabwe", "v": 1.9, "hl": 1}
        ],
        "o": {
          "unit": "pct",
          "ref": {"v": 1.8, "label": "2026 NDS2 target 1.8%"},
          "max": 13,
          "ticks": [0, 4, 8, 12]
        }
      }
    },
    "permit_licence_times": {
      "con": {
        "lab": "Construction permit",
        "ref": 26.8,
        "rows": [
          {"k": "Zambia", "v": 30.8},
          {"k": "Mozambique", "v": 21.3},
          {"k": "Uganda", "v": 17},
          {"k": "Kenya", "v": 15.4},
          {"k": "Malawi", "v": 10.3},
          {"k": "Zimbabwe", "v": 6.7, "hl": 1}
        ]
      },
      "op": {
        "lab": "Operating licence",
        "ref": 16.5,
        "rows": [
          {"k": "Mozambique", "v": 20.6},
          {"k": "Malawi", "v": 16.1},
          {"k": "Zambia", "v": 14.6},
          {"k": "Uganda", "v": 7.1},
          {"k": "Kenya", "v": 6.6},
          {"k": "Zimbabwe", "v": 6, "hl": 1}
        ]
      }
    },
    "investor_journey": [
      {"k": "Investment licence growth", "actual": "20.8%", "target": "&gt;15%", "a": 1},
      {"k": "3-year licence renewal rate", "actual": "54.73%", "target": "&gt;85%", "a": 0.644},
      {"k": "Investment conversion rate", "actual": "11.7%", "target": "&gt;20%", "a": 0.585},
      {"k": "Grievance resolution (30 days)", "actual": "20%", "target": "&gt;80%", "a": 0.25},
      {"k": "FX repatriation lead time", "actual": "120 days", "target": "&lt;30 days", "a": 0.25}
    ],
    "licences_by_province": [
      {"k": "Harare", "v": 257, "hl": 1, "t": "39.84% of licences · 62% of approved capital"},
      {"k": "Midlands", "v": 117, "t": "18.14%"},
      {"k": "Matabeleland North", "v": 98, "t": "15.19%"},
      {"k": "Matabeleland South", "v": 74, "t": "11.47%"},
      {"k": "Mashonaland West", "v": 57, "t": "8.84%"},
      {"k": "Others", "v": 42, "t": "6.52%"}
    ],
    "score_over_editions": [
      {"k": "2027", "v": 58.5, "ph": 1, "c": "var(--ink)"},
      {"k": "2028", "v": 61, "ph": 1, "c": "var(--ink)"},
      {"k": "2029", "v": 63.5, "ph": 1, "c": "var(--ink)"},
      {"k": "2030", "v": 66, "ph": 1, "c": "var(--ink)"}
    ],
        "what_drove_export_growth": [
      {"k": "Gold (+82.7% on 2024)", "v": 2.085, "c": "var(--c1)"},
      {"k": "Non-gold exports (+3.3%)", "v": 0.165, "c": "var(--peer)", "ink": "#141414"}
    ],
    "trade_balance_trend": [
      {"k": "2021", "v": -1505},
      {"k": "2022", "v": -1820, "ph": 1, "c": "var(--peer-ink)"},
      {"k": "2023", "v": -1960, "ph": 1, "c": "var(--peer-ink)"},
      {"k": "2024", "v": -2099},
      {"k": "2025", "v": -414}
    ],
    "accredited_testing_laboratories": [{"k": "Tanzania", "v": 101}, {"k": "Zimbabwe", "v": 47, "hl": 1}, {"k": "Botswana", "v": 36}, {"k": "Namibia", "v": 36}, {"k": "Zambia", "v": 28}, {"k": "Malawi", "v": 20}, {"k": "Mauritius", "v": 2}],
    "harmonised_standards": [
      {"k": "Kenya", "v": 7900},
      {"k": "South Africa", "v": 7000, "d": "7,000+"},
      {"k": "Zambia", "v": 3100, "ph": 1},
      {"k": "Zimbabwe", "v": 2400, "hl": 1},
      {"k": "Mozambique", "v": 1600, "ph": 1}
    ],
    "manufacturing_share_trend": [{"k": "2021", "v": 12.9}, {"k": "2022", "v": 12.3}, {"k": "2023", "v": 11.9}, {"k": "2024", "v": 11.9}, {"k": "2025", "v": 11.5}],
    "capacity_utilisation_trend": [
      {"k": "2022", "v": 52, "ph": 1, "c": "var(--peer-ink)"},
      {"k": "2023", "v": 55, "ph": 1, "c": "var(--peer-ink)"},
      {"k": "2024", "v": 56, "ph": 1, "c": "var(--peer-ink)"},
      {"k": "FY2025", "v": 57},
      {"k": "2026", "v": 61.2}
    ],
    "agro_processing_gap": [
      {"k": "Processed agriculture export ratio", "actual": "0.14 : 1", "target": "1.5 : 1", "a": 0.093},
      {"k": "Food-import dependence (inverted)", "actual": "18.7%", "target": "&lt;5.0%", "a": 0.267},
      {"k": "Food output-to-harvest ratio", "actual": "0.95x", "target": "benchmark", "a": 0.528},
      {"k": "Value-added share of exports", "actual": "29.2%", "target": "44.4% peer avg", "a": 0.658}
    ],
    "food_import_bill": [
      {"k": "Basic staples (maize, crude soybean oil, wheat, rice)", "v": 1.06, "c": "var(--c2)"},
      {"k": "Other food imports", "v": 0.83, "c": "var(--peer)", "ink": "#141414"}
    ],
    "gold_output_by_producer": [{"k": "2021", "asm": 16.5, "lsp": 13.1, "net": 29.6}, {"k": "2022", "asm": 24.06, "lsp": 11.32, "net": 35.38}, {"k": "2023", "asm": 18.59, "lsp": 11.52, "net": 30.11}, {"k": "2024", "asm": 24.02, "lsp": 12.38, "net": 36.4}, {"k": "2025", "asm": 34.87, "lsp": 11.83, "net": 46.7}],
      "food_imports_by_product": [{"k": "Other food, dairy & agri", "v": 672.8, "c": "var(--peer)"}, {"k": "Maize", "v": 447.2, "c": "var(--c2)"}, {"k": "Crude soya-bean oil", "v": 267.1, "c": "var(--c2)"}, {"k": "Wheat", "v": 186.8, "c": "var(--c2)"}, {"k": "Rice", "v": 161.5, "c": "var(--c2)"}, {"k": "Soya beans", "v": 95.9, "c": "var(--c2)"}, {"k": "Palm oil & refined", "v": 57.2, "c": "var(--c2)"}],
    "gold_export_earnings": [{"k": "2021", "v": 1.61}, {"k": "2022", "v": 2.0}, {"k": "2023", "v": 1.81}, {"k": "2024", "v": 2.52}, {"k": "2025", "v": 4.61}],
    "gold_output": [{"k": "2021", "v": 29.6}, {"k": "2022", "v": 35.38}, {"k": "2023", "v": 30.11}, {"k": "2024", "v": 36.4}, {"k": "2025", "v": 46.7}],
    "lithium_revenue_by_processing_stage": [
      {"k": "Raw concentrate", "v": 87.4, "c": "var(--peer)"},
      {"k": "Lithium sulphate", "v": 12.6, "c": "var(--c1)"}
    ],
    "pgm_revenue_by_processing_stage": [
      {"k": "Smelted matte", "v": 81.13, "c": "var(--c1)"},
      {"k": "Raw concentrate & other", "v": 15.94, "c": "var(--peer)", "ink": "#141414"},
      {"k": "Refined unwrought platinum", "v": 2.93, "c": "var(--c5)"}
    ],
    "chrome_revenue_by_processing_stage": [
      {"k": "Ferro-chromium", "v": 77.79, "c": "var(--c1)"},
      {"k": "Raw ore & other", "v": 22.21, "c": "var(--peer)", "ink": "#141414"}
    ],
    "power_outage_frequency": [{"k": "Zambia", "v": 21.6}, {"k": "Malawi", "v": 7.1}, {"k": "Uganda", "v": 3.9}, {"k": "Zimbabwe", "v": 3.8, "hl": 1}, {"k": "Kenya", "v": 2.8}, {"k": "Mozambique", "v": 2.7}],
    "from_licence_to_realised_capital": [
      {"k": "Licensed by ZIDA", "v": 3260, "c": "var(--peer)", "d": "$3,260"},
      {"k": "Gross realised (29.6%)", "v": 965, "c": "var(--s-ini)", "d": "$965"},
      {"k": "Net FDI (11.7%)", "v": 380, "hl": 1, "d": "$380"}
    ],
    "capital_against_activation_thresholds": [
      {"k": "Mining FDI vs activation threshold", "actual": "$245 mn", "target": "$300 mn", "a": 0.8166666666666667},
      {"k": "Greenfield announcements", "actual": "$420 mn", "target": "$500 mn", "a": 0.84},
      {"k": "Net conversion rate", "actual": "11.7%", "target": "20%", "a": 0.585}
    ],
    "fdi_inflow_trend": [
      {"k": "2021", "v": 260, "ph": 1, "c": "var(--peer-ink)"},
      {"k": "2022", "v": 340, "ph": 1, "c": "var(--peer-ink)"},
      {"k": "2023", "v": 410, "ph": 1, "c": "var(--peer-ink)"},
      {"k": "2024", "v": 355, "ph": 1, "c": "var(--peer-ink)"},
      {"k": "2025", "v": 380}
    ],
    "funding_mix_of_approved_investment": [
      {"k": "Debt", "v": 86.5, "d": "≈$2,820 mn", "c": "var(--c2)"},
      {"k": "Equipment", "v": 10.8, "d": "$354.1 mn", "c": "var(--c1)"},
      {"k": "Cash", "v": 2.2, "d": "$72.5 mn", "c": "var(--c3)"}
    ],
    "repatriation_wait_time": [
      {"k": "2022", "v": 180},
      {"k": "2023", "v": 160, "ph": 1, "c": "var(--peer-ink)"},
      {"k": "2024", "v": 140, "ph": 1, "c": "var(--peer-ink)"},
      {"k": "2025", "v": 120}
    ],
    "construction_permit_trend": [
      {"k": "2022", "v": 28, "c": "var(--peer)"},
      {"k": "2023", "v": 15, "c": "var(--peer)"},
      {"k": "2024–25", "v": 6.7}
    ],
    "investment_licences_issued": [
      {"k": "2022", "v": 267},
      {"k": "2023", "v": 430, "ph": 1, "c": "var(--peer-ink)"},
      {"k": "2024", "v": 665},
      {"k": "2025", "v": 803, "d": "803*"}
    ],
    "investment_by_sector": [
      {"k": "Manufacturing", "v": 43.01, "c": "var(--c1)"},
      {"k": "Mining", "v": 32.49, "c": "var(--c2)", "ink": "#141414"},
      {"k": "Agriculture", "v": 12.75, "c": "var(--c3)", "ink": "#141414"},
      {"k": "Energy & services", "v": 11.76, "c": "var(--c4)", "ink": "#141414"}
    ],
    "investment_by_source_country": [
      {"k": "China", "v": 41, "ph": 1},
      {"k": "South Africa", "v": 17, "ph": 1},
      {"k": "United Kingdom", "v": 9, "ph": 1},
      {"k": "UAE", "v": 8, "ph": 1},
      {"k": "Mauritius", "v": 6, "ph": 1},
      {"k": "Other 19 countries", "v": 19, "ph": 1}
    ]
  },

  /* ---- analysis ----
     Pop-up text behind each "Analysis" button, keyed by the chart title. Remove an entry to remove the button. */
  "analysis": {
    "Scorecard: three pillars, fourteen domains": {
      "finding": "The pattern across the fourteen domains is consistent: the domains that measure rules, procedures and administration score highest, while those that measure what the economy actually produces, sells and retains score lowest. Trade Facilitation (77.8) and Investment Facilitation (75.0) sit at the top; Value Addition (22.9) and Pipeline and Conversion (31.3) sit at the bottom.",
      "whyItMatters": "For competitiveness this means the easier reforms have largely been made. The next gains depend on firms responding to the improved environment with new export lines, deeper processing and realised investment."
    },
    "Activation profile": {
      "finding": "Just under a third of the 95 indicators already meet their top performance band, but a similar share remain in the two lowest stages. A profile this spread out signals uneven competitiveness: world-class performance in some areas sits next to binding constraints in others.",
      "whyItMatters": "Moving the indicators stuck at Initiating and Inactive would lift the index faster than further gains among those already near the top."
    },
    "Export growth vs peers": {
      "finding": "Zimbabwe’s exports grew 12.6% a year between 2021 and 2025, the second-fastest rate among the comparators and far above the SADC average of 1.7%. On headline growth the country is outperforming its region.",
      "whyItMatters": "Growth alone is not a durable advantage. Most of the 2025 increase came from gold prices rather than new products or markets, so the pace could reverse if commodity prices fall."
    },
    "Export intensity": {
      "finding": "Exports equal 27.7% of GDP, behind Zambia, Mozambique and South Africa. Zimbabwe ranks second on export growth but only fourth on export intensity, which shows that the export sector is still small relative to the size of the economy.",
      "whyItMatters": "A competitive economy converts more of its output into foreign sales. Closing the gap with regional leaders requires more firms exporting, not only higher earnings from existing commodities."
    },
    "What drove export growth": {
      "finding": "Gold accounted for 92.6% of the increase in export earnings between 2024 and 2025. Non-gold exports grew by only 3.3%, adding US$0.165 billion.",
      "whyItMatters": "This is the central vulnerability in trade competitiveness: the headline surge depends on one product. A fall in the gold price would remove most of the gain, while the rest of the export base is close to stagnant."
    },
    "Price vs volume effects": {
      "finding": "Gold’s growth was mainly price-led: higher prices contributed more than higher volumes. Nickel mattes and lithium moved the other way, expanding on volume while prices fell.",
      "whyItMatters": "Volume-led growth reflects real productive capacity and is more durable. Price-led growth can disappear without any change in what the country produces, so it should not be read as a competitiveness gain."
    },
    "Export portfolio matrix": {
      "finding": "Seventy-eight “Anchor” products, with both comparative advantage and positive growth, generate 90.9% of export earnings. Another 240 “High-Potential” products are growing but have not yet reached comparative advantage and earn only 3.6% of the total.",
      "whyItMatters": "The portfolio is strong but narrow. Diversification depends on moving High-Potential lines into the Anchor group and on stopping the decline of the 55 Vulnerable products where Zimbabwe still holds an advantage."
    },
    "Trade balance vs peers": {
      "finding": "The goods trade deficit narrowed to 1.3% of GDP in 2025, inside the stability range and better than most comparators. Several peers run deficits above 7% of GDP.",
      "whyItMatters": "A smaller deficit eases pressure on foreign currency and reserves. The improvement, however, coincided with the gold-led export surge and is exposed to the same price risk."
    },
    "Trade balance trend": {
      "finding": "The deficit fell from about US$2.1 billion in 2024 to US$414 million in 2025, the sharpest improvement in the period shown.",
      "whyItMatters": "Reserve cover is only 1.6 months of imports, so the economy has little buffer if the balance widens again. Resilience will depend on a broader export base rather than one favourable year."
    },
    "Digital border readiness": {
      "finding": "Most border procedures are now digitised and customs release times are among the fastest in the region. This is the highest-scoring trade domain.",
      "whyItMatters": "Fast borders lower costs for every exporter and importer. Remaining gaps are concentrated in exporter foreign-currency retention (70% against a 100% regional benchmark) and in systems that are still at pilot stage."
    },
    "NTB resolution compliance": {
      "finding": "Few non-tariff barrier complaints involving Zimbabwe are resolved within the 60-day service standard: one of seven outbound cases and none of six inbound cases.",
      "whyItMatters": "Unresolved barriers raise the cost and uncertainty of regional trade for firms, and weaken the benefit of fast customs clearance. Case numbers are small, so the result is indicative."
    },
    "NTB resolution time": {
      "finding": "Complaints lodged against Zimbabwe take more than 1,000 days on average to resolve, over 600 days longer than complaints Zimbabwe raises against others.",
      "whyItMatters": "Slow resolution affects the country’s reputation as a trading partner and invites reciprocal delays. Binding timelines and automatic escalation are the reform most directly linked to this result."
    },
    "Manufacturing value added per person": {
      "finding": "Manufacturing value added per person is US$298, well above the SADC average of US$181 and ahead of Kenya, Uganda and Zambia.",
      "whyItMatters": "This is a real strength: Zimbabwe retains a larger industrial base per person than most peers. The challenge is that the base is under-used and concentrated in lower-technology activity."
    },
    "Manufacturing share of GDP": {
      "finding": "Manufacturing contributes 11.5% of GDP. That meets the 2026 national target and is above the SADC average, but it is down from 12.9% in 2021 and below the 15% goal for 2030.",
      "whyItMatters": "A declining share means the rest of the economy is growing faster than industry. Reversing the trend is necessary for the structural transformation the national strategy aims for."
    },
    "Capacity utilisation vs peers": {
      "finding": "Factories operate at 61.2% of installed capacity, up from 57.0% but still below Kenya, Zambia and South Africa. Nearly two-fifths of capacity stands idle.",
      "whyItMatters": "Idle capacity raises unit costs and makes local products less price-competitive. Power supply, working capital and imported-input costs are the constraints most often linked to it."
    },
    "Technology intensity": {
      "finding": "Medium- and high-technology goods make up 9.5% of manufacturing value added, below Zambia, Kenya and the Sub-Saharan average.",
      "whyItMatters": "Technology intensity determines how much value a country captures from what it makes. A low share points to an industrial base weighted toward basic processing, with limited capacity to compete in higher-value markets."
    },
    "Export quality": {
      "finding": "Zimbabwe’s industrial export quality score of 0.262 is above the SADC average but below Kenya and well short of the 0.45 policy baseline.",
      "whyItMatters": "Quality determines the price exports can command. Raising it depends on standards, testing capacity and the technology firms use, not on volumes alone."
    },
    "Agro-processing gap": {
      "finding": "For every dollar of raw agricultural exports, Zimbabwe exports only 14 cents of processed agricultural products, against a benchmark of 1.5 to 1. Raw leaf tobacco alone earns about US$1.3 billion, compared with roughly US$206 million for all processed agricultural exports.",
      "whyItMatters": "This is the widest value-addition gap in the index. Value, jobs and skills that could be created domestically are being exported with the raw crop."
    },
    "Food import bill": {
      "finding": "Food imports cost US$1.89 billion in 2025, and more than half went on basic staples: maize, crude soybean oil, wheat and rice.",
      "whyItMatters": "Importing staples that can be grown and processed locally drains foreign currency and signals weak links between agriculture and industry. The food import share of 18.7% is above the 15% vulnerability ceiling."
    },
    "Gold export earnings": {
      "finding": "Gold earnings reached US$4.61 billion in 2025, close to half of all goods exports.",
      "whyItMatters": "Earnings grew far faster than output, which confirms that price rather than production drove the surge. Competitiveness in gold depends on what is done beyond mining: refining, traceability and formalising small-scale supply."
    },
    "Gold output": {
      "finding": "Deliveries rose to 46.7 tonnes in 2025. Artisanal and small-scale miners supplied about three-quarters of the total.",
      "whyItMatters": "A sector this dependent on small-scale producers needs formal channels, finance and processing access to sustain output and to keep value within the formal economy."
    },
    "PGM revenue by processing stage": {
      "finding": "About 81% of platinum-group metal revenue comes from smelted matte and less than 3% from refined metal.",
      "whyItMatters": "Without an operational precious-metals refinery, the final and most valuable processing step takes place in South Africa. Refining capacity is the step that would move the country up this value chain."
    },
    "Chrome revenue by processing stage": {
      "finding": "Roughly 78% of chrome export revenue between 2021 and 2025 came from ferro-chromium rather than raw ore.",
      "whyItMatters": "Chrome shows that beneficiation is achievable: most value is already added locally through smelting. Reliable, affordable power is the main condition for keeping and extending that position."
    },
    "Lithium revenue by processing stage": {
      "finding": "Processed lithium sulphate earns about US$1,317 a tonne against US$352 for raw concentrate, yet it accounts for only 12.6% of lithium export revenue.",
      "whyItMatters": "Lithium is the clearest current test of the beneficiation policy. The price uplift from processing is almost fourfold, so every additional tonne processed locally raises earnings without raising extraction."
    },
    "Local value retention": {
      "finding": "Zimbabwe retains about 32% of mineral value locally, compared with roughly 45% in Zambia and 65% in South Africa.",
      "whyItMatters": "Retention captures how much of mining’s value stays in the domestic economy through processing, procurement and reinvestment. The gap with South Africa indicates how much room there is to deepen linkages."
    },
    "Grid connection time": {
      "finding": "A new electrical connection takes 19.6 days, faster than the Sub-Saharan average but slower than Kenya and Zambia.",
      "whyItMatters": "Connection is only part of the picture: more than half of formal firms report outages. Reliability, rather than access, is the binding energy constraint on industrial competitiveness."
    },
    "FDI inflows vs peers": {
      "finding": "Net foreign direct investment was US$380 million, below the US$500 million national target and far below Mozambique and Zambia. At 1.9% of GDP it also trails the Sub-Saharan median.",
      "whyItMatters": "Foreign investment brings capital, technology and market access. Persistently low inflows limit how quickly productive capacity can expand."
    },
    "From licence to realised capital": {
      "finding": "Of US$3.26 billion in licensed investment, about US$965 million was realised on a gross basis and US$380 million arrived as net foreign direct investment, a conversion rate of 11.7%.",
      "whyItMatters": "Investor interest is not the constraint; implementation is. Projects stall between approval and operation, which is why the pipeline domain is among the lowest scoring."
    },
    "Funding mix of approved investment": {
      "finding": "Debt makes up about 86.5% of approved investment value, with equipment at 10.8% and cash at 2.2%.",
      "whyItMatters": "A debt-heavy pipeline overstates the capital that is immediately available and adds repayment obligations in foreign currency. Tracking conversion on a cash-equity basis would give a truer picture."
    },
    "Repatriation wait time": {
      "finding": "The time taken to repatriate dividends has fallen from 180 days in 2022 to 120 days, but remains four times the regional benchmark of under 30 days.",
      "whyItMatters": "Investors price in the risk of not being able to move earnings. Long waits discourage new investment and reinvestment, even where licensing is fast."
    },
    "Investor journey: licence to exit": {
      "finding": "Performance weakens at each stage after licensing. Licence growth exceeds its target, but renewal, conversion, grievance resolution and repatriation all fall well short of their benchmarks.",
      "whyItMatters": "The first step of the investor journey is competitive and the later steps are not. After-care and dispute resolution are where reform would have the greatest effect on retention."
    },
    "Investment by sector": {
      "finding": "Manufacturing accounts for 43% of monitored investment and mining for about 32%. The Beneficiation Alignment Index of 0.28 means that only 28 cents goes to manufacturing linked to minerals for every dollar invested in mining.",
      "whyItMatters": "Capital is flowing into extraction faster than into processing. Aligning incentives with beneficiation would help convert mineral wealth into industrial capacity."
    },
    "Licences by province": {
      "finding": "Harare received about 40% of investment licences and 62% of approved capital. Midlands and the two Matabeleland provinces follow at a distance.",
      "whyItMatters": "Concentration in the capital limits the spread of jobs and suppliers. Only 38% of investment is located outside Harare and Bulawayo, against a 50% benchmark."
    }
  },

  /* ---- comparisons ----
     Domain comparison analysis matrix. One entry per pair of domains in the same pillar, keyed "domainA|domainB" in the order the domains are listed above. Every "reading" is exactly 35 words and every "implication" exactly 15 words, so the analysis panel is the same length for every pair; keep to those counts when editing. */
  "comparisons": {
    "5.1.1|5.1.2": {
      "reading": "The trade balance has improved faster than the export base beneath it. The narrower deficit reflects a gold-led surge in earnings, so external resilience rests on the same few commodities that hold export performance down.",
      "implication": "Diversify exports so the trade balance holds when commodity prices eventually turn. Set a target for the non-gold share of earnings and back it with supply-side support for the lines already showing comparative advantage."
    },
    "5.1.1|5.1.3": {
      "reading": "Border procedures are fast and largely digital, yet exports remain concentrated in gold, nickel mattes and tobacco. Efficient borders lower costs for existing exporters, but they do not on their own create new export products.",
      "implication": "Match facilitation gains with supply-side support that helps non-traditional exporters reach regional markets. Fast borders raise the return on goods a country can already make, so pair them with finance, standards help and market data."
    },
    "5.1.1|5.1.4": {
      "reading": "Market access on paper is ahead of export results. Tariff schedules and corridor infrastructure are already in place, but continental preferences go unused and very few exporters currently hold trusted-trader status with the customs authority.",
      "implication": "Gazette the continental trade instruments and widen trusted-trader certification so firms use access already negotiated. Preference utilisation near zero means the constraint is administrative, not commercial, and clears quickly."
    },
    "5.1.1|5.1.5": {
      "reading": "Quality infrastructure is not the binding constraint on exports. Accredited laboratories and harmonised standards are in place, but the products that would use them at scale are not yet being produced locally for export markets.",
      "implication": "Link standards support to high-potential product lines so compliance capacity converts into exports. Accreditation not matched to products buyers want earns little, so sequence laboratory investment behind the clearest market routes."
    },
    "5.1.2|5.1.3": {
      "reading": "Efficient borders support both sides of the trade account, but they cannot protect it from shocks. Resilience scores lower because reserves cover under two months of imports and trade is concentrated in very few partners.",
      "implication": "Build reserve buffers and widen trading partners, because facilitation alone cannot absorb a shock. Efficient borders move goods faster both ways, but without a broader export base that speed does not protect the external position."
    },
    "5.1.2|5.1.4": {
      "reading": "These two domains share a common cause, which is that trade is concentrated in very few partners. A single destination takes nearly half of all exports while regional preferences that could diversify markets go unused.",
      "implication": "Use regional preferences to diversify export markets, which strengthens external resilience at the same time. Each new destination reduces the exposure of the trade balance to any single commodity price or partner economy."
    },
    "5.1.2|5.1.5": {
      "reading": "Standards capacity is ahead of external resilience. Compliance systems help to protect market access abroad, but they do not offset very thin foreign reserves or the continued dependence on imported food, fuel and industrial inputs.",
      "implication": "Direct standards capacity toward import substitution in food and intermediate goods to conserve foreign currency. Conformity assessment that lets local producers match imported specifications improves the balance from the import side."
    },
    "5.1.3|5.1.4": {
      "reading": "Goods cross the border quickly, but disputes and preferences move slowly. Complaints about non-tariff barriers take far longer than the sixty-day standard to resolve, and the use of continental trade preferences is still at zero.",
      "implication": "Extend the digital discipline achieved in customs clearance to dispute resolution and certificates of origin. The systems and service standards that cut release times already exist, so applying them to preference paperwork costs little."
    },
    "5.1.3|5.1.5": {
      "reading": "These are the two strongest trade domains, and together they form the platform for export growth. Their remaining gaps are similar in nature, namely systems at pilot stage such as electronic certification for agricultural goods.",
      "implication": "Complete electronic certification for agricultural goods to connect border and standards systems end to end. A consignment cleared in hours can still wait days for a paper certificate, so both should share one digital workflow."
    },
    "5.1.4|5.1.5": {
      "reading": "Standards are ahead of the market access they are meant to unlock. Accredited laboratories and harmonised standards exist at home, yet preferential access goes unused and recognition of local certificates by trading partners remains limited.",
      "implication": "Negotiate mutual recognition agreements so domestic compliance becomes accepted market access abroad. Tests repeated in the destination market add cost and delay that fall hardest on small exporters, and recognition removes it."
    },
    "5.2.1|5.2.2a": {
      "reading": "Zimbabwe has more manufacturing capability than it uses for value addition. Manufacturing output per person is above the regional average, but processed agricultural exports are a fraction of raw exports and food imports remain high.",
      "implication": "Direct existing industrial capacity toward agro-processing, where the raw material is already produced locally. Idle plant and a large raw agricultural export base are the same problem viewed twice, and matching them avoids greenfield cost."
    },
    "5.2.1|5.2.2b": {
      "reading": "Mineral processing is ahead of general manufacturing. Smelting of chrome and platinum-group metals and early lithium processing lift the extractives score, while the wider manufacturing is held back by idle capacity and low technology intensity.",
      "implication": "Use mineral beneficiation as an anchor for downstream manufacturing rather than as a separate enclave. Smelters and refineries buy engineering services, fabricated steel and chemicals, so the benefit spreads beyond the mine."
    },
    "5.2.1|5.2.3": {
      "reading": "The business environment scores above the capability it is meant to support. Management practices and innovation rates are respectable, but frequent power outages and reliance on internal finance prevent firms from running plants at capacity.",
      "implication": "Provide reliable power and external finance, the missing links between the business environment and higher utilisation. Firms report both as binding constraints, and installed capacity cannot be used until they are secured."
    },
    "5.2.2a|5.2.2b": {
      "reading": "Value is being added to minerals far more than to agriculture. Most chrome and platinum-group revenue now comes from smelted products, while tobacco and other major crops still leave the country in largely unprocessed form.",
      "implication": "Apply to agriculture the instruments that worked in minerals, including processing requirements and export levies. The beneficiation share achieved in chrome shows the approach can move a sector, and the same sequencing suits tobacco."
    },
    "5.2.2a|5.2.3": {
      "reading": "A workable enterprise environment has not yet produced value addition. Firms innovate and manage well by regional standards, but power outages and limited bank credit make deeper processing investments difficult to finance and to operate.",
      "implication": "Target credit guarantees and energy incentives specifically at investments that deepen local processing. General business-environment reform helps every firm equally, whereas value addition needs instruments aimed at the processing step."
    },
    "5.2.2b|5.2.3": {
      "reading": "Both domains depend heavily on the same input, which is electricity. Smelting and refining of minerals are energy-intensive activities, and frequent power outages are the main operating complaint reported by formal firms across the economy.",
      "implication": "Treat energy reliability as the shared constraint, because progress there lifts both domains at once. Smelting is power-intensive and outages fall on every manufacturer, so firm supply has the widest industrial return."
    },
    "5.3.1a|5.3.1b": {
      "reading": "Headline investment indicators are far ahead of delivery on the ground. The stock of foreign investment and licensing volumes both score well, but only about one-ninth of licensed value arrives as net foreign direct investment.",
      "implication": "Measure success by realised capital rather than approvals, and track every project after licensing. An approval register records intent while the conversion rate records delivery, and only the second shows whether the pipeline works."
    },
    "5.3.1a|5.3.1c": {
      "reading": "Capital comes into the country more easily than it goes out. Dividend repatriation takes about four months against a benchmark of under one, which weighs heavily on retention scores even where new inflows hold up.",
      "implication": "Open a dedicated foreign-currency window for dividends to protect the reputation future inflows depend on. Investors already here are the most credible reference for those considering entry, and delays raise the cost of new capital."
    },
    "5.3.1a|5.3.2": {
      "reading": "These are the two strongest investment domains and they reinforce each other. Fast licensing and quick permitting support the volume of approvals, which in turn sustains the headline performance indicators for inward investment each year.",
      "implication": "Carry this strong early performance into the later stages of the investor journey. Entry procedures compare well with peers, but the same standards are not yet applied once a project moves from licensing into operation."
    },
    "5.3.1a|5.3.3a": {
      "reading": "The amount of investment scores better than its composition. Capital is concentrated in a handful of source countries, in the capital city, and in mineral extraction rather than in the processing activities that add value.",
      "implication": "Tilt investment incentives toward processing, new source markets and provinces outside the two main cities. Headline inflows can rise while remaining concentrated by sector, origin and location, which leaves the economy exposed."
    },
    "5.3.1b|5.3.1c": {
      "reading": "Both domains concern what happens after an investment is approved, and both are weak. Licensed projects are slow to become operating assets, and the returns they generate are slow to reach the investors behind them.",
      "implication": "Treat after-care, grievance resolution and foreign-currency access as one reform agenda for existing investors. The office that unblocks a stalled project should also handle repatriation queries, since both deter reinvestment."
    },
    "5.3.1b|5.3.2": {
      "reading": "Licences and permits are issued quickly, but projects stall afterwards on land, utility connections and finance. Only one in five investor grievances is resolved within thirty days, so problems linger long after approval is granted.",
      "implication": "Create a post-licensing escalation unit with enforceable service standards to move stalled projects on. Facilitation currently stops at approval, while the conversion gap sits in the months afterwards, where no office carries a deadline."
    },
    "5.3.1b|5.3.3a": {
      "reading": "Weak conversion and weak structure compound each other. A pipeline dominated by debt is slower to realise, and concentration in few sectors and locations narrows the set of projects that are actually able to proceed.",
      "implication": "Report approvals by funding source and prioritise cash-equity projects in under-served provinces. Debt-heavy and capital-city approvals overstate deployable capital, so the register should show what will be built and where."
    },
    "5.3.1c|5.3.2": {
      "reading": "Entry is efficient and exit is not. Construction permits are issued faster than in every comparator country, yet investors still wait around four months to repatriate dividends, which undermines the good impression made at entry.",
      "implication": "Apply the same service standards to investor exit as to entry, because investors judge both. A fast licence followed by a long wait for dividends reads as one experience, and the slower half shapes reinvestment."
    },
    "5.3.1c|5.3.3a": {
      "reading": "Retention friction and a narrow investor base reinforce each other. Slow repatriation discourages reinvestment of profits, and because investment comes from few source countries the same small group of foreign investors bears that friction repeatedly.",
      "implication": "Combine reinvestment incentives with wider source-country promotion, since both measures support these two domains. Retained earnings and capital from new origins are the two routes to a less concentrated investment base."
    },
    "5.3.2|5.3.3a": {
      "reading": "Efficient facilitation has not steered where capital goes. Licensing is fast across the country, but most of the approved capital is located in Harare and mineral-linked manufacturing receives far less investment than mining itself does.",
      "implication": "Pair efficient facilitation with location and sector incentives that steer capital toward processing and provinces. Speed decides how quickly capital arrives while incentives decide where it lands, so the two go together."
    }
  },

  /* ---- actions ----
     Policy actions and the indicator codes each one is tracked against. */
  "actions": [
    {
      "group": "Trade Access and Export Competitiveness",
      "items": [
        {"title": "Link paperless trade to legally binding dispute-resolution SLAs", "text": "Link paperless trade initiatives with administrative execution through legally binding 60-day operational SLAs and automated bilateral escalation protocols across all border authorities. This is expected to lift the non-tariff barrier SLA compliance rate from 0% and shorten the average inbound resolution time from 1,029 days.", "indicators": ["MA-06"]},
        {"title": "Gazette the AfCFTA statutory instruments", "text": "Gazette the draft AfCFTA implementing regulations and integrate electronic certificates of origin into ASYCUDA World so that exporters can claim preferential tariffs. This is expected to lift preference utilisation from 0% towards a first milestone of 0.05% (about US$1.37 million in preference-claimed exports) and to convert the 97% tariff-line schedule into actual regional sales.", "indicators": ["MA-03", "MA-05"]},
        {"title": "Expand the Authorised Economic Operator programme", "text": "Certify Zimbabwe’s top 50 exporting firms as trusted traders and use the larger pool to negotiate Mutual Recognition Agreements with regional customs authorities. This is expected to lift the certified pool from 15 firms, give exporters firm-level priority processing and lower their working-capital holding costs.", "indicators": ["MA-01"]},
        {"title": "Raise the exporter foreign-currency retention rate", "text": "Move the share of foreign-currency earnings that exporters retain from 70% towards the 100% benchmark, starting with exporters that depend on imported inputs. This is expected to ease the working-capital squeeze on the 53.6% of formal manufacturing firms that rely on foreign-origin material inputs.", "indicators": ["TF-09"]},
        {"title": "Complete digital SPS certification and standards harmonisation", "text": "Move e-Phyto / e-SPS Hub integration beyond its pilot phase and accelerate the harmonisation of national standards with regional standards, now at 2,400. This is expected to narrow the gap with Kenya and South Africa and to make certificates from Zimbabwe’s 47 accredited laboratories recognised at destination.", "indicators": ["ST-01", "ST-03"]},
        {"title": "Redirect export promotion support", "text": "Direct market development support to the non-mineral product lines that already hold revealed comparative advantage and to the High-Potentials, whose global demand is already rising, rather than to mature minerals. This is expected to widen the export base and move the top-three share (75.5%) and the Theil index (6.57) towards their reform benchmarks, lowering exposure to commodity price shocks.", "indicators": ["TC-05", "TC-TCI"]},
        {"title": "Defend the Vulnerables", "text": "Give industrial diamonds, nickel ores and concentrates, unwrought platinum, crude granite and unmanufactured cotton defensive support through domestic processing and market diversification. This is expected to preserve the comparative advantage these products still hold before weakening global demand or prices erodes it.", "indicators": ["TC-03"]}
      ]
    },
    {
      "group": "Industrial Upgrading and Value Addition",
      "items": [
        {"title": "Protect and deepen the Anchors", "text": "Move gold, nickel mattes, tobacco and ferro-chromium, which generate 90.9% of export earnings, up the value chain rather than expanding raw volumes. This is expected to raise the value captured from the products that already carry most of the export basket and to reduce reliance on raw extraction.", "indicators": ["VA-01"]},
        {"title": "Build refining capacity and formalise artisanal gold supply", "text": "Establish an operational precious metals refinery and strengthen formal collection, traceability and access to processing for artisanal and small-scale miners, who deliver 74.6% of gold. This is expected to end the dependence on shipping intermediate matte to South Africa for final separation (refined platinum is 2.93% of PGM export revenue) and to bring more of the gold supply into formal value addition.", "indicators": ["MN-09", "MN-01"]},
        {"title": "Introduce a raw mineral ore beneficiation levy", "text": "Apply a levy on raw ore exports that falls for producers who build local processing and smelting capacity, so that lithium, chrome and platinum group metals are processed in the country. This is expected to raise mineral local value retention from 32.0% and retain more jobs, supplier contracts and technology.", "indicators": ["MN-09", "MN-04"]},
        {"title": "Adopt a tobacco processing export mandate", "text": "Require a defined share of the tobacco leaf crop to be processed domestically into cigarettes, cut rag and nicotine extracts. This is expected to lift the processed-to-raw agricultural export ratio from 0.14:1, capturing downstream manufacturing value and reducing raw leaf leakage (unmanufactured leaf exports were US$1.30 billion in 2025).", "indicators": ["VA-02"]},
        {"title": "Provide solar and battery capital expenditure deductions", "text": "Allow firms to deduct the full cost of solar and battery installations against tax in the year of purchase. This is expected to cushion firms against the power outages that affect 52.5% of formal businesses (3.8 a month) and to reduce the effective industrial energy cost.", "indicators": ["EN-09", "EN-10"]},
        {"title": "Establish an SME credit guarantee scheme", "text": "Establish a partial credit guarantee with a lower capital risk-weighting for loans directed to manufacturing capital expenditure. This is expected to unlock commercial bank liquidity for machinery and re-tooling, to raise bank credit access above the 23.1% of formal firms that report it today, and to reduce the 78.3% of fixed-asset investment funded from internal funds.", "indicators": ["FC-01", "FC-04"]}
      ]
    },
    {
      "group": "Investment Conversion and Retention",
      "items": [
        {"title": "Create a ZIDA post-licensing escalation unit", "text": "Establish a unit with enforceable service standards for land allocation, power grid connection and grievance resolution within 30 days for licensed investors. This is expected to raise investment conversion from 11.7%, lift grievance resolution from 20% and the three-year licence renewal rate from 54.73%, and turn $3.26 billion of licensed investment into operating plants.", "indicators": ["FD-13", "IF-04", "IF-03"]},
        {"title": "Report licensed investment by funding source", "text": "Publish ZIDA-approved investment by funding type (cash, equipment and debt) and track conversion on a cash-equity basis. This is expected to show how much of the licensed pipeline is deployable capital, given that 86.5% of approved investment in the third quarter of 2025 was debt, and to bring the 1.85x debt-service-to-dividend ratio into investment decisions.", "indicators": ["FD-Cap", "FD-12"]},
        {"title": "Tilt investment incentives towards processing and provinces outside Harare", "text": "Link investment incentives to manufacturing and mineral-processing projects and to locations outside Harare, including Special Economic Zones, and widen investor promotion beyond the current 24 source countries. This is expected to raise the Beneficiation Alignment Index from 0.28x, lift the share of investment outside Harare and Bulawayo from 38% towards 50%, and move the number of active investor countries towards the target of more than 40.", "indicators": ["IS-08", "IS-04", "IS-05"]},
        {"title": "Introduce tiered profit-reinvestment tax relief", "text": "Reduce corporate income tax for firms that reinvest more of their annual profits in local plant expansion. This is expected to raise the net foreign capital retention index from 0.65 and deepen the productive capital stock.", "indicators": ["FD-11"]},
        {"title": "Create a foreign dividend FX liquidity window", "text": "Establish a dedicated window to clear dividend and capital repatriation requests promptly. This is expected to shorten the 120-day repatriation wait towards the SADC benchmark of under 30 days, ease retention friction and support capital retention and reinvestment.", "indicators": ["FD-07"]}
      ]
    }
  ],

  /* ---- peers ---- Regional comparator values parsed from each indicator's
     comparator note. "dir" says which direction is better; "zim" is this
     assessment's own reading. Edit freely: the peer chart reads only this block. */
  "peers": {
    "TC-01a": {
      "dir": "up",
      "unit": "%",
      "zim": 12.6,
      "rows": [
        {
          "k": "Uganda",
          "v": 33.2
        },
        {
          "k": "Mozambique",
          "v": 9.2
        },
        {
          "k": "Kenya",
          "v": 6.3
        },
        {
          "k": "Zambia",
          "v": 4.9
        },
        {
          "k": "SADC average",
          "v": 1.7
        },
        {
          "k": "Malawi",
          "v": -1.6
        }
      ]
    },
    "TC-01b": {
      "dir": "up",
      "unit": "%",
      "zim": 30.6,
      "rows": [
        {
          "k": "Uganda",
          "v": 55.5
        },
        {
          "k": "Zambia",
          "v": 18.1
        },
        {
          "k": "Kenya",
          "v": 4.4
        },
        {
          "k": "SADC average",
          "v": 3.3
        },
        {
          "k": "Malawi",
          "v": -1.2
        },
        {
          "k": "Mozambique",
          "v": -1.4
        }
      ]
    },
    "TC-02": {
      "dir": "up",
      "unit": "%",
      "zim": 27.7,
      "rows": [
        {
          "k": "Mozambique",
          "v": 36.1
        },
        {
          "k": "SADC average",
          "v": 27.5
        },
        {
          "k": "Uganda",
          "v": 14.3
        },
        {
          "k": "Malawi",
          "v": 8.2
        },
        {
          "k": "Kenya",
          "v": 6.9
        }
      ]
    },
    "IM-02": {
      "dir": "up",
      "unit": "%",
      "zim": -1.25,
      "rows": [
        {
          "k": "Zambia",
          "v": 0
        },
        {
          "k": "Mozambique",
          "v": -4.4
        },
        {
          "k": "Kenya",
          "v": -9.9
        },
        {
          "k": "Uganda",
          "v": -10.3
        },
        {
          "k": "Malawi",
          "v": -20.1
        }
      ]
    },
    "TF-02": {
      "dir": "down",
      "unit": " days",
      "zim": 3.3,
      "rows": [
        {
          "k": "Kenya",
          "v": 5.8
        },
        {
          "k": "Malawi",
          "v": 3
        },
        {
          "k": "Mozambique",
          "v": 4.2
        },
        {
          "k": "Uganda",
          "v": 1.5
        },
        {
          "k": "Zambia",
          "v": 1.6
        },
        {
          "k": "SSA average",
          "v": 6.1
        }
      ]
    },
    "TF-04": {
      "dir": "down",
      "unit": " days",
      "zim": 2.6,
      "rows": [
        {
          "k": "Kenya",
          "v": 6.7
        },
        {
          "k": "Malawi",
          "v": 2.9
        },
        {
          "k": "Mozambique",
          "v": 3.2
        },
        {
          "k": "Uganda",
          "v": 5.4
        },
        {
          "k": "Zambia",
          "v": 2
        },
        {
          "k": "SSA average",
          "v": 10
        }
      ]
    },
    "TF-07": {
      "dir": "down",
      "unit": " days",
      "zim": 5.6,
      "rows": [
        {
          "k": "Kenya",
          "v": 12.7
        },
        {
          "k": "Malawi",
          "v": 16.6
        },
        {
          "k": "Mozambique",
          "v": 12.2
        },
        {
          "k": "Uganda",
          "v": 9.7
        },
        {
          "k": "Zambia",
          "v": 14.5
        },
        {
          "k": "SSA average",
          "v": 18.5
        }
      ]
    },
    "ST-03": {
      "dir": "up",
      "unit": "%",
      "zim": 16.2,
      "rows": [
        {
          "k": "South Africa",
          "v": 75
        },
        {
          "k": "Kenya",
          "v": 38
        },
        {
          "k": "Ethiopia",
          "v": 25
        }
      ]
    },
    "MF-02": {
      "dir": "up",
      "unit": "%",
      "zim": 11.5,
      "rows": [
        {
          "k": "SADC average",
          "v": 10.1
        },
        {
          "k": "Uganda",
          "v": 15.6
        },
        {
          "k": "Malawi",
          "v": 11.7
        },
        {
          "k": "Zambia",
          "v": 8.1
        },
        {
          "k": "Tanzania",
          "v": 8.2
        },
        {
          "k": "Kenya",
          "v": 7
        },
        {
          "k": "Mozambique",
          "v": 6.6
        }
      ]
    },
    "MF-03": {
      "dir": "up",
      "unit": "$",
      "zim": 298,
      "rows": [
        {
          "k": "Peer average",
          "v": 130.9
        },
        {
          "k": "Kenya",
          "v": 157
        },
        {
          "k": "Uganda",
          "v": 146.9
        },
        {
          "k": "Zambia",
          "v": 83
        },
        {
          "k": "Malawi",
          "v": 69
        },
        {
          "k": "Mozambique",
          "v": 31.5
        }
      ]
    },
    "MF-07": {
      "dir": "up",
      "unit": "%",
      "zim": 4.3,
      "rows": [
        {
          "k": "Industrializing Economies",
          "v": 136.3
        },
        {
          "k": "China",
          "v": 139.1
        },
        {
          "k": "Africa Region",
          "v": 117.6
        }
      ]
    },
    "MF-04": {
      "dir": "up",
      "unit": "%",
      "zim": 9.5,
      "rows": [
        {
          "k": "SADC Member average",
          "v": 11.1
        },
        {
          "k": "Zambia",
          "v": 18.6
        },
        {
          "k": "Kenya",
          "v": 16.4
        },
        {
          "k": "Uganda",
          "v": 11.1
        },
        {
          "k": "Mozambique",
          "v": 10.9
        },
        {
          "k": "Malawi",
          "v": 3.7
        }
      ]
    },
    "MF-05": {
      "dir": "up",
      "unit": "",
      "zim": 0.262,
      "rows": [
        {
          "k": "SADC Member average",
          "v": 0.207
        },
        {
          "k": "Kenya",
          "v": 0.354
        },
        {
          "k": "Malawi",
          "v": 0.257
        },
        {
          "k": "Zambia",
          "v": 0.253
        },
        {
          "k": "Uganda",
          "v": 0.25
        },
        {
          "k": "Mozambique",
          "v": 0.109
        }
      ]
    },
    "MF-09": {
      "dir": "up",
      "unit": "%",
      "zim": 4.9,
      "rows": [
        {
          "k": "SADC aggregate",
          "v": 5
        },
        {
          "k": "Kenya",
          "v": 5.2
        },
        {
          "k": "Zambia",
          "v": 4.9
        },
        {
          "k": "Uganda",
          "v": 4.1
        },
        {
          "k": "Malawi",
          "v": 3.4
        },
        {
          "k": "Mozambique",
          "v": 2.7
        }
      ]
    },
    "VA-01": {
      "dir": "up",
      "unit": "%",
      "zim": 29.2,
      "rows": [
        {
          "k": "Peer average",
          "v": 44.4
        },
        {
          "k": "Botswana",
          "v": 95.5
        },
        {
          "k": "Kenya",
          "v": 48.4
        },
        {
          "k": "Uganda",
          "v": 23.2
        },
        {
          "k": "Zambia",
          "v": 21.5
        },
        {
          "k": "Mozambique",
          "v": 20.5
        },
        {
          "k": "Malawi",
          "v": 13.3
        }
      ]
    },
    "EN-01": {
      "dir": "down",
      "unit": " days",
      "zim": 19.6,
      "rows": [
        {
          "k": "SSA average",
          "v": 30.4
        },
        {
          "k": "Zambia",
          "v": 10.3
        },
        {
          "k": "Kenya",
          "v": 13.8
        },
        {
          "k": "Mozambique",
          "v": 22.2
        },
        {
          "k": "Uganda",
          "v": 29.3
        },
        {
          "k": "Malawi",
          "v": 30.8
        }
      ]
    },
    "EN-09": {
      "dir": "down",
      "unit": "%",
      "zim": 52.5,
      "rows": [
        {
          "k": "SSA average",
          "v": 72
        },
        {
          "k": "Mozambique",
          "v": 58.8
        },
        {
          "k": "Kenya",
          "v": 74.6
        },
        {
          "k": "Uganda",
          "v": 79.9
        },
        {
          "k": "Malawi",
          "v": 89.1
        },
        {
          "k": "Zambia",
          "v": 89.6
        }
      ]
    },
    "EN-10": {
      "dir": "down",
      "unit": "",
      "zim": 3.8,
      "rows": [
        {
          "k": "Mozambique",
          "v": 2.7
        },
        {
          "k": "Kenya",
          "v": 2.8
        },
        {
          "k": "Uganda",
          "v": 3.9
        },
        {
          "k": "Malawi",
          "v": 7.1
        },
        {
          "k": "Zambia",
          "v": 21.6
        }
      ]
    },
    "MF-06": {
      "dir": "up",
      "unit": "",
      "zim": 54.8,
      "rows": [
        {
          "k": "SSA average",
          "v": 47.5
        },
        {
          "k": "Kenya",
          "v": 61.4
        },
        {
          "k": "Uganda",
          "v": 54
        },
        {
          "k": "Zambia",
          "v": 52.7
        },
        {
          "k": "Malawi",
          "v": 44.9
        },
        {
          "k": "Mozambique",
          "v": 43.3
        }
      ]
    },
    "EN-11": {
      "dir": "up",
      "unit": "%",
      "zim": 31.6,
      "rows": [
        {
          "k": "Kenya",
          "v": 57.1
        },
        {
          "k": "Mozambique",
          "v": 44
        },
        {
          "k": "Uganda",
          "v": 28.1
        },
        {
          "k": "Malawi",
          "v": 24.5
        },
        {
          "k": "Zambia",
          "v": 22.2
        }
      ]
    },
    "EN-12": {
      "dir": "up",
      "unit": "%",
      "zim": 19.4,
      "rows": [
        {
          "k": "Mozambique",
          "v": 33.5
        },
        {
          "k": "Uganda",
          "v": 16.2
        },
        {
          "k": "Malawi",
          "v": 14.5
        },
        {
          "k": "Kenya",
          "v": 7.1
        },
        {
          "k": "Zambia",
          "v": 6.2
        }
      ]
    },
    "EN-14": {
      "dir": "up",
      "unit": "",
      "zim": 22,
      "rows": [
        {
          "k": "Morocco",
          "v": 0.8415
        },
        {
          "k": "South Africa",
          "v": 0.8396
        },
        {
          "k": "Mauritius",
          "v": 0.6731
        },
        {
          "k": "Eswatini",
          "v": 0.6509
        },
        {
          "k": "Namibia",
          "v": 0.6295
        },
        {
          "k": "Botswana",
          "v": 0.5853
        },
        {
          "k": "Kenya",
          "v": 0.6058
        },
        {
          "k": "Uganda",
          "v": 0.5822
        },
        {
          "k": "Zambia",
          "v": 0.5703
        },
        {
          "k": "Lesotho",
          "v": 0.5378
        },
        {
          "k": "Mozambique",
          "v": 0.5203
        },
        {
          "k": "Malawi",
          "v": 0.4854
        }
      ]
    },
    "FC-01": {
      "dir": "up",
      "unit": "%",
      "zim": 23.1,
      "rows": [
        {
          "k": "SSA median",
          "v": 22.5
        },
        {
          "k": "Kenya",
          "v": 46.8
        },
        {
          "k": "Uganda",
          "v": 26
        },
        {
          "k": "Malawi",
          "v": 18
        },
        {
          "k": "Mozambique",
          "v": 11.1
        },
        {
          "k": "Zambia",
          "v": 3.1
        }
      ]
    },
    "FC-04": {
      "dir": "down",
      "unit": "%",
      "zim": 78.3,
      "rows": [
        {
          "k": "SSA average",
          "v": 74
        },
        {
          "k": "Kenya",
          "v": 59.5
        },
        {
          "k": "Uganda",
          "v": 64.4
        },
        {
          "k": "Mozambique",
          "v": 66.4
        },
        {
          "k": "Malawi",
          "v": 67.4
        },
        {
          "k": "Zambia",
          "v": 89.3
        }
      ]
    },
    "FD-01": {
      "dir": "up",
      "unit": "$",
      "zim": 380,
      "rows": [
        {
          "k": "SADC Peer median",
          "v": 500
        },
        {
          "k": "Mozambique",
          "v": 5693
        },
        {
          "k": "Uganda",
          "v": 3358
        },
        {
          "k": "Kenya",
          "v": 3200
        },
        {
          "k": "Tanzania",
          "v": 1718
        },
        {
          "k": "Namibia",
          "v": 1447
        },
        {
          "k": "Zambia",
          "v": 1293
        },
        {
          "k": "Malawi",
          "v": 452
        },
        {
          "k": "South Africa",
          "v": -2315
        }
      ]
    },
    "FD-02": {
      "dir": "up",
      "unit": "%",
      "zim": 1.9,
      "rows": [
        {
          "k": "Mozambique",
          "v": 25
        },
        {
          "k": "Uganda",
          "v": 6
        },
        {
          "k": "Zambia",
          "v": 5.1
        },
        {
          "k": "Malawi",
          "v": 3.8
        },
        {
          "k": "Kenya",
          "v": 2.7
        },
        {
          "k": "South Africa",
          "v": -0.6
        }
      ]
    },
    "FD-05": {
      "dir": "up",
      "unit": "$",
      "zim": 8450,
      "rows": [
        {
          "k": "South Africa",
          "v": 132330
        },
        {
          "k": "Mozambique",
          "v": 66560
        },
        {
          "k": "DR Congo",
          "v": 38550
        },
        {
          "k": "Uganda",
          "v": 26100
        },
        {
          "k": "Tanzania",
          "v": 23420
        },
        {
          "k": "Zambia",
          "v": 17800
        },
        {
          "k": "Kenya",
          "v": 12140
        }
      ]
    },
    "FD-03": {
      "dir": "up",
      "unit": "$",
      "zim": 420,
      "rows": [
        {
          "k": "Angola",
          "v": 19720
        },
        {
          "k": "DRC",
          "v": 12780
        },
        {
          "k": "Mozambique",
          "v": 10600
        },
        {
          "k": "Namibia",
          "v": 9790
        },
        {
          "k": "Zambia",
          "v": 7780
        }
      ]
    },
    "FD-03b": {
      "dir": "up",
      "unit": "$",
      "zim": 157,
      "rows": [
        {
          "k": "Mauritius",
          "v": 7270
        },
        {
          "k": "Namibia",
          "v": 747.3
        },
        {
          "k": "Tanzania",
          "v": 696.7
        }
      ]
    },
    "IF-01": {
      "dir": "down",
      "unit": " days",
      "zim": 6.7,
      "rows": [
        {
          "k": "Malawi",
          "v": 10.3
        },
        {
          "k": "Kenya",
          "v": 15.4
        },
        {
          "k": "Uganda",
          "v": 17
        },
        {
          "k": "Mozambique",
          "v": 21.3
        },
        {
          "k": "Zambia",
          "v": 30.8
        }
      ]
    },
    "RB-05": {
      "dir": "down",
      "unit": " days",
      "zim": 6,
      "rows": [
        {
          "k": "SSA average",
          "v": 16.5
        },
        {
          "k": "Kenya",
          "v": 6.6
        },
        {
          "k": "Uganda",
          "v": 7.1
        },
        {
          "k": "Zambia",
          "v": 14.6
        },
        {
          "k": "Malawi",
          "v": 16.1
        },
        {
          "k": "Mozambique",
          "v": 20.6
        }
      ]
    }
  },
  /* ---- nds2Indicators ----
     Indicators from this assessment that also carry a Key Performance Indicator in the
     NDS2 Results Framework 2026-30. This report reads 2025 data, so the comparator is
     the framework's 2025 BASELINE, not a forward target. Progress is the standard
     composite-indicator normalisation with min 0 and max the baseline:
       higher-is-better  score = actual / baseline x 100   (capped at 100)
       lower-is-better   score = baseline / actual x 100   (capped at 100)
     "dir" says which way is better; "baselineV" is the number used in the arithmetic. */
  "nds2Indicators": [
      {"code": "TC-01b", "kpi": "Annual Exports growth rate", "frame": "Image Building, International Relations and Trade", "baseline": "2.9%", "baselineV": 2.9, "dir": "up"},
      {"code": "TC-TCI", "kpi": "Export Diversification (Theil Concentration Index)", "frame": "Inclusive Economic Growth and Structural Transformation", "baseline": "7.8", "baselineV": 7.8, "dir": "down"},
      {"code": "MF-02", "kpi": "Manufacturing Value Added as a percentage of GDP", "frame": "Inclusive Economic Growth and Structural Transformation", "baseline": "15.3%", "baselineV": 15.3, "dir": "up"},
      {"code": "MF-07", "kpi": "Manufacturing sector growth rate", "frame": "Inclusive Economic Growth and Structural Transformation", "baseline": "2.8%", "baselineV": 2.8, "dir": "up"},
      {"code": "MF-09", "kpi": "Manufacturing Employment as a proportion of Total Employment", "frame": "Inclusive Economic Growth and Structural Transformation", "baseline": "7%", "baselineV": 7, "dir": "up"},
      {"code": "FD-01", "kpi": "Total FDI inflows (US$ million)", "frame": "Image Building, International Relations and Trade", "baseline": "US$465.43 mn", "baselineV": 465.43, "dir": "up"}
    ],

  /* ---- indicators ----
     The 95 scored indicators. "score" (0-100) and "weight" drive every domain, pillar and index score on the dashboard: domain = sum of weight x score; pillar = average of its domains; index = average of the pillars. */
  "indicators": [
    {
      "domain": "5.1.1",
      "code": "TC-01a",
      "name": "Structural Export Velocity (4-Yr CAGR)",
      "weight": 0.125,
      "value": "12.6%",
      "score": 75,
      "bands": "<5%=0; 5-8%=25; 8-12%=50; 12-15%=75; >15%=100",
      "source": "Authors calculations from TradeMap Data",
      "comparators": "UNIDO Manuf. Trade DB: Zim 12.6% p.a. (2021-25); Uganda 33.2%, Mozambique 9.2%, Kenya 6.3%, Zambia 4.9%, SADC avg 1.7%, Malawi -1.6%"
    },
    {
      "domain": "5.1.1",
      "code": "TC-01b",
      "name": "Annual Export Momentum (YoY %)",
      "weight": 0.125,
      "value": "30.6%",
      "score": 100,
      "bands": "<0%=0; 0-5%=25; 5-10%=50; 10-20%=75; >20%=100",
      "source": "Authors calculations from TradeMap Data",
      "comparators": "UNIDO Manuf. Trade DB, 2025 vs 2024: Zim +30.6%; Uganda +55.5%, Zambia +18.1%, Kenya +4.4%, SADC avg +3.3%, Malawi -1.2%, Mozambique -1.4%"
    },
    {
      "domain": "5.1.1",
      "code": "TC-02",
      "name": "Export-to-GDP Ratio (%)",
      "weight": 0.125,
      "value": "27.7%",
      "score": 50,
      "bands": "<15%=0; 15-25%=25; 25-34%=50; >34% SADC median=100",
      "source": "Authors calculations from TradeMap Data",
      "comparators": "Zim 2025: 27.7% (UNIDO 2025 goods exports / user-supplied nominal GDP $35.05bn). Peers 2024 (UNIDO exports / UNIDO nominal GDP): Zambia 44.6%, Mozambique 36.1%, SADC avg 27.5%, Uganda 14.3%, Malawi 8.2%, Kenya 6.9%. Zim 2024 on UNIDO GDP: 16.3%"
    },
    {
      "domain": "5.1.1",
      "code": "TC-03",
      "name": "Export Specialization Breadth",
      "weight": 0.125,
      "value": "36",
      "score": 50,
      "bands": "<15=0; 15-30=25; 30-50=50; >50=100",
      "source": "Authors calculations from TradeMap Data",
      "comparators": "SADC leaders: SA >250 lines, Kenya >90 lines; Zimbabwe 36 lines"
    },
    {
      "domain": "5.1.1",
      "code": "TC-HHI",
      "name": "Product Concentration Index (HHI)",
      "weight": 0.125,
      "value": "3,105",
      "score": 50,
      "bands": "HHI>5000=0; 4000-5000=25; 2500-4000=50; <2500=100",
      "source": "Authors calculations from TradeMap Data",
      "comparators": "SADC reformer benchmark <2,500; SA ~1,800, Zambia ~3,200; Zim 2025 = 2,691.7"
    },
    {
      "domain": "5.1.1",
      "code": "TC-TCI",
      "name": "Theil Concentration Index (TCI)",
      "weight": 0.125,
      "value": "6.44",
      "score": 0,
      "bands": "TCI>6.0=0; 5.2-6.0=25; 4.5-5.2=50; 3.5-4.5=75; <3.5=100",
      "source": "Authors calculations from TradeMap Data",
      "comparators": "World Bank/UNCTAD benchmark; Zim 2025 = 5.467 (Norm 0.724); T_int = 4.925 (90.1%), T_ext = 0.542 (9.9%)"
    },
    {
      "domain": "5.1.1",
      "code": "TC-05",
      "name": "Top-3 Commodity Export Share (%)",
      "weight": 0.125,
      "value": "75.5%",
      "score": 25,
      "bands": ">80%=0; 70-80%=25; 60-70%=50; <60%=100",
      "source": "Authors calculations from TradeMap Data",
      "comparators": "SADC reformer benchmark <60%; Zimbabwe 2025: 75.5% (Gold, Tobacco, Nickel)"
    },
    {
      "domain": "5.1.2",
      "code": "IM-01",
      "name": "Goods Trade Balance (USD mn)",
      "weight": 0.142857,
      "value": "Narrowing",
      "score": 50,
      "bands": "Widening deficit=0; Stable deficit=25; Narrowing=50; Surplus=100",
      "source": "Authors calculations from TradeMap Data",
      "comparators": "UNIDO goods trade balance (USD mn): Zim -1,505 (2021), -2,099 (2024), -438 (2025) = narrowing; 2025: SADC avg +10,121, Zambia +143, Mozambique -1,110, Malawi -2,714, Uganda -5,900, Kenya -13,117"
    },
    {
      "domain": "5.1.2",
      "code": "IM-02",
      "name": "Trade Balance as % of GDP",
      "weight": 0.142857,
      "value": "-1.25%",
      "score": 50,
      "bands": "<-10%=0; -10 to -5%=25; -5 to 0%=50; Surplus=100",
      "source": "Authors calculations from TradeMap Data",
      "comparators": "Zim 2025: -1.3% (UNIDO 2025 goods balance / user-supplied nominal GDP $35.05bn). Peers 2024 (UNIDO): SADC avg 1.4%, Zambia 0.0%, Mozambique -4.4%, Kenya -9.9%, Uganda -10.3%, Malawi -20.1%. Zim 2024 on UNIDO GDP: -4.6%"
    },
    {
      "domain": "5.1.2",
      "code": "IM-03",
      "name": "Capital Goods Import Share (%)",
      "weight": 0.142857,
      "value": "18.3%",
      "score": 50,
      "bands": "<15%=0; 15-20%=50; >25%=100",
      "source": "RBZ Monetary Policy Statement",
      "comparators": ">25% signals investment pipeline; SA ~28%, Kenya ~26%, Zim ~22.4%"
    },
    {
      "domain": "5.1.2",
      "code": "IM-04",
      "name": "Import Source Concentration",
      "weight": 0.142857,
      "value": "37.6%",
      "score": 100,
      "bands": ">70%=0; 50-70%=50; <50%=100",
      "source": "Authors calculations from TradeMap Data",
      "comparators": "<50% single-source; Zimbabwe: SA ~60-65% of imports"
    },
    {
      "domain": "5.1.2",
      "code": "IM-05",
      "name": "Export Destination Concentration",
      "weight": 0.142857,
      "value": "48.75%",
      "score": 100,
      "bands": ">70%=0; 50-70%=50; <50%=100",
      "source": "Authors calculations from TradeMap Data",
      "comparators": "<50% single-destination; Zimbabwe: SA ~45%, UAE ~30%"
    },
    {
      "domain": "5.1.2",
      "code": "IM-06",
      "name": "Current Account Balance as % of GDP",
      "weight": 0.142857,
      "value": "6.0%",
      "score": 100,
      "bands": "<-5%=0; -5 to 0%=25; 0 to 3%=50; >3%=100",
      "source": "RBZ Balance of Payments / MPS",
      "comparators": "SADC range -5% to +5% GDP; Zim surplus +6.0% of GDP ($2.10bn)"
    },
    {
      "domain": "5.1.2",
      "code": "IC-09",
      "name": "Commodity Shock Vulnerability Cushion",
      "weight": 0.142857,
      "value": "0.020x",
      "score": 0,
      "bands": "<0.02=0; 0.02-0.04=25; 0.04-0.06=50; >0.06=100",
      "source": "ZCR Computation / Reserve Bank of Zimbabwe & ZimStat",
      "comparators": "Prescriptive: 0.02x cushion shows 15% drop in gold/tobacco prices would deplete central bank reserves in 45 days"
    },
    {
      "domain": "5.1.3",
      "code": "TF-01",
      "name": "ZeSW Entry Points Coverage (%)",
      "weight": 0.083333,
      "value": "Nationwide",
      "score": 100,
      "bands": "Not implemented=0; Pilot=50; Nationwide=100",
      "source": "ZIMRA ZeSW Reports",
      "comparators": "100% at Forbes & RGM Airport; Beitbridge land corridor priority next"
    },
    {
      "domain": "5.1.3",
      "code": "TF-02",
      "name": "Customs Release Time for Exports (Days)",
      "weight": 0.083333,
      "value": "3.3 days",
      "score": 100,
      "bands": ">12d=0; 8-12d=25; 6.4-8d=50; <6.4d=100 (SSA Median 6.4d)",
      "source": "World Bank Enterprise Survey",
      "comparators": "WBES 2025: Zimbabwe 3.3d; Kenya 5.8d, Malawi 3.0d, Mozambique 4.2d, Uganda 1.5d, Zambia 1.6d; SSA avg 6.1d. Framework band set at SSA median 6.4d."
    },
    {
      "domain": "5.1.3",
      "code": "TF-03",
      "name": "Digital Certificates of Origin (%)",
      "weight": 0.083333,
      "value": "100.0%",
      "score": 100,
      "bands": "<25%=0; 25-75%=50; >75%=100",
      "source": "ZIMRA CoO Reports",
      "comparators": "100% target; SA 100%, Zambia 85%, Zimbabwe ~75%"
    },
    {
      "domain": "5.1.3",
      "code": "TF-04",
      "name": "Customs Release Time for Imports (Days)",
      "weight": 0.083333,
      "value": "2.6 days",
      "score": 100,
      "bands": ">20d=0; 15-20d=25; 10.4-15d=50; <10.4d=100 (SSA Median 10.4d)",
      "source": "World Bank Enterprise Survey",
      "comparators": "WBES 2025: Zimbabwe 2.6d; Kenya 6.7d, Malawi 2.9d, Mozambique 3.2d, Uganda 5.4d, Zambia 2.0d; SSA avg 10.0d. Framework band set at SSA median 10.4d. Manufacturing firms only."
    },
    {
      "domain": "5.1.3",
      "code": "TF-05",
      "name": "E-Payment Customs Duties (%)",
      "weight": 0.083333,
      "value": "Operational",
      "score": 100,
      "bands": "0%=0; Pilot=50; Operational=100",
      "source": "ZIMRA / RBZ Payment Gateway",
      "comparators": "100% target; SADC leaders: SA, Kenya full integration; Zim operational"
    },
    {
      "domain": "5.1.3",
      "code": "TF-06",
      "name": "PAPSS-Connected Banks (count)",
      "weight": 0.083333,
      "value": "10",
      "score": 100,
      "bands": "<3=0; 3-7=50; >7=100",
      "source": "PAPSS Website",
      "comparators": "10/10 major commercial banks connected to PAPSS regional gateway"
    },
    {
      "domain": "5.1.3",
      "code": "TF-07",
      "name": "Days to Obtain an Import License",
      "weight": 0.083333,
      "value": "5.6 days",
      "score": 100,
      "bands": ">30d=0; 25-30d=25; 18.5-25d=50; <18.5d=100 (SSA Median 18.5d)",
      "source": "World Bank Enterprise Survey",
      "comparators": "WBES 2025: Zimbabwe 5.6d; Kenya 12.7d, Malawi 16.6d, Mozambique 12.2d, Uganda 9.7d, Zambia 14.5d; SSA avg 18.5d. Framework band set at SSA median 18.5d."
    },
    {
      "domain": "5.1.3",
      "code": "TF-08",
      "name": "Public AfCFTA Portal with Live Schedules",
      "weight": 0.083333,
      "value": "Partial",
      "score": 50,
      "bands": "No portal=0; Partial=50; Live & current=100",
      "source": "Public Search",
      "comparators": "AfCFTA Secretariat standard: portal live; Kenya, Ghana operational"
    },
    {
      "domain": "5.1.3",
      "code": "TF-09",
      "name": "Exporter Foreign Currency Retention Ratio (%)",
      "weight": 0.083333,
      "value": "70.0%",
      "score": 50,
      "bands": "<50%=0; 50-60%=25; 60-70%=50; >70%=100",
      "source": "RBZ MPS",
      "comparators": "SADC regional benchmark 100% retention; Zimbabwe 70% retention (30% surrender)"
    },
    {
      "domain": "5.1.3",
      "code": "TF-10",
      "name": "Advance Tariff & Origin Rulings Rate (%)",
      "weight": 0.083333,
      "value": "Partially implemented",
      "score": 66.67,
      "bands": "Not implemented=0; Planning stage=33.3; Partially implemented=66.7; Fully implemented=100 (UNTF points 0-3 divided by 3, x100)",
      "source": "UN Global Survey on Digital and Sustainable Trade Facilitation (UNTF), 2025 round - Zimbabwe",
      "comparators": "Partially implemented (Planning stage 2021-23; Not implemented before 2021)"
    },
    {
      "domain": "5.1.3",
      "code": "TF-11",
      "name": "Customs Physical Risk Inspection Ratio (Inverted)",
      "weight": 0.083333,
      "value": "Planning stage",
      "score": 33.33,
      "bands": "Not implemented=0; Planning stage=33.3; Partially implemented=66.7; Fully implemented=100 (UNTF points 0-3 divided by 3, x100)",
      "source": "UN Global Survey on Digital and Sustainable Trade Facilitation (UNTF), 2025 round - Zimbabwe",
      "comparators": "UNTF 2025: Planning stage (unchanged since 2015). Related: Post-clearance audits = Partially implemented (since 2023); Formalities category score 70.83%"
    },
    {
      "domain": "5.1.3",
      "code": "TF-12",
      "name": "Digital Duty Drawback & Refund Turnaround (Days)",
      "weight": 0.083333,
      "value": "Planning stage",
      "score": 33.33,
      "bands": "Not implemented=0; Planning stage=33.3; Partially implemented=66.7; Fully implemented=100 (UNTF points 0-3 divided by 3, x100)",
      "source": "UN Global Survey on Digital and Sustainable Trade Facilitation (UNTF), 2025 round - Zimbabwe",
      "comparators": "UNTF 2025: Planning stage (Not implemented 2015-2023)"
    },
    {
      "domain": "5.1.4",
      "code": "MA-01",
      "name": "AEO Certified Exporters (count)",
      "weight": 0.111111,
      "value": "15",
      "score": 50,
      "bands": "<5=0; 5-25=50; >25=100",
      "source": "ZIMRA",
      "comparators": "Target: top-50 exporters; SA 400+ AEO firms, Kenya 120; Zim 18"
    },
    {
      "domain": "5.1.4",
      "code": "MA-02",
      "name": "OSBP Corridor Coverage (%)",
      "weight": 0.111111,
      "value": "100.0%",
      "score": 100,
      "bands": "<25%=0; 25-75%=50; >75%=100",
      "source": "ZIMRA",
      "comparators": "Plumtree, Chirundu, Kazungula live; Beitbridge OSBP pending"
    },
    {
      "domain": "5.1.4",
      "code": "MA-03",
      "name": "AfCFTA Preference Utilization Rate (%)",
      "weight": 0.111111,
      "value": "0.0%",
      "score": 0,
      "bands": "0%=0; >0-0.05%=25; >0.05-0.15%=50; >0.15-0.50%=75; >0.50%=100",
      "source": "ZIMRA",
      "comparators": "South Africa (2025 Pioneer Benchmark): 0.158% ($49.20M preference claims ÷ $31,141.24M intra-African exports) -> Score: 0.75 (Accelerating)   - Kenya (Guided Trade Initiative): 0.172% ($5.50M preference claims ÷ $3,200.0M intra-African exports) -> Score: 0.75 (Accelerating)   - Ghana / Egypt (GTI Leaders): 0.556% ($25.0M preference claims ÷ $4,500.0M intra-African exports) -> Score: 1.00 (Activated Target)   - Strategic Target: Reaching >0.05% PUR ($1.37M for Zim) unlocks Mobilising Stage (0.50); >0.158% ($4.33M) matches SA Pioneer Tier (0.75)."
    },
    {
      "domain": "5.1.4",
      "code": "MA-04",
      "name": "Tariff Line Coverage in AfCFTA Schedule",
      "weight": 0.111111,
      "value": "97.0%",
      "score": 100,
      "bands": "<50%=0; 50-80%=50; >90%=100",
      "source": "ZIMRA / MoIT",
      "comparators": "100% target; Zimbabwe ~90%  strongest SADC schedules submitted"
    },
    {
      "domain": "5.1.4",
      "code": "MA-05",
      "name": "AfCFTA Implementing Regulations Gazetted",
      "weight": 0.111111,
      "value": "Draft",
      "score": 50,
      "bands": "Not gazetted=0; Draft=50; Gazetted=100",
      "source": "Government Gazette",
      "comparators": "AfCFTA Secretariat deadline 2024; Zimbabwe pending"
    },
    {
      "domain": "5.1.4",
      "code": "MA-06",
      "name": "NTB SLA Resolution Rate (%)",
      "weight": 0.111111,
      "value": "0.0%",
      "score": 0,
      "bands": "<30%=0; 30-70%=50; >70%=100",
      "source": "Trade Barriers NTB Website",
      "comparators": ">70% within 60 days; COMESA avg ~55%; Zambia 78%"
    },
    {
      "domain": "5.1.4",
      "code": "MA-07",
      "name": "Active Regional NTB Complaint Stock",
      "weight": 0.111111,
      "value": "0",
      "score": 100,
      "bands": ">10=0; 5-10=25; 2-5=50; <2=100",
      "source": "Trade Barriers NTB Website",
      "comparators": "<2 target; Regional benchmark <3 unresolved NTBs"
    },
    {
      "domain": "5.1.4",
      "code": "MA-08",
      "name": "Cross-Border Customs Data Interoperability Index",
      "weight": 0.111111,
      "value": "Planning stage",
      "score": 33.33,
      "bands": "Not implemented=0; Planning stage=33.3; Partially implemented=66.7; Fully implemented=100 (UNTF points 0-3 divided by 3, x100)",
      "source": "UN Global Survey on Digital and Sustainable Trade Facilitation (UNTF), 2025 round - Zimbabwe",
      "comparators": "UNTF 2025: Planning stage (since 2021). Cross-Border Paperless Trade category score 33.33%"
    },
    {
      "domain": "5.1.4",
      "code": "MA-09",
      "name": "Gender-Responsive Border & Cross-Border Safety Index",
      "weight": 0.111111,
      "value": "Fully implemented",
      "score": 100,
      "bands": "Not implemented=0; Planning stage=33.3; Partially implemented=66.7; Fully implemented=100 (UNTF points 0-3 divided by 3, x100)",
      "source": "UN Global Survey on Digital and Sustainable Trade Facilitation (UNTF), 2025 round - Zimbabwe",
      "comparators": "UNTF 2025: Fully implemented (Partially implemented 2017-2023). Related: women-participation strategy and women on national TF committee = Partially implemented"
    },
    {
      "domain": "5.1.5",
      "code": "ST-01",
      "name": "e-Phyto / e-SPS Hub Integration",
      "weight": 0.25,
      "value": "Pilot",
      "score": 50,
      "bands": "Paper-only=0; Pilot=50; Fully digital=100",
      "source": "MCAZ / DVS / IPPC ePhyto Hub",
      "comparators": "100% e-SPS; Kenya, SA full e-phyto operational; Zim paper-only"
    },
    {
      "domain": "5.1.5",
      "code": "ST-02",
      "name": "SADCAS Accredited Testing Labs",
      "weight": 0.25,
      "value": "47",
      "score": 100,
      "bands": "<5=0; 5-10=50; >10=100",
      "source": "SAZ / SADCAS Register",
      "comparators": "SA 200+ labs, Zambia 18; Zimbabwe 11 accredited labs"
    },
    {
      "domain": "5.1.5",
      "code": "ST-03",
      "name": "AfCFTA Harmonized Standards Adoption (%)",
      "weight": 0.25,
      "value": "16.2%",
      "score": 100,
      "bands": "<5%=0; 5-10%=25; 10-15%=50; >=15.0%=100",
      "source": "SAZ / SADC Secretariat",
      "comparators": ">50% by 2030 SADC target; SA 75%, Kenya 38%, Ethiopia 25%; Zim 16% | NDS2 2026 target 15.0% (2030 terminal: 50.0%)"
    },
    {
      "domain": "5.1.5",
      "code": "ST-04",
      "name": "Perishable Agri-Export Border Clearance Index",
      "weight": 0.25,
      "value": "Planning stage",
      "score": 33.33,
      "bands": "Not implemented=0; Planning stage=33.3; Partially implemented=66.7; Fully implemented=100 (UNTF points 0-3 divided by 3, x100)",
      "source": "UN Global Survey on Digital and Sustainable Trade Facilitation (UNTF), 2025 round - Zimbabwe",
      "comparators": "UNTF 2025: Planning stage (Not implemented 2019-2023)"
    },
    {
      "domain": "5.2.1",
      "code": "MF-02",
      "name": "Manufacturing Value Added % GDP",
      "weight": 0.125,
      "value": "11.5%",
      "score": 100,
      "bands": "<6%=0; 6-9%=25; 9-11.5%=50; >=11.5%=100",
      "source": "UNIDO_ALL_INDICATORS_2021-2024.pdf (p. 14, SDG 9.2.1 Table; p. 91)",
      "comparators": "SADC Peer Avg: 10.1% (p. 91). Uganda (15.6%, p. 84), Malawi (11.7%, p. 83), Zambia (8.1%, p. 84), Tanzania (8.2%, p. 84), Kenya (7.0%, p. 83), Mozambique (6.6%, p. 83). | Benchmark source: UNIDO_ALL_INDICATORS_2021-2024.pdf (SDG 9.2.1 Matrix, p. 91 / Table A.1, pp. 83–84)"
    },
    {
      "domain": "5.2.1",
      "code": "MF-03",
      "name": "MVA per Capita (USD)",
      "weight": 0.125,
      "value": "$298",
      "score": 50,
      "bands": "<$100=0; $100-200=25; $200-400=50; >$400=100",
      "source": "UNIDO_ALL_INDICATORS_2021-2024.pdf (p. 14, SDG 9.2.1 Table; p. 85)",
      "comparators": "Peer Avg: $130.9 (p. 85). Kenya ($157.0, p. 85), Uganda ($146.9, p. 85), Zambia ($83.0, p. 85), Malawi ($69.0, p. 85), Mozambique ($31.5, p. 85). | Benchmark source: UNIDO_ALL_INDICATORS_2021-2024.pdf (SDG 9.2.1 Per Capita Matrix, p. 85 / p. 91)"
    },
    {
      "domain": "5.2.1",
      "code": "MF-07",
      "name": "Index of Manufacturing Output Growth",
      "weight": 0.125,
      "value": "4.3% p.a.",
      "score": 85.07,
      "bands": "Output growth > 5.0% p.a. | Derived scoring: Target >5.0% p.a. = 100. Below target scored pro rata (Actual / Target x 100, floored at 0, capped at 100)",
      "source": "MANUFACTURING_STATISTICS.md (Part A1, Index Table) / MIN_OF_FINANCE_AND_RBZ_DATA_2025-26.pdf (p. 23, Para 51)",
      "comparators": "World Base 2020=100 (121.8); Industrializing Economies (136.3); China (139.1); Africa Region (117.6). | Benchmark source: MANUFACTURING_STATISTICS.md (Part A1 Table)"
    },
    {
      "domain": "5.2.1",
      "code": "MF-04",
      "name": "Medium & High-Tech MVA Share",
      "weight": 0.125,
      "value": "9.5%",
      "score": 25,
      "bands": "<0.05=0; 0.06-0.15=25; 0.16-0.25=50; >0.26=100",
      "source": "UNIDO_ALL_INDICATORS_2021-2024.pdf (CIP Database, p. 6; p. 83)",
      "comparators": "SADC Member Avg: 11.1% (p. 83). Zambia (18.6%, p. 83), Kenya (16.4%, p. 83), Uganda (11.1%, p. 83), Mozambique (10.9%, p. 83), Malawi (3.7%, p. 83). | Benchmark source: UNIDO_ALL_INDICATORS_2021-2024.pdf (SDG 9.b.1 MHT Matrix, p. 83)"
    },
    {
      "domain": "5.2.1",
      "code": "MF-05",
      "name": "Industrial Export Quality Index",
      "weight": 0.125,
      "value": "0.262",
      "score": 0,
      "bands": "<0.45=0; 0.46-0.55=25; 0.56-0.65=50; >0.66=100",
      "source": "UNIDO_ALL_INDICATORS_2021-2024.pdf (p. 11, MXQual Table; p. 87)",
      "comparators": "SADC Member Avg: 0.207 (p. 87). Kenya (0.354, p. 87), Malawi (0.257, p. 87), Zambia (0.253, p. 87), Uganda (0.250, p. 87), Mozambique (0.109, p. 87). | Benchmark source: UNIDO_ALL_INDICATORS_2021-2024.pdf (Export Quality Matrix, p. 87)"
    },
    {
      "domain": "5.2.1",
      "code": "MF-08",
      "name": "UNIDO CIP Score (Rank 108th)",
      "weight": 0.125,
      "value": "0.01098",
      "score": 73.2,
      "bands": "Target: Top 100 Rank / CIP Score > 0.0150 | Derived scoring: Target CIP score >0.0150 (Top-100 rank) = 100. Below target scored pro rata (Actual / Target x 100, floored at 0, capped at 100)",
      "source": "UNIDO_ALL_INDICATORS_2021-2024.pdf (p. 13, CIP Table; p. 90) / MANUFACTURING_UNIDO_DATA.pdf (p. 62)",
      "comparators": "Peer Avg CIP Score: 0.00674 (p. 90). South Africa (52nd / 0.0620, p. 90), Botswana (92nd, p. 62), Kenya (114th, p. 90), Uganda (121st, p. 90), Zambia (123rd, p. 90), Mozambique (139th, p. 90), Malawi (144th, p. 90). | Benchmark source: UNIDO_ALL_INDICATORS_2021-2024.pdf (CIP Global Matrix, p. 90) / MANUFACTURING_UNIDO_DATA.pdf (Table A.1, p. 62)"
    },
    {
      "domain": "5.2.1",
      "code": "MF-09",
      "name": "Manufacturing Share in Employment (%)",
      "weight": 0.125,
      "value": "4.9%",
      "score": 81.67,
      "bands": "Target > 6.0% employment share | Derived scoring: Target >6.0% = 100. Below target scored pro rata (Actual / Target x 100, floored at 0, capped at 100)",
      "source": "UNIDO_ALL_INDICATORS_2021-2024.pdf (p. 15, SDG 9.2.2 Table; p. 93)",
      "comparators": "SADC Regional Aggregate: 5.0% (p. 93). Kenya (5.2%, p. 93), Zambia (4.9%, p. 93), Uganda (4.1%, p. 93), Malawi (3.4%, p. 93), Mozambique (2.7%, p. 93). | Benchmark source: UNIDO_ALL_INDICATORS_2021-2024.pdf (SDG 9.2.2 Matrix, p. 93)"
    },
    {
      "domain": "5.2.1",
      "code": "MF-10",
      "name": "Manufacturing Approved FDI Share (%)",
      "weight": 0.125,
      "value": "18.0%",
      "score": 40,
      "bands": "Target > 45.0% | Derived scoring: Target >45.0% = 100. Below target scored pro rata (Actual / Target x 100, floored at 0, capped at 100)",
      "source": "ZIDA_FDI_DATA_2023-25.pdf (Table 5b, p. 15, 60) / INVESTMENT_BENCHMARK_2025.pdf (Sec 4.2, p. 20)",
      "comparators": "Kenya KenInvest: 42.0% (p. 20); South Africa dtic: 38.0% (p. 20). | Benchmark source: INVESTMENT_BENCHMARK_2025.pdf (Sec 4.2, p. 20)"
    },
    {
      "domain": "5.2.2a",
      "code": "VA-01",
      "name": "Value-Added Export Share (%)",
      "weight": 0.25,
      "value": "29.2%",
      "score": 50,
      "bands": "<15%=0; 15-25%=25; 25-38%=50; >38%=100",
      "source": "xtrade_data_zimbabwe_and_comparators_2021-25_combined.md (Section 4, Headline Comparison) / UNIDO_ALL_INDICATORS_2021-2024.pdf (p. 11, MXsh Table; p. 88)",
      "comparators": "Peer Avg: 44.4% (p. 88). Botswana (95.5%, p. 83), Kenya (48.4%, p. 88), Uganda (23.2%, p. 88), Zambia (21.5%, p. 88), Mozambique (20.5%, p. 88), Malawi (13.3%, p. 88). | Benchmark source: UNIDO_ALL_INDICATORS_2021-2024.pdf (Manufactured Export Share Matrix, p. 88) / xtrade_data_zimbabwe_and_comparators_2021-25_combined.md (Section 4)"
    },
    {
      "domain": "5.2.2a",
      "code": "VA-02",
      "name": "Processed Agriculture Export Ratio",
      "weight": 0.25,
      "value": "0.14 : 1",
      "score": 0,
      "bands": "<0.5=0; 0.5-1.0=25; 1.0-1.5=50; >1.5=100",
      "source": "xtrade_data_zimbabwe_and_comparators_2021-25_combined.md (Section 6, Zimbabwe Detail / HS 2401 vs HS 2402/2403) / MIN_OF_FINANCE_AND_RBZ_DATA_2025-26.pdf (p. 58, Table 16)",
      "comparators": "Target > 1.50:1. South Africa: 2.10:1 (Section 7); Kenya: 1.80:1 (Section 7). Broad ratio depressed by $1.328B raw leaf tobacco exports. | Benchmark source: xtrade_data_zimbabwe_and_comparators_2021-25_combined.md (Section 7, Comparator Profiles)"
    },
    {
      "domain": "5.2.2a",
      "code": "VA-03",
      "name": "Food Import Share (%)",
      "weight": 0.25,
      "value": "18.7%",
      "score": 0,
      "bands": ">15%=0; 10-15%=25; 5-10%=50; <5%=100",
      "source": "xtrade_data_zimbabwe_and_comparators_2021-25_combined.md (Section 6, Imports by Product) / MIN_OF_FINANCE_AND_RBZ_DATA_2025-26.pdf (p. 60, Para 146)",
      "comparators": "SADC Benchmark < 5.0%. South Africa: 4.2%; Kenya: 8.5%. Food imports led by Maize ($447.2M), Soybean Oil ($267.1M), Wheat ($186.8M), Rice ($161.5M). | Benchmark source: xtrade_data_zimbabwe_and_comparators_2021-25_combined.md (Section 4 & 7)"
    },
    {
      "domain": "5.2.2a",
      "code": "VA-07",
      "name": "Economic Complexity Index (ECI) Rank",
      "weight": 0.25,
      "value": "108th",
      "score": 41.67,
      "bands": "Target Top 80 Rank | Derived scoring: Target Top-80 rank = 100; rank 128 = 0; linear in between",
      "source": "INTERNATIONAL_BENCHMARKING_REPORTS.pdf (p. 12, p. 92, ECI Table)",
      "comparators": "South Africa: 55th (p. 92); Mauritius: 60th (p. 92); Kenya: 88th (p. 92); Nigeria: 122nd (p. 92); Angola: 127th (p. 92). | Benchmark source: INTERNATIONAL_BENCHMARKING_REPORTS.pdf (p. 12, p. 92)"
    },
    {
      "domain": "5.2.2b",
      "code": "MN-01",
      "name": "Gold Production Volume (tonnes)",
      "weight": 0.2,
      "value": "46.7 t",
      "score": 50,
      "bands": "<30t=0; 30-40t=25; 40-48t=50; 48-52.2t=75; >=52.2t=100",
      "source": "MIN_OF_FINANCE_AND_RBZ_DATA_2025-26.pdf (p. 34, Table 8) / Reserve Bank of Zimbabwe_2025 _Annual Report.pdf (p. 58)",
      "comparators": "South Africa: 100t+; Ghana: 120t+; Tanzania: 50t+; Rwanda: 99.99% Gasabo refinery output ($869.7M exports, p. 6). | Benchmark source: INVESTMENT_BENCHMARK_2025.pdf (Mining Sector Highlights, p. 6–7) / MIN_OF_FINANCE_AND_RBZ_DATA_2025-26.pdf (p. 34)"
    },
    {
      "domain": "5.2.2b",
      "code": "MN-02",
      "name": "Gold Export Revenue (USD bn)",
      "weight": 0.2,
      "value": "$4.61 bn",
      "score": 100,
      "bands": "<$2bn=0; $2-3bn=50; $3-4bn=75; >$4bn=100",
      "source": "MIN_OF_FINANCE_AND_RBZ_DATA_2025-26.pdf (p. 58, Table 16; p. 59, Para 142) / Reserve Bank of Zimbabwe_2025 _Annual Report.pdf (Table 22, p. 74) / xtrade_data_zimbabwe_and_comparators_2021-25_combined.md (Section 6)",
      "comparators": "SADC Benchmark > $4.0 Billion; Zambia copper exports (~$8.0B, Section 7). | Benchmark source: xtrade_data_zimbabwe_and_comparators_2021-25_combined.md (Section 4 & 7) / MIN_OF_FINANCE_AND_RBZ_DATA_2025-26.pdf (p. 58)"
    },
    {
      "domain": "5.2.2b",
      "code": "MN-04",
      "name": "Lithium Value Chain Beneficiation & Output",
      "weight": 0.2,
      "value": "65,000 t",
      "score": 43.33,
      "bands": "Target > 150,000t sulphate capacity | Derived scoring: Target >150,000t sulphate capacity = 100. Below target scored pro rata (Actual / Target x 100, floored at 0, capped at 100)",
      "source": "MIN_OF_FINANCE_AND_RBZ_DATA_2025-26.pdf (p. 34, Table 8; p. 42, Para 106)",
      "comparators": "Benchmark: Australia Greenbushes / SQM lithium refining models; Rwanda LuNa / Power X processing plants (p. 8). | Benchmark source: INVESTMENT_BENCHMARK_2025.pdf (Section 2.1, p. 7) / MIN_OF_FINANCE_AND_RBZ_DATA_2025-26.pdf (p. 42)"
    },
    {
      "domain": "5.2.2b",
      "code": "MN-05",
      "name": "Ferro-Chrome vs Raw Chrome Export Ratio",
      "weight": 0.2,
      "value": "2.21x",
      "score": 100,
      "bands": "<1.0=0; 1.0-2.0=50; >2.0=100",
      "source": "MIN_OF_FINANCE_AND_RBZ_DATA_2025-26.pdf (p. 58, Table 16) / xtrade_data_zimbabwe_and_comparators_2021-25_combined.md (Section 6, HS 7202 vs HS 2610)",
      "comparators": "South Africa: 3.50:1 (Section 7). Ratio stabilized above 2.0:1 target post raw ore export ban. | Benchmark source: xtrade_data_zimbabwe_and_comparators_2021-25_combined.md (Section 7, South Africa Profile)"
    },
    {
      "domain": "5.2.2b",
      "code": "MN-09",
      "name": "Mineral Local Value Retention Rate (%)",
      "weight": 0.2,
      "value": "32.0%",
      "score": 25,
      "bands": "<20%=0; 20-40%=25; 40-60%=50; >60%=100",
      "source": "MIN_OF_FINANCE_AND_RBZ_DATA_2025-26.pdf (p. 42, Para 105) / Reserve Bank of Zimbabwe_2025 _Annual Report.pdf",
      "comparators": "African Mining Vision Benchmarks: South Africa (~65.0%), Zambia (~45.0%), Rwanda (~26% in smelters, p. 8). Target > 60.0%. | Benchmark source: INVESTMENT_BENCHMARK_2025.pdf (p. 6–8)"
    },
    {
      "domain": "5.2.3",
      "code": "EN-01",
      "name": "Days to Obtain Electrical Connection",
      "weight": 0.1,
      "value": "19.6 days",
      "score": 75,
      "bands": "<10d=100; 10-20d=75; 20-30d=50; >30d=0",
      "source": "ENTERPRISE_SURVEY_DATA_2025.pdf (Table 14, p. 27; p. 14, Table 2)",
      "comparators": "Sub-Saharan Africa Avg: 30.4 Days (p. 27); Zambia (10.3d, p. 18), Kenya (13.8d, p. 17), Mozambique (22.2d, p. 16), Uganda (29.3d, p. 17), Malawi (30.8d, p. 18). | Benchmark source: ENTERPRISE_SURVEY_DATA_2025.pdf (Table 14, p. 27; pp. 16–18)"
    },
    {
      "domain": "5.2.3",
      "code": "EN-09",
      "name": "Power Outage Incidence Rate (% of formal firms)",
      "weight": 0.1,
      "value": "52.5%",
      "score": 50,
      "bands": "<50%=100; 50-70%=50; >70%=0",
      "source": "ENTERPRISE_SURVEY_DATA_2025.pdf (Table 14, p. 27; p. 19, Table 6)",
      "comparators": "Sub-Saharan Africa Avg: 72.0% (p. 27); Mozambique (58.8%, p. 16), Kenya (74.6%, p. 17), Uganda (79.9%, p. 17), Malawi (89.1%, p. 18), Zambia (89.6%, p. 18). | Benchmark source: ENTERPRISE_SURVEY_DATA_2025.pdf (Table 14, p. 27; pp. 16–18)"
    },
    {
      "domain": "5.2.3",
      "code": "EN-10",
      "name": "Monthly Power Outages Frequency (Count)",
      "weight": 0.1,
      "value": "3.8 / month",
      "score": 50,
      "bands": "<3.0=100; 3.0-6.0=50; >6.0=0",
      "source": "ENTERPRISE_SURVEY_DATA_2025.pdf (Table 14, p. 27; p. 19, Table 6)",
      "comparators": "Sub-Saharan Africa Avg: 6.9 outages/month (p. 27); Mozambique (2.7, p. 16), Kenya (2.8, p. 17), Uganda (3.9, p. 17), Malawi (7.1, p. 18), Zambia (21.6, p. 18). | Benchmark source: ENTERPRISE_SURVEY_DATA_2025.pdf (Table 14, p. 27; pp. 16–18)"
    },
    {
      "domain": "5.2.3",
      "code": "MF-06",
      "name": "Management Practices Index Score (20+ workers)",
      "weight": 0.1,
      "value": "54.8",
      "score": 100,
      "bands": "<30=0; 30-40=25; 40-47.8=50; >47.8=100",
      "source": "ENTERPRISE_SURVEY_DATA_2025.pdf (Table 18, p. 31)",
      "comparators": "Sub-Saharan Africa Avg: 47.50 (p. 31); Kenya (61.40, p. 31), Uganda (54.00, p. 31), Zambia (52.70, p. 31), Malawi (44.90, p. 31), Mozambique (43.30, p. 31). | Benchmark source: ENTERPRISE_SURVEY_DATA_2025.pdf (Table 18, p. 31)"
    },
    {
      "domain": "5.2.3",
      "code": "EN-11",
      "name": "Product Innovation Adoption Rate (% of firms)",
      "weight": 0.1,
      "value": "31.6%",
      "score": 79,
      "bands": "Target > 40.0% Product Innovation | Derived scoring: Target >40.0% = 100. Below target scored pro rata (Actual / Target x 100, floored at 0, capped at 100)",
      "source": "ENTERPRISE_SURVEY_DATA_2025.pdf (Table 16, p. 29; p. 19, Table 6)",
      "comparators": "Kenya (57.1%, p. 17), Mozambique (44.0%, p. 16), Uganda (28.1%, p. 17), Malawi (24.5%, p. 18), Zambia (22.2%, p. 18). | Benchmark source: ENTERPRISE_SURVEY_DATA_2025.pdf (Table 16, p. 29; pp. 16–18)"
    },
    {
      "domain": "5.2.3",
      "code": "EN-12",
      "name": "Process Innovation Adoption Rate (% of firms)",
      "weight": 0.1,
      "value": "19.4%",
      "score": 77.6,
      "bands": "Target > 25.0% Process Innovation | Derived scoring: Target >25.0% = 100. Below target scored pro rata (Actual / Target x 100, floored at 0, capped at 100)",
      "source": "ENTERPRISE_SURVEY_DATA_2025.pdf (Table 16, p. 29; p. 19, Table 6)",
      "comparators": "Mozambique (33.5%, p. 16), Uganda (16.2%, p. 17), Malawi (14.5%, p. 18), Kenya (7.1%, p. 17), Zambia (6.2%, p. 18). | Benchmark source: ENTERPRISE_SURVEY_DATA_2025.pdf (Table 16, p. 29; pp. 16–18)"
    },
    {
      "domain": "5.2.3",
      "code": "EN-13",
      "name": "Manufacturing Bank Credit Share & NPL Ratio (%)",
      "weight": 0.1,
      "value": "18.3%",
      "score": 95.75,
      "bands": "Credit Share > 20.0% / NPL < 5.0% | Derived scoring: Two tests, 50% each: (a) credit share vs >20.0% target, pro rata, capped at 100; (b) NPL ratio <5.0% = 100, else 0",
      "source": "Reserve Bank of Zimbabwe_2025 _Annual Report.pdf (pp. 58–60) / FINANCIAL_STABILITY_REPORT_29_June_2026_signed.pdf (p. 15, Table 2)",
      "comparators": "Basel Prudential NPL Cap < 5.0%; SADC regional banking average NPL ~6.2%. | Benchmark source: FINANCIAL_STABILITY_REPORT_29_June_2026_signed.pdf (p. 15)"
    },
    {
      "domain": "5.2.3",
      "code": "EN-14",
      "name": "Africa Industrialisation Index (AII 2025) Rank",
      "weight": 0.1,
      "value": "22nd",
      "score": 75,
      "bands": "Upper-Middle Quintile Target | Derived scoring: Quintile ladder on rank (54 economies): top 1-11 = 100; upper-middle 12-22 = 75 (the matrix target quintile); middle 23-33 = 50; lower-middle 34-43 = 25; bottom = 0",
      "source": "AFRICA_INDUSTRIALISATION_INDEX_2025.pdf (Table 3, pp. 39–41; Table 11, p. 59)",
      "comparators": "Morocco (1st / 0.8415, p. 39), South Africa (2nd / 0.8396, p. 39), Mauritius (7th / 0.6731, p. 39), Eswatini (12th / 0.6509, p. 39), Namibia (14th / 0.6295, p. 39), Botswana (15th / 0.5853, p. 39), Kenya (16th / 0.6058, p. 39), Uganda (18th / 0.5822, p. 39), Zambia (25th / 0.5703, p. 39), Lesotho (26th / 0.5378, p. 41), Mozambique (41st / 0.5203, p. 41), Malawi (46th / 0.4854, p. 41). | Benchmark source: AFRICA_INDUSTRIALISATION_INDEX_2025.pdf (Table 3, pp. 39–41; Table 11, pp. 59–60)"
    },
    {
      "domain": "5.2.3",
      "code": "FC-01",
      "name": "Bank Credit Penetration Rate (% of formal firms)",
      "weight": 0.1,
      "value": "23.1%",
      "score": 50,
      "bands": "<10%=0; 10-22.5%=25; 22.5-40%=50; >40%=100 (matrix target >40%; SSA median 22.5%)",
      "source": "World Bank Enterprise Survey (WBES 2025)",
      "comparators": "Sub-Saharan Africa Median: ~22.5%. Regional Comparators: Kenya (46.8%), Uganda (26.0%), Malawi (18.0%), Mozambique (11.1%), Zambia (3.1%). Zimbabwe: 23.1% of formal firms. | Moved from former domain 5.3.3b (removed) to 5.2.3."
    },
    {
      "domain": "5.2.3",
      "code": "FC-04",
      "name": "Internal Investment Financing Share (% funded internally)",
      "weight": 0.1,
      "value": "78.3%",
      "score": 25,
      "bands": ">85%=0; 74-85%=25; 50-74%=50; <50%=100 (matrix target <50%; SSA avg 74.0%; lower = better)",
      "source": "World Bank Enterprise Survey (WBES 2025)",
      "comparators": "Sub-Saharan Africa Average: 74.0%. Regional Comparators: Kenya (59.5%), Uganda (64.4%), Mozambique (66.4%), Malawi (67.4%), Zambia (89.3%). Zimbabwe: 78.3% of fixed asset investment. | Moved from former domain 5.3.3b (removed) to 5.2.3."
    },
    {
      "domain": "5.3.1a",
      "code": "FD-01",
      "name": "Net Foreign Direct Investment (FDI) Inflows",
      "weight": 0.166667,
      "value": "$380 mn",
      "score": 76,
      "bands": "<$100m=0; $100-250m=25; $250-400m=50; $400-500m=75; >=$500m=100 | Reported score pro rata below target: Actual / 2026 target x 100, capped at 100 (NDS2 extract)",
      "source": "UNCTAD WIR / RBZ BoP",
      "comparators": "SADC Peer Median: ~$500M. Regional Inflows: Mozambique ($5,693M), Uganda ($3,358M), Kenya ($3,200M), Tanzania ($1,718M), Namibia ($1,447M), Zambia ($1,293M), Malawi ($452M), South Africa (-$2,315M). Zimbabwe: $380.0M net (BoP) vs $965.0M gross (UNCTAD). NDS2 2026 target $500m net FDI (2030 terminal: $3,500m)."
    },
    {
      "domain": "5.3.1a",
      "code": "FD-02",
      "name": "Net FDI Inflows % of Nominal GDP",
      "weight": 0.166667,
      "value": "1.9%",
      "score": 100,
      "bands": "<0.5%=0; 0.5-1.0%=25; 1.0-1.5%=50; 1.5-1.8%=75; >=1.8%=100",
      "source": "UNCTAD WIR / World Bank WDI",
      "comparators": "Sub-Saharan Africa (SSA) Median: ~3.50% of GDP. Regional Intensity: Mozambique (25.0%), Uganda (6.0%), Zambia (5.1%), Malawi (3.8%), Kenya (2.7%), South Africa (-0.6%). Zimbabwe: 1.90% net / 2.75% gross. NDS2 2026 target 1.8% of GDP (2030 terminal: 3.5%)."
    },
    {
      "domain": "5.3.1a",
      "code": "FD-05",
      "name": "Cumulative Inward FDI Stock",
      "weight": 0.166667,
      "value": "$8.45 bn",
      "score": 100,
      "bands": "<$3b=0; $3-8b=50; >$8b=100",
      "source": "UNCTAD World Investment Report",
      "comparators": "SADC Inward Stock: South Africa ($132.33B), Mozambique ($66.56B / 280% GDP), DR Congo ($38.55B), Uganda ($26.10B), Tanzania ($23.42B), Zambia ($17.80B), Kenya ($12.14B). Zimbabwe: $8.445B (22.1% of GDP); target >$8.0B."
    },
    {
      "domain": "5.3.1a",
      "code": "FD-03",
      "name": "Announced Greenfield FDI Destination Capital Value",
      "weight": 0.166667,
      "value": "$420 mn",
      "score": 50,
      "bands": "<$100m=0; $100-500m=50; >$500m=100",
      "source": "UNCTAD WIR / fDi Markets / ZIDA",
      "comparators": "SADC 5-Yr Cumulative Destination Capital (2021-2025): South Africa ($55.26B), Angola ($19.72B), Zimbabwe ($14.98B), DRC ($12.78B), Mozambique ($10.60B), Namibia ($9.79B), Zambia ($7.78B). Zimbabwe: $420.0M (ZIDA pipeline) vs $2,201.3M (UNCTAD total); target >$500M annual. Zim trend: $167.5m (2022) → $350.0m (2023) → $420.0m (2024-25)."
    },
    {
      "domain": "5.3.1a",
      "code": "FD-03b",
      "name": "Outward Greenfield FDI Announcements (Source)",
      "weight": 0.166667,
      "value": "$157 mn",
      "score": 25,
      "bands": "<$100m=0; $100-500m=25; $500m-1bn=50; >$1bn=100 (ZCR provisional band, SADC peers; no matrix target)",
      "source": "UNCTAD WIR Annex Tables 13 & 16",
      "comparators": "SADC 5-Yr Cumulative Source Capital: South Africa ($14.54B / 354 projects), Mauritius ($7.27B / 100 projects), Namibia ($747.3M / 12 projects), Tanzania ($696.7M / 16 projects). Zimbabwe: $157.0M across 9 projects (2021-2025). Structural indicator in matrix; band is a ZCR provisional assumption."
    },
    {
      "domain": "5.3.1a",
      "code": "FD-Struct",
      "name": "Foreign Private Capital Inflow Structure",
      "weight": 0.166667,
      "value": "79.5%",
      "score": 100,
      "bands": "<40%=0; 40-60%=25; 60-75%=50; >75%=100 (ZCR provisional band; no matrix target)",
      "source": "RBZ Balance of Payments / MOFED",
      "comparators": "Capital growth led by Equity Injections (+43.1%), Affiliated Debt (+25.4%), and Retained Earnings (+9.3%). Inflow shares: Financials (27.2%), Manufacturing (24.3%). Zimbabwe: FDI = 79.5% of private inflows, 75.8% of stock. Band is a ZCR provisional assumption."
    },
    {
      "domain": "5.3.1b",
      "code": "FD-Lic",
      "name": "Total Projected Investment Value Licensed",
      "weight": 0.25,
      "value": "$3.26 bn",
      "score": 50,
      "bands": "<$1bn=0; $1-2.5bn=25; $2.5-5bn=50; >$5bn=100 (ZCR provisional band; 2023 peak $16.61bn)",
      "source": "ZIDA Quarterly Performance Reports",
      "comparators": "Reflects initial investor interest; requires tracking against actual Balance of Payments capital deployment to evaluate conversion efficiency. Zimbabwe: $3.26B in Q3 2025 ($16.61B in 2023 peak). Band is a ZCR provisional assumption."
    },
    {
      "domain": "5.3.1b",
      "code": "FD-Cap",
      "name": "Capital Structure Breakdown of Approved Investment",
      "weight": 0.25,
      "value": "86.5%",
      "score": 0,
      "bands": ">80%=0; 66.7-80%=25; 50-66.7%=50; <50%=100 (66.7% = 2:1 gearing cap; ZCR provisional band)",
      "source": "ZIDA Quarterly Reports",
      "comparators": "Approved Q3 2025 projects exhibit heavy reliance on foreign exchange loan gearing (86.5%) relative to upfront foreign cash equity injections (2.2%). Zimbabwe: Debt $2,824.2M (86.5%), Equipment $354.1M (10.8%), Cash $72.5M. Band anchored on the 2:1 gearing cap (debt = 66.7% of capital)."
    },
    {
      "domain": "5.3.1b",
      "code": "FD-13",
      "name": "Investment Conversion Efficiency Ratio (ICER %)",
      "weight": 0.25,
      "value": "11.7%",
      "score": 25,
      "bands": "<10%=0; 10-20%=25; 20-40%=50; >40%=100",
      "source": "ZIDA Quarterly Reports / RBZ BoP",
      "comparators": "Cumulative 2023-2025 Net Conversion Rate is 10.53% ($1.145B Net FDI / $10.87B Licensed), diagnosing severe post-licensing implementation delays. Zimbabwe: 11.7% ($380M net FDI vs $3.26B licensed, Q3 2025); target >40%."
    },
    {
      "domain": "5.3.1b",
      "code": "FD-Gross",
      "name": "Gross Investment Conversion Ratio",
      "weight": 0.25,
      "value": "29.6%",
      "score": 50,
      "bands": "<10%=0; 10-20%=25; 20-40%=50; >40%=100 (same bands as FD-13; no matrix target)",
      "source": "RBZ Mid-Year Statement / ZIDA Reports",
      "comparators": "4-Year Cumulative Gross Conversion Rate (2022-2025) is 21.6% ($2.592B total gross FDI / $11.99B total licensed investment). Zimbabwe: 29.6% ($964.9M gross FDI vs $3.26B licensed)."
    },
    {
      "domain": "5.3.1c",
      "code": "FD-07",
      "name": "Foreign Exchange Repatriation Lead Time (Days)",
      "weight": 0.2,
      "value": "120 days",
      "score": 25,
      "bands": ">180d=0; 90-180d=25; 30-90d=50; <30d=100",
      "source": "UNCTAD / RBZ Exchange Control",
      "comparators": "SADC Best Practice Benchmark: <30 Days. South Africa processes capital/dividend remittances in ~15 days. Zimbabwe averages 120 days. Lower = better. Zim trend: 180d (2022) → 150d (2023) → 120d (2024-25)."
    },
    {
      "domain": "5.3.1c",
      "code": "FD-10",
      "name": "Dividend & Profit Remittances Ratio (%)",
      "weight": 0.2,
      "value": "32.5%",
      "score": 50,
      "bands": ">80%=0; 50-80%=25; 25-50%=50; <25%=100 (matrix target <25%)",
      "source": "RBZ Balance of Payments / ZIDA",
      "comparators": "SADC Benchmark <25.0%. Measures foreign dividend remittances as a percentage of gross FDI inflows, evaluating balanced capital servicing. Zimbabwe: 32.5% of gross FDI inflows."
    },
    {
      "domain": "5.3.1c",
      "code": "FD-11",
      "name": "Net Foreign Capital Retention Index",
      "weight": 0.2,
      "value": "0.65",
      "score": 50,
      "bands": "<0.20=0; 0.20-0.50=25; 0.50-0.75=50; >0.75=100",
      "source": "RBZ Balance of Payments / MOFED",
      "comparators": "Sub-Saharan Africa (SSA) Median: 0.55x. Ratio of Net FDI Inflows (after dividend and debt servicing) to Gross FDI Inflows. Zimbabwe: 0.65x ($380M net vs $585M gross pipeline)."
    },
    {
      "domain": "5.3.1c",
      "code": "FD-12",
      "name": "Capital Outflow Debt-vs-Equity Service Ratio",
      "weight": 0.2,
      "value": "1.85x",
      "score": 50,
      "bands": ">3.0=0; 2.0-3.0=25; 1.0-2.0=50; <1.0=100",
      "source": "RBZ Balance of Payments / Exchange Control",
      "comparators": "Target <1.0x. Ratio of foreign debt service outflows to equity dividend remittances; 1.85x ratio reflects enforcement of the 2:1 gearing cap. Zimbabwe: 1.85x debt service to dividend ratio."
    },
    {
      "domain": "5.3.1c",
      "code": "IF-08",
      "name": "Retention Friction Index (Diagnostic Ratio)",
      "weight": 0.2,
      "value": "0.137x",
      "score": 25,
      "bands": "<0.10x=0; 0.10-0.15x=25; 0.15-0.20x=50; >0.20x=100 (matrix threshold >0.20x; ZCR provisional lower bands)",
      "source": "ZIDA Investor Registry / RBZ Exchange Control",
      "comparators": "Diagnostic Ratio: License Renewal Rate (65.0%) ÷ FX Repatriation Lead Time (4 Months). Proves fast entry permits cannot offset dividend exit delays. Zimbabwe: 0.16x. Derived live from IF-03 and FD-07."
    },
    {
      "domain": "5.3.2",
      "code": "IF-01",
      "name": "Days to Obtain Construction Permit",
      "weight": 0.142857,
      "value": "6.7 days",
      "score": 100,
      "bands": ">45d=0; 26.8-45d=25; 10-26.8d=50; <10d=100 (matrix target <10d; SSA Median 26.8d)",
      "source": "World Bank Enterprise Survey / ZIDA",
      "comparators": "Sub-Saharan Africa (SSA) Median: 26.8 Days. Regional Comparators: Malawi (10.3d), Kenya (15.4d), Uganda (17.0d), Mozambique (21.3d), Zambia (30.8d). Framework bands anchored on matrix target <10d and SSA median 26.8d. Zim trend: 28.0d (2022) → 15.0d (2023) → 6.7d (2024-25), now well inside the SSA median."
    },
    {
      "domain": "5.3.2",
      "code": "RB-05",
      "name": "Days to Obtain an Operating License",
      "weight": 0.142857,
      "value": "6.0 days",
      "score": 100,
      "bands": ">30d=0; 16.5-30d=25; 7-16.5d=50; <7d=100 (matrix target <7d; SSA avg 16.5d)",
      "source": "World Bank Enterprise Survey (WBES 2025)",
      "comparators": "Sub-Saharan Africa Average: 16.5 Days. Regional Comparators: Kenya (6.6d), Uganda (7.1d), Zambia (14.6d), Malawi (16.1d), Mozambique (20.6d). Zimbabwe: 6.0 days; bands anchored on matrix target <7d and SSA average 16.5d."
    },
    {
      "domain": "5.3.2",
      "code": "IF-02",
      "name": "Volume of New Investment Licenses Approved & YoY Growth",
      "weight": 0.142857,
      "value": "20.8%",
      "score": 100,
      "bands": "Negative=0; 0-10%=50; >15%=100",
      "source": "ZIDA Investor Registry",
      "comparators": "Licensing expansion run-rate: 267 licenses (2022) -> 616 (2023) -> 665 (2024) -> +20.8% YoY (2025). High front-end registration volume. Zimbabwe: 665 licenses (2024), +20.8% YoY (2025); target >15.0% YoY."
    },
    {
      "domain": "5.3.2",
      "code": "IF-03",
      "name": "Active Investor License Renewal Rate (%)",
      "weight": 0.142857,
      "value": "54.7%",
      "score": 25,
      "bands": "<50%=0; 50-70%=25; 70-85%=50; >85%=100",
      "source": "ZIDA Investor Registry Audit",
      "comparators": "SADC Regional Benchmarks: Botswana (90.0%), Rwanda (85.0%), Zimbabwe (54.73%, Chapter 5 Table 1). Highlights post-establishment investor retention frictions."
    },
    {
      "domain": "5.3.2",
      "code": "IF-04",
      "name": "Investor Grievance Resolution Rate (IGRM 30-Day %)",
      "weight": 0.142857,
      "value": "20.0%",
      "score": 0,
      "bands": "<50%=0; 50-80%=50; >80%=100",
      "source": "ZIDA Investor Registry",
      "comparators": "Regional Benchmark Leader: Rwanda ICRG resolves 95.0% of grievances within 15 days. Zimbabwe resolves 20% within 30 days (Chapter 5 Table 1; ZIDA IGRM register)."
    },
    {
      "domain": "5.3.2",
      "code": "IF-05",
      "name": "eRegulations Portal Completeness (%)",
      "weight": 0.142857,
      "value": "100.0%",
      "score": 100,
      "bands": "<25%=0; 25-75%=50; >75%=100",
      "source": "ZIDA Operational Audits / UNCTAD",
      "comparators": "Target >75% eReg. Regional Leaders: Rwanda eRegulations (95.0%), Kenya (85.0%). Zimbabwe: 65.0% completeness; documents 60 key procedures across 20+ departments. Zim trend: 20% (2022) → 40% (2023) → 55% (2024) → 65% (2025)."
    },
    {
      "domain": "5.3.2",
      "code": "IF-07",
      "name": "OSISC Co-Location (One-Stop Shop Integration)",
      "weight": 0.142857,
      "value": "100.0%",
      "score": 100,
      "bands": "<50%=0; 50-85%=50; >85%=100",
      "source": "ZIDA Operational Audits / UNCTAD",
      "comparators": "Target 12 OSISC. Zimbabwe: 100.0% co-location (12 of 12 agencies co-located at ZIDA OSISC). "
    },
    {
      "domain": "5.3.3a",
      "code": "IS-01",
      "name": "Manufacturing Share of FDI (%)",
      "weight": 0.142857,
      "value": "43.0%",
      "score": 50,
      "bands": "<15%=0; 15-30%=25; 30-45%=50; >45%=100",
      "source": "ZIDA Quarterly Performance Reports",
      "comparators": "Target Mfg >45%. SADC Benchmarks: South Africa Manufacturing Share (38.0%), Kenya (42.0%). Zimbabwe: Mfg 43.01% of monitored/licensed FDI (Chapter 5, Fig 5.23); prior approved-FDI basis was 18.0%."
    },
    {
      "domain": "5.3.3a",
      "code": "IS-02",
      "name": "Mining Share of FDI (%, inverted high)",
      "weight": 0.142857,
      "value": "32.5%",
      "score": 50,
      "bands": ">70%=0; 50-70%=25; 30-50%=50; <30%=100",
      "source": "ZIDA Quarterly Performance Reports",
      "comparators": "Target Mining <30% (lower = better). Zimbabwe: Mining 32.49% of monitored/licensed FDI (Chapter 5, Fig 5.23); prior approved-FDI basis was 65.0%. Mining FDI inflows = $245.0M."
    },
    {
      "domain": "5.3.3a",
      "code": "IS-03",
      "name": "Sectoral Concentration Index (HHI)",
      "weight": 0.142857,
      "value": "3,206",
      "score": 50,
      "bands": "HHI>5000=0; 3500-5000=25; 2000-3500=50; <2000=100",
      "source": "ZIDA Portfolio Analytics / UNCTAD",
      "comparators": "Target <2,000 HHI (lower = better diversification). Derived from Chapter 5 sector shares (Mfg 43.01, Mining 32.49, Agri 12.75, Energy+Services 11.76) = 3,206 (upper bound; splitting energy and services gives ~3,137). Prior 4,200 was on the old 65% mining basis."
    },
    {
      "domain": "5.3.3a",
      "code": "IS-04",
      "name": "Non-Harare Provincial Investment Share (%)",
      "weight": 0.142857,
      "value": "38.0%",
      "score": 50,
      "bands": "<15%=0; 15-30%=25; 30-50%=50; >50%=100",
      "source": "ZIDA Regional Registry",
      "comparators": "Up from 22.0% in 2022, reflecting progress in spatial devolution across Midlands (22.2%), Matabeleland North (10.0%), and Matabeleland South (3.6%)."
    },
    {
      "domain": "5.3.3a",
      "code": "IS-05",
      "name": "Source Country Count (Origin Countries)",
      "weight": 0.142857,
      "value": "24",
      "score": 25,
      "bands": "<10=0; 10-25=25; 25-40=50; >40=100",
      "source": "ZIDA Investor Registry",
      "comparators": "Target >40 countries. Regional Peer Comparison: South Africa (>80 source countries), Kenya (>60 source countries). Zimbabwe: 24 active origin countries; portfolio concentrated in China and UAE. Zim trend: 33 (2022) → 47 (2023) → 38 (2024) → 24 (2025)."
    },
    {
      "domain": "5.3.3a",
      "code": "IS-05b",
      "name": "Source Country Concentration (Origin HHI)",
      "weight": 0.142857,
      "value": "3,800",
      "score": 50,
      "bands": "HHI>5000=0; 3000-5000=50; <3000=100",
      "source": "ZIDA Investor Registry",
      "comparators": "Target Origin HHI <3,000 (lower = better). Zimbabwe: Origin HHI 3,800; portfolio concentrated in China and UAE. Zim trend: 5,200 (2022) → 4,500 (2023) → 3,900 (2024) → 3,800 (2025)."
    },
    {
      "domain": "5.3.3a",
      "code": "IS-08",
      "name": "NDS1 Beneficiation Alignment Index",
      "weight": 0.142857,
      "value": "0.28x",
      "score": 25,
      "bands": "<0.25=0; 0.25-0.50=25; 0.50-1.0=50; >1.0=100",
      "source": "ZIDA Portfolio Computation",
      "comparators": "Target >1.00x. Value as stated in Chapter 5 (0.28x), entered as reported, not linked to IS-01/IS-02. NOTE: 43.01%/32.49% = 1.32x, which would score 100; chapter figure needs confirming."
    }
  ]
};
