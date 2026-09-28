// SanskritiSetu mock DPI data. Mirrors BRD modules TCD / GRL / ZGE / TSR / ATW / EMB.
// All values are sample data for the SIH demo build.

export const FESTIVALS = [
  {
    id: 'hornbill',
    code: 'HB',
    name: 'Hornbill Festival',
    hindi: 'हार्नबिल उत्सव',
    state: 'Nagaland, Kohima',
    district: 'Kohima',
    start: '2026-12-01',
    peak: 'Dec 4 to 7, Naga wrestling and night bazaar',
    end: '2026-12-10',
    lunarNote: 'Fixed Gregorian date, Sekrenyi buffer of 2 days for village satellites',
    calendar: 'Gregorian with Angami lunar buffer',
    gri: 'B',
    cash: { atmKm: 2, perDay: 2800 },
    sanitation: 'Western toilets at the venue, pit latrines in satellite villages',
    health: 'PHC Kohima at 3 km, antivenom stocked',
    road: 'Paved NH-29, shared sumo for the last mile',
    transit: [
      { hub: 'Dimapur Railway Sumo Stand', window: '05:30 to 08:00', fare: 'Rs 450', terrain: 'Paved' },
      { hub: 'Kohima Bazaar pickup', window: '09:00 to 11:00', fare: 'Rs 120', terrain: 'Town road' },
    ],
    etiquette: [
      'Ask before photographing the Morungs',
      'Remove shoes inside Khel halls',
      'Keep clockwise order near shrines',
    ],
    permit: { type: 'Inner Line Permit required for outsiders', link: 'ilp.nagaland.gov.in' },
    homestays: [{ name: 'Khel Heritage Homestay', tariff: 1800, badge: 'NIDHI 2.0 verified' }],
    load: 82,
  },
  {
    id: 'bastar-madai',
    code: 'BM',
    name: 'Bastar Madai, Kondagaon',
    hindi: 'बस्तर मड़ई',
    state: 'Chhattisgarh, Bastar',
    district: 'Bastar',
    start: '2027-02-14',
    peak: 'Feb 16, Dhurwa procession at 18:00',
    end: '2027-02-18',
    lunarNote: 'Phalguna Shukla Purnima shift, Skyfield window of 3 days',
    calendar: 'Panchang lunisolar',
    gri: 'C',
    cash: { atmKm: 22, perDay: 1500 },
    sanitation: 'Clean water at the haat, Western toilet only at the lodge',
    health: 'PHC Kondagaon at 9 km, antivenom available',
    road: 'Gravel road, 4x4 needed for the last 6 km',
    transit: [
      { hub: 'Jagdalpur Parpa Sumo Stand', window: '06:00 to 07:30', fare: 'Rs 150', terrain: 'Gravel' },
      { hub: 'Kondagaon weekly haat tractor', window: 'Tue 08:00', fare: 'Rs 60', terrain: 'Trail' },
    ],
    etiquette: [
      'No flash photography inside the Dhokra sanctum',
      'Accept offerings with the right hand',
      'Bargain gently at the women led haat',
    ],
    permit: { type: 'No permit, register at the checkpost', link: null },
    homestays: [{ name: 'Somu Dhokra Village Stay', tariff: 900, badge: 'SAATHI verified' }],
    load: 46,
  },
  {
    id: 'hemis',
    code: 'HE',
    name: 'Hemis Tsechu',
    hindi: 'हेमिस त्सेचु',
    state: 'Ladakh, Leh',
    district: 'Leh',
    start: '2026-07-08',
    peak: 'Jul 9, Cham dance from 10:00 to 15:00',
    end: '2026-07-10',
    lunarNote: 'Tibetan lunar 10th day, shifts every year',
    calendar: 'Tibetan lunisolar',
    gri: 'C',
    cash: { atmKm: 12, perDay: 3200 },
    sanitation: 'Monastery pit latrines, Western toilets at Leh lodges',
    health: 'High altitude clinic at Leh, 45 km, AMS kit required',
    road: 'Paved Leh to Hemis road, landslide buffer in season',
    transit: [
      { hub: 'Leh Polo Ground jeep pool', window: '07:00 to 09:00', fare: 'Rs 400 shared', terrain: 'Mountain paved' },
    ],
    etiquette: [
      'Remove hats inside the Dukhang',
      'Do not point at the thangkas',
      'Walk the kora clockwise only',
    ],
    permit: { type: 'No ILP for Leh, RAP for the Hanle satellite', link: 'leh.nic.in/ilp' },
    homestays: [{ name: 'Stanzin Monastic View', tariff: 2200, badge: 'NIDHI 2.0 verified' }],
    load: 71,
  },
  {
    id: 'ziro',
    code: 'ZR',
    name: 'Ziro Paddy Harvest Haat',
    hindi: 'ज़ीरो धान हाट',
    state: 'Arunachal, Ziro Valley',
    district: 'Lower Subansiri',
    start: '2026-09-20',
    peak: 'Sep 22, Apatani harvest ritual',
    end: '2026-09-25',
    lunarNote: 'Apatani agro lunar cycle, shifts up to 5 days with the monsoon',
    calendar: 'Agro lunar',
    gri: 'D',
    cash: { atmKm: 34, perDay: 1900 },
    sanitation: 'Boiled water only, pit latrines',
    health: 'PHC Hapoli at 7 km, no antivenom stocked',
    road: 'Unpaved track, 4x4 mandatory',
    transit: [
      { hub: 'Itanagar Sumo Counter', window: '05:00 to 06:00 only', fare: 'Rs 700', terrain: 'Ghat, 4x4' },
    ],
    etiquette: [
      'Do not step on the rice bunds',
      'Ask before entering bamboo groves',
      'Accept rice beer with both hands',
    ],
    permit: { type: 'Inner Line Permit mandatory', link: 'arunachalilp.com' },
    homestays: [{ name: 'Apatani Bamboo Stay', tariff: 1200, badge: 'SAATHI verified' }],
    load: 38,
  },
  {
    id: 'rann',
    code: 'RU',
    name: 'Rann Utsav Satellite, Hodka',
    hindi: 'रण उत्सव, होडका',
    state: 'Gujarat, Kutch',
    district: 'Kutch',
    start: '2026-11-15',
    peak: 'Kartik Purnima full moon night',
    end: '2027-02-28',
    lunarNote: 'Anchored to Kartik Purnima, full moon desert nights',
    calendar: 'Panchang',
    gri: 'A',
    cash: { atmKm: 1, perDay: 3500 },
    sanitation: 'Western toilets, RO water across the tent city',
    health: 'PHC Hodka at 2 km, clinic on site',
    road: 'Paved Rann corridor',
    transit: [
      { hub: 'Bhuj ST depot shuttle', window: 'Every 60 min', fare: 'Rs 200', terrain: 'Paved' },
    ],
    etiquette: [
      'Stay on the marked salt paths',
      'No drones without BSF permission',
      'Handle mirror work craft with care',
    ],
    permit: { type: 'Border zone day pass at the gate', link: 'rannutsav.in' },
    homestays: [{ name: 'Hodka Craft Village Tent', tariff: 3200, badge: 'NIDHI 2.0 verified' }],
    load: 91,
  },
  {
    id: 'losar',
    code: 'LO',
    name: 'Monpa Losar, Tawang',
    hindi: 'मोनपा लोसार',
    state: 'Arunachal, Tawang',
    district: 'Tawang',
    start: '2027-02-28',
    peak: 'Mar 2, monastery horns at dawn',
    end: '2027-03-04',
    lunarNote: 'Losar new moon, cross checked with Saka tables',
    calendar: 'Tibetan lunisolar',
    gri: 'D',
    cash: { atmKm: 28, perDay: 2100 },
    sanitation: 'Limited Western toilets, carry a filter bottle',
    health: 'PHC Tawang at 4 km, AMS and cold injury kit needed',
    road: 'Sela Pass, snow chain 4x4 in season',
    transit: [
      { hub: 'Tezpur Monastery jeep syndicate', window: '04:30 departure', fare: 'Rs 900', terrain: 'Snow pass' },
    ],
    etiquette: [
      'Keep silence in the butter lamp hall',
      'Do not touch the monks robes',
      'Walk the kora clockwise always',
    ],
    permit: { type: 'ILP with PAP checkpost slip', link: 'arunachalilp.com' },
    homestays: [{ name: 'Monpa Weave House', tariff: 1400, badge: 'SAATHI verified' }],
    load: 52,
  },
]

