# RAG Sources for Question Bank Generation

This document records the authoritative reference materials used as grounding sources for the Retrieval-Augmented Generation (RAG) pipeline that produced the 50 new multiple-choice questions added to `src/data/questionsBank.js` (ADO Work Item #3).

## Purpose

All new questions were generated using a RAG approach to ensure factual accuracy and alignment with official driver license examination content. The pipeline retrieves relevant passages from the sources listed below before generating each question, constraining outputs to verifiable, jurisdiction-appropriate facts.

## Grounding Sources

### Primary Sources

| # | Source | Publisher | Notes |
|---|--------|-----------|-------|
| 1 | [California Driver Handbook](https://www.dmv.ca.gov/portal/handbook/california-driver-handbook/) | California DMV | Road signs, right-of-way, speed limits, DUI laws |
| 2 | [Texas Driver Handbook](https://www.dps.texas.gov/section/driver-license/driver-handbooks) | Texas DPS | Vehicle safety, parking regulations, defensive driving |
| 3 | [New York State Driver's Manual](https://dmv.ny.gov/about-dmv/drivers-manual) | New York DMV | Traffic laws, signals, pedestrian rules |
| 4 | [Florida Driver's Handbook](https://www.flhsmv.gov/dmv/handbooks/fl_drivers_handbook.pdf) | Florida DHSMV | Right-of-way, school zones, highway driving |
| 5 | [FHWA Manual on Uniform Traffic Control Devices (MUTCD)](https://mutcd.fhwa.dot.gov/) | Federal Highway Administration | Authoritative source for all road sign definitions and meanings |
| 6 | [NHTSA Traffic Safety Facts](https://www.nhtsa.gov/research-data/traffic-safety-facts) | National Highway Traffic Safety Administration | DUI statistics, vehicle safety requirements |

### Secondary / Supplementary Sources

| # | Source | Publisher | Notes |
|---|--------|-----------|-------|
| 7 | [AAA Driver Improvement Program Materials](https://www.aaa.com/stop/home) | AAA | Defensive driving techniques, hazard perception |
| 8 | [AAMVA Model Driver License Manual](https://www.aamva.org/) | American Association of Motor Vehicle Administrators | Cross-state standardisation reference |

## Topic Coverage Map

The 50 new questions are distributed across topic areas as follows:

| Topic Area | Approx. Question Count | Primary Source(s) |
|---|---|---|
| Road Signs & Traffic Signals | 8–10 | MUTCD (#5), State Handbooks (#1–4) |
| Right-of-Way Rules | 8–10 | State Handbooks (#1–4) |
| Speed Limits & Safe Driving | 8–10 | State Handbooks (#1–4), NHTSA (#6) |
| Vehicle Control & Safety | 6–8 | NHTSA (#6), State Handbooks (#1–4) |
| Parking Regulations | 4–6 | State Handbooks (#1–4) |
| DUI / Driving Under the Influence Laws | 4–6 | State Handbooks (#1–4), NHTSA (#6) |
| Defensive Driving & Special Situations | 4–6 | AAA (#7), AAMVA (#8) |

## Question ID Scheme

To satisfy FR4 (no ID collisions), new questions use a sequential namespace prefixed with `Q` followed by a zero-padded integer continuing from the highest existing ID in the bank at the time of generation. ID uniqueness is validated by the test suite in `src/data/__tests__/questionsBank.test.js`.

## Validation

Every generated question was validated against the following criteria before inclusion:

1. **Schema conformance** — unique ID, non-empty question text, ≥ 4 answer options, exactly 1 correct answer (FR3).
2. **Factual grounding** — each question and its correct answer can be traced to a passage in the sources listed above.
3. **No ID collision** — automated check in `questionsBank.test.js` asserts all IDs are unique across the full bank (FR4).
4. **Scoring compatibility** — questions are consumed by the existing scoring logic in `ResultsScreen.js` with no modifications (FR7).

## Related Work Items

- **ADO Work Item #3** — Add 50 RAG-generated questions to DLPracticeTest question bank
- Branch: `feature/wf-dddf0be9-add-50-questions`
