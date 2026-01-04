
import { Professional, TradeType } from './types';

export const TRADES: { type: TradeType; icon: string; label: string }[] = [
  { type: 'Plumber', icon: 'fa-faucet-drip', label: 'Plumbers' },
  { type: 'Electrician', icon: 'fa-bolt', label: 'Electricians' },
  { type: 'HVAC', icon: 'fa-wind', label: 'HVAC' },
  { type: 'Roofer', icon: 'fa-house-chimney-window', label: 'Roofers' },
  { type: 'Drywaller', icon: 'fa-trowel-bricks', label: 'Drywallers' }
];

export const TRADE_CATEGORIES: Record<TradeType, string[]> = {
  'Plumber': ["All Services", "Emergency Service", "Drain Cleaning", "Pipe Repair", "Water Heaters", "Sump Pump", "Commercial"],
  'Electrician': ["All Services", "Emergency Repair", "Panel Upgrades", "EV Charging", "Lighting", "Wiring", "Commercial"],
  'HVAC': ["All Services", "AC Repair", "Furnace Install", "Heat Pumps", "Duct Cleaning", "Ventilation", "Commercial"],
  'Roofer': ["All Services", "Emergency Leak", "Shingle Repair", "Flat Roofing", "Skylights", "Inspection", "Commercial"],
  'Drywaller': ["All Services", "Patch Repair", "New Install", "Taping & Mudding", "Popcorn Removal", "Framing", "Commercial"]
};

export const SERVICE_DESCRIPTIONS: Record<string, string> = {
  "Emergency Service": "Rapid 24/7 response for urgent leaks, bursts, or flooding to prevent property damage.",
  "Drain Cleaning": "Professional snaking and hydro-jetting to clear stubborn blockages and restore full flow.",
  "Pipe Repair": "Expert diagnosis and repair of copper, PEX, and PVC piping systems using non-invasive techniques.",
  "Water Heaters": "Installation and maintenance of high-efficiency tanked and tankless water heating systems.",
  "Sump Pump": "Critical protection for your basement, ensuring reliable groundwater management during heavy storms.",
  "Commercial": "Large-scale solutions tailored for industrial facilities, restaurants, and office complexes.",
  "Emergency Repair": "Priority troubleshooting for power outages, sparking outlets, or electrical hazards.",
  "Panel Upgrades": "Modernizing your home's electrical capacity with 100A or 200A breakers for modern appliance loads.",
  "EV Charging": "Certified installation of Level 2 charging stations for all major electric vehicle brands.",
  "Lighting": "Design and installation of LED pot lights, dimmers, and custom architectural lighting solutions.",
  "Wiring": "Full home rewiring, aluminum wire remediation, and new construction circuitry.",
  "AC Repair": "Full diagnostic and repair for cooling systems to ensure peak performance during summer peaks.",
  "Furnace Install": "Precision fitting of high-efficiency gas or electric heating units with air quality integration.",
  "Heat Pumps": "Sustainable dual-action climate control that provides both heating and cooling efficiency.",
  "Duct Cleaning": "Removing dust and allergens from your ventilation system to improve overall indoor air quality.",
  "Ventilation": "Installation of HRV/ERV systems to ensure constant fresh air circulation and moisture control.",
  "Emergency Leak": "Fast-response temporary and permanent patching for storm damage or structural failures.",
  "Shingle Repair": "Replacing damaged or missing asphalt shingles to maintain your roof's protective integrity.",
  "Flat Roofing": "Specialized installation and repair of TPO, EPDM, and modified bitumen commercial roofs.",
  "Skylights": "Installation and sealing of natural light fixtures with advanced weather-proofing technology.",
  "Inspection": "Comprehensive thermal and drone-assisted roof surveys for insurance or pre-sale verification.",
  "Patch Repair": "Seamless repair of holes, cracks, and water damage to make walls look factory-new.",
  "New Install": "Precision drywall hanging for renovations or new additions with structural accuracy.",
  "Taping & Mudding": "Three-stage finishing process to ensure perfectly smooth, paint-ready wall surfaces.",
  "Popcorn Removal": "Safe scraping and smoothing of textured ceilings to modernize your living space.",
  "Framing": "Professional metal or wood stud installation for interior partition and structural layouts."
};

