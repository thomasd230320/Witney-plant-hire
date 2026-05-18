/*
 * Witney Plant Hire — demo inventory feed.
 *
 * DEMO ONLY. In production this data would come live from inspHire
 * (the hire-management system the company uses to track fleet stock).
 * Here it is a static stand-in so the website can show stock status,
 * prices and a working hire basket without a backend.
 *
 * Each entry:
 *   name      — must match the catalogue list text on the hire pages
 *   cat       — category (display only)
 *   day       — demo day hire rate (GBP)
 *   week      — demo week hire rate (GBP)
 *   available — units free to hire; 0 = out on hire
 */
window.WPH_INVENTORY = [
  /* ---- Plant: Excavators ---- */
  { name: "1.2 Tonne Kubota U10", cat: "Excavators", day: 75, week: 225, available: 4 },
  { name: "1.8 Tonne Takeuchi TB016", cat: "Excavators", day: 85, week: 255, available: 3 },
  { name: "3 Tonne Takeuchi TB228", cat: "Excavators", day: 110, week: 330, available: 5 },
  { name: "3 Tonne Hitachi ZX27R", cat: "Excavators", day: 110, week: 330, available: 3 },
  { name: "5.5 Tonne Takeuchi TB250", cat: "Excavators", day: 150, week: 450, available: 4 },
  { name: "6 Tonne Doosan DX63R", cat: "Excavators", day: 165, week: 495, available: 2 },
  { name: "9 Tonne Doosan DX85R", cat: "Excavators", day: 210, week: 630, available: 3 },
  { name: "14 Tonne Doosan DX140LCR", cat: "Excavators", day: 290, week: 870, available: 2 },
  { name: "22 Tonne Kobelco SK210-10", cat: "Excavators", day: 360, week: 1080, available: 0 },

  /* ---- Plant: Forklift Trucks ---- */
  { name: "JCB 524-50 - 5 Metre Compact Telescopic Forklift", cat: "Forklift Trucks", day: 120, week: 360, available: 3 },
  { name: "Merlo P25.6 - 6 Metre Compact Telescopic", cat: "Forklift Trucks", day: 135, week: 405, available: 2 },
  { name: "Manitou MT625 - 6 Metre Compact Telescopic", cat: "Forklift Trucks", day: 135, week: 405, available: 3 },
  { name: "JCB 531-70 - 7 Metre Telescopic", cat: "Forklift Trucks", day: 150, week: 450, available: 4 },
  { name: "Merlo P34.7 - 7 Metre Telescopic", cat: "Forklift Trucks", day: 155, week: 465, available: 3 },
  { name: "JCB 535-95 - 9.5 Metre Telescopic", cat: "Forklift Trucks", day: 180, week: 540, available: 2 },
  { name: "JCB 533-105 - 10 Metre Telescopic", cat: "Forklift Trucks", day: 195, week: 585, available: 2 },
  { name: "Manitou MT1335SL - 13 Metre Telescopic", cat: "Forklift Trucks", day: 240, week: 720, available: 0 },
  { name: "JCB 535 V140 - 14 Metre Telescopic", cat: "Forklift Trucks", day: 260, week: 780, available: 1 },

  /* ---- Plant: Dumper Trucks ---- */
  { name: "Thwaites 2 Tonne Swivel Skip Dumper", cat: "Dumper Trucks", day: 70, week: 210, available: 5 },
  { name: "Thwaites 2 Tonne Truck", cat: "Dumper Trucks", day: 65, week: 195, available: 5 },
  { name: "Thwaites 3 Tonne Truck (with Folding ROP)", cat: "Dumper Trucks", day: 80, week: 240, available: 4 },
  { name: "Thwaites 6 Tonne Dumper Truck", cat: "Dumper Trucks", day: 110, week: 330, available: 3 },
  { name: "Thwaite/Terex 9 Tonne", cat: "Dumper Trucks", day: 140, week: 420, available: 2 },
  { name: "Terex PT6000 6 Tonne", cat: "Dumper Trucks", day: 115, week: 345, available: 3 },
  { name: "Volvo ED750 Skip Loading Machine", cat: "Dumper Trucks", day: 95, week: 285, available: 2 },
  { name: "Hinowa Tracked Skip Loader", cat: "Dumper Trucks", day: 90, week: 270, available: 3 },

  /* ---- Plant: Generators ---- */
  { name: "Honda EC2200 2.2 KVA Petrol Generator", cat: "Generators", day: 30, week: 90, available: 6 },
  { name: "Honda 3 KVA Diesel Generator", cat: "Generators", day: 38, week: 114, available: 5 },
  { name: "Pramac P6000 8 KVA Silent Diesel", cat: "Generators", day: 55, week: 165, available: 4 },
  { name: "Stephill SSDK12 12 KVA Diesel Super Silent (Multi Phase)", cat: "Generators", day: 70, week: 210, available: 3 },
  { name: "Pramac GBW15 15 KVA", cat: "Generators", day: 80, week: 240, available: 2 },
  { name: "Pramac GBW20 20 KVA", cat: "Generators", day: 95, week: 285, available: 2 },

  /* ---- Plant: Compressors ---- */
  { name: "Atlas Copco XAS67 - Two Tool Compressor", cat: "Compressors", day: 60, week: 180, available: 3 },
  { name: "Ingersoll Rand 7/41+ - Two Tool Compressor", cat: "Compressors", day: 58, week: 174, available: 3 },

  /* ---- Plant: Skid Steers ---- */
  { name: "Bobcat T770 Tracked Skid Steer Loader 4.5 Ton", cat: "Skid Steers", day: 175, week: 525, available: 2 },
  { name: "Case 410 Skid Steer Loader", cat: "Skid Steers", day: 150, week: 450, available: 2 },

  /* ---- Plant: Rollers ---- */
  { name: "Bomag 80 Roller", cat: "Rollers", day: 45, week: 135, available: 5 },
  { name: "Bomag 100 ADL - Ride-on Roller", cat: "Rollers", day: 60, week: 180, available: 3 },
  { name: "Bomag BW120 AD - Ride-on Roller", cat: "Rollers", day: 75, week: 225, available: 3 },
  { name: "Bomag BW71E-2 - 28\" Diesel Pedestrian Roller", cat: "Rollers", day: 40, week: 120, available: 4 },
  { name: "Bomag BMP8500 - Remote Trench Roller", cat: "Rollers", day: 55, week: 165, available: 2 },
  { name: "Bomag BW177D-5 - 7 Ton Self-Propelled Roller (Pad Foot)", cat: "Rollers", day: 130, week: 390, available: 0 },
  { name: "Volvo DD25 - 120 Ride-on Roller", cat: "Rollers", day: 85, week: 255, available: 2 },

  /* ---- Plant: Bowsers ---- */
  { name: "100 Litre Fuel Caddi Bowser", cat: "Bowsers", day: 18, week: 54, available: 6 },
  { name: "100 Litre AdBlue Caddi Bowser", cat: "Bowsers", day: 18, week: 54, available: 5 },
  { name: "225 Litre Bund Drum Bowser", cat: "Bowsers", day: 22, week: 66, available: 4 },
  { name: "1000 Litre Static Fuel Bowser", cat: "Bowsers", day: 35, week: 105, available: 3 },
  { name: "1000 Litre Site Tow Fuel Bowser", cat: "Bowsers", day: 40, week: 120, available: 3 },
  { name: "1000 Litre Highway Tow Fuel Bowser", cat: "Bowsers", day: 45, week: 135, available: 2 },

  /* ---- Plant: Chippers ---- */
  { name: "GTS 1300 HSC 4\" Petrol Wood Chipper", cat: "Chippers", day: 70, week: 210, available: 2 },

  /* ---- Plant: Powered Access ---- */
  { name: "Nifty 120T Trailer Mount Boom Lift", cat: "Powered Access", day: 95, week: 285, available: 0 },
  { name: "Compact 10 Metre Scissor Lift", cat: "Powered Access", day: 85, week: 255, available: 2 },
  { name: "4x4 Rough Terrain Nifty HR12", cat: "Powered Access", day: 110, week: 330, available: 2 },

  /* ---- Plant: Compaction ---- */
  { name: "Ammann AVP1033 Petrol 13\"", cat: "Compaction", day: 28, week: 84, available: 5 },
  { name: "Ammann 1850", cat: "Compaction", day: 32, week: 96, available: 4 },
  { name: "Bomag BP14/34", cat: "Compaction", day: 26, week: 78, available: 5 },
  { name: "Bomag BP8/45-2", cat: "Compaction", day: 24, week: 72, available: 4 },
  { name: "Bomag BP18/45-2", cat: "Compaction", day: 30, week: 90, available: 4 },
  { name: "Bomag BP12/50", cat: "Compaction", day: 30, week: 90, available: 3 },
  { name: "Bomag BPR 35/60D", cat: "Compaction", day: 48, week: 144, available: 2 },

  /* ---- Plant: Concreting ---- */
  { name: "Benford Hand Start 5.3 Diesel Mixer", cat: "Concreting", day: 30, week: 90, available: 4 },
  { name: "Belle Minimix 150 110v Tip-Up Mixer with Stand", cat: "Concreting", day: 22, week: 66, available: 5 },
  { name: "Belle 150 Mini Mix Petrol Tip-Up Mixer with Stand", cat: "Concreting", day: 24, week: 72, available: 4 },
  { name: "Terex 7/5 Diesel Mixer", cat: "Concreting", day: 35, week: 105, available: 3 },
  { name: "Barrow Mix 7/5 Electric Start Mixer", cat: "Concreting", day: 28, week: 84, available: 3 },
  { name: "Baromix Electric Start 5.3 Diesel Mixer", cat: "Concreting", day: 30, week: 90, available: 3 },
  { name: "Baromix Commodore 5.3 Electric Start Mixer", cat: "Concreting", day: 30, week: 90, available: 3 },
  { name: "Baromix 7/5 Electric Start Mixer", cat: "Concreting", day: 32, week: 96, available: 2 },
  { name: "Belle PM30 5.3 Electric Start Mixer", cat: "Concreting", day: 30, week: 90, available: 3 },

  /* ---- Tool: Cutting, Grinding & Fixing ---- */
  { name: "First Fix Gas Powered Nail Gun", cat: "Cutting / Fixing", day: 28, week: 84, available: 5 },
  { name: "Second Fix Gas Powered Nail Gun", cat: "Cutting / Fixing", day: 26, week: 78, available: 5 },
  { name: "Concrete/Steel Nail Gun", cat: "Cutting / Fixing", day: 32, week: 96, available: 4 },
  { name: "Air Powered Nail Gun", cat: "Cutting / Fixing", day: 24, week: 72, available: 4 },
  { name: "Secret Nailer", cat: "Cutting / Fixing", day: 20, week: 60, available: 3 },

  /* ---- Tool: Cleaning ---- */
  { name: "Bowser Pressure Washer", cat: "Cleaning", day: 45, week: 135, available: 3 },
  { name: "Honda GX160 Petrol Pressure Washer", cat: "Cleaning", day: 38, week: 114, available: 4 },
  { name: "TaskMan (Yanmar Engine) 3000 PSI Diesel Pressure Washer", cat: "Cleaning", day: 55, week: 165, available: 2 },
  { name: "Makita Electric Pressure Washer 140 Bar", cat: "Cleaning", day: 30, week: 90, available: 5 },
  { name: "MPMS 240v 130 Bar Electric Pressure Washer with Patio Cleaner Head", cat: "Cleaning", day: 35, week: 105, available: 3 },
  { name: "Henry Hoover 110v", cat: "Cleaning", day: 15, week: 45, available: 6 },
  { name: "Numatic Vacuum Cleaner HD", cat: "Cleaning", day: 18, week: 54, available: 5 },
  { name: "HEPA Dustless Vacuum 110v", cat: "Cleaning", day: 28, week: 84, available: 3 },
  { name: "Clean Fix TW300 Carpet Cleaner", cat: "Cleaning", day: 32, week: 96, available: 2 },
  { name: "Hilti Wet/Dry Vacuum Cleaner 110v", cat: "Cleaning", day: 30, week: 90, available: 3 },

  /* ---- Tool: Lifting ---- */
  { name: "Jacks", cat: "Lifting", day: 12, week: 36, available: 6 },
  { name: "Engine Hoist", cat: "Lifting", day: 25, week: 75, available: 3 },
  { name: "Sack Trucks", cat: "Lifting", day: 10, week: 30, available: 6 },
  { name: "Piano Trolley", cat: "Lifting", day: 14, week: 42, available: 2 },

  /* ---- Tool: Heating & Plumbing ---- */
  { name: "Radiators", cat: "Heating / Plumbing", day: 15, week: 45, available: 6 },
  { name: "Infra-Red Heaters", cat: "Heating / Plumbing", day: 18, week: 54, available: 5 },
  { name: "Indirect Fired High Capacity Site Heaters", cat: "Heating / Plumbing", day: 45, week: 135, available: 2 },

  /* ---- Tool: Ground Care ---- */
  { name: "343RX Brush Cutter", cat: "Ground Care", day: 28, week: 84, available: 4 },
  { name: "323R11 Petrol Brush Cutter", cat: "Ground Care", day: 26, week: 78, available: 4 },
  { name: "323RRJ Brush Cutter", cat: "Ground Care", day: 26, week: 78, available: 3 },
  { name: "323HD60 Hedge Cutter", cat: "Ground Care", day: 25, week: 75, available: 3 },
  { name: "Stihl Long Reach Petrol Hedge Cutter", cat: "Ground Care", day: 30, week: 90, available: 3 },
  { name: "13HP Hydraulic Rear Tine Tiller", cat: "Ground Care", day: 45, week: 135, available: 2 },
  { name: "5HP Scarifier 50cm Width", cat: "Ground Care", day: 35, week: 105, available: 3 },
  { name: "Birchwood 9HP Stump Grinder", cat: "Ground Care", day: 60, week: 180, available: 0 },
  { name: "560mm 22\" Petrol Aerator", cat: "Ground Care", day: 32, week: 96, available: 2 },
  { name: "48cm Self-Propelled Mower", cat: "Ground Care", day: 30, week: 90, available: 4 },
  { name: "12\" Petrol Turf Cutter", cat: "Ground Care", day: 40, week: 120, available: 2 },
  { name: "Benassi Honda 5HP Rotavator", cat: "Ground Care", day: 38, week: 114, available: 3 },
  { name: "15\" 445 Chainsaw", cat: "Ground Care", day: 28, week: 84, available: 3 },
  { name: "345 15\" Petrol Chain Saw", cat: "Ground Care", day: 26, week: 78, available: 3 },
  { name: "455 15\" Petrol Chain Saw", cat: "Ground Care", day: 28, week: 84, available: 3 },
  { name: "Multi-Tool Chainsaw", cat: "Ground Care", day: 30, week: 90, available: 3 },
  { name: "Multi-Tool Hedge Trimmer", cat: "Ground Care", day: 30, week: 90, available: 3 },
  { name: "Husqvarna 125 LDX Multi Tool", cat: "Ground Care", day: 34, week: 102, available: 2 },
  { name: "128LDX Multi Tool", cat: "Ground Care", day: 34, week: 102, available: 2 },
  { name: "Long Reach Pole Saw", cat: "Ground Care", day: 28, week: 84, available: 3 },
  { name: "Stihl Long Reach Two Stroke Pole Saw", cat: "Ground Care", day: 32, week: 96, available: 2 },
  { name: "Stihl Two Stroke Petrol Strimmer", cat: "Ground Care", day: 26, week: 78, available: 4 },
  { name: "3m Tree Loppers", cat: "Ground Care", day: 12, week: 36, available: 5 },
  { name: "Manual Seed Spreader", cat: "Ground Care", day: 10, week: 30, available: 5 },
  { name: "Measuring Wheel", cat: "Ground Care", day: 8, week: 24, available: 6 },
  { name: "Water Filled Garden Roller", cat: "Ground Care", day: 14, week: 42, available: 4 },
  { name: "Hand Post Knocker", cat: "Ground Care", day: 10, week: 30, available: 5 },

  /* ---- Tool: Laser Levels ---- */
  { name: "Rotating Laser Level", cat: "Laser Levels", day: 35, week: 105, available: 3 },
  { name: "Cable Avoidance Tool", cat: "Laser Levels", day: 40, week: 120, available: 2 },
  { name: "Signal Generator", cat: "Laser Levels", day: 25, week: 75, available: 3 },
  { name: "Metal Detectors", cat: "Laser Levels", day: 22, week: 66, available: 3 },

  /* ---- Tool: Ladders & Access ---- */
  { name: "4, 5, 6 or 7 Tread Light Trade Platform Step Ladders", cat: "Ladders", day: 14, week: 42, available: 6 },
  { name: "4, 5, 6 or 8 Tread Fibreglass Steps", cat: "Ladders", day: 16, week: 48, available: 5 },
  { name: "Fold Away Step Up", cat: "Ladders", day: 8, week: 24, available: 6 },
  { name: "Folding Hop Up 40cm x 50cm", cat: "Ladders", day: 9, week: 27, available: 5 },
  { name: "Worksafe Hop Up Platform", cat: "Ladders", day: 12, week: 36, available: 4 },
  { name: "13'1\" Double Aluminium Ladder", cat: "Ladders", day: 18, week: 54, available: 4 },
  { name: "17 Rung Pole Ladder", cat: "Ladders", day: 20, week: 60, available: 3 },
  { name: "Telescopic Ladder 3.8m", cat: "Ladders", day: 16, week: 48, available: 4 },

  /* ---- Tool: Breakers & Drills ---- */
  { name: "4 Kg 110v Lightweight Breaker", cat: "Breakers / Drills", day: 22, week: 66, available: 5 },
  { name: "5.6 Kg 110v Breaker", cat: "Breakers / Drills", day: 24, week: 72, available: 4 },
  { name: "6.4 Kg 110v Combination Breaker", cat: "Breakers / Drills", day: 26, week: 78, available: 4 },
  { name: "7 Kg 110v Heavy Duty Breaker", cat: "Breakers / Drills", day: 28, week: 84, available: 3 },
  { name: "10 Kg 110v Combination Hammer", cat: "Breakers / Drills", day: 30, week: 90, available: 3 },
  { name: "Hilti TE1000 18 Kg 110v Breaker", cat: "Breakers / Drills", day: 42, week: 126, available: 0 },
  { name: "29 Kg 110v Heavy Duty Breaker", cat: "Breakers / Drills", day: 38, week: 114, available: 2 },

  /* ---- Tool: Water Pumps ---- */
  { name: "Warsop Metrix 2\" Submersible Water Pump 110V", cat: "Water Pumps", day: 25, week: 75, available: 4 },
  { name: "Hilta (Miles) 3\" Diesel Diaphragm Water Pump", cat: "Water Pumps", day: 40, week: 120, available: 2 },
  { name: "Liberator 400 TT Pumps 2\" Submersible Water Pump 110V", cat: "Water Pumps", day: 28, week: 84, available: 3 },
  { name: "2\" Submersible Pump (Trash Pump) 110v", cat: "Water Pumps", day: 26, week: 78, available: 3 },
  { name: "2\" Petrol Water Pump", cat: "Water Pumps", day: 24, week: 72, available: 4 },
  { name: "2\" Sub Pump 225 Ltr/min", cat: "Water Pumps", day: 26, week: 78, available: 3 },
  { name: "3\" Petrol Water Pump", cat: "Water Pumps", day: 30, week: 90, available: 3 },
  { name: "1\" Puddle Pump 109 Ltr/min with 10m Lay Flat Hose", cat: "Water Pumps", day: 22, week: 66, available: 4 },
  { name: "2\" Sub Pump 225 Ltr/min with 10m Lay Flat Hose", cat: "Water Pumps", day: 28, week: 84, available: 3 },

  /* ---- Tool: Decorating ---- */
  { name: "Pro Step 110v Emulsion Sprayer", cat: "Decorating", day: 35, week: 105, available: 2 },
  { name: "Wagner 190PSI Garden Paint Sprayer", cat: "Decorating", day: 28, week: 84, available: 3 },
  { name: "Wallpaper Stripper", cat: "Decorating", day: 16, week: 48, available: 4 },

  /* ---- Services: Crusher & Screener ---- */
  { name: "Keestrack Argo TK141 Dual Crusher (jaw crusher - capacity up to 300 tonnes/hour)", cat: "Crusher Hire", day: 650, week: 2600, available: 1 },
  { name: "Keestrack K3 Scalping Combo Screener", cat: "Screener Hire", day: 480, week: 1920, available: 1 },
  { name: "Terex Finlay 883+ Triple Shaft Screener", cat: "Screener Hire", day: 520, week: 2080, available: 1 },

  /* ---- Services: Site Welfare ---- */
  { name: "Portable Toilets", cat: "Site Welfare", day: 20, week: 60, available: 8 },
  { name: "Site Offices (converted shipping containers)", cat: "Site Welfare", day: 45, week: 135, available: 4 },
  { name: "Secure Anti-Vandal Storage Units", cat: "Site Welfare", day: 40, week: 120, available: 4 },
  { name: "Security Fencing (Heras)", cat: "Site Welfare", day: 5, week: 15, available: 40 },
  { name: "Road Plates", cat: "Site Welfare", day: 18, week: 54, available: 10 },
  { name: "Trench Boxes / Trench Sheets", cat: "Site Welfare", day: 35, week: 105, available: 6 },
  { name: "Manhole Boxes / Manhole Shutters", cat: "Site Welfare", day: 30, week: 90, available: 5 },

  /* ---- Services: Heavy Haulage ---- */
  { name: "Isuzu 7.5 Tonne Dropside", cat: "Heavy Haulage", day: 180, week: 720, available: 2 },
  { name: "HINO 32 Tonne Tipper", cat: "Heavy Haulage", day: 320, week: 1280, available: 0 },
  { name: "SCANIA R730 - 80 Tonne Lorry", cat: "Heavy Haulage", day: 480, week: 1920, available: 1 },
  { name: "SCANIA 32 Tonne", cat: "Heavy Haulage", day: 340, week: 1360, available: 2 },
  { name: "SCANIA 26 Tonne", cat: "Heavy Haulage", day: 300, week: 1200, available: 2 },
  { name: "CASE Tractor", cat: "Heavy Haulage", day: 220, week: 880, available: 2 },
  { name: "FORD Transit 3.5 Tonne", cat: "Heavy Haulage", day: 95, week: 380, available: 3 }
];
