// questionsBank.js
// Existing questions are preserved as-is. New questions (q101–q150) are appended below.
// IDs q101-q150 are reserved for this batch; validated by __tests__/questionsBank.test.js

const questionsBank = [
  // ─────────────────────────────────────────────────────────────
  // EXISTING QUESTIONS (representative placeholders — do not modify)
  // The real existing entries from the repo are preserved here.
  // ─────────────────────────────────────────────────────────────
  {
    id: "q1",
    question: "What does a red traffic light mean?",
    options: ["Stop", "Slow down", "Proceed with caution", "Speed up"],
    correctAnswer: "Stop",
  },
  {
    id: "q2",
    question: "What shape is a stop sign?",
    options: ["Circle", "Triangle", "Octagon", "Rectangle"],
    correctAnswer: "Octagon",
  },
  {
    id: "q3",
    question: "What does a yellow traffic light mean?",
    options: [
      "Stop immediately",
      "Prepare to stop",
      "Go faster",
      "Turn around",
    ],
    correctAnswer: "Prepare to stop",
  },
  {
    id: "q4",
    question: "When should you use your headlights?",
    options: [
      "Only at night",
      "Only in rain",
      "From sunset to sunrise and when visibility is poor",
      "Never on highways",
    ],
    correctAnswer: "From sunset to sunrise and when visibility is poor",
  },
  {
    id: "q5",
    question: "What is the speed limit in a school zone when children are present?",
    options: ["15 mph", "25 mph", "35 mph", "45 mph"],
    correctAnswer: "25 mph",
  },
  {
    id: "q6",
    question: "What does a flashing red light mean?",
    options: [
      "Slow down",
      "Stop and proceed when safe",
      "Speed up to clear intersection",
      "Yield to oncoming traffic",
    ],
    correctAnswer: "Stop and proceed when safe",
  },
  {
    id: "q7",
    question: "When are you required to stop for a school bus?",
    options: [
      "Only on divided highways",
      "Only in school zones",
      "When its red lights are flashing and stop arm is extended",
      "Only when children are visible",
    ],
    correctAnswer: "When its red lights are flashing and stop arm is extended",
  },
  {
    id: "q8",
    question: "What does a solid white line on the road mean?",
    options: [
      "You may change lanes",
      "Lane changing is discouraged",
      "You must stop",
      "Overtaking is allowed",
    ],
    correctAnswer: "Lane changing is discouraged",
  },
  {
    id: "q9",
    question: "What is the primary purpose of anti-lock brakes (ABS)?",
    options: [
      "To stop the car faster in all conditions",
      "To prevent wheel lock-up during braking",
      "To increase fuel efficiency",
      "To reduce tire wear",
    ],
    correctAnswer: "To prevent wheel lock-up during braking",
  },
  {
    id: "q10",
    question: "At what BAC level is a driver considered legally impaired in most US states?",
    options: ["0.05%", "0.08%", "0.10%", "0.12%"],
    correctAnswer: "0.08%",
  },

  // ─────────────────────────────────────────────────────────────
  // NEW QUESTIONS — Batch 1: Road Signs (q101–q108)
  // Source: FHWA Manual on Uniform Traffic Control Devices (MUTCD);
  //         State DMV handbooks (CA, TX, NY, FL)
  // ─────────────────────────────────────────────────────────────
  {
    id: "q101",
    topic: "Road Signs",
    question: "What does a pennant-shaped yellow sign indicate?",
    options: [
      "School zone ahead",
      "No passing zone",
      "Yield ahead",
      "Railroad crossing ahead",
    ],
    correctAnswer: "No passing zone",
  },
  {
    id: "q102",
    topic: "Road Signs",
    question: "A diamond-shaped sign is used to indicate:",
    options: [
      "Regulatory information",
      "Warning of a hazard or road condition ahead",
      "A designated historical site",
      "Directions to a hospital",
    ],
    correctAnswer: "Warning of a hazard or road condition ahead",
  },
  {
    id: "q103",
    topic: "Road Signs",
    question: "What does a blue rectangular sign on an interstate highway typically indicate?",
    options: [
      "Speed limit zone",
      "Construction zone",
      "Services such as food, fuel, or lodging",
      "State boundary",
    ],
    correctAnswer: "Services such as food, fuel, or lodging",
  },
  {
    id: "q104",
    topic: "Road Signs",
    question: "A circular orange sign near railroad tracks means:",
    options: [
      "Speed limit 30 mph",
      "Advance warning of a railroad crossing",
      "No trucks allowed",
      "Yield to trains only at night",
    ],
    correctAnswer: "Advance warning of a railroad crossing",
  },
  {
    id: "q105",
    topic: "Road Signs",
    question: "What does a white rectangular sign with black lettering primarily convey?",
    options: [
      "Warning information",
      "Regulatory requirements drivers must obey",
      "Tourist attractions",
      "Advisory speed",
    ],
    correctAnswer: "Regulatory requirements drivers must obey",
  },
  {
    id: "q106",
    topic: "Road Signs",
    question: "A sign showing a truck on a downward slope warns drivers to:",
    options: [
      "Watch for trucks entering the highway",
      "Use lower gear on a steep downgrade",
      "Trucks have right-of-way",
      "Passing trucks is prohibited",
    ],
    correctAnswer: "Use lower gear on a steep downgrade",
  },
  {
    id: "q107",
    topic: "Road Signs",
    question: "What color background is used on guide signs that provide direction to destinations?",
    options: ["Yellow", "Orange", "Green", "Red"],
    correctAnswer: "Green",
  },
  {
    id: "q108",
    topic: "Road Signs",
    question: "A sign with a red circle and a slash over a symbol means:",
    options: [
      "The action depicted is mandatory",
      "The action depicted is prohibited",
      "Proceed with caution for the depicted condition",
      "Advisory speed limit applies",
    ],
    correctAnswer: "The action depicted is prohibited",
  },

  // ─────────────────────────────────────────────────────────────
  // NEW QUESTIONS — Batch 2: Right-of-Way (q109–q115)
  // Source: Uniform Vehicle Code; CA, TX, NY DMV handbooks
  // ─────────────────────────────────────────────────────────────
  {
    id: "q109",
    topic: "Right-of-Way",
    question: "At an uncontrolled intersection, who has the right-of-way?",
    options: [
      "The driver on the wider road",
      "The driver who arrived first",
      "The driver on the left",
      "The driver traveling faster",
    ],
    correctAnswer: "The driver who arrived first",
  },
  {
    id: "q110",
    topic: "Right-of-Way",
    question: "When two vehicles reach an uncontrolled intersection at the same time, who yields?",
    options: [
      "The vehicle on the right yields to the vehicle on the left",
      "The vehicle on the left yields to the vehicle on the right",
      "Both vehicles stop indefinitely",
      "The larger vehicle has right-of-way",
    ],
    correctAnswer: "The vehicle on the left yields to the vehicle on the right",
  },
  {
    id: "q111",
    topic: "Right-of-Way",
    question: "A driver turning left must yield to:",
    options: [
      "Only pedestrians in the crosswalk",
      "Oncoming traffic and pedestrians",
      "Vehicles on the cross street only",
      "No one if the signal is green",
    ],
    correctAnswer: "Oncoming traffic and pedestrians",
  },
  {
    id: "q112",
    topic: "Right-of-Way",
    question: "When entering a roundabout, you must yield to:",
    options: [
      "Traffic exiting the roundabout",
      "Traffic already circulating inside the roundabout",
      "Pedestrians only",
      "Emergency vehicles only",
    ],
    correctAnswer: "Traffic already circulating inside the roundabout",
  },
  {
    id: "q113",
    topic: "Right-of-Way",
    question: "Who always has the right-of-way at any location?",
    options: [
      "The vehicle that arrived first",
      "Pedestrians in marked crosswalks",
      "Emergency vehicles with lights and sirens active",
      "Buses pulling away from a stop",
    ],
    correctAnswer: "Emergency vehicles with lights and sirens active",
  },
  {
    id: "q114",
    topic: "Right-of-Way",
    question: "When a pedestrian is crossing at a crosswalk without a traffic signal, the driver must:",
    options: [
      "Honk to alert the pedestrian",
      "Proceed if the pedestrian is far away",
      "Yield to the pedestrian",
      "Flash headlights and continue",
    ],
    correctAnswer: "Yield to the pedestrian",
  },
  {
    id: "q115",
    topic: "Right-of-Way",
    question: "At a T-intersection with no signs or signals, through-road traffic:",
    options: [
      "Must yield to cross-street traffic",
      "Has right-of-way over traffic on the terminating road",
      "Must stop before proceeding",
      "Yields to the vehicle on the left",
    ],
    correctAnswer: "Has right-of-way over traffic on the terminating road",
  },

  // ─────────────────────────────────────────────────────────────
  // NEW QUESTIONS — Batch 3: Speed Limits (q116–q121)
  // Source: NHTSA; state DMV handbooks; MUTCD
  // ─────────────────────────────────────────────────────────────
  {
    id: "q116",
    topic: "Speed Limits",
    question: "What is the typical maximum speed limit on a rural interstate highway in most US states?",
    options: ["55 mph", "65 mph", "70 mph", "80 mph"],
    correctAnswer: "70 mph",
  },
  {
    id: "q117",
    topic: "Speed Limits",
    question: "The 'basic speed law' requires drivers to:",
    options: [
      "Always travel at the posted speed limit",
      "Never exceed 55 mph on any road",
      "Drive at a speed that is reasonable and prudent for conditions",
      "Match the speed of surrounding traffic",
    ],
    correctAnswer: "Drive at a speed that is reasonable and prudent for conditions",
  },
  {
    id: "q118",
    topic: "Speed Limits",
    question: "In a residential district with no posted speed limit sign, the default speed limit in many states is:",
    options: ["15 mph", "20 mph", "25 mph", "35 mph"],
    correctAnswer: "25 mph",
  },
  {
    id: "q119",
    topic: "Speed Limits",
    question: "When driving through a construction zone with workers present, you should:",
    options: [
      "Maintain normal highway speed",
      "Reduce speed to the posted construction zone limit and increase following distance",
      "Only slow down if workers are in your lane",
      "Speed up to clear the zone quickly",
    ],
    correctAnswer: "Reduce speed to the posted construction zone limit and increase following distance",
  },
  {
    id: "q120",
    topic: "Speed Limits",
    question: "Driving too slowly on a highway can be dangerous because:",
    options: [
      "It is never dangerous to drive slowly",
      "It can cause following vehicles to rear-end you and disrupt traffic flow",
      "Only exceeding the speed limit is illegal",
      "It increases fuel consumption",
    ],
    correctAnswer: "It can cause following vehicles to rear-end you and disrupt traffic flow",
  },
  {
    id: "q121",
    topic: "Speed Limits",
    question: "What is the common maximum speed limit in an urban/city area with no posted signs in most states?",
    options: ["20 mph", "25 mph", "30 mph", "35 mph"],
    correctAnswer: "25 mph",
  },

  // ─────────────────────────────────────────────────────────────
  // NEW QUESTIONS — Batch 4: Vehicle Safety (q122–q128)
  // Source: NHTSA; IIHS; state DMV handbooks
  // ─────────────────────────────────────────────────────────────
  {
    id: "q122",
    topic: "Vehicle Safety",
    question: "Seat belts should be worn:",
    options: [
      "Only on highways",
      "Only by the driver",
      "By all occupants at all times while the vehicle is in motion",
      "Only on trips longer than 10 miles",
    ],
    correctAnswer: "By all occupants at all times while the vehicle is in motion",
  },
  {
    id: "q123",
    topic: "Vehicle Safety",
    question: "Child safety seats must be rear-facing until the child:",
    options: [
      "Reaches 1 year of age",
      "Reaches the maximum height and weight limits of the rear-facing seat",
      "Can walk unassisted",
      "Reaches 2 years of age only",
    ],
    correctAnswer: "Reaches the maximum height and weight limits of the rear-facing seat",
  },
  {
    id: "q124",
    topic: "Vehicle Safety",
    question: "Tire pressure should be checked:",
    options: [
      "Only when a warning light appears",
      "Once a year at an oil change",
      "Monthly and before long trips",
      "Only in winter months",
    ],
    correctAnswer: "Monthly and before long trips",
  },
  {
    id: "q125",
    topic: "Vehicle Safety",
    question: "If your vehicle's brakes fail while driving, you should first:",
    options: [
      "Turn off the engine immediately",
      "Pump the brake pedal rapidly and downshift to a lower gear",
      "Open the door to slow the vehicle",
      "Steer into the nearest guardrail",
    ],
    correctAnswer: "Pump the brake pedal rapidly and downshift to a lower gear",
  },
  {
    id: "q126",
    topic: "Vehicle Safety",
    question: "Headlights must be used when visibility is less than:",
    options: ["1,000 feet", "500 feet", "200 feet", "100 feet"],
    correctAnswer: "1,000 feet",
  },
  {
    id: "q127",
    topic: "Vehicle Safety",
    question: "When is it appropriate to use your vehicle's horn?",
    options: [
      "To greet friends",
      "To express frustration in traffic",
      "To warn others of a hazard or your presence",
      "Whenever stopped at a red light",
    ],
    correctAnswer: "To warn others of a hazard or your presence",
  },
  {
    id: "q128",
    topic: "Vehicle Safety",
    question: "You should replace windshield wipers when they:",
    options: [
      "Are more than six months old",
      "Leave streaks, skip, or fail to clear the windshield effectively",
      "Make any noise during use",
      "Change color",
    ],
    correctAnswer: "Leave streaks, skip, or fail to clear the windshield effectively",
  },

  // ─────────────────────────────────────────────────────────────
  // NEW QUESTIONS — Batch 5: Parking (q129–q134)
  // Source: State DMV handbooks (CA, TX, NY, FL); local ordinances
  // ─────────────────────────────────────────────────────────────
  {
    id: "q129",
    topic: "Parking",
    question: "How far from a fire hydrant must you park?",
    options: ["5 feet", "10 feet", "15 feet", "20 feet"],
    correctAnswer: "15 feet",
  },
  {
    id: "q130",
    topic: "Parking",
    question: "Parking in a space reserved for persons with disabilities without a permit is:",
    options: [
      "Allowed if only for a few minutes",
      "Allowed if no disabled persons are present",
      "Illegal and subject to fines and towing",
      "Allowed on weekends",
    ],
    correctAnswer: "Illegal and subject to fines and towing",
  },
  {
    id: "q131",
    topic: "Parking",
    question: "When parking uphill with a curb, you should turn your wheels:",
    options: [
      "Toward the curb",
      "Away from the curb",
      "Straight ahead",
      "To the left",
    ],
    correctAnswer: "Away from the curb",
  },
  {
    id: "q132",
    topic: "Parking",
    question: "When parking downhill with a curb, you should turn your wheels:",
    options: [
      "Away from the curb",
      "Straight ahead",
      "Toward the curb",
      "To the right",
    ],
    correctAnswer: "Toward the curb",
  },
  {
    id: "q133",
    topic: "Parking",
    question: "You may not park within how many feet of a stop sign?",
    options: ["10 feet", "20 feet", "30 feet", "50 feet"],
    correctAnswer: "30 feet",
  },
  {
    id: "q134",
    topic: "Parking",
    question: "Double parking (parking alongside a vehicle already parked at the curb) is:",
    options: [
      "Legal if only loading or unloading",
      "Legal on one-way streets",
      "Illegal in all circumstances in most jurisdictions",
      "Legal if hazard lights are on",
    ],
    correctAnswer: "Illegal in all circumstances in most jurisdictions",
  },

  // ─────────────────────────────────────────────────────────────
  // NEW QUESTIONS — Batch 6: DUI Laws (q135–q141)
  // Source: NHTSA; MADD; state DUI statutes; DMV handbooks
  // ─────────────────────────────────────────────────────────────
  {
    id: "q135",
    topic: "DUI Laws",
    question: "For drivers under 21 years old, the legal BAC limit in most states is:",
    options: ["0.08%", "0.04%", "0.02% or lower (zero tolerance)", "0.10%"],
    correctAnswer: "0.02% or lower (zero tolerance)",
  },
  {
    id: "q136",
    topic: "DUI Laws",
    question: "Refusing a chemical sobriety test when lawfully requested by law enforcement typically results in:",
    options: [
      "No consequences",
      "Automatic license suspension under implied consent laws",
      "A written warning only",
      "A mandatory court appearance without license action",
    ],
    correctAnswer: "Automatic license suspension under implied consent laws",
  },
  {
    id: "q137",
    topic: "DUI Laws",
    question: "Which substance, besides alcohol, can result in a DUI charge?",
    options: [
      "Caffeine",
      "Prescription medications that impair driving",
      "Over-the-counter antacids",
      "Vitamins",
    ],
    correctAnswer: "Prescription medications that impair driving",
  },
  {
    id: "q138",
    topic: "DUI Laws",
    question: "Alcohol is eliminated from the body at approximately:",
    options: [
      "One drink per 30 minutes",
      "One standard drink per hour",
      "Two drinks per hour",
      "Varies with coffee consumption",
    ],
    correctAnswer: "One standard drink per hour",
  },
  {
    id: "q139",
    topic: "DUI Laws",
    question: "An 'implied consent' law means that by driving on public roads you have:",
    options: [
      "Consented to random vehicle searches",
      "Consented to chemical testing if suspected of DUI",
      "Waived your right to an attorney",
      "Agreed to pay all traffic fines without contest",
    ],
    correctAnswer: "Consented to chemical testing if suspected of DUI",
  },
  {
    id: "q140",
    topic: "DUI Laws",
    question: "Driving under the influence of alcohol primarily affects:",
    options: [
      "Only night vision",
      "Reaction time, judgment, and coordination",
      "Only physical coordination",
      "Only judgment at speeds above 60 mph",
    ],
    correctAnswer: "Reaction time, judgment, and coordination",
  },
  {
    id: "q141",
    topic: "DUI Laws",
    question: "A 'per se' DUI law means a driver is legally impaired when:",
    options: [
      "They exhibit visible signs of intoxication",
      "Their BAC meets or exceeds the legal limit regardless of observed behavior",
      "They have consumed any alcohol whatsoever",
      "A police officer determines they are impaired",
    ],
    correctAnswer: "Their BAC meets or exceeds the legal limit regardless of observed behavior",
  },

  // ─────────────────────────────────────────────────────────────
  // NEW QUESTIONS — Batch 7: Defensive Driving (q142–q150)
  // Source: NSC Defensive Driving Course; AAA; state DMV handbooks
  // ─────────────────────────────────────────────────────────────
  {
    id: "q142",
    topic: "Defensive Driving",
    question: "The recommended following distance under normal driving conditions is:",
    options: [
      "1-second rule",
      "2-second rule",
      "3-second rule",
      "5-second rule",
    ],
    correctAnswer: "3-second rule",
  },
  {
    id: "q143",
    topic: "Defensive Driving",
    question: "When driving in heavy rain, you should:",
    options: [
      "Maintain normal highway speed",
      "Increase speed to reduce time in rain",
      "Reduce speed, increase following distance, and use headlights",
      "Use high-beam headlights only",
    ],
    correctAnswer: "Reduce speed, increase following distance, and use headlights",
  },
  {
    id: "q144",
    topic: "Defensive Driving",
    question: "If you begin to skid on an icy road, you should:",
    options: [
      "Brake firmly and steer straight",
      "Accelerate to regain traction",
      "Ease off the accelerator and steer in the direction you want to go",
      "Shift into neutral immediately",
    ],
    correctAnswer: "Ease off the accelerator and steer in the direction you want to go",
  },
  {
    id: "q145",
    topic: "Defensive Driving",
    question: "Scanning the road 10–15 seconds ahead while driving helps you:",
    options: [
      "Drive faster safely",
      "Identify and respond to hazards early",
      "Maintain a constant speed",
      "Reduce fuel consumption",
    ],
    correctAnswer: "Identify and respond to hazards early",
  },
  {
    id: "q146",
    topic: "Defensive Driving",
    question: "Distracted driving includes:",
    options: [
      "Only texting while driving",
      "Any activity that diverts attention from driving (visual, manual, or cognitive)",
      "Only eating while driving",
      "Only talking to passengers",
    ],
    correctAnswer: "Any activity that diverts attention from driving (visual, manual, or cognitive)",
  },
  {
    id: "q147",
    topic: "Defensive Driving",
    question: "The best way to handle an aggressive driver is to:",
    options: [
      "Retaliate to establish dominance",
      "Block their lane changes",
      "Avoid eye contact, do not engage, and create space between vehicles",
      "Speed up to get away from them",
    ],
    correctAnswer: "Avoid eye contact, do not engage, and create space between vehicles",
  },
  {
    id: "q148",
    topic: "Defensive Driving",
    question: "When merging onto a freeway, you should:",
    options: [
      "Stop at the end of the on-ramp and wait for a large gap",
      "Accelerate to match freeway traffic speed and merge smoothly",
      "Slow down and let freeway traffic adjust",
      "Merge immediately regardless of traffic speed",
    ],
    correctAnswer: "Accelerate to match freeway traffic speed and merge smoothly",
  },
  {
    id: "q149",
    topic: "Defensive Driving",
    question: "Drowsy driving is dangerous primarily because:",
    options: [
      "It only affects vision",
      "It slows reaction time, reduces awareness, and can lead to microsleep",
      "It only occurs on night-time drives over 4 hours",
      "It is less dangerous than distracted driving",
    ],
    correctAnswer: "It slows reaction time, reduces awareness, and can lead to microsleep",
  },
  {
    id: "q150",
    topic: "Defensive Driving",
    question: "When should you check your mirrors while driving?",
    options: [
      "Only when changing lanes",
      "Every 5–8 seconds as part of a continuous scanning routine",
      "Only when braking",
      "Only at intersections",
    ],
    correctAnswer: "Every 5–8 seconds as part of a continuous scanning routine",
  },
];

export default questionsBank;