const TESTIMONIAL_SAMPLES = [
  "Absolutely phenomenal service. They arrived within the hour for an emergency call and fixed the issue with zero mess left behind.",
  "Honest, transparent pricing, and incredibly skilled work. It's rare to find a contractor who cares this much about their craft.",
  "The team went above and beyond. Not only did they fix the problem, but they also explained how to prevent it from happening again.",
  "Professional from start to finish. The quote was accurate, the timeline was met, and the quality of work is outstanding.",
  "Saved us from a major disaster! I can't recommend them highly enough for their speed and expertise.",
  "Very impressed with the attention to detail. They treated my home with respect and did a flawless job.",
  "Finally found a reliable company in Toronto. Great communication and fair prices for top-tier work.",
  "Efficient, friendly, and knowledgeable. They diagnosed a tricky issue that two other companies missed."
];

// --- DATA SYNCHRONIZATION: REAL TORONTO BUSINESSES (UPDATED) ---

const CORE_PLUMBERS: Partial<Professional>[] = [
  { 
    name: "Brothers Plumbing", 
    rating: 4.9, 
    reviewCount: 2645, 
    address: "130 Tycos Dr, Toronto, ON M6B 1W8", 
    phone: "(416) 656-6717", 
    website: "https://www.brothersplumbing.ca", 
    neighborhood: "North York", 
    latitude: 43.7042, longitude: -79.4568,
    services: ["Drain Cleaning", "Waterproofing", "Pipe Repair"],
    description: "Toronto's definitive leader in trenchless pipe replacement and emergency drain cleaning, serving the GTA for over 40 years with a perfect safety record."
  },
  { 
    name: "DrainWorks Plumbing", 
    rating: 4.8, 
    reviewCount: 2100, 
    address: "81 Kelfield St, Etobicoke, ON M9W 5A3", 
    phone: "(416) 486-0000", 
    website: "https://www.drainworks.com", 
    neighborhood: "Etobicoke", 
    latitude: 43.6975, longitude: -79.5775,
    services: ["Drain Cleaning", "Sump Pump", "Waterproofing"],
    description: "Specializing exclusively in drain systems and waterproofing. Known for their 'commission-free' technician policy which ensures honest, necessary repairs only."
  },
  { 
    name: "Mr. Rooter Plumbing of Toronto", 
    rating: 4.7, 
    reviewCount: 1850, 
    address: "5050 Dufferin St, North York, ON M3H 5T5", 
    phone: "(416) 635-0000", 
    website: "https://www.mrrooter.ca/toronto", 
    neighborhood: "North York", 
    latitude: 43.7788, longitude: -79.4678,
    services: ["Emergency Service", "Commercial", "Pipe Repair"],
    description: "A powerhouse in emergency response with a fleet capable of handling large-scale commercial disasters and residential plumbing crises 24/7."
  },
  { 
    name: "Anta Plumbing", 
    rating: 4.8, 
    reviewCount: 1350, 
    address: "820 Alness St, North York, ON M3J 2H9", 
    phone: "(416) 231-3331", 
    website: "https://www.antaplumbing.com", 
    neighborhood: "North York", 
    latitude: 43.7744, longitude: -79.4756,
    services: ["Water Heaters", "Pipe Repair", "Drain Cleaning"],
    description: "Highly certified technicians specializing in complex drain diagnostics and high-efficiency water heater installations for older Toronto homes."
  },
  { 
    name: "Priority Plumbing", 
    rating: 4.9, 
    reviewCount: 960, 
    address: "1166 St Clair Ave W, Toronto, ON M6E 1B4", 
    phone: "(416) 762-8662", 
    website: "https://www.priorityplumbing.ca", 
    neighborhood: "Earlscourt", 
    latitude: 43.6775, longitude: -79.4442,
    services: ["Emergency Service", "Pipe Repair", "Water Heaters"],
    description: "Known for their 'punctuality guarantee' and pristine workspace maintenance. A favorite in the St. Clair West community for reliable residential service."
  },
  { 
    name: "WaterWorks Plumbing & Drains", 
    rating: 4.9, 
    reviewCount: 850, 
    address: "1127 Davenport Rd, Toronto, ON M6H 2G4", 
    phone: "(647) 692-3323", 
    website: "https://www.waterworks-plumbing.com", 
    neighborhood: "Wychwood", 
    latitude: 43.6738, longitude: -79.4312,
    services: ["Drain Cleaning", "Pipe Repair", "Sump Pump"],
    description: "A family-run operation focused on non-invasive plumbing solutions. Experts in modernizing plumbing systems in Toronto's heritage Victorian homes."
  },
  { 
    name: "Leaside Plumbing and Heating", 
    rating: 4.9, 
    reviewCount: 480, 
    address: "15 Industrial St, East York, ON M4G 1Z2", 
    phone: "(416) 423-8682", 
    website: "https://www.leasideplumbing.ca", 
    neighborhood: "Leaside", 
    latitude: 43.7089, longitude: -79.3556,
    services: ["Water Heaters", "Pipe Repair", "Radiant Heating"],
    description: "The go-to experts for hydronic heating and boiler systems in East York. They blend old-school craftsmanship with modern efficiency standards."
  },
  { 
    name: "Hoerner Heating & Plumbing", 
    rating: 4.8, 
    reviewCount: 670, 
    address: "145 Sorauren Ave, Toronto, ON M6R 2E4", 
    phone: "(416) 463-2573", 
    website: "https://www.hoerner.ca", 
    neighborhood: "Roncesvalles", 
    latitude: 43.6445, longitude: -79.4452,
    services: ["Pipe Repair", "Drain Cleaning", "Radiators"],
    description: "Specialists in radiant heating and older home retrofits. They have deep expertise in managing the unique plumbing quirks of Roncesvalles century homes."
  },
  { 
    name: "Dr. Pipe Drain & Plumbing", 
    rating: 4.9, 
    reviewCount: 910, 
    address: "250 Davisville Ave, Toronto, ON M4S 1H2", 
    phone: "(416) 663-4777", 
    website: "https://drpipe.ca", 
    neighborhood: "Davisville", 
    latitude: 43.7022, longitude: -79.3878,
    services: ["Trenchless Repair", "Drain Cleaning", "Waterproofing"],
    description: "Leaders in trenchless pipe technology, allowing them to repair underground sewer lines without destroying your driveway or landscaping."
  },
  { 
    name: "Rooter Team", 
    rating: 4.9, 
    reviewCount: 380, 
    address: "1280 Finch Ave W, North York, ON M3J 3K6", 
    phone: "(647) 861-7191", 
    website: "https://rooterteam.ca", 
    neighborhood: "North York", 
    latitude: 43.7655, longitude: -79.4912,
    services: ["Emergency Service", "Drain Cleaning", "Waterproofing"],
    description: "Fast-response waterproofing and drain specialists. They offer competitive pricing on basement isolation and sump pump installations."
  },
  { 
    name: "Plumbing Support Inc", 
    rating: 5.0, 
    reviewCount: 150, 
    address: "229 Yonge Blvd, Toronto, ON M5M 3J1", 
    phone: "(416) 880-9426", 
    website: "https://plumbingsupport.ca", 
    neighborhood: "Bedford Park", 
    latitude: 43.7378, longitude: -79.4125,
    services: ["Pipe Repair", "Water Heaters", "Fixture Install"],
    description: "A boutique plumbing firm known for high-end fixture installation and meticulous attention to detail in bathroom renovations."
  }
];

