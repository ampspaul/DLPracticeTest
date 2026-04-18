/**
 * Driver License Practice Test Questions
 * Total: 50 new questions + existing questions
 */

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number; // Index of correct answer (0-3)
  category: string;
}

export const QUESTIONS: Question[] = [
  // New Questions (51-100)
  {
    id: "q51",
    text: "What does a solid yellow line on your side of the road mean?",
    options: ["No passing allowed", "Passing is permitted with caution", "Parking is allowed", "Speed limit decreases"],
    correctAnswer: 0,
    category: "Road Markings"
  },
  {
    id: "q52",
    text: "When should you use your headlights during the day?",
    options: ["Never during day", "During fog, rain, or snow", "Only at sunrise/sunset", "Always"],
    correctAnswer: 1,
    category: "Lighting"
  },
  {
    id: "q53",
    text: "What is the proper following distance on a highway at 60 mph?",
    options: ["3 seconds", "5 seconds", "1 second", "10 seconds"],
    correctAnswer: 1,
    category: "Safe Driving"
  },
  {
    id: "q54",
    text: "When you see a pedestrian crossing against the signal, you should:",
    options: ["Honk and proceed", "Slow down and be prepared to stop", "Speed up to pass first", "Flash your lights"],
    correctAnswer: 1,
    category: "Pedestrian Safety"
  },
  {
    id: "q55",
    text: "What does a red octagon sign indicate?",
    options: ["Speed limit", "Yield ahead", "Stop required", "One way traffic"],
    correctAnswer: 2,
    category: "Road Signs"
  },
  {
    id: "q56",
    text: "If your brakes fail, you should:",
    options: ["Use the horn constantly", "Shift to neutral", "Use emergency brake gradually and look for escape route", "Turn off the engine"],
    correctAnswer: 2,
    category: "Emergency Procedures"
  },
  {
    id: "q57",
    text: "What is the speed limit in a residential area unless otherwise posted?",
    options: ["25 mph", "45 mph", "55 mph", "35 mph"],
    correctAnswer: 0,
    category: "Speed Limits"
  },
  {
    id: "q58",
    text: "When turning left at an intersection with no signal, you should:",
    options: ["Wait for pedestrians to clear", "Yield to oncoming traffic", "Signal and check mirrors before turning", "All of the above"],
    correctAnswer: 3,
    category: "Turning"
  },
  {
    id: "q59",
    text: "What should you do if you feel drowsy while driving?",
    options: ["Turn up the radio", "Open the windows", "Pull over and rest or switch drivers", "Drink coffee"],
    correctAnswer: 2,
    category: "Safe Driving"
  },
  {
    id: "q60",
    text: "A yield sign is what shape?",
    options: ["Octagon", "Triangle", "Diamond", "Rectangle"],
    correctAnswer: 1,
    category: "Road Signs"
  },
  {
    id: "q61",
    text: "When parking uphill on a street with a curb, your wheels should be:",
    options: ["Straight ahead", "Turned toward the street", "Turned toward the curb", "In any direction"],
    correctAnswer: 2,
    category: "Parking"
  },
  {
    id: "q62",
    text: "What is the minimum age to obtain a driver's license in most states?",
    options: ["14 years old", "15 years old", "16 years old", "18 years old"],
    correctAnswer: 2,
    category: "Licensing"
  },
  {
    id: "q63",
    text: "When should you NOT use cruise control?",
    options: ["On highways", "In rain or slippery conditions", "At night", "On smooth roads"],
    correctAnswer: 1,
    category: "Vehicle Systems"
  },
  {
    id: "q64",
    text: "What does a flashing red light mean at an intersection?",
    options: ["Slow down and be cautious", "Come to a complete stop before proceeding", "Prepare to stop", "Pedestrians have the right of way"],
    correctAnswer: 1,
    category: "Traffic Signals"
  },
  {
    id: "q65",
    text: "How much space should you leave when following a motorcycle?",
    options: ["1 car length", "2 car lengths", "3 car lengths", "4 car lengths"],
    correctAnswer: 2,
    category: "Safe Driving"
  },
  {
    id: "q66",
    text: "What is the blood alcohol concentration limit for drivers under 21?",
    options: ["0.08%", "0.04%", "0.02%", "Any amount"],
    correctAnswer: 2,
    category: "DUI/DWI"
  },
  {
    id: "q67",
    text: "When entering a highway, you should:",
    options: ["Stop completely at the merge point", "Accelerate to match traffic speed", "Flash your lights to signal", "Keep a steady speed"],
    correctAnswer: 1,
    category: "Highway Driving"
  },
  {
    id: "q68",
    text: "What does a white diamond-shaped sign indicate?",
    options: ["Warning", "Regulation", "Information", "Direction"],
    correctAnswer: 0,
    category: "Road Signs"
  },
  {
    id: "q69",
    text: "How often should you check your mirrors while driving?",
    options: ["Every 5-8 seconds", "Every 10 seconds", "Only when changing lanes", "Constantly"],
    correctAnswer: 0,
    category: "Safe Driving"
  },
  {
    id: "q70",
    text: "What should you do if your vehicle starts to skid?",
    options: ["Brake hard immediately", "Steer in direction of skid and ease off accelerator", "Turn wheels sharply", "Close eyes and brace"],
    correctAnswer: 1,
    category: "Emergency Procedures"
  },
  {
    id: "q71",
    text: "A broken white line means:",
    options: ["Passing not allowed", "Passing allowed with caution", "No passing allowed ever", "Parking allowed"],
    correctAnswer: 1,
    category: "Road Markings"
  },
  {
    id: "q72",
    text: "What is the proper way to use a roundabout?",
    options: ["Always have right of way", "Yield to traffic already in roundabout", "Come to complete stop", "Speed up to enter"],
    correctAnswer: 1,
    category: "Intersections"
  },
  {
    id: "q73",
    text: "When is it permissible to block a crosswalk?",
    options: ["To pick up passengers", "Never", "In an emergency", "When traffic is light"],
    correctAnswer: 1,
    category: "Pedestrian Safety"
  },
  {
    id: "q74",
    text: "What should you do if you see a school bus with red flashing lights?",
    options: ["Slow down and proceed carefully", "Come to complete stop", "Honk to alert the bus", "Pass if possible"],
    correctAnswer: 1,
    category: "School Buses"
  },
  {
    id: "q75",
    text: "The legal limit for blood alcohol concentration for drivers 21+ is:",
    options: ["0.04%", "0.08%", "0.10%", "0.12%"],
    correctAnswer: 1,
    category: "DUI/DWI"
  },
  {
    id: "q76",
    text: "What does tapping your brake lights do?",
    options: ["Alerts drivers behind you that you're slowing", "Increases brake effectiveness", "Flushes brake fluid", "Adjusts brake pressure"],
    correctAnswer: 0,
    category: "Vehicle Signaling"
  },
  {
    id: "q77",
    text: "When changing lanes, you should:",
    options: ["Check mirrors and blind spots", "Signal before moving", "Look both ways", "All of the above"],
    correctAnswer: 3,
    category: "Lane Changes"
  },
  {
    id: "q78",
    text: "What is the most common cause of accidents?",
    options: ["Mechanical failure", "Speeding", "Driver error", "Poor road conditions"],
    correctAnswer: 2,
    category: "Accident Prevention"
  },
  {
    id: "q79",
    text: "How should you handle an intersection with four-way stop signs?",
    options: ["First to arrive goes first", "Largest vehicle goes first", "Yield to right if arriving simultaneously", "Everyone goes at once"],
    correctAnswer: 2,
    category: "Intersections"
  },
  {
    id: "q80",
    text: "What is the safest way to use your phone while driving?",
    options: ["Hands-free device", "In your hand briefly", "At red lights", "Not at all"],
    correctAnswer: 3,
    category: "Distracted Driving"
  },
  {
    id: "q81",
    text: "How long should you let your vehicle warm up in winter?",
    options: ["30 seconds before driving carefully", "5 minutes", "10 minutes", "The entire drive"],
    correctAnswer: 0,
    category: "Winter Driving"
  },
  {
    id: "q82",
    text: "What is hydroplaning?",
    options: ["Taking water from a well", "When tires lose grip on wet roads", "Driving through a puddle", "A type of boat"],
    correctAnswer: 1,
    category: "Weather Conditions"
  },
  {
    id: "q83",
    text: "When parking on a hill without a curb, you should turn your wheels:",
    options: ["Straight", "To the right", "To the left into traffic", "In either direction"],
    correctAnswer: 2,
    category: "Parking"
  },
  {
    id: "q84",
    text: "What does a green arrow traffic signal mean?",
    options: ["Look both ways before going", "Protected left turn", "Caution advised", "You have the right of way"],
    correctAnswer: 1,
    category: "Traffic Signals"
  },
  {
    id: "q85",
    text: "The safest place for an infant in a vehicle is:",
    options: ["Front passenger seat", "Back seat, center position", "Back seat, rear-facing car seat", "Driver's lap"],
    correctAnswer: 2,
    category: "Passengers"
  },
  {
    id: "q86",
    text: "What should you do if you're being tailgated?",
    options: ["Brake suddenly", "Speed up", "Maintain speed and distance, let them pass", "Flash your lights"],
    correctAnswer: 2,
    category: "Safe Driving"
  },
  {
    id: "q87",
    text: "A yellow light means:",
    options: ["Stop if possible", "Go as fast as possible", "Prepare to stop", "Slow down and pass"],
    correctAnswer: 0,
    category: "Traffic Signals"
  },
  {
    id: "q88",
    text: "How should you react if another driver cuts you off?",
    options: ["Chase them to teach a lesson", "Stay calm and avoid confrontation", "Honk and flash lights aggressively", "Call police immediately"],
    correctAnswer: 1,
    category: "Road Rage"
  },
  {
    id: "q89",
    text: "What is the proper headlight beam pattern on a dark highway?",
    options: ["Always use high beams", "Use high beams when no oncoming traffic", "Use low beams in all conditions", "Alternate high and low beams"],
    correctAnswer: 1,
    category: "Lighting"
  },
  {
    id: "q90",
    text: "How often should you have your brakes inspected?",
    options: ["Every 6 months", "Every year", "Every 2 years", "Only when they feel soft"],
    correctAnswer: 1,
    category: "Vehicle Maintenance"
  },
  {
    id: "q91",
    text: "What does a flashing yellow light mean?",
    options: ["Stop and wait", "Slow down and proceed with caution", "Yield to pedestrians", "Speed up to clear intersection"],
    correctAnswer: 1,
    category: "Traffic Signals"
  },
  {
    id: "q92",
    text: "When using wipers in heavy rain, you should:",
    options: ["Use highest speed always", "Reduce speed since visibility is limited", "Use parking lights", "Turn on fog lights only"],
    correctAnswer: 1,
    category: "Weather Conditions"
  },
  {
    id: "q93",
    text: "What is the correct position for your hands on the steering wheel?",
    options: ["12 and 12 o'clock", "9 and 3 o'clock", "10 and 2 o'clock", "8 and 4 o'clock"],
    correctAnswer: 2,
    category: "Driving Position"
  },
  {
    id: "q94",
    text: "A regulatory sign is typically what color?",
    options: ["Red and white", "Yellow and black", "Green and white", "Blue and white"],
    correctAnswer: 0,
    category: "Road Signs"
  },
  {
    id: "q95",
    text: "How much space should you leave behind parked cars when driving?",
    options: ["1 car length", "Just enough to swerve", "2-3 car lengths", "As close as possible"],
    correctAnswer: 2,
    category: "Safe Driving"
  },
  {
    id: "q96",
    text: "What should you do at a red light if your light is stuck?",
    options: ["Proceed after stopping carefully", "Wait for someone to help", "Call police", "Turn off engine"],
    correctAnswer: 0,
    category: "Traffic Control"
  },
  {
    id: "q97",
    text: "The maximum legal speed limit on interstate highways is typically:",
    options: ["55 mph", "65 mph", "70-75 mph", "80 mph"],
    correctAnswer: 2,
    category: "Speed Limits"
  },
  {
    id: "q98",
    text: "What is the safest response to an aggressive driver?",
    options: ["Gesture back at them", "Drive faster to escape", "Stay calm and avoid eye contact", "Brake check them"],
    correctAnswer: 2,
    category: "Road Rage"
  },
  {
    id: "q99",
    text: "How many feet should you be able to see ahead at night with headlights?",
    options: ["100 feet", "250 feet", "400 feet", "500 feet"],
    correctAnswer: 1,
    category: "Lighting"
  },
  {
    id: "q100",
    text: "What does it mean when a driver uses their hazard lights?",
    options: ["They're turning right", "Emergency or hazard situation", "They're about to exit", "Requesting a lane change"],
    correctAnswer: 1,
    category: "Vehicle Signaling"
  }
];

export const TOTAL_QUESTIONS = QUESTIONS.length;