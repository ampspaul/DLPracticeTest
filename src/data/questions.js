/**
 * Driver Licence Practice Test - Question Bank
 * Contains all multiple-choice questions for the practice test portal.
 * Schema: { id, text, options: string[], correctAnswer: string }
 */

const questions = [
  // ─── Original Questions (q1–q51) ───────────────────────────────────────────
  {
    id: 'q1',
    text: 'What does a red traffic light mean?',
    options: ['Stop and wait', 'Slow down', 'Proceed with caution'],
    correctAnswer: 'Stop and wait'
  },
  {
    id: 'q2',
    text: 'What does a yellow traffic light mean?',
    options: ['Speed up to clear the intersection', 'Stop if safe to do so', 'Proceed normally'],
    correctAnswer: 'Stop if safe to do so'
  },
  {
    id: 'q3',
    text: 'What is the speed limit in a school zone when children are present?',
    options: ['15 mph', '20 mph', '25 mph', '30 mph'],
    correctAnswer: '15 mph'
  },
  {
    id: 'q4',
    text: 'When must you yield to pedestrians?',
    options: ['Only at marked crosswalks', 'Only when a traffic signal indicates', 'At all crosswalks, marked or unmarked', 'Never, pedestrians must wait'],
    correctAnswer: 'At all crosswalks, marked or unmarked'
  },
  {
    id: 'q5',
    text: 'What should you do when you hear a siren from an emergency vehicle?',
    options: ['Speed up to get out of the way', 'Pull over to the right and stop', 'Maintain your current speed', 'Flash your headlights'],
    correctAnswer: 'Pull over to the right and stop'
  },
  {
    id: 'q6',
    text: 'What does a stop sign look like?',
    options: ['Yellow diamond', 'Red octagon', 'White rectangle', 'Green circle'],
    correctAnswer: 'Red octagon'
  },
  {
    id: 'q7',
    text: 'When are you required to use your headlights?',
    options: ['Only at night', 'From sunset to sunrise and when visibility is less than 500 feet', 'Only in rain or fog', 'Whenever driving on a highway'],
    correctAnswer: 'From sunset to sunrise and when visibility is less than 500 feet'
  },
  {
    id: 'q8',
    text: 'What is the minimum following distance you should maintain in normal conditions?',
    options: ['1 second', '2 seconds', '3 seconds', '5 seconds'],
    correctAnswer: '3 seconds'
  },
  {
    id: 'q9',
    text: 'When is it legal to make a right turn on a red light?',
    options: ['Never', 'After coming to a complete stop, if safe and not prohibited', 'After slowing down to 10 mph', 'Only during daytime hours'],
    correctAnswer: 'After coming to a complete stop, if safe and not prohibited'
  },
  {
    id: 'q10',
    text: 'What does a flashing red light mean?',
    options: ['Slow down', 'Treat it as a stop sign', 'Yield to oncoming traffic', 'The light is malfunctioning'],
    correctAnswer: 'Treat it as a stop sign'
  },
  {
    id: 'q11',
    text: 'What is the blood alcohol concentration (BAC) limit for drivers 21 and older in most states?',
    options: ['0.05%', '0.08%', '0.10%', '0.12%'],
    correctAnswer: '0.08%'
  },
  {
    id: 'q12',
    text: 'What does a solid white line on the road indicate?',
    options: ['Passing is allowed', 'Lane separation where changing lanes is discouraged', 'A parking zone', 'A bicycle lane boundary'],
    correctAnswer: 'Lane separation where changing lanes is discouraged'
  },
  {
    id: 'q13',
    text: 'When should you use your horn?',
    options: ['To greet other drivers', 'To warn others of danger', 'When another driver makes a mistake', 'To signal when passing'],
    correctAnswer: 'To warn others of danger'
  },
  {
    id: 'q14',
    text: 'What should you do if your vehicle starts to skid?',
    options: ['Brake hard immediately', 'Steer into the skid and ease off the accelerator', 'Turn the steering wheel away from the skid', 'Apply the parking brake'],
    correctAnswer: 'Steer into the skid and ease off the accelerator'
  },
  {
    id: 'q15',
    text: 'What does a yield sign mean?',
    options: ['Stop completely', 'Slow down and give the right of way to crossing traffic', 'Speed up to merge', 'Do not enter'],
    correctAnswer: 'Slow down and give the right of way to crossing traffic'
  },
  {
    id: 'q16',
    text: 'Which lane should you use when driving on a multi-lane highway at normal speed?',
    options: ['The left lane', 'The right lane', 'Any lane', 'The centre lane'],
    correctAnswer: 'The right lane'
  },
  {
    id: 'q17',
    text: 'What does a double solid yellow centre line mean?',
    options: ['Passing is allowed from both directions', 'Passing is not allowed from either direction', 'Only the left lane may pass', 'Reduced speed ahead'],
    correctAnswer: 'Passing is not allowed from either direction'
  },
  {
    id: 'q18',
    text: 'When approaching a railroad crossing with no signals, you should:',
    options: ['Speed up to cross quickly', 'Stop, look both ways, and proceed only when safe', 'Slow down but do not stop', 'Honk your horn and proceed'],
    correctAnswer: 'Stop, look both ways, and proceed only when safe'
  },
  {
    id: 'q19',
    text: 'What is the safest way to check your blind spots?',
    options: ['Use only mirrors', 'Turn your head and look over your shoulder', 'Rely on other drivers to avoid you', 'Sound your horn before changing lanes'],
    correctAnswer: 'Turn your head and look over your shoulder'
  },
  {
    id: 'q20',
    text: 'What should you do when you see a school bus with flashing red lights and a stop arm extended?',
    options: ['Slow down and proceed carefully', 'Stop and remain stopped until the arm is withdrawn', 'Pass on the left side only', 'Honk to alert the children'],
    correctAnswer: 'Stop and remain stopped until the arm is withdrawn'
  },
  {
    id: 'q21',
    text: 'What is hydroplaning?',
    options: ['Driving through a flooded area', 'When your tyres lose contact with the road due to water', 'Using wipers at high speed', 'A type of braking technique'],
    correctAnswer: 'When your tyres lose contact with the road due to water'
  },
  {
    id: 'q22',
    text: 'Which of the following is NOT a requirement before changing lanes?',
    options: ['Check mirrors', 'Use your turn signal', 'Check blind spots', 'Sound your horn'],
    correctAnswer: 'Sound your horn'
  },
  {
    id: 'q23',
    text: 'What is the proper way to merge onto a freeway?',
    options: ['Stop at the end of the on-ramp and wait for a gap', 'Match the speed of freeway traffic and merge smoothly', 'Signal and force your way in', 'Merge at any speed'],
    correctAnswer: 'Match the speed of freeway traffic and merge smoothly'
  },
  {
    id: 'q24',
    text: 'When is it legal to pass on the right?',
    options: ['Never', 'When the vehicle ahead is turning left and there is a clear lane on the right', 'Whenever you feel it is safe', 'Only on highways'],
    correctAnswer: 'When the vehicle ahead is turning left and there is a clear lane on the right'
  },
  {
    id: 'q25',
    text: 'What does a broken yellow centre line mean?',
    options: ['No passing allowed', 'Passing is allowed when safe', 'Road construction ahead', 'Reduced speed zone'],
    correctAnswer: 'Passing is allowed when safe'
  },
  {
    id: 'q26',
    text: 'How far before a turn should you signal?',
    options: ['50 feet', '100 feet', '200 feet', 'Signals are optional'],
    correctAnswer: '100 feet'
  },
  {
    id: 'q27',
    text: 'What should you do if you miss your exit on a freeway?',
    options: ['Reverse on the shoulder to reach the exit', 'Continue to the next exit', 'Stop and wait', 'Make a U-turn'],
    correctAnswer: 'Continue to the next exit'
  },
  {
    id: 'q28',
    text: 'What is the correct hand signal for a left turn?',
    options: ['Left arm extended straight out', 'Left arm bent upward at elbow', 'Left arm bent downward at elbow', 'Right arm extended out the window'],
    correctAnswer: 'Left arm extended straight out'
  },
  {
    id: 'q29',
    text: 'Who has the right of way at an uncontrolled intersection?',
    options: ['The vehicle on the left', 'The vehicle travelling faster', 'The vehicle on the right', 'The larger vehicle'],
    correctAnswer: 'The vehicle on the right'
  },
  {
    id: 'q30',
    text: 'What does a pennant-shaped sign mean?',
    options: ['School zone ahead', 'No passing zone', 'Yield ahead', 'Speed limit change'],
    correctAnswer: 'No passing zone'
  },
  {
    id: 'q31',
    text: 'When driving in fog, you should use:',
    options: ['High-beam headlights', 'Low-beam headlights', 'Hazard lights only', 'No lights'],
    correctAnswer: 'Low-beam headlights'
  },
  {
    id: 'q32',
    text: 'What is the purpose of a rumble strip on the edge of a highway?',
    options: ['To mark a bike lane', 'To alert drivers when they are drifting off the roadway', 'To slow traffic near intersections', 'To channel water away from the road'],
    correctAnswer: 'To alert drivers when they are drifting off the roadway'
  },
  {
    id: 'q33',
    text: 'How should you position your hands on the steering wheel for optimal control?',
    options: ['10 and 2 o\'clock', '9 and 3 o\'clock', '8 and 4 o\'clock', 'One hand at 12 o\'clock'],
    correctAnswer: '9 and 3 o\'clock'
  },
  {
    id: 'q34',
    text: 'What should you do when approaching a green traffic light that has been green for a long time?',
    options: ['Maintain speed — it is safe', 'Increase speed to get through before it changes', 'Slow down and prepare to stop', 'Flash your headlights to warn others'],
    correctAnswer: 'Slow down and prepare to stop'
  },
  {
    id: 'q35',
    text: 'When is it permissible to drive in a bicycle lane?',
    options: ['Whenever there are no cyclists', 'When making a right turn or entering/exiting a parking space', 'At any time if the lane is clear', 'Never'],
    correctAnswer: 'When making a right turn or entering/exiting a parking space'
  },
  {
    id: 'q36',
    text: 'What is the minimum age to obtain a full unrestricted driver\'s licence in most US states?',
    options: ['15', '16', '17', '18'],
    correctAnswer: '18'
  },
  {
    id: 'q37',
    text: 'What does a flashing yellow traffic light mean?',
    options: ['Stop immediately', 'Proceed with caution', 'Yield to oncoming traffic', 'The intersection is closed'],
    correctAnswer: 'Proceed with caution'
  },
  {
    id: 'q38',
    text: 'What should you do if an oncoming vehicle\'s headlights are blinding you at night?',
    options: ['Flash your high beams', 'Look toward the right edge of the road', 'Close one eye', 'Stop your vehicle'],
    correctAnswer: 'Look toward the right edge of the road'
  },
  {
    id: 'q39',
    text: 'What does it mean when a school bus has flashing yellow lights?',
    options: ['The bus is stopped and loading/unloading', 'The bus is preparing to stop — slow down and prepare to stop', 'You may pass the bus with care', 'The bus has broken down'],
    correctAnswer: 'The bus is preparing to stop — slow down and prepare to stop'
  },
  {
    id: 'q40',
    text: 'What is the correct action when you encounter a funeral procession?',
    options: ['Drive through it if you have a green light', 'Yield and do not cut into the procession', 'Pass the procession on the left', 'Honk to signal your presence'],
    correctAnswer: 'Yield and do not cut into the procession'
  },
  {
    id: 'q41',
    text: 'What does "implied consent" mean in the context of driving?',
    options: ['You agree to follow all traffic laws when you get a licence', 'By driving on public roads, you consent to chemical testing for intoxicants if lawfully stopped', 'You consent to vehicle searches at any time', 'Police may stop you without reason'],
    correctAnswer: 'By driving on public roads, you consent to chemical testing for intoxicants if lawfully stopped'
  },
  {
    id: 'q42',
    text: 'When parallel parking, how far from the kerb should your vehicle be?',
    options: ['6 inches or less', '12 inches or less', '18 inches or less', '24 inches or less'],
    correctAnswer: '12 inches or less'
  },
  {
    id: 'q43',
    text: 'What is the primary danger of driving while drowsy?',
    options: ['Reduced fuel efficiency', 'Impaired reaction time and risk of falling asleep', 'Increased brake wear', 'Higher engine temperature'],
    correctAnswer: 'Impaired reaction time and risk of falling asleep'
  },
  {
    id: 'q44',
    text: 'What must you do at a roundabout?',
    options: ['Speed up to enter before other vehicles', 'Yield to vehicles already in the roundabout', 'Stop completely before entering', 'Maintain your speed and merge'],
    correctAnswer: 'Yield to vehicles already in the roundabout'
  },
  {
    id: 'q45',
    text: 'What colour is a warning sign?',
    options: ['Red', 'Blue', 'Yellow or orange', 'Green'],
    correctAnswer: 'Yellow or orange'
  },
  {
    id: 'q46',
    text: 'What does a white rectangular sign typically indicate?',
    options: ['Warning', 'Regulatory (speed limits, rules)', 'Guide information', 'Construction zone'],
    correctAnswer: 'Regulatory (speed limits, rules)'
  },
  {
    id: 'q47',
    text: 'What is the correct procedure for a three-point turn?',
    options: ['Signal left, turn into the opposite lane, reverse, then drive forward', 'Signal right and make a wide U-turn', 'Reverse into a driveway and pull forward', 'Only allowed on one-way streets'],
    correctAnswer: 'Signal left, turn into the opposite lane, reverse, then drive forward'
  },
  {
    id: 'q48',
    text: 'How should you brake on a slippery road if your vehicle does not have ABS?',
    options: ['Apply firm, continuous pressure', 'Pump the brakes gently', 'Apply the parking brake', 'Press the brake as hard as possible'],
    correctAnswer: 'Pump the brakes gently'
  },
  {
    id: 'q49',
    text: 'What is a "No Zone" around large trucks?',
    options: ['A speed restriction zone near trucks', 'A blind spot area where the truck driver cannot see you', 'A zone where trucks are prohibited', 'A designated truck parking area'],
    correctAnswer: 'A blind spot area where the truck driver cannot see you'
  },
  {
    id: 'q50',
    text: 'When must you dim your high-beam headlights for oncoming traffic?',
    options: ['Within 1,000 feet', 'Within 500 feet', 'Within 200 feet', 'High beams do not need to be dimmed'],
    correctAnswer: 'Within 500 feet'
  },

  // ─── New Questions (q51–q100) ──────────────────────────────────────────────
  {
    id: 'q51',
    text: 'What is the correct action when you approach an intersection and the traffic light is not working?',
    options: ['Proceed at normal speed', 'Treat it as a four-way stop', 'Yield to all traffic', 'Call the police before proceeding'],
    correctAnswer: 'Treat it as a four-way stop'
  },
  {
    id: 'q52',
    text: 'What does a blue sign typically indicate on a highway?',
    options: ['Warning information', 'Speed regulations', 'Motorist services such as fuel, food, and lodging', 'Construction zone'],
    correctAnswer: 'Motorist services such as fuel, food, and lodging'
  },
  {
    id: 'q53',
    text: 'How much space should you leave when stopping behind a vehicle at a traffic light?',
    options: ['Just a few inches', 'Enough to see the rear tyres of the vehicle ahead touching the road', 'At least one car length', 'Half a car length'],
    correctAnswer: 'Enough to see the rear tyres of the vehicle ahead touching the road'
  },
  {
    id: 'q54',
    text: 'When driving in heavy rain, you should:',
    options: ['Increase your speed to reduce time on the road', 'Reduce speed and increase following distance', 'Use high-beam headlights', 'Drive in the centre lane only'],
    correctAnswer: 'Reduce speed and increase following distance'
  },
  {
    id: 'q55',
    text: 'What does a green arrow traffic signal mean?',
    options: ['Proceed in the direction of the arrow — oncoming traffic is stopped', 'Yield before proceeding in the arrow direction', 'You may proceed only if the intersection is clear', 'Speed up to beat the red light'],
    correctAnswer: 'Proceed in the direction of the arrow — oncoming traffic is stopped'
  },
  {
    id: 'q56',
    text: 'What should you do if your accelerator pedal becomes stuck while driving?',
    options: ['Brake hard and steer off the road', 'Shift to neutral, apply brakes, and pull safely off the road', 'Turn off the ignition immediately while steering', 'Pump the accelerator rapidly'],
    correctAnswer: 'Shift to neutral, apply brakes, and pull safely off the road'
  },
  {
    id: 'q57',
    text: 'Which of the following driving behaviours is considered aggressive driving?',
    options: ['Signalling before changing lanes', 'Tailgating and making frequent unsafe lane changes', 'Maintaining the speed limit', 'Yielding to merging traffic'],
    correctAnswer: 'Tailgating and making frequent unsafe lane changes'
  },
  {
    id: 'q58',
    text: 'When must you stop for a pedestrian at a crosswalk?',
    options: ['Only if the pedestrian is in the lane you are travelling in', 'Whenever a pedestrian is in the crosswalk or stepping off a kerb', 'Only at controlled intersections', 'Only if the pedestrian signals you to stop'],
    correctAnswer: 'Whenever a pedestrian is in the crosswalk or stepping off a kerb'
  },
  {
    id: 'q59',
    text: 'What is the safest action when a tyre blows out while driving?',
    options: ['Brake hard and steer off the road', 'Grip the wheel firmly, ease off the accelerator, and steer straight', 'Swerve quickly into the nearest lane', 'Accelerate briefly to stabilise the vehicle'],
    correctAnswer: 'Grip the wheel firmly, ease off the accelerator, and steer straight'
  },
  {
    id: 'q60',
    text: 'What does it mean when pavement markings show a solid line on your side and a broken line on the other side?',
    options: ['Neither side may pass', 'Vehicles on your side may not pass; vehicles on the other side may pass when safe', 'Both sides may pass', 'Only vehicles on the other side are restricted'],
    correctAnswer: 'Vehicles on your side may not pass; vehicles on the other side may pass when safe'
  },
  {
    id: 'q61',
    text: 'What is the legal requirement regarding seat belts in most US states?',
    options: ['Only the driver must wear a seat belt', 'All occupants in the front seat must wear a seat belt', 'All occupants in the vehicle must wear a seat belt', 'Seat belts are recommended but not required'],
    correctAnswer: 'All occupants in the vehicle must wear a seat belt'
  },
  {
    id: 'q62',
    text: 'What should you do when driving through a work zone?',
    options: ['Maintain normal highway speed', 'Reduce speed, stay alert, and obey posted signs and flaggers', 'Use your horn to alert workers', 'Pass slower vehicles to get through quickly'],
    correctAnswer: 'Reduce speed, stay alert, and obey posted signs and flaggers'
  },
  {
    id: 'q63',
    text: 'When entering a highway from a ramp, who has the right of way?',
    options: ['The vehicle entering from the ramp', 'Vehicles already travelling on the highway', 'The faster vehicle', 'The larger vehicle'],
    correctAnswer: 'Vehicles already travelling on the highway'
  },
  {
    id: 'q64',
    text: 'What does a diamond-shaped sign indicate?',
    options: ['Regulatory requirement', 'Warning of hazard or road condition ahead', 'Guide information', 'School zone'],
    correctAnswer: 'Warning of hazard or road condition ahead'
  },
  {
    id: 'q65',
    text: 'What is the correct action when you are being tailgated?',
    options: ['Tap your brakes to warn the driver behind', 'Speed up to create more space', 'Safely change lanes or slow down gradually to increase the gap', 'Brake check the driver behind you'],
    correctAnswer: 'Safely change lanes or slow down gradually to increase the gap'
  },
  {
    id: 'q66',
    text: 'How should you respond when you see a "Reduced Speed Ahead" sign?',
    options: ['Begin slowing down in preparation for the lower speed limit', 'Wait until you see the new speed limit sign before slowing', 'Ignore it if you are in a hurry', 'Only reduce speed if there is heavy traffic'],
    correctAnswer: 'Begin slowing down in preparation for the lower speed limit'
  },
  {
    id: 'q67',
    text: 'What is a controlled intersection?',
    options: ['An intersection with a police officer', 'An intersection regulated by traffic signals or signs', 'An intersection with only one road', 'An intersection in a construction zone'],
    correctAnswer: 'An intersection regulated by traffic signals or signs'
  },
  {
    id: 'q68',
    text: 'When is it legal to use a mobile phone while driving?',
    options: ['At any time if using speakerphone', 'Only when the vehicle is stopped at a red light', 'When using a hands-free device in states where it is permitted', 'Texting is always permitted, calling is not'],
    correctAnswer: 'When using a hands-free device in states where it is permitted'
  },
  {
    id: 'q69',
    text: 'What is the purpose of a deceleration lane (exit lane) on a freeway?',
    options: ['To allow faster vehicles to overtake', 'To allow drivers to slow down before exiting the freeway', 'To provide emergency vehicle access', 'To serve as a bicycle lane'],
    correctAnswer: 'To allow drivers to slow down before exiting the freeway'
  },
  {
    id: 'q70',
    text: 'What action should you take when a traffic officer\'s signals conflict with a traffic light?',
    options: ['Follow the traffic light', 'Follow the traffic officer\'s signals', 'Stop and wait for clarification', 'Proceed based on which seems safer'],
    correctAnswer: 'Follow the traffic officer\'s signals'
  },
  {
    id: 'q71',
    text: 'What does "defensive driving" primarily involve?',
    options: ['Driving as fast as possible to minimise time on the road', 'Anticipating hazards and making safe decisions regardless of other drivers\' actions', 'Always driving below the speed limit', 'Using your horn frequently to alert others'],
    correctAnswer: 'Anticipating hazards and making safe decisions regardless of other drivers\' actions'
  },
  {
    id: 'q72',
    text: 'What should you do if you are involved in a collision?',
    options: ['Leave the scene if damage is minor', 'Stop, render aid if safe, and report to police if required', 'Exchange information only if the other driver insists', 'Drive to the nearest police station without stopping'],
    correctAnswer: 'Stop, render aid if safe, and report to police if required'
  },
  {
    id: 'q73',
    text: 'What does the "Move Over" law require drivers to do?',
    options: ['Move to the right whenever a faster vehicle approaches from behind', 'Change lanes or slow down when passing stopped emergency vehicles on the roadside', 'Pull over when any vehicle sounds its horn', 'Give way to buses at all times'],
    correctAnswer: 'Change lanes or slow down when passing stopped emergency vehicles on the roadside'
  },
  {
    id: 'q74',
    text: 'What is the correct hand signal for stopping or slowing down?',
    options: ['Left arm extended straight out', 'Left arm bent upward at elbow', 'Left arm bent downward at elbow', 'Right arm extended downward'],
    correctAnswer: 'Left arm bent downward at elbow'
  },
  {
    id: 'q75',
    text: 'What is the recommended following distance when driving behind a large truck?',
    options: ['2 seconds', '3 seconds', '4 to 5 seconds', 'The same as for any other vehicle'],
    correctAnswer: '4 to 5 seconds'
  },
  {
    id: 'q76',
    text: 'What does a "Do Not Enter" sign mean?',
    options: ['Road work ahead — slow down', 'You may not enter this road from your current direction', 'Restricted access for commercial vehicles only', 'School zone — no through traffic'],
    correctAnswer: 'You may not enter this road from your current direction'
  },
  {
    id: 'q77',
    text: 'What is the best way to avoid highway hypnosis on a long drive?',
    options: ['Drive faster to arrive sooner', 'Take regular breaks, stay hydrated, and keep the cabin cool', 'Turn the radio off completely', 'Use cruise control at all times'],
    correctAnswer: 'Take regular breaks, stay hydrated, and keep the cabin cool'
  },
  {
    id: 'q78',
    text: 'When turning left at an intersection, you must yield to:',
    options: ['Only pedestrians', 'Only oncoming vehicles', 'Oncoming traffic and pedestrians in the crosswalk', 'Nobody — left-turning vehicles have priority'],
    correctAnswer: 'Oncoming traffic and pedestrians in the crosswalk'
  },
  {
    id: 'q79',
    text: 'What does a broken white line between lanes mean?',
    options: ['Lane changes are prohibited', 'Lane changes are permitted when safe to do so', 'Only emergency vehicles may cross this line', 'Bicycle lane boundary'],
    correctAnswer: 'Lane changes are permitted when safe to do so'
  },
  {
    id: 'q80',
    text: 'What must you do before backing out of a parking space?',
    options: ['Sound your horn and reverse immediately', 'Check mirrors and look over both shoulders for pedestrians and vehicles', 'Signal and reverse without stopping', 'Flash your headlights twice'],
    correctAnswer: 'Check mirrors and look over both shoulders for pedestrians and vehicles'
  },
  {
    id: 'q81',
    text: 'When is it appropriate to use hazard lights while driving?',
    options: ['When driving slowly below the speed limit', 'When your vehicle is stopped or disabled and poses a hazard', 'When parking in a no-parking zone briefly', 'To signal a lane change on a highway'],
    correctAnswer: 'When your vehicle is stopped or disabled and poses a hazard'
  },
  {
    id: 'q82',
    text: 'What is the meaning of a "Wrong Way" sign?',
    options: ['You are approaching a one-way road from the wrong direction', 'There is road construction ahead', 'A detour is required', 'Speed limit change ahead'],
    correctAnswer: 'You are approaching a one-way road from the wrong direction'
  },
  {
    id: 'q83',
    text: 'What is the correct procedure when a school bus stops on a divided highway with a physical barrier?',
    options: ['All traffic from both directions must stop', 'Only traffic behind the bus must stop', 'Traffic on the opposite side of the barrier may proceed', 'No stopping is required on a divided highway'],
    correctAnswer: 'Traffic on the opposite side of the barrier may proceed'
  },
  {
    id: 'q84',
    text: 'What is the general speed limit in a residential area when no sign is posted?',
    options: ['15 mph', '25 mph', '35 mph', '45 mph'],
    correctAnswer: '25 mph'
  },
  {
    id: 'q85',
    text: 'What should a driver do when they become extremely fatigued on a long trip?',
    options: ['Open a window and continue driving', 'Turn up the radio loudly', 'Pull off the road safely and rest', 'Drink a large amount of caffeine and continue'],
    correctAnswer: 'Pull off the road safely and rest'
  },
  {
    id: 'q86',
    text: 'Which of the following is required to be checked before a long journey?',
    options: ['Tyre pressure, fluid levels, lights, and brakes', 'Only fuel level', 'Only the oil level', 'GPS and entertainment system'],
    correctAnswer: 'Tyre pressure, fluid levels, lights, and brakes'
  },
  {
    id: 'q87',
    text: 'What does a "Keep Right" sign mean?',
    options: ['Only right turns are permitted', 'Stay to the right of a median, island, or obstruction', 'The right lane is closed ahead', 'Yield to traffic from the right'],
    correctAnswer: 'Stay to the right of a median, island, or obstruction'
  },
  {
    id: 'q88',
    text: 'When parking on a downhill slope with a kerb, which way should your front wheels be turned?',
    options: ['Straight ahead', 'Away from the kerb', 'Toward the kerb', 'It does not matter'],
    correctAnswer: 'Toward the kerb'
  },
  {
    id: 'q89',
    text: 'When parking on an uphill slope without a kerb, which way should your front wheels be turned?',
    options: ['Toward the kerb', 'Away from the road edge', 'Straight ahead', 'Toward the road edge'],
    correctAnswer: 'Toward the road edge'
  },
  {
    id: 'q90',
    text: 'How should you handle an intersection where you have a green light but cross traffic is blocking it?',
    options: ['Honk and proceed', 'Wait until there is room to completely clear the intersection before entering', 'Enter the intersection to signal your intent to cross', 'Use the emergency lane to bypass the blocked intersection'],
    correctAnswer: 'Wait until there is room to completely clear the intersection before entering'
  },
  {
    id: 'q91',
    text: 'What is the purpose of an acceleration lane when entering a freeway?',
    options: ['To allow drivers to slow down safely', 'To give drivers space to increase speed to match freeway traffic before merging', 'To provide access for emergency vehicles only', 'To serve as an additional travel lane during congestion'],
    correctAnswer: 'To give drivers space to increase speed to match freeway traffic before merging'
  },
  {
    id: 'q92',
    text: 'What does a sign with an "R" in a circle crossed out indicate?',
    options: ['No right turn', 'No reversing', 'No roundabout', 'Restricted access road'],
    correctAnswer: 'No right turn'
  },
  {
    id: 'q93',
    text: 'What is the safest position in traffic to avoid being in a truck\'s blind spot?',
    options: ['Directly behind the truck', 'Directly beside the cab', 'Far enough behind to see the truck\'s mirrors', 'As close to the front of the truck as possible'],
    correctAnswer: 'Far enough behind to see the truck\'s mirrors'
  },
  {
    id: 'q94',
    text: 'When is it permissible to cross a double solid centre line?',
    options: ['Never — it is always prohibited', 'When making a left turn into a driveway', 'When the road is congested', 'When passing a slow-moving vehicle'],
    correctAnswer: 'When making a left turn into a driveway'
  },
  {
    id: 'q95',
    text: 'What does the term "right of way" mean?',
    options: ['The legal right to always proceed first', 'The privilege of immediate use of the road in a given situation', 'Permission to exceed the speed limit briefly', 'The right to change lanes without signalling'],
    correctAnswer: 'The privilege of immediate use of the road in a given situation'
  },
  {
    id: 'q96',
    text: 'Under what conditions should you use your vehicle\'s low-beam headlights during the day?',
    options: ['Never — daylight headlights waste battery', 'In rain, fog, snow, or other conditions that reduce visibility', 'Only when on a motorway', 'Only when other drivers flash their lights at you'],
    correctAnswer: 'In rain, fog, snow, or other conditions that reduce visibility'
  },
  {
    id: 'q97',
    text: 'What should you do when you hear an emergency vehicle siren but cannot see it?',
    options: ['Maintain your speed and watch ahead', 'Slow down, pull toward the right, and stop if necessary until you can determine its location', 'Turn off your radio and continue driving', 'Speed up and move to the left lane'],
    correctAnswer: 'Slow down, pull toward the right, and stop if necessary until you can determine its location'
  },
  {
    id: 'q98',
    text: 'What is the minimum distance you must park from a fire hydrant?',
    options: ['5 feet', '10 feet', '15 feet', '25 feet'],
    correctAnswer: '15 feet'
  },
  {
    id: 'q99',
    text: 'What is the purpose of the two-second rule when following another vehicle?',
    options: ['To ensure you are driving at least two seconds faster than traffic', 'To maintain a safe following distance that gives adequate reaction time', 'To keep two car lengths between vehicles at all times regardless of speed', 'To measure when it is safe to pass'],
    correctAnswer: 'To maintain a safe following distance that gives adequate reaction time'
  },
  {
    id: 'q100',
    text: 'What does an orange-coloured sign typically indicate?',
    options: ['Motorist services', 'Road construction or maintenance work zone', 'Recreational area', 'Warning of permanent hazard'],
    correctAnswer: 'Road construction or maintenance work zone'
  }
];

export default questions;