const CORE_ELECTRICIANS: Partial<Professional>[] = [
  { 
    name: "Langstaff & Sloan", 
    rating: 4.9, 
    reviewCount: 340, 
    address: "1230 Sheppard Ave W, North York, ON M3K 1Z9", 
    phone: "(416) 503-2033", 
    website: "https://langstaffandsloan.com", 
    neighborhood: "North York", 
    latitude: 43.7542, longitude: -79.4715,
    services: ["Panel Upgrades", "Wiring", "Lighting"],
    description: "Renowned experts in Knob & Tube remediation. They are the top choice for bringing Toronto's older homes up to modern electrical safety codes."
  },
  { 
    name: "Toronto Wiring", 
    rating: 4.8, 
    reviewCount: 160, 
    address: "216 Peter St, Toronto, ON M5V 0M3", 
    phone: "(416) 840-5221", 
    website: "https://torontowiring.com", 
    neighborhood: "Downtown", 
    latitude: 43.6492, longitude: -79.3932,
    services: ["EV Charging", "Smart Home", "Lighting"],
    description: "Tech-forward electricians specializing in smart home automation, EV charger installations, and modern condo electrical systems."
  },
  { 
    name: "Foxwood Electric", 
    rating: 5.0, 
    reviewCount: 88, 
    address: "553 Glengrove Ave W, North York, ON M6B 2H2", 
    phone: "(647) 205-2023", 
    website: "https://foxwoodelectric.ca", 
    neighborhood: "North York", 
    latitude: 43.7125, longitude: -79.4356,
    services: ["Renovations", "Lighting", "Panel Upgrades"],
    description: "A boutique electrical team focused on high-end residential renovations and custom lighting design for luxury properties."
  },
  { 
    name: "Kronos Electrical", 
    rating: 4.9, 
    reviewCount: 110, 
    address: "40 Wynford Dr, North York, ON M3C 1J5", 
    phone: "(416) 560-6060", 
    website: "https://kronoselectrical.com", 
    neighborhood: "Don Mills", 
    latitude: 43.7256, longitude: -79.3312,
    services: ["Commercial", "Emergency Repair", "Wiring"],
    description: "Heavy-duty electrical specialists capable of handling complex commercial wiring projects and industrial panel upgrades."
  },
  { 
    name: "Hotwire Electric", 
    rating: 4.8, 
    reviewCount: 215, 
    address: "111 Zenway Blvd, Woodbridge, ON L4H 3H9", 
    phone: "(416) 553-5533", 
    website: "https://hotwire-electric.com", 
    neighborhood: "GTA North", 
    latitude: 43.7856, longitude: -79.5912,
    services: ["New Construction", "Panel Upgrades", "Lighting"],
    description: "The preferred contractor for custom home builders, offering comprehensive wiring solutions from rough-in to final fixture installation."
  },
  { 
    name: "Made Electric", 
    rating: 5.0, 
    reviewCount: 120, 
    address: "2300 Yonge St, Toronto, ON M4P 1E4", 
    phone: "(647) 951-4866", 
    website: "https://madeelectric.ca", 
    neighborhood: "Midtown", 
    latitude: 43.7067, longitude: -79.3989,
    services: ["Emergency Repair", "Panel Upgrades", "EV Charging"],
    description: "Highly responsive emergency electricians. Known for clean work and clear communication during urgent power restoration calls."
  },
  { 
    name: "Rush Electric", 
    rating: 4.8, 
    reviewCount: 205, 
    address: "15 Connie St, North York, ON M6L 2H8", 
    phone: "(416) 822-2698", 
    website: "https://rushelectric.ca", 
    neighborhood: "North York", 
    latitude: 43.7189, longitude: -79.4891,
    services: ["Commercial", "Wiring", "Lighting"],
    description: "A large-scale electrical contractor equipped for retail fit-outs, office lighting upgrades, and property management maintenance."
  },
  { 
    name: "O'Brien Electrical", 
    rating: 4.9, 
    reviewCount: 90, 
    address: "250 Front St W, Toronto, ON M5V 3G5", 
    phone: "(647) 961-9685", 
    website: "https://obrienelectrical.com", 
    neighborhood: "Downtown", 
    latitude: 43.6444, longitude: -79.3861,
    services: ["Lighting", "Smart Home", "Panel Upgrades"],
    description: "Condo electrical specialists. They understand the specific challenges of working in high-rise buildings and concrete ceilings."
  },
  {
    name: "Alkon Electric",
    rating: 4.9,
    reviewCount: 140,
    address: "358 Danforth Ave, Toronto, ON M4K 1N8",
    phone: "(416) 465-8533",
    website: "https://alkonelectric.com",
    neighborhood: "Danforth",
    latitude: 43.6769, longitude: -79.3582,
    services: ["Wiring", "Panel Upgrades", "Emergency Repair"],
    description: "Serving the Danforth community for decades. Trusted for fair pricing on service upgrades and general household electrical repairs."
  }
];