export const BUNDLES = [
  { id: 'bastar', district: 'Bastar, Chhattisgarh', size: 42, version: 'v2.3, Ed25519 signed', contents: 'Vector tiles, search index, 5 dialects' },
  { id: 'leh', district: 'Leh, Ladakh', size: 48, version: 'v2.3, Ed25519 signed', contents: 'Vector tiles, search index, Ladakhi and Bodhi' },
  { id: 'kohima', district: 'Kohima, Nagaland', size: 36, version: 'v2.2, Ed25519 signed', contents: 'Vector tiles, search index, Nagamese' },
  { id: 'ziro', district: 'Lower Subansiri, Arunachal', size: 38, version: 'v2.2, Ed25519 signed', contents: 'Vector tiles, search index, Apatani' },
]

export const ARTISANS = [
  { name: 'Somu, Dhokra metalcast', craft: 'Lost wax peacock lamps', place: 'Kondagaon, Bastar', price: 'Rs 1,200 to 8,500', payout: 'Full payout on site, cash or UPI', masterclass: 'Casting workshop, 3 hr, Rs 900', tag: 'TRIFED' },
  { name: 'Kotpad Weavers Collective', craft: 'Aul dyed cotton sarees', place: 'Koraput belt', price: 'Rs 2,400 to 6,000', payout: 'Full payout through the ODOP node', masterclass: 'Dye trail, Rs 600', tag: 'ODOP' },
  { name: 'Monpa Loom House', craft: 'Tawang carpets and shawls', place: 'Tawang', price: 'Rs 1,800 to 9,000', payout: 'Full payout on site, carry a cash buffer', masterclass: 'Weaving session, 2 hr, Rs 500', tag: 'TRIFED' },
  { name: 'Apatani Bamboo Craft', craft: 'Cane hats and baskets', place: 'Ziro', price: 'Rs 400 to 2,200', payout: 'Full payout at haat pickup', masterclass: 'Basket weaving, Rs 350', tag: 'ODOP' },
]

