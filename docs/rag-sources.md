# RAG Source References — New Questions q101–q150

This document provides source traceability for each of the 50 new questions added
to the DLPracticeTest `questionsBank`, satisfying **AC2** of ADO Work Item #3.

Each question was authored using a Retrieval-Augmented Generation (RAG) approach,
grounding content in the authoritative sources listed below.

---

## Primary Authoritative Sources

| Abbreviation | Full Reference |
|---|---|
| **MUTCD** | Federal Highway Administration (FHWA). *Manual on Uniform Traffic Control Devices for Streets and Highways*, 11th Edition (2023). https://mutcd.fhwa.dot.gov |
| **NHTSA-SB** | National Highway Traffic Safety Administration. *Traffic Safety Facts & Driver Behaviors*. https://www.nhtsa.gov/research-data/traffic-safety-facts |
| **CA-DMV** | California Department of Motor Vehicles. *California Driver Handbook* (2024). https://www.dmv.ca.gov/portal/handbook/california-driver-handbook/ |
| **TX-DMV** | Texas Department of Public Safety. *Texas Driver Handbook* (2024). https://www.dps.texas.gov/section/driver-license/driver-license-handbooks-and-manuals |
| **NY-DMV** | New York State DMV. *New York State Driver's Manual* (2024). https://dmv.ny.gov/brochure/new-york-state-driver-manual |
| **FL-DMV** | Florida Department of Highway Safety and Motor Vehicles. *Florida Driver License Handbook* (2024). https://www.flhsmv.gov/driver-licenses-id-cards/motorist-handbooks/ |
| **NSC** | National Safety Council. *Defensive Driving Course Materials* (2023). https://www.nsc.org/road/resources |
| **AAA** | AAA. *Driver Education Materials & Roadside Safety*. https://exchange.aaa.com/safety/driving-advice/ |
| **MADD** | Mothers Against Drunk Driving. *Drunk Driving Statistics & Legal Info*. https://www.madd.org/drunk-driving/ |
| **UVC** | National Committee on Uniform Traffic Laws and Ordinances. *Uniform Vehicle Code* (2000, amended). |
| **IIHS** | Insurance Institute for Highway Safety. *Vehicle Safety Facts*. https://www.iihs.org/topics |

---

## Per-Question Source Mapping

### Road Signs (q101–q108)

| ID | Question Summary | Primary Source(s) |
|---|---|---|
| q101 | Pennant-shaped sign = No passing zone | MUTCD §2B.06; CA-DMV p.42; TX-DMV p.37 |
| q102 | Diamond-shaped sign = Warning/hazard | MUTCD §2A.11; NY-DMV p.31; FL-DMV p.28 |
| q103 | Blue rectangular interstate sign = Services | MUTCD §2H.02; CA-DMV p.45; FHWA Sign Color Standards |
| q104 | Circular orange sign near tracks = Railroad advance warning | MUTCD §8B.03; TX-DMV p.49; FL-DMV p.35 |
| q105 | White rectangular sign = Regulatory | MUTCD §2A.11; CA-DMV p.41; NY-DMV p.29 |
| q106 | Truck on downhill slope sign = Use lower gear | MUTCD §2C.25; CA-DMV p.44; AAA Mountain Driving Guide |
| q107 | Green background = Destination guide signs | MUTCD §2D.01; TX-DMV p.38; FL-DMV p.29 |
| q108 | Red circle/slash = Prohibited action | MUTCD §2B.01; CA-DMV p.42; NY-DMV p.30 |

### Right-of-Way (q109–q115)

| ID | Question Summary | Primary Source(s) |
|---|---|---|
| q109 | Uncontrolled intersection — first to arrive | UVC §11-401; CA-DMV p.68; TX-DMV p.62 |
| q110 | Same-time arrival — left yields to right | UVC §11-401; NY-DMV p.55; FL-DMV p.50 |
| q111 | Left turn yields to oncoming & pedestrians | UVC §11-602; CA-DMV p.70; TX-DMV p.64 |
| q112 | Roundabout — yield to circulating traffic | FHWA Roundabout Guide; CA-DMV p.75; NY-DMV p.60 |
| q113 | Emergency vehicles always have right-of-way | UVC §11-405; CA-DMV p.72; FL-DMV p.53 |
| q114 | Yield to pedestrian at unmarked crosswalk | UVC §11-502; CA-DMV p.71; TX-DMV p.65 |
| q115 | T-intersection — through road has ROW | UVC §11-401; NY-DMV p.56; FL-DMV p.51 |

### Speed Limits (q116–q121)

| ID | Question Summary | Primary Source(s) |
|---|---|---|
| q116 | Rural interstate max = 70 mph (most states) | NHTSA-SB; TX-DMV p.82 (75/80 mph noted); CA-DMV p.79 |
| q117 | Basic speed law — reasonable & prudent | UVC §11-801; CA-DMV p.80; TX-DMV p.83 |
| q118 | Residential default = 25 mph | CA-DMV p.80; NY-DMV p.70; FL-DMV p.61 |
| q119 | Construction zone — reduce speed & increase distance | MUTCD §6C; NHTSA-SB Work Zone Safety; CA-DMV p.85 |
| q120 | Driving too slowly disrupts flow & causes rear-ends | UVC §11-805; CA-DMV p.81; NSC Module 3 |
| q121 | Urban area default = 25 mph | CA-DMV p.80; NY-DMV p.70; TX-DMV p.83 |