const CORE_HVAC: Partial<Professional>[] = [
  { 
    name: "AtlasCare", 
    rating: 4.8, 
    reviewCount: 1500, 
    address: "2355 Royal Windsor Dr, Mississauga, ON L5J 4S8", 
    phone: "(416) 626-1785", 
    website: "https://atlascare.ca", 
    neighborhood: "GTA West", 
    latitude: 43.5089, longitude: -79.6256,
    services: ["Furnace Install", "AC Repair", "Ventilation"],
    description: "One of the GTA's largest and most established HVAC firms. Known for their rigorous technician training and comprehensive protection plans."
  },
  { 
    name: "Mersey Heating", 
    rating: 4.7, 
    reviewCount: 1200, 
    address: "15 Howden Rd, Scarborough, ON M1R 3C4", 
    phone: "(416) 752-8351", 
    website: "https://mersey.ca", 
    neighborhood: "Scarborough", 
    latitude: 43.7389, longitude: -79.2891,
    services: ["Furnace Install", "AC Repair", "Heat Pumps"],
    description: "A staple in Scarborough for over 45 years. They excel in high-efficiency furnace upgrades and 24/7 emergency heating repairs."
  },
  { 
    name: "Cambridge Heating", 
    rating: 4.9, 
    reviewCount: 850, 
    address: "167 Applewood Crescent, Concord, ON L4K 4K7", 
    phone: "(416) 757-4328", 
    website: "https://cambridgeheating.com", 
    neighborhood: "Vaughan", 
    latitude: 43.8356, longitude: -79.5012,
    services: ["Heat Pumps", "Furnace Install", "AC Repair"],
    description: "Leading the charge in green energy solutions, specifically specializing in Cold Climate Heat Pump installations and rebates."
  },
  { 
    name: "Novel Care", 
    rating: 4.8, 
    reviewCount: 600, 
    address: "6508 Yonge St, North York, ON M2M 3X6", 
    phone: "(416) 921-0000", 
    website: "https://novelcare.ca", 
    neighborhood: "North York", 
    latitude: 43.7912, longitude: -79.4189,
    services: ["Commercial", "Ventilation", "AC Repair"],
    description: "Experts in commercial HVAC management and luxury residential climate control. They handle complex ductless and VRF systems."
  },
  { 
    name: "Air Point HVAC", 
    rating: 4.9, 
    reviewCount: 420, 
    address: "123 Queens Plate Dr, Etobicoke, ON M9W 6Z1", 
    phone: "(416) 893-5599", 
    website: "https://airpoint.ca", 
    neighborhood: "Etobicoke", 
    latitude: 43.7256, longitude: -79.5912,
    services: ["AC Repair", "Furnace Install", "Heat Pumps"],
    description: "A highly-rated local favorite in Etobicoke. Known for transparent quotes and not upselling unnecessary equipment during service calls."
  },
  { 
    name: "Laird & Son", 
    rating: 4.9, 
    reviewCount: 620, 
    address: "120 Vanderhoof Ave, East York, ON M4G 2H7", 
    phone: "(416) 421-2121", 
    website: "https://lairdandson.com", 
    neighborhood: "Leaside", 
    latitude: 43.7112, longitude: -79.3612,
    services: ["Boilers", "AC Repair", "Furnace Install"],
    description: "The authority on older home heating systems. Whether it's a boiler, radiator, or spacepak system, they are the experts in Leaside."
  },
  { 
    name: "Spring Home Heating", 
    rating: 4.8, 
    reviewCount: 480, 
    address: "20 Solar St, Etobicoke, ON M9W 5C3", 
    phone: "(647) 952-4414", 
    website: "https://springhome.ca", 
    neighborhood: "Etobicoke", 
    latitude: 43.7012, longitude: -79.5812,
    services: ["Heat Pumps", "Furnace Install", "AC Repair"],
    description: "Trane and Mitsubishi authorized dealers. They focus heavily on high-efficiency retrofits to lower home energy consumption."
  },
  { 
    name: "City Energy HVAC", 
    rating: 4.8, 
    reviewCount: 350, 
    address: "100 King St W, Toronto, ON M5X 1A9", 
    phone: "(416) 880-3363", 
    website: "https://cityenergy.ca", 
    neighborhood: "Downtown", 
    latitude: 43.6488, longitude: -79.3806,
    services: ["Duct Cleaning", "Ventilation", "AC Repair"],
    description: "Downtown condo specialists. They have the specific equipment and insurance required to work in high-rise mechanical rooms."
  }
];