export const PHCS = [
  { name: 'PHC Kondagaon', dist: '9 km, antivenom stocked', hrs: 'Open round the clock' },
  { name: 'PHC Kohima', dist: '3 km, antivenom stocked', hrs: 'Open round the clock' },
  { name: 'High altitude clinic, Leh', dist: '45 km from Hemis, AMS equipped', hrs: '08:00 to 20:00' },
  { name: 'PHC Hapoli, Ziro', dist: '7 km, no antivenom', hrs: '09:00 to 17:00' },
]

export const DTO_QUEUE = [
  { id: 'EVT-4412', title: 'Kondagaon Madai date shift of 3 days', by: 'Local ambassador, Bastar', risk: 12, flags: [] },
  { id: 'EVT-4413', title: 'New sumo stand at Parpa crossing', by: 'Jeep driver union', risk: 28, flags: ['Geo check passed'] },
  { id: 'EVT-4414', title: 'Dhokra masterclass listing at Rs 900', by: 'Somu, artisan', risk: 8, flags: [] },
  { id: 'EVT-4415', title: 'Helicopter charter to Hemis, book now', by: 'Unverified account', risk: 94, flags: ['Spam', 'Location mismatch'] },
  { id: 'EVT-4416', title: 'Ziro homestay adds 2 rooms', by: 'Apatani host', risk: 18, flags: ['NIDHI record matched'] },
]

const GRADE = {
  A: { label: 'Grade A, ready', dot: '#15803d', note: 'Ready for most travellers' },
  B: { label: 'Grade B, mostly ready', dot: '#0f766e', note: 'Mostly ready, check cash' },
  C: { label: 'Grade C, carry buffer', dot: '#b45309', note: 'Carry buffer, plan transit' },
  D: { label: 'Grade D, expert only', dot: '#b91c1c', note: 'Expert travellers only' },
}

export function griMeta(g) {
  return GRADE[g] || GRADE.C
}

export function riskLabel(risk) {
  if (risk >= 50) return { label: 'Block', dot: '#b91c1c' }
  if (risk >= 20) return { label: 'Review', dot: '#b45309' }
  return { label: 'Clear', dot: '#15803d' }
}

export function inr(n) {
  return 'Rs ' + Number(n).toLocaleString('en-IN')
}