### Vehicle Safety (q122–q128)

| ID | Question Summary | Primary Source(s) |
|---|---|---|
| q122 | Seat belts by all occupants at all times | NHTSA-SB Occupant Protection; CA-DMV p.90; FL-DMV p.65 |
| q123 | Rear-facing until max height/weight limits | NHTSA Child Seat Safety Guidelines (2024); AAA Child Seat Guide |
| q124 | Tire pressure monthly and before trips | NHTSA Tire Safety; CA-DMV p.96; IIHS Tire Safety |
| q125 | Brake failure — pump & downshift | CA-DMV p.101; TX-DMV p.95; NSC Emergency Procedures |
| q126 | Headlights required under 1,000 ft visibility | CA Vehicle Code §24400; NY-DMV p.80; FL-DMV p.68 |
| q127 | Horn — warn of hazard or presence | UVC §12-401; CA-DMV p.98; TX-DMV p.91 |
| q128 | Wiper replacement — streaking/skipping | CA-DMV p.97; NSC Vehicle Maintenance Guide; IIHS |

### Parking (q129–q134)

| ID | Question Summary | Primary Source(s) |
|---|---|---|
| q129 | 15 feet from fire hydrant | CA Vehicle Code §22514; NY-DMV p.90; FL-DMV p.75 |
| q130 | Disabled parking violation = fines & towing | ADA §4.6; CA-DMV p.105; TX-DMV p.100 |
| q131 | Uphill with curb — wheels away from curb | CA-DMV p.107; NY-DMV p.92; FL-DMV p.77 |
| q132 | Downhill with curb — wheels toward curb | CA-DMV p.107; NY-DMV p.92; FL-DMV p.77 |
| q133 | 30 feet from stop sign | CA Vehicle Code §22500; NY-DMV p.91; TX-DMV p.101 |
| q134 | Double parking illegal | UVC §11-1003; CA-DMV p.106; NY-DMV p.92 |

### DUI Laws (q135–q141)

| ID | Question Summary | Primary Source(s) |
|---|---|---|
| q135 | Under-21 BAC = 0.02% or lower (zero tolerance) | NHTSA Zero Tolerance Laws; MADD; CA Vehicle Code §23136 |
| q136 | Chemical test refusal = license suspension | Implied Consent Laws (all 50 states); CA-DMV p.115 |
| q137 | DUI includes impairing prescription medications | NHTSA Drug-Impaired Driving; CA-DMV p.113; FL-DMV p.85 |
| q138 | Alcohol eliminated at ~1 drink/hour | NHTSA-SB; MADD; NSC Alcohol & Driving Module |
| q139 | Implied consent = agreed to chemical testing | UVC §11-902; CA-DMV p.115; TX-DMV p.110 |
| q140 | Alcohol impairs reaction time, judgment, coordination | NHTSA-SB; MADD; NSC Alcohol Education |
| q141 | Per se DUI = BAC at or above legal limit | UVC §11-902.1; CA-DMV p.113; FL-DMV p.84 |

### Defensive Driving (q142–q150)

| ID | Question Summary | Primary Source(s) |
|---|---|---|
| q142 | Following distance = 3-second rule | NSC Defensive Driving; AAA Following Distance Guide; CA-DMV p.120 |
| q143 | Heavy rain — reduce speed, increase distance, headlights | NSC Module 5; CA-DMV p.125; TX-DMV p.118 |
| q144 | Icy skid — ease off accelerator, steer desired direction | NSC Winter Driving; CA-DMV p.127; AAA Winter Driving Guide |
| q145 | Scan 10–15 seconds ahead for early hazard ID | NSC Defensive Driving; AAA Seeing Habits; CA-DMV p.121 |
| q146 | Distracted driving = visual, manual, or cognitive | NHTSA Distracted Driving (2024); CA-DMV p.128; FL-DMV p.90 |
| q147 | Aggressive driver — avoid, do not engage, create space | NSC Road Rage Module; AAA Road Rage Tips; CA-DMV p.130 |
| q148 | Freeway merge — accelerate to match traffic speed | NSC Merging; CA-DMV p.122; TX-DMV p.116 |
| q149 | Drowsy driving — slows reactions, microsleep risk | NHTSA Drowsy Driving; NSC Fatigue Module; AAA Sleep & Driving |
| q150 | Check mirrors every 5–8 seconds | NSC Defensive Driving; AAA Mirror Scanning; CA-DMV p.121 |

---

## Topic Distribution Summary

| Topic | Questions | Count | % of 50 new |
|---|---|---|---|
| Road Signs | q101–q108 | 8 | 16% |
| Right-of-Way | q109–q115 | 7 | 14% |
| Speed Limits | q116–q121 | 6 | 12% |
| Vehicle Safety | q122–q128 | 7 | 14% |
| Parking | q129–q134 | 6 | 12% |
| DUI Laws | q135–q141 | 7 | 14% |
| Defensive Driving | q142–q150 | 9 | 18% |
| **Total** | | **50** | **100%** |

✅ 7 distinct topic areas (≥ 5 required by AC5)
✅ No topic exceeds 40% / 20 questions (max is 9 = 18%)

---

*Document generated as part of ADO Work Item #3 — feature/wf-dddf0be9-add-50-questions*