const CORE_ROOFERS: Partial<Professional>[] = [
  { 
    name: "Alpine Roofing", 
    rating: 4.8, 
    reviewCount: 520, 
    address: "665 Millway Ave, Concord, ON L4K 3T8", 
    phone: "(416) 469-1939", 
    website: "https://alpineroofing.ca", 
    neighborhood: "GTA North", 
    latitude: 43.8112, longitude: -79.5112,
    services: ["Flat Roofing", "Commercial", "Shingle Repair"],
    description: "Established in 1974, Alpine is a giant in both commercial flat roofing and residential shingle replacement across the GTA."
  },
  { 
    name: "Avenue Road Roofing", 
    rating: 4.7, 
    reviewCount: 450, 
    address: "461 Greenbriar Dr, North York, ON M6L 3M3", 
    phone: "(416) 785-5129", 
    website: "https://avenueroadroofing.com", 
    neighborhood: "North York", 
    latitude: 43.7112, longitude: -79.4812,
    services: ["Shingle Repair", "Skylights", "Emergency Leak"],
    description: "Specializing in high-end residential roofing. They are experts in slate, cedar shake, and complex copper metal work."
  },
  { 
    name: "Integrity Roofers", 
    rating: 4.9, 
    reviewCount: 380, 
    address: "1165 Caledonia Rd, North York, ON M6A 2X1", 
    phone: "(416) 736-7373", 
    website: "https://integrityroofers.com", 
    neighborhood: "North York", 
    latitude: 43.7212, longitude: -79.4612,
    services: ["Flat Roofing", "Shingle Repair", "Inspection"],
    description: "Known for their detailed digital inspections. They provide comprehensive photo reports before and after every job."
  },
  { 
    name: "Archer Roofing", 
    rating: 4.9, 
    reviewCount: 210, 
    address: "2007 Dundas St W, Toronto, ON M6R 1W8", 
    phone: "(416) 427-2437", 
    website: "https://archerroofing.ca", 
    neighborhood: "Roncesvalles", 
    latitude: 43.6512, longitude: -79.4412,
    services: ["Shingle Repair", "Emergency Leak", "Skylights"],
    description: "A trusted local roofer in the West End. They focus on quality workmanship for Victorian and Edwardian peaked roofs."
  },
  { 
    name: "The Roofers", 
    rating: 4.7, 
    reviewCount: 410, 
    address: "2400 Midland Ave, Scarborough, ON M1S 5C1", 
    phone: "(416) 855-0637", 
    website: "https://theroofers.ca", 
    neighborhood: "Scarborough", 
    latitude: 43.7856, longitude: -79.2712,
    services: ["Shingle Repair", "New Install", "Inspection"],
    description: "A GAF Master Elite certified contractor, offering some of the strongest manufacturer warranties available in the industry."
  },
  { 
    name: "Professional Roofers", 
    rating: 4.8, 
    reviewCount: 350, 
    address: "155 Tycos Dr, North York, ON M6B 1W6", 
    phone: "(416) 604-9765", 
    website: "https://professionalroofers.com", 
    neighborhood: "North York", 
    latitude: 43.7056, longitude: -79.4512,
    services: ["Flat Roofing", "Shingle Repair", "Emergency Leak"],
    description: "A full-service roofing company that handles everything from eavestrough cleaning to complete structural roof replacements."
  },
  { 
    name: "Cherry and Clark", 
    rating: 4.7, 
    reviewCount: 600, 
    address: "1630 Sismet Rd, Mississauga, ON L4W 1R5", 
    phone: "(289) 813-7186", 
    website: "https://cherryandclarkroofing.ca", 
    neighborhood: "GTA West", 
    latitude: 43.6312, longitude: -79.6112,
    services: ["Shingle Repair", "Commercial", "Inspection"],
    description: "Serving the community since 1972. They have a dedicated service department for minor repairs and maintenance to extend roof life."
  },
  { 
    name: "Quality Roofing Services", 
    rating: 4.9, 
    reviewCount: 300, 
    address: "38 Torbarrie Rd, North York, ON M3L 1G5", 
    phone: "(416) 663-0303", 
    website: "https://qualityroofing.ca", 
    neighborhood: "Downsview", 
    latitude: 43.7256, longitude: -79.5112,
    services: ["Commercial", "Flat Roofing", "Emergency Leak"],
    description: "Commercial and industrial roofing specialists. They manage large flat roof portfolios for property managers across Toronto."
  }
];

