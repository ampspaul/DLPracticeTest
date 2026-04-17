const questionDatabase = {
  'permit-knowledge': [
    {
      text: 'What does a yellow traffic light mean?',
      options: [
        'Stop immediately',
        'Prepare to stop; proceed with caution if safe',
        'You have the right of way',
        'Speed up to cross the intersection',
      ],
      correctAnswer: 'Prepare to stop; proceed with caution if safe',
      hint: 'Yellow means caution',
      explanation: 'Yellow lights warn drivers that the light will change to red soon. You should prepare to stop if it is safe to do so.',
    },
    {
      text: 'What is the speed limit in residential areas?',
      options: ['15 mph', '25 mph', '35 mph', '45 mph'],
      correctAnswer: '25 mph',
      hint: 'Think of children playing',
      explanation: 'Most residential areas have a 25 mph speed limit to protect pedestrians and residents.',
    },
    {
      text: 'When should you use your headlights?',
      options: [
        'Only at night',
        'Only during rain',
        'During dusk, dawn, rain, and at night',
        'Only when other cars are using theirs',
      ],
      correctAnswer: 'During dusk, dawn, rain, and at night',
      hint: 'Think about visibility',
      explanation: 'Headlights should be used whenever visibility is reduced, including at dusk, dawn, and during adverse weather.',
    },
    {
      text: 'How far should you follow another vehicle?',
      options: [
        'One car length for every 10 mph',
        'Half a car length',
        'As close as possible',
        'No specific distance required',
      ],
      correctAnswer: 'One car length for every 10 mph',
      hint: 'The 3-second rule',
      explanation: 'Maintain at least one car length of distance for every 10 mph of speed to ensure safe stopping distance.',
    },
    {
      text: 'What should you do when you see a red octagon sign?',
      options: [
        'Slow down',
        'Stop completely and look both ways',
        'Proceed with caution',
        'Speed up to clear the intersection',
      ],
      correctAnswer: 'Stop completely and look both ways',
      hint: 'Octagon is a red STOP sign',
      explanation: 'A red octagon is a STOP sign. You must come to a complete stop, then look both ways before proceeding.',
    },
  ],
  'road-signs': [
    {
      text: 'What does a diamond-shaped yellow sign indicate?',
      options: [
        'Speed limit',
        'Mandatory instruction',
        'Warning of potential hazard',
        'Parking information',
      ],
      correctAnswer: 'Warning of potential hazard',
      hint: 'Yellow = Warning',
      explanation: 'Diamond-shaped yellow signs warn drivers of potential hazards ahead.',
    },
    {
      text: 'What does a rectangular green sign indicate?',
      options: [
        'Warning',
        'Direction or information',
        'Mandatory action',
        'Speed limit',
      ],
      correctAnswer: 'Direction or information',
      hint: 'Green = Go/Direction',
      explanation: 'Rectangular green signs provide directional information or highway signs.',
    },
    {
      text: 'What should you do at a white triangular sign?',
      options: [
        'Stop',
        'Yield to other traffic',
        'Slow down',
        'Proceed with caution',
      ],
      correctAnswer: 'Yield to other traffic',
      hint: 'Triangular = Yield',
      explanation: 'A white triangular sign with red border is a YIELD sign, meaning you must yield to other traffic.',
    },
  ],
  'traffic-laws': [
    {
      text: 'Is it legal to use your phone while driving?',
      options: [
        'Yes, always',
        'Only for calls',
        'No, it is not legal',
        'Only with headset',
      ],
      correctAnswer: 'No, it is not legal',
      hint: 'Distracted driving is dangerous',
      explanation: 'Using a phone while driving is illegal in most places as it is a form of distracted driving.',
    },
    {
      text: 'What is the legal age to obtain a driver license in most US states?',
      options: ['16', '17', '18', '21'],
      correctAnswer: '16',
      hint: 'Most states allow at 16',
      explanation: 'Most US states allow drivers to obtain a license at age 16.',
    },
    {
      text: 'When must you yield at a four-way stop?',
      options: [
        'Always yield to the right',
        'Yield to whoever arrives first; if simultaneous, yield to the right',
        'Yield to larger vehicles',
        'No need to yield, just go',
      ],
      correctAnswer: 'Yield to whoever arrives first; if simultaneous, yield to the right',
      hint: 'First come, first served',
      explanation: 'At a four-way stop, the vehicle that arrived first has the right of way. If two vehicles arrive simultaneously, yield to the vehicle on your right.',
    },
    {
      text: 'What is the maximum blood alcohol concentration allowed for driving?',
      options: ['0.05%', '0.08%', '0.10%', '0.15%'],
      correctAnswer: '0.08%',
      hint: 'Federal limit',
      explanation: 'The legal limit for blood alcohol concentration (BAC) is 0.08% for drivers aged 21 and over.',
    },
  ],
};

export async function loadTestQuestions(testId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const questions = questionDatabase[testId] || [];
      resolve(questions);
    }, 300);
  });
}