const CORE_DRYWALLERS: Partial<Professional>[] = [
  { 
    name: "Patch Dudes", 
    rating: 4.9, 
    reviewCount: 480, 
    address: "3300 Yonge St, Toronto, ON M4N 2L6", 
    phone: "(416) 477-6330", 
    website: "https://patchdudes.com", 
    neighborhood: "North Toronto", 
    latitude: 43.7312, longitude: -79.4012,
    services: ["Patch Repair", "Popcorn Removal", "Taping & Mudding"],
    description: "Masters of small repairs and seamless matching. They can fix water damage or holes so perfectly you'll never know they were there."
  },
  { 
    name: "Toronto Tapers", 
    rating: 4.8, 
    reviewCount: 320, 
    address: "207 Edgeley Blvd, Concord, ON L4K 4B5", 
    phone: "(416) 628-9721", 
    website: "https://torontotapers.ca", 
    neighborhood: "Vaughan", 
    latitude: 43.8112, longitude: -79.5212,
    services: ["New Install", "Taping & Mudding", "Framing"],
    description: "The preferred team for basement finishing and new partition walls. They provide board, tape, and sand services efficiently."
  },
  { 
    name: "Drywall Repair Specialist", 
    rating: 5.0, 
    reviewCount: 150, 
    address: "123 Eglinton Ave E, Toronto, ON M4P 1J3", 
    phone: "(647) 991-3798", 
    website: "https://thedrywallspecialist.ca", 
    neighborhood: "Midtown", 
    latitude: 43.7089, longitude: -79.3989,
    services: ["Patch Repair", "Taping & Mudding", "Popcorn Removal"],
    description: "A focused team dedicated solely to residential repairs. They prioritize dust control and protecting your furniture during work."
  },
  { 
    name: "Cornice Trim", 
    rating: 4.7, 
    reviewCount: 210, 
    address: "140 Amber St, Markham, ON L3R 3J8", 
    phone: "(905) 475-3564", 
    website: "https://cornicetrim.ca", 
    neighborhood: "Markham", 
    latitude: 43.8212, longitude: -79.3312,
    services: ["Framing", "New Install", "Taping & Mudding"],
    description: "Experts in crown moulding and architectural drywall details. They add character and elegance to plain rooms."
  },
  { 
    name: "Royal Drywall", 
    rating: 4.8, 
    reviewCount: 180, 
    address: "50 Burnhamthorpe Rd W, Mississauga, ON L5B 3C2", 
    phone: "(647) 835-2423", 
    website: "https://royaldrywall.ca", 
    neighborhood: "GTA West", 
    latitude: 43.5912, longitude: -79.6412,
    services: ["New Install", "Framing", "Commercial"],
    description: "A full-service drywall contractor capable of handling entire custom homes or large office renovations with speed."
  },
  { 
    name: "Smooth Ceiling Toronto", 
    rating: 4.9, 
    reviewCount: 250, 
    address: "25 Sheppard Ave W, North York, ON M2N 6S6", 
    phone: "(416) 479-9989", 
    website: "https://smoothceiling.ca", 
    neighborhood: "North York", 
    latitude: 43.7612, longitude: -79.4112,
    services: ["Popcorn Removal", "Taping & Mudding", "Patch Repair"],
    description: "As the name suggests, they specialize in modernizing homes by removing dated popcorn ceilings and creating glass-smooth surfaces."
  },
  { 
    name: "Paint & Drywall Guys", 
    rating: 4.8, 
    reviewCount: 310, 
    address: "80 Nashdene Rd, Scarborough, ON M1V 5E4", 
    phone: "(647) 833-2816", 
    website: "https://paintdrywallguys.com", 
    neighborhood: "Scarborough", 
    latitude: 43.8312, longitude: -79.2412,
    services: ["New Install", "Patch Repair", "Framing"],
    description: "A one-stop shop for walls. They hang, tape, sand, and paint, streamlining your renovation process significantly."
  }
];

const NEIGHBORHOODS = ["Downtown", "North York", "Etobicoke", "Scarborough", "Midtown", "The Beaches", "Leslieville", "High Park", "Annex", "Yorkville"];

const generateDirectory = (coreList: Partial<Professional>[], trade: TradeType, count: number): Professional[] => {
  const result: Professional[] = [];
  
  // Add core verified listings first
  coreList.forEach((p, i) => {
    // Generate a high trust score for verified core pros (90-99)
    const baseTrust = 92;
    const trustScore = Math.min(99, baseTrust + (Math.random() * 7));
    const yearsInBusiness = 15 + Math.floor(Math.random() * 20); // 15-35 years
    
    // Pick a random testimonial for display
    const testimonialText = TESTIMONIAL_SAMPLES[i % TESTIMONIAL_SAMPLES.length];
    
    // Assign Accredited BBB Status to Top Pros
    const bbbRating = i % 5 === 0 ? 'A' : 'A+'; 

    result.push({
      id: `${trade.toLowerCase()}-verified-${i}`,
      name: p.name!,
      rating: p.rating!,
      reviewCount: p.reviewCount!,
      yelpRating: parseFloat((p.rating! - 0.2).toFixed(1)),
      yelpReviewCount: Math.floor(p.reviewCount! * 0.4),
      bbbRating, // Inject BBB
      address: p.address!,
      neighborhood: p.neighborhood!,
      phone: p.phone!,
      website: p.website!,
      email: `service@${p.website!.replace('https://www.', '').replace('https://', '').split('/')[0]}`,
      // Use hardcoded services if available, else slice defaults
      services: p.services || TRADE_CATEGORIES[trade].slice(1, 4),
      isEmergency: i % 2 === 0,
      // Use hardcoded description if available, else generate
      description: p.description || `${p.name} is a premier ${trade.toLowerCase()} authority in ${p.neighborhood}, recognized for precision workmanship and long-term reliability. With ${yearsInBusiness} years of service excellence.`,
      status: 'Open',
      verified: true,
      latitude: p.latitude || 43.65 + (Math.random() - 0.5) * 0.1,
      longitude: p.longitude || -79.38 + (Math.random() - 0.5) * 0.1,
      trade,
      clientType: i % 3 === 0 ? 'Residential' : 'Both',
      trustScore: Math.floor(trustScore),
      yearsInBusiness,
      verifiedLicense: true,
      testimonials: [
        { author: "Verified Client", text: testimonialText, rating: 5 }
      ]
    });
  });

  // Fill remaining to reach requested count
  for (let i = result.length; i < count; i++) {
    const neighborhood = NEIGHBORHOODS[i % NEIGHBORHOODS.length];
    const rating = parseFloat((4.9 - (i * 0.01)).toFixed(1));
    const name = `${neighborhood} Elite ${trade} Hub`;
    
    // Simulating Trust Score based on rating and "mock" review count logic
    const mockTrust = 75 + (rating * 4); 
    const yearsInBusiness = 5 + Math.floor(Math.random() * 10);
    const testimonialText = TESTIMONIAL_SAMPLES[(i + 3) % TESTIMONIAL_SAMPLES.length];
    
    // Simulating random BBB for generated listings
    const bbbRating = Math.random() > 0.4 ? (Math.random() > 0.5 ? 'A+' : 'A') : undefined;

    result.push({
      id: `${trade.toLowerCase()}-generated-${i}`,
      name,
      rating,
      reviewCount: 500 - i,
      yelpRating: parseFloat((rating - 0.3).toFixed(1)),
      yelpReviewCount: 150 - i,
      bbbRating, // Inject BBB
      address: `${100 + i} ${neighborhood} Blvd, Toronto, ON`,
      neighborhood,
      phone: `(416) 555-${2000 + i}`,
      website: `https://findafixer.ca`, // Safe fallback for directory filling
      services: TRADE_CATEGORIES[trade].slice(1, 3),
      isEmergency: i % 5 === 0,
      description: `A highly-rated ${trade.toLowerCase()} team serving the ${neighborhood} area. Known for competitive pricing and efficient project turnaround times.`,
      status: 'Open',
      verified: true,
      latitude: 43.65 + (Math.random() - 0.5) * 0.1,
      longitude: -79.38 + (Math.random() - 0.5) * 0.1,
      trade,
      clientType: 'Both',
      trustScore: Math.floor(mockTrust),
      yearsInBusiness,
      verifiedLicense: i % 3 === 0,
      testimonials: [
        { author: "Local Resident", text: testimonialText, rating: 5 }
      ]
    });
  }
  return result;
};

export const MOCK_PROFESSIONALS: Professional[] = [
  ...generateDirectory(CORE_PLUMBERS, 'Plumber', 50),
  ...generateDirectory(CORE_ELECTRICIANS, 'Electrician', 50),
  ...generateDirectory(CORE_HVAC, 'HVAC', 50),
  ...generateDirectory(CORE_ROOFERS, 'Roofer', 50),
  ...generateDirectory(CORE_DRYWALLERS, 'Drywaller', 50)
];
