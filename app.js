const { useState, useEffect } = React;

// Lucide React icons as inline SVG components
const Plus = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

const X = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const Edit2 = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
  </svg>
);

const Save = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
    <polyline points="17 21 17 13 7 13 7 21"></polyline>
    <polyline points="7 3 7 8 15 8"></polyline>
  </svg>
);

const ChevronDown = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);

const ChevronRight = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6"></polyline>
  </svg>
);

const Users = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
  </svg>
);

const SwimTracker = () => {
  const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState([]);
  const [showAddClassForm, setShowAddClassForm] = useState(false);
  const [showAddStudentForm, setShowAddStudentForm] = useState(false);
  const [expandedClass, setExpandedClass] = useState(null);
  const [expandedStudent, setExpandedStudent] = useState(null);
  const [editingClass, setEditingClass] = useState(null);
  const [editingStudent, setEditingStudent] = useState(null);
  const [showReportDialog, setShowReportDialog] = useState(false);
  const [reportSettings, setReportSettings] = useState({
    studentId: null,
    wordLength: 100,
    reportType: 'midterm'
  });
  const [generatedComment, setGeneratedComment] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showingPrompt, setShowingPrompt] = useState(true);
  
  const [newClass, setNewClass] = useState({
    name: '',
    levels: [],
    day: 'Monday',
    time: '',
    year: new Date().getFullYear(),
    season: 'Winter'
  });

  const [classError, setClassError] = useState('');

  const [newStudent, setNewStudent] = useState({
    name: '',
    classId: '',
    studentLevel: '',
    pronouns: 'they/them'
  });

  const levels = [
    'Parent & Tot 1', 'Parent & Tot 2', 'Parent & Tot 3',
    'Preschool 1', 'Preschool 2', 'Preschool 3', 'Preschool 4', 'Preschool 5',
    'Swimmer 1', 'Swimmer 2', 'Swimmer 3', 'Swimmer 4', 'Swimmer 5', 'Swimmer 6',
    'Rookie Patrol', 'Ranger Patrol', 'Star Patrol',
    'Adult 1', 'Adult 2', 'Adult 3',
    'Fitness'
  ];

  const skillsByLevel = {
    'Parent & Tot 1': [
      { id: 'pt1-1', name: 'Enter and exit the water safely with tot', category: 'Entries and Exits' },
      { id: 'pt1-2', name: 'Readiness for submersion', category: 'Underwater Skills' },
      { id: 'pt1-3', name: 'Hold tot on front, eye contact', category: 'Movement / Swimming Skills' },
      { id: 'pt1-4', name: 'Hold tot on back, head and back support', category: 'Movement / Swimming Skills' },
      { id: 'pt1-5', name: 'Front float (face out) – assisted', category: 'Movement / Swimming Skills' },
      { id: 'pt1-6', name: 'Back float (assisted)', category: 'Movement / Swimming Skills' },
      { id: 'pt1-7', name: 'Float wearing PFD (assisted)', category: 'Movement / Swimming Skills' },
      { id: 'pt1-8', name: 'Arms: splashing, reaching, paddling', category: 'Movement / Swimming Skills' },
      { id: 'pt1-9', name: 'Legs: tickling, splashing, kicking', category: 'Movement / Swimming Skills' },
      { id: 'pt1-10', name: 'Water Smart messages', category: 'Water Smart Education' }
    ],
    'Parent & Tot 2': [
      { id: 'pt2-1', name: 'Entry from sitting position (assisted)', category: 'Entries and Exits' },
      { id: 'pt2-2', name: 'Exit the water (assisted)', category: 'Entries and Exits' },
      { id: 'pt2-3', name: 'Blow bubbles on and in water', category: 'Underwater Skills' },
      { id: 'pt2-4', name: 'Face wet and in water', category: 'Underwater Skills' },
      { id: 'pt2-5', name: 'Attempt to recover object below surface', category: 'Underwater Skills' },
      { id: 'pt2-6', name: 'Entry from sitting position wearing PFD and return (assisted)', category: 'Swim to Survive Skills' },
      { id: 'pt2-7', name: 'Front float (face in) – assisted', category: 'Movement / Swimming Skills' },
      { id: 'pt2-8', name: 'Back float (assisted)', category: 'Movement / Swimming Skills' },
      { id: 'pt2-9', name: 'Kicking on front (assisted)', category: 'Movement / Swimming Skills' },
      { id: 'pt2-10', name: 'Kicking on back (assisted)', category: 'Movement / Swimming Skills' },
      { id: 'pt2-11', name: 'Surface passes with continuous contact', category: 'Movement / Swimming Skills' },
      { id: 'pt2-12', name: 'Water Smart messages', category: 'Water Smart Education' }
    ],
    'Parent & Tot 3': [
      { id: 'pt3-1', name: 'Jump entry (assisted)', category: 'Entries and Exits' },
      { id: 'pt3-2', name: 'Entry and submerge from sitting position (assisted)', category: 'Entries and Exits' },
      { id: 'pt3-3', name: 'Exit the water (unassisted)', category: 'Entries and Exits' },
      { id: 'pt3-4', name: 'Hold breath underwater (assisted)', category: 'Underwater Skills' },
      { id: 'pt3-5', name: 'Attempt to open eyes underwater', category: 'Underwater Skills' },
      { id: 'pt3-6', name: 'Attempt to recover object from bottom', category: 'Underwater Skills' },
      { id: 'pt3-7', name: 'Standing jump entry, return to edge (assisted)', category: 'Swim to Survive Skills' },
      { id: 'pt3-8', name: 'Jump entry and float wearing PFD (assisted)', category: 'Swim to Survive Skills' },
      { id: 'pt3-9', name: 'Front "starfish" float (assisted)', category: 'Movement / Swimming Skills' },
      { id: 'pt3-10', name: 'Back "starfish" float (assisted)', category: 'Movement / Swimming Skills' },
      { id: 'pt3-11', name: 'Front "pencil" float (assisted)', category: 'Movement / Swimming Skills' },
      { id: 'pt3-12', name: 'Back "pencil" float (assisted)', category: 'Movement / Swimming Skills' },
      { id: 'pt3-13', name: 'Kicking on front (assisted)', category: 'Movement / Swimming Skills' },
      { id: 'pt3-14', name: 'Kicking on back (assisted)', category: 'Movement / Swimming Skills' },
      { id: 'pt3-15', name: 'Underwater passes', category: 'Swim to Survive Skills' },
      { id: 'pt3-16', name: 'Water Smart messages', category: 'Water Smart Education' }
    ],
    'Preschool 1': [
      { id: 'ps1-1', name: 'Enter and exit shallow water (assisted)', category: 'Entries and Exits' },
      { id: 'ps1-2', name: 'Jump into chest-deep water (assisted)', category: 'Entries and Exits' },
      { id: 'ps1-3', name: 'Face in water', category: 'Underwater Skills' },
      { id: 'ps1-4', name: 'Blow bubbles in water', category: 'Underwater Skills' },
      { id: 'ps1-5', name: 'Float on front (3 sec.) assisted', category: 'Movement / Swimming Skills' },
      { id: 'ps1-6', name: 'Float on back (3 sec.) assisted', category: 'Movement / Swimming Skills' },
      { id: 'ps1-7', name: 'Safe movement in shallow water wearing PFD', category: 'Movement / Swimming Skills' },
      { id: 'ps1-8', name: 'Glide on front (3 m) assisted', category: 'Movement / Swimming Skills' },
      { id: 'ps1-9', name: 'Glide on back (3 m) assisted', category: 'Movement / Swimming Skills' },
      { id: 'ps1-10', name: 'Water Smart messages', category: 'Water Smart Education' }
    ],
    'Preschool 2': [
      { id: 'ps2-1', name: 'Enter and exit shallow water wearing PFD', category: 'Entries and Exits' },
      { id: 'ps2-2', name: 'Jump into chest-deep water', category: 'Entries and Exits' },
      { id: 'ps2-3', name: 'Submerge', category: 'Underwater Skills' },
      { id: 'ps2-4', name: 'Submerge and exhale 3 times', category: 'Underwater Skills' },
      { id: 'ps2-5', name: 'Float on front (3 sec.) wearing PFD or with buoyant aid', category: 'Movement / Swimming Skills' },
      { id: 'ps2-6', name: 'Float on back (3 sec.) wearing PFD or with buoyant aid', category: 'Movement / Swimming Skills' },
      { id: 'ps2-7', name: 'Roll laterally front to back and back to front, wearing PFD', category: 'Movement / Swimming Skills' },
      { id: 'ps2-8', name: 'Glide on front (3 m) wearing PFD or with buoyant aid', category: 'Movement / Swimming Skills' },
      { id: 'ps2-9', name: 'Glide on back (3 m) wearing PFD or with buoyant aid', category: 'Movement / Swimming Skills' },
      { id: 'ps2-10', name: 'Flutter kick on back with buoyant aid 5 m', category: 'Movement / Swimming Skills' },
      { id: 'ps2-11', name: 'Water Smart messages', category: 'Water Smart Education' }
    ],
    'Preschool 3': [
      { id: 'ps3-1', name: 'Jump into deep water wearing PFD, return and exit', category: 'Entries and Exits' },
      { id: 'ps3-2', name: 'Sideways entry wearing PFD', category: 'Entries and Exits' },
      { id: 'ps3-3', name: 'Hold breath underwater 3 sec.', category: 'Underwater Skills' },
      { id: 'ps3-4', name: 'Submerge and exhale 5 times', category: 'Underwater Skills' },
      { id: 'ps3-5', name: 'Recover object from bottom in waist-deep water', category: 'Underwater Skills' },
      { id: 'ps3-6', name: 'Back float; roll to front; swim 3 m', category: 'Swim to Survive Skills' },
      { id: 'ps3-7', name: 'Float on front 5 sec.', category: 'Movement / Swimming Skills' },
      { id: 'ps3-8', name: 'Float on back 5 sec.', category: 'Movement / Swimming Skills' },
      { id: 'ps3-9', name: 'Roll laterally front to back and back to front', category: 'Movement / Swimming Skills' },
      { id: 'ps3-10', name: 'Glide on back 3 m', category: 'Movement / Swimming Skills' },
      { id: 'ps3-11', name: 'Glide on front 3 m', category: 'Movement / Swimming Skills' },
      { id: 'ps3-12', name: 'Flutter kick on back 5 m', category: 'Movement / Swimming Skills' },
      { id: 'ps3-13', name: 'Flutter kick on front 5 m', category: 'Movement / Swimming Skills' },
      { id: 'ps3-14', name: 'Water Smart messages', category: 'Water Smart Education' }
    ],
    'Preschool 4': [
      { id: 'ps4-1', name: 'Jump into deep water, return and exit', category: 'Entries and Exits' },
      { id: 'ps4-2', name: 'Sideways entry', category: 'Entries and Exits' },
      { id: 'ps4-3', name: 'Tread water 10 sec. wearing PFD', category: 'Surface Support' },
      { id: 'ps4-4', name: 'Open eyes underwater', category: 'Underwater Skills' },
      { id: 'ps4-5', name: 'Recover object from bottom in chest-deep water', category: 'Underwater Skills' },
      { id: 'ps4-6', name: 'Wearing a PFD, sideways entry into deep water; tread 15 sec.; swim/kick 5 m', category: 'Swim to Survive Skills' },
      { id: 'ps4-7', name: 'Float on front 10 sec.', category: 'Movement / Swimming Skills' },
      { id: 'ps4-8', name: 'Float on back 10 sec.', category: 'Movement / Swimming Skills' },
      { id: 'ps4-9', name: 'Roll laterally front to back and back to front', category: 'Movement / Swimming Skills' },
      { id: 'ps4-10', name: 'Glide on front 5 m', category: 'Movement / Swimming Skills' },
      { id: 'ps4-11', name: 'Glide on back 5 m', category: 'Movement / Swimming Skills' },
      { id: 'ps4-12', name: 'Flutter kick on back 10 m', category: 'Movement / Swimming Skills' },
      { id: 'ps4-13', name: 'Flutter kick on front 10 m', category: 'Movement / Swimming Skills' },
      { id: 'ps4-14', name: 'Water Smart messages', category: 'Water Smart Education' }
    ],
    'Preschool 5': [
      { id: 'ps5-1', name: 'Jump into deep water, return and exit', category: 'Entries and Exits' },
      { id: 'ps5-2', name: 'Sideways entry', category: 'Entries and Exits' },
      { id: 'ps5-3', name: 'Tread water 15 sec.', category: 'Surface Support' },
      { id: 'ps5-4', name: 'Submerge and exhale 10 times', category: 'Underwater Skills' },
      { id: 'ps5-5', name: 'Recover object from bottom in chest-deep water', category: 'Underwater Skills' },
      { id: 'ps5-6', name: 'Jump into deep water and assume Heat Escape Lessening Position (H.E.L.P.) wearing PFD', category: 'Swim to Survive Skills' },
      { id: 'ps5-7', name: 'Roll from front to back and back to front', category: 'Movement / Swimming Skills' },
      { id: 'ps5-8', name: 'Flutter kick on front 15 m', category: 'Movement / Swimming Skills' },
      { id: 'ps5-9', name: 'Flutter kick on back 15 m', category: 'Movement / Swimming Skills' },
      { id: 'ps5-10', name: 'Front swim 10 m', category: 'Movement / Swimming Skills' },
      { id: 'ps5-11', name: 'Back swim 10 m', category: 'Movement / Swimming Skills' },
      { id: 'ps5-12', name: 'Water Smart messages', category: 'Water Smart Education' }
    ],
    'Swimmer 1': [
      { id: 's1-1', name: 'Jump into deep water', category: 'Entries and Exits' },
      { id: 's1-2', name: 'Tread water 1 min.', category: 'Surface Support' },
      { id: 's1-3', name: 'Open eyes underwater and submerge', category: 'Underwater Skills' },
      { id: 's1-4', name: 'Sideways entry into deep water; tread 30 sec.; swim 50 m', category: 'Swim to Survive Skills' },
      { id: 's1-5', name: 'Roll from front to back to front', category: 'Movement / Swimming Skills' },
      { id: 's1-6', name: 'Flutter kick on front 15 m', category: 'Movement / Swimming Skills' },
      { id: 's1-7', name: 'Flutter kick on back 15 m', category: 'Movement / Swimming Skills' },
      { id: 's1-8', name: 'Front crawl swim 15 m', category: 'Movement / Swimming Skills' },
      { id: 's1-9', name: 'Back crawl swim 15 m', category: 'Movement / Swimming Skills' },
      { id: 's1-10', name: 'Whip kick on back 15 m', category: 'Movement / Swimming Skills' },
      { id: 's1-11', name: 'Distance swim 50 m', category: 'Movement / Swimming Skills' },
      { id: 's1-12', name: 'Water Smart messages', category: 'Water Smart Education' }
    ],
    'Swimmer 2': [
      { id: 's2-1', name: 'Feet-first surface dive', category: 'Entries and Exits' },
      { id: 's2-2', name: 'Tread water 1 min. (kick only)', category: 'Surface Support' },
      { id: 's2-3', name: 'Interval training 4 x 25 m', category: 'Fitness' },
      { id: 's2-4', name: 'Wearing a PFD or clothing, jump into deep water; tread 1 min.; swim 50 m', category: 'Swim to Survive Skills' },
      { id: 's2-5', name: 'Handstand in shallow water', category: 'Movement / Swimming Skills' },
      { id: 's2-6', name: 'Flutter kick on side 25 m', category: 'Movement / Swimming Skills' },
      { id: 's2-7', name: 'Front crawl swim 25 m', category: 'Movement / Swimming Skills' },
      { id: 's2-8', name: 'Back crawl swim 25 m', category: 'Movement / Swimming Skills' },
      { id: 's2-9', name: 'Whip kick on front 15 m', category: 'Movement / Swimming Skills' },
      { id: 's2-10', name: 'Breaststroke swim 15 m', category: 'Movement / Swimming Skills' },
      { id: 's2-11', name: 'Distance swim 75 m', category: 'Movement / Swimming Skills' },
      { id: 's2-12', name: 'Water Smart messages', category: 'Water Smart Education' }
    ],
    'Swimmer 3': [
      { id: 's3-1', name: 'Feet-first entry', category: 'Entries and Exits' },
      { id: 's3-2', name: 'Head-first surface dive', category: 'Entries and Exits' },
      { id: 's3-3', name: 'Tread water 1 min. (no hands)', category: 'Surface Support' },
      { id: 's3-4', name: 'Interval training 4 x 50 m', category: 'Fitness' },
      { id: 's3-5', name: 'Wearing a PFD or clothing, jump into deep water; tread 1 min.; swim 75 m', category: 'Swim to Survive Skills' },
      { id: 's3-6', name: 'Surface support – 30 sec.', category: 'Movement / Swimming Skills' },
      { id: 's3-7', name: 'Front crawl swim 50 m', category: 'Movement / Swimming Skills' },
      { id: 's3-8', name: 'Back crawl swim 50 m', category: 'Movement / Swimming Skills' },
      { id: 's3-9', name: 'Breaststroke swim 25 m', category: 'Movement / Swimming Skills' },
      { id: 's3-10', name: 'Distance swim 150 m', category: 'Movement / Swimming Skills' },
      { id: 's3-11', name: 'Water Smart messages', category: 'Water Smart Education' }
    ],
    'Swimmer 4': [
      { id: 's4-1', name: 'Shallow dive from deck or blocks', category: 'Entries and Exits' },
      { id: 's4-2', name: 'Tread water 1:30 min. (no hands)', category: 'Surface Support' },
      { id: 's4-3', name: 'Interval training 4 x 75 m', category: 'Fitness' },
      { id: 's4-4', name: 'Wearing clothing, jump into deep water; remove the clothes; tread 1 min.; swim 75 m', category: 'Swim to Survive Skills' },
      { id: 's4-5', name: 'Front crawl swim 75 m', category: 'Movement / Swimming Skills' },
      { id: 's4-6', name: 'Back crawl swim 75 m', category: 'Movement / Swimming Skills' },
      { id: 's4-7', name: 'Breaststroke swim 50 m', category: 'Movement / Swimming Skills' },
      { id: 's4-8', name: 'Elementary backstroke 25 m', category: 'Movement / Swimming Skills' },
      { id: 's4-9', name: 'Sidestroke 25 m', category: 'Movement / Swimming Skills' },
      { id: 's4-10', name: 'Distance swim 300 m', category: 'Movement / Swimming Skills' },
      { id: 's4-11', name: 'Water Smart messages', category: 'Water Smart Education' }
    ],
    'Swimmer 5': [
      { id: 's5-1', name: 'Tread water 2 min. (no hands)', category: 'Surface Support' },
      { id: 's5-2', name: 'Interval training 6 x 75 m', category: 'Fitness' },
      { id: 's5-3', name: 'Wearing clothing, feet-first entry into deep water; tread 2 min.; swim 150 m', category: 'Swim to Survive Skills' },
      { id: 's5-4', name: 'Front crawl swim 100 m', category: 'Movement / Swimming Skills' },
      { id: 's5-5', name: 'Back crawl swim 100 m', category: 'Movement / Swimming Skills' },
      { id: 's5-6', name: 'Breaststroke swim 100 m', category: 'Movement / Swimming Skills' },
      { id: 's5-7', name: 'Elementary backstroke 50 m', category: 'Movement / Swimming Skills' },
      { id: 's5-8', name: 'Sidestroke 50 m', category: 'Movement / Swimming Skills' },
      { id: 's5-9', name: 'Distance swim 400 m', category: 'Movement / Swimming Skills' },
      { id: 's5-10', name: 'Water Smart messages', category: 'Water Smart Education' }
    ],
    'Swimmer 6': [
      { id: 's6-1', name: 'Interval training 8 x 100 m', category: 'Fitness' },
      { id: 's6-2', name: 'Wearing clothing, feet-first entry; tread 2 min.; swim 200 m (remove clothing), including 25 m after-clothes-removal', category: 'Swim to Survive Skills' },
      { id: 's6-3', name: 'Front crawl swim 100 m', category: 'Movement / Swimming Skills' },
      { id: 's6-4', name: 'Back crawl swim 100 m', category: 'Movement / Swimming Skills' },
      { id: 's6-5', name: 'Breaststroke swim 100 m', category: 'Movement / Swimming Skills' },
      { id: 's6-6', name: 'Elementary backstroke 100 m', category: 'Movement / Swimming Skills' },
      { id: 's6-7', name: 'Sidestroke 100 m', category: 'Movement / Swimming Skills' },
      { id: 's6-8', name: 'Distance swim 500 m', category: 'Movement / Swimming Skills' },
      { id: 's6-9', name: 'Water Smart messages', category: 'Water Smart Education' }
    ],
    'Rookie Patrol': [
      { id: 'rp-1', name: 'Front crawl – 50 m or yd.', category: 'H2O Proficiency' },
      { id: 'rp-2', name: 'Back crawl – 50 m or yd.', category: 'H2O Proficiency' },
      { id: 'rp-3', name: 'Breaststroke – 50 m or yd.', category: 'H2O Proficiency' },
      { id: 'rp-4', name: 'Head-up front crawl or breaststroke – 25 m or yd.', category: 'H2O Proficiency' },
      { id: 'rp-5', name: 'Scull in ready position – 30 sec.', category: 'H2O Proficiency' },
      { id: 'rp-6', name: 'Carry object (2.3 kg) – 15 m or yd.', category: 'H2O Proficiency' },
      { id: 'rp-7', name: 'Surface dives, foot-first & head-first', category: 'H2O Proficiency' },
      { id: 'rp-8', name: 'Lifesaving kick – 25 m or yd.', category: 'H2O Proficiency' },
      { id: 'rp-9', name: 'Inflate clothing / use as buoyant assist', category: 'H2O Proficiency' },
      { id: 'rp-10', name: 'Obstacle swim – 25 m or yd.', category: 'H2O Proficiency' },
      { id: 'rp-11', name: 'Fitness training: 350 m or yd. workout (3 times)', category: 'H2O Proficiency' },
      { id: 'rp-12', name: 'Swim 100 m in 3 min. (100 yd. in 2:40 min.) or better', category: 'H2O Proficiency' },
      { id: 'rp-13', name: 'Assess conscious victim', category: 'First Aid' },
      { id: 'rp-14', name: 'Contacting EMS', category: 'First Aid' },
      { id: 'rp-15', name: 'Care for external bleeding', category: 'First Aid' },
      { id: 'rp-16', name: 'Look & see', category: 'Recognition & Rescue' },
      { id: 'rp-17', name: 'Victim simulation', category: 'Recognition & Rescue' },
      { id: 'rp-18', name: 'Victim recognition', category: 'Recognition & Rescue' },
      { id: 'rp-19', name: 'Rescue drill: throw aid to target – 30 sec.', category: 'Recognition & Rescue' }
    ],
    'Ranger Patrol': [
      { id: 'rgp-1', name: 'Somersault sequence, forward & backward', category: 'H2O Proficiency' },
      { id: 'rgp-2', name: 'Stride entry & swim head-up – 25 m or yd. Ready position', category: 'H2O Proficiency' },
      { id: 'rgp-3', name: 'Eggbeater kick on back – 25 m or yd.', category: 'H2O Proficiency' },
      { id: 'rgp-4', name: 'Support object (2.3 kg) – 1 min.', category: 'H2O Proficiency' },
      { id: 'rgp-5', name: 'Search & recover object', category: 'H2O Proficiency' },
      { id: 'rgp-6', name: 'Remove conscious victim', category: 'H2O Proficiency' },
      { id: 'rgp-7', name: 'Front crawl – 75 m or yd.', category: 'H2O Proficiency' },
      { id: 'rgp-8', name: 'Back crawl – 75 m or yd.', category: 'H2O Proficiency' },
      { id: 'rgp-9', name: 'Breaststroke – 75 m or yd.', category: 'H2O Proficiency' },
      { id: 'rgp-10', name: 'Lifesaving medley – 100 m or yd. (3 times)', category: 'H2O Proficiency' },
      { id: 'rgp-11', name: 'Swim 200 m in 6 min. (200 yd. in 5:20 min.) or better', category: 'H2O Proficiency' },
      { id: 'rgp-12', name: 'Assess unconscious, breathing victim', category: 'First Aid' },
      { id: 'rgp-13', name: 'Care for victim in shock', category: 'First Aid' },
      { id: 'rgp-14', name: 'Obstructed airway – conscious victim', category: 'First Aid' },
      { id: 'rgp-15', name: 'Victim simulation', category: 'Recognition & Rescue' },
      { id: 'rgp-16', name: 'Victim recognition', category: 'Recognition & Rescue' },
      { id: 'rgp-17', name: 'Victim avoidance', category: 'Recognition & Rescue' },
      { id: 'rgp-18', name: 'Rescue with buoyant aid – 20 m or yd.', category: 'Recognition & Rescue' }
    ],
    'Star Patrol': [
      { id: 'sp-1', name: 'Entries with aids – at least 2', category: 'H2O Proficiency' },
      { id: 'sp-2', name: 'Head-up swim (25 m or yd.) & scull in ready position', category: 'H2O Proficiency' },
      { id: 'sp-3', name: 'Defence methods – front, side & rear', category: 'H2O Proficiency' },
      { id: 'sp-4', name: 'Eggbeater kick – travel, change direction & height', category: 'H2O Proficiency' },
      { id: 'sp-5', name: 'Carry object (4.5 kg) – 25 m or yd.', category: 'H2O Proficiency' },
      { id: 'sp-6', name: 'Remove unconscious victim', category: 'H2O Proficiency' },
      { id: 'sp-7', name: 'Search to recover object', category: 'H2O Proficiency' },
      { id: 'sp-8', name: 'Turn & support victim face-up – shallow water', category: 'H2O Proficiency' },
      { id: 'sp-9', name: 'Front crawl – 100 m or yd.', category: 'H2O Proficiency' },
      { id: 'sp-10', name: 'Back crawl – 100 m or yd.', category: 'H2O Proficiency' },
      { id: 'sp-11', name: 'Breaststroke – 100 m or yd.', category: 'H2O Proficiency' },
      { id: 'sp-12', name: 'Fitness training: 600 m or yd. workout (3 times)', category: 'H2O Proficiency' },
      { id: 'sp-13', name: 'Swim 300 m in 9 min. (300 yd. in 8:00 min.) or better', category: 'H2O Proficiency' },
      { id: 'sp-14', name: 'Care for bone or joint injury', category: 'First Aid' },
      { id: 'sp-15', name: 'Care for respiratory emergency – asthma or allergic reaction', category: 'First Aid' },
      { id: 'sp-16', name: 'Locate & describe submerged object', category: 'Recognition & Rescue' },
      { id: 'sp-17', name: 'Rescue with towing aid – 20 m or yd.', category: 'Recognition & Rescue' }
    ],
    'Adult 1': [
      { id: 'a1-1', name: 'Water adjustment and breath control', category: 'Water Adjustment' },
      { id: 'a1-2', name: 'Buoyancy and balance', category: 'Water Adjustment' },
      { id: 'a1-3', name: 'Front float and recovery', category: 'Movement / Swimming Skills' },
      { id: 'a1-4', name: 'Back float and recovery', category: 'Movement / Swimming Skills' },
      { id: 'a1-5', name: 'Front glide and recovery', category: 'Movement / Swimming Skills' },
      { id: 'a1-6', name: 'Back glide and recovery', category: 'Movement / Swimming Skills' },
      { id: 'a1-7', name: 'Roll-over: front to back', category: 'Movement / Swimming Skills' },
      { id: 'a1-8', name: 'Roll-over: back to front', category: 'Movement / Swimming Skills' },
      { id: 'a1-9', name: 'Treading', category: 'Movement / Swimming Skills' },
      { id: 'a1-10', name: 'Front swim 10 m', category: 'Movement / Swimming Skills' },
      { id: 'a1-11', name: 'Back swim 10 m', category: 'Movement / Swimming Skills' },
      { id: 'a1-12', name: 'Water Smart messages', category: 'Water Smart Education' }
    ],
    'Adult 2': [
      { id: 'a2-1', name: 'Submerge and breath control', category: 'Underwater Skills' },
      { id: 'a2-2', name: 'Treading 1 min.', category: 'Surface Support' },
      { id: 'a2-3', name: 'Front swim 25 m', category: 'Movement / Swimming Skills' },
      { id: 'a2-4', name: 'Back swim 25 m', category: 'Movement / Swimming Skills' },
      { id: 'a2-5', name: 'Introduction to front crawl', category: 'Movement / Swimming Skills' },
      { id: 'a2-6', name: 'Introduction to back crawl', category: 'Movement / Swimming Skills' },
      { id: 'a2-7', name: 'Introduction to breaststroke', category: 'Movement / Swimming Skills' },
      { id: 'a2-8', name: 'Water Smart messages', category: 'Water Smart Education' }
    ],
    'Adult 3': [
      { id: 'a3-1', name: 'Deep water activities', category: 'Entries and Exits' },
      { id: 'a3-2', name: 'Treading 2 min.', category: 'Surface Support' },
      { id: 'a3-3', name: 'Front crawl 50 m', category: 'Movement / Swimming Skills' },
      { id: 'a3-4', name: 'Back crawl 50 m', category: 'Movement / Swimming Skills' },
      { id: 'a3-5', name: 'Breaststroke 25 m', category: 'Movement / Swimming Skills' },
      { id: 'a3-6', name: 'Introduction to sidestroke', category: 'Movement / Swimming Skills' },
      { id: 'a3-7', name: 'Introduction to elementary backstroke', category: 'Movement / Swimming Skills' },
      { id: 'a3-8', name: 'Distance swim 150 m', category: 'Movement / Swimming Skills' },
      { id: 'a3-9', name: 'Water Smart messages', category: 'Water Smart Education' }
    ],
    'Fitness': [
      { id: 'f-1', name: 'Proper warm-up and cool-down', category: 'Fitness Training' },
      { id: 'f-2', name: 'Target heart rate zone training', category: 'Fitness Training' },
      { id: 'f-3', name: 'Interval training techniques', category: 'Fitness Training' },
      { id: 'f-4', name: 'Endurance building', category: 'Fitness Training' },
      { id: 'f-5', name: 'Stroke efficiency and technique refinement', category: 'Fitness Training' },
      { id: 'f-6', name: 'Personal fitness goal setting', category: 'Fitness Training' }
    ]
  };

  useEffect(() => {
    const savedData = localStorage.getItem('swimTrackerData');
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setClasses(parsed.classes || []);
      setStudents(parsed.students || []);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('swimTrackerData', JSON.stringify({ classes, students }));
  }, [classes, students]);

  const handleAddClass = () => {
    if (!newClass.name.trim()) {
      setClassError('Please enter a class name');
      return;
    }
    if (newClass.levels.length === 0) {
      setClassError('Please select at least one level');
      return;
    }

    const classObj = {
      id: Date.now().toString(),
      ...newClass
    };

    setClasses([...classes, classObj]);
    setNewClass({
      name: '',
      levels: [],
      day: 'Monday',
      time: '',
      year: new Date().getFullYear(),
      season: 'Winter'
    });
    setShowAddClassForm(false);
    setClassError('');
  };

  const handleAddStudent = () => {
    if (!newStudent.name.trim() || !newStudent.classId || !newStudent.studentLevel) {
      return;
    }

    const selectedClass = classes.find(c => c.id === newStudent.classId);
    const skills = skillsByLevel[newStudent.studentLevel] || [];
    
    const studentObj = {
      id: Date.now().toString(),
      name: newStudent.name,
      classId: newStudent.classId,
      className: selectedClass.name,
      studentLevel: newStudent.studentLevel,
      pronouns: newStudent.pronouns,
      skills: skills.map(skill => ({
        ...skill,
        progress: 'Not Started',
        skillNotes: ''
      })),
      notes: ''
    };

    setStudents([...students, studentObj]);
    setNewStudent({
      name: '',
      classId: '',
      studentLevel: '',
      pronouns: 'they/them'
    });
    setShowAddStudentForm(false);
  };

  const updateSkillProgress = (studentId, skillId, progress) => {
    setStudents(students.map(student => {
      if (student.id === studentId) {
        return {
          ...student,
          skills: student.skills.map(skill =>
            skill.id === skillId ? { ...skill, progress } : skill
          )
        };
      }
      return student;
    }));
  };

  const updateSkillNotes = (studentId, skillId, skillNotes) => {
    setStudents(students.map(student => {
      if (student.id === studentId) {
        return {
          ...student,
          skills: student.skills.map(skill =>
            skill.id === skillId ? { ...skill, skillNotes } : skill
          )
        };
      }
      return student;
    }));
  };

  const updateNotes = (studentId, notes) => {
    setStudents(students.map(student =>
      student.id === studentId ? { ...student, notes } : student
    ));
  };

  const deleteClass = (classId) => {
    if (window.confirm('Are you sure you want to delete this class? All associated students will also be deleted.')) {
      setClasses(classes.filter(c => c.id !== classId));
      setStudents(students.filter(s => s.classId !== classId));
    }
  };

  const deleteStudent = (studentId) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      setStudents(students.filter(s => s.id !== studentId));
    }
  };

  const startEditingClass = (classObj) => {
    setEditingClass({ ...classObj });
  };

  const saveClassEdit = () => {
    setClasses(classes.map(c => c.id === editingClass.id ? editingClass : c));
    setEditingClass(null);
  };

  const startEditingStudent = (student) => {
    setEditingStudent({ ...student });
  };

  const saveStudentEdit = () => {
    const skills = skillsByLevel[editingStudent.studentLevel] || [];
    const updatedStudent = {
      ...editingStudent,
      skills: skills.map(skill => {
        const existing = editingStudent.skills.find(s => s.id === skill.id);
        return existing ? existing : { ...skill, progress: 'Not Started', skillNotes: '' };
      })
    };
    
    setStudents(students.map(s => s.id === editingStudent.id ? updatedStudent : s));
    setEditingStudent(null);
  };

  const exportData = () => {
    const dataStr = JSON.stringify({ classes, students }, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `swim-tracker-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const importData = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result);
          if (data.classes && data.students) {
            setClasses(data.classes);
            setStudents(data.students);
            alert('Data imported successfully!');
          }
        } catch (error) {
          alert('Error importing data. Please check the file format.');
        }
      };
      reader.readAsText(file);
    }
  };

  const addSessionDate = (classId) => {
    const today = new Date().toISOString().split('T')[0];
    setClasses(classes.map(c => {
      if (c.id === classId) {
        const sessionDates = c.sessionDates || [];
        if (!sessionDates.includes(today)) {
          return { ...c, sessionDates: [...sessionDates, today].sort() };
        }
      }
      return c;
    }));
  };

  const removeSessionDate = (classId, date) => {
    if (window.confirm('Remove this session date? Student attendance for this date will be lost.')) {
      setClasses(classes.map(c => {
        if (c.id === classId) {
          return { ...c, sessionDates: (c.sessionDates || []).filter(d => d !== date) };
        }
        return c;
      }));
      setStudents(students.map(s => {
        if (s.classId === classId && s.attendance) {
          const newAttendance = { ...s.attendance };
          delete newAttendance[date];
          return { ...s, attendance: newAttendance };
        }
        return s;
      }));
    }
  };

  const toggleAttendance = (studentId, date) => {
    setStudents(students.map(s => {
      if (s.id === studentId) {
        const attendance = s.attendance || {};
        return { 
          ...s, 
          attendance: { 
            ...attendance, 
            [date]: !attendance[date] 
          } 
        };
      }
      return s;
    }));
  };

  const getAttendanceStats = (studentId, classId) => {
    const student = students.find(s => s.id === studentId);
    const classObj = classes.find(c => c.id === classId);
    if (!student || !classObj) return { attended: 0, total: 0, percentage: 0 };
    
    const sessionDates = classObj.sessionDates || [];
    const attendance = student.attendance || {};
    const attended = sessionDates.filter(date => attendance[date]).length;
    const percentage = sessionDates.length > 0 ? Math.round((attended / sessionDates.length) * 100) : 0;
    
    return { attended, total: sessionDates.length, percentage };
  };

  const resetAllData = () => {
    const confirmMessage = 
      "⚠️ WARNING: This will permanently delete ALL data!\n\n" +
      "This includes:\n" +
      "• All classes\n" +
      "• All students\n" +
      "• All progress tracking\n" +
      "• All attendance records\n\n" +
      "This action CANNOT be undone!\n\n" +
      "Type 'DELETE' below to confirm:";
    
    const userInput = window.prompt(confirmMessage);
    
    if (userInput === 'DELETE') {
      localStorage.removeItem('swimTrackerData');
      setClasses([]);
      setStudents([]);
      setExpandedClass(null);
      setExpandedStudent(null);
      setEditingClass(null);
      setEditingStudent(null);
      setShowAddClassForm(false);
      setShowAddStudentForm(false);
      alert('✓ All data has been deleted. App reset to initial state.');
    } else if (userInput !== null) {
      alert('Reset cancelled. You must type DELETE exactly to confirm.');
    }
  };

  const toggleLevelSelection = (level) => {
    setNewClass(prev => ({
      ...prev,
      levels: prev.levels.includes(level)
        ? prev.levels.filter(l => l !== level)
        : [...prev.levels, level]
    }));
  };

  const openReportDialog = (studentId) => {
    setReportSettings({ ...reportSettings, studentId });
    setShowReportDialog(true);
    setShowingPrompt(true);
    generatePrompt(studentId, reportSettings.wordLength, reportSettings.reportType);
  };

  const generatePrompt = (studentId = reportSettings.studentId, wordLength = reportSettings.wordLength, reportType = reportSettings.reportType) => {
    const student = students.find(s => s.id === studentId);
    if (!student) return;

    const proficientSkills = student.skills.filter(s => s.progress === 'Proficient');
    const practicingSkills = student.skills.filter(s => s.progress === 'Practicing');
    const learningSkills = student.skills.filter(s => s.progress === 'Learning');
    const notStartedSkills = student.skills.filter(s => s.progress === 'Not Started');

    const skillsByCategory = (skillList) => {
      const grouped = {};
      skillList.forEach(skill => {
        if (!grouped[skill.category]) {
          grouped[skill.category] = [];
        }
        grouped[skill.category].push(skill);
      });
      return grouped;
    };

    const proficientByCategory = skillsByCategory(proficientSkills);
    const practicingByCategory = skillsByCategory(practicingSkills);
    const learningByCategory = skillsByCategory(learningSkills);

    const reportTypeText = reportType === 'midterm' ? 'midterm progress report' : 'final report card';
    
    let prompt = `You are writing a ${reportTypeText} comment for ${student.name} (pronouns: ${student.pronouns}), a student in ${student.className} at the ${student.studentLevel} level.\n\n`;
    
    if (Object.keys(proficientByCategory).length > 0) {
      prompt += `PROFICIENT SKILLS:\n`;
      Object.keys(proficientByCategory).forEach(category => {
        prompt += `\n${category}:\n`;
        proficientByCategory[category].forEach(skill => {
          prompt += `- ${skill.name}`;
          if (skill.skillNotes) {
            prompt += ` (Notes: ${skill.skillNotes})`;
          }
          prompt += `\n`;
        });
      });
    }

    if (Object.keys(practicingByCategory).length > 0) {
      prompt += `\nPRACTICING SKILLS:\n`;
      Object.keys(practicingByCategory).forEach(category => {
        prompt += `\n${category}:\n`;
        practicingByCategory[category].forEach(skill => {
          prompt += `- ${skill.name}`;
          if (skill.skillNotes) {
            prompt += ` (Notes: ${skill.skillNotes})`;
          }
          prompt += `\n`;
        });
      });
    }

    if (Object.keys(learningByCategory).length > 0) {
      prompt += `\nLEARNING SKILLS:\n`;
      Object.keys(learningByCategory).forEach(category => {
        prompt += `\n${category}:\n`;
        learningByCategory[category].forEach(skill => {
          prompt += `- ${skill.name}`;
          if (skill.skillNotes) {
            prompt += ` (Notes: ${skill.skillNotes})`;
          }
          prompt += `\n`;
        });
      });
    }

    if (student.notes) {
      prompt += `\nINSTRUCTOR NOTES:\n${student.notes}\n`;
    }

    if (reportType === 'midterm') {
      prompt += `\nWrite a warm, encouraging progress report comment (approximately ${wordLength} words) that:\n`;
      prompt += `1. Highlights specific skills ${student.name} has mastered (Proficient)\n`;
      prompt += `2. Notes what ${student.pronouns.split('/')[0]} ${student.pronouns.split('/')[0] === 'they' ? 'are' : 'is'} currently practicing and learning\n`;
      prompt += `3. Encourages continued practice and growth\n`;
      prompt += `4. Uses ${student.pronouns} pronouns throughout\n`;
      prompt += `5. Maintains a positive, supportive tone appropriate for a midterm check-in\n`;
    } else {
      prompt += `\nWrite a comprehensive final report card comment (approximately ${wordLength} words) that:\n`;
      prompt += `1. Celebrates ${student.name}'s overall progress and achievements this session\n`;
      prompt += `2. Highlights specific accomplishments and proficient skills\n`;
      prompt += `3. Notes skills being practiced and areas for continued development\n`;
      prompt += `4. Provides encouragement for future swimming endeavors\n`;
      prompt += `5. Uses ${student.pronouns} pronouns throughout\n`;
      prompt += `6. Maintains a warm, celebratory tone appropriate for end-of-session recognition\n`;
    }

    setGeneratedComment(prompt);
    setShowingPrompt(true);
  };

  const generateActualComment = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [
            { role: "user", content: generatedComment }
          ],
        })
      });

      const data = await response.json();
      const commentText = data.content
        .filter(item => item.type === "text")
        .map(item => item.text)
        .join("\n");
      
      setGeneratedComment(commentText);
      setShowingPrompt(false);
    } catch (error) {
      console.error('Error generating comment:', error);
      alert('Error generating comment. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const getClassStudents = (classId) => {
    return students.filter(s => s.classId === classId);
  };

  const getStudentProgress = (student) => {
    const proficient = student.skills.filter(s => s.progress === 'Proficient').length;
    const practicing = student.skills.filter(s => s.progress === 'Practicing').length;
    const learning = student.skills.filter(s => s.progress === 'Learning').length;
    const notStarted = student.skills.filter(s => s.progress === 'Not Started').length;
    const total = student.skills.length;
    
    // Calculate percentage based on weighted progress
    // Proficient = 100%, Practicing = 75%, Learning = 50%, Not Started = 0%
    const weightedScore = (proficient * 100 + practicing * 75 + learning * 50) / total;
    const percentage = total > 0 ? Math.round(weightedScore) : 0;
    
    return { proficient, practicing, learning, notStarted, total, percentage };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 p-2 sm:p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 mb-4 sm:mb-6 md:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 text-center">
            Swim Student Tracker
          </h1>
          <p className="text-sm sm:text-base text-gray-600 text-center mb-4">Track student progress across all swimming levels</p>
          <div className="flex flex-col sm:flex-row gap-2 justify-center">
            <button
              onClick={exportData}
              className="px-4 py-2 bg-green-600 text-white text-sm font-semibold rounded-lg hover:bg-green-700 transition"
            >
              Export Data
            </button>
            <label className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition cursor-pointer text-center">
              Import Data
              <input type="file" accept=".json" onChange={importData} className="hidden" />
            </label>
            <button
              onClick={resetAllData}
              className="px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded-lg hover:bg-red-700 transition"
            >
              Reset All Data
            </button>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Users className="w-5 h-5 sm:w-6 sm:h-6" />
              Classes
            </h2>
            <button
              onClick={() => setShowAddClassForm(!showAddClassForm)}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-cyan-700 transition shadow-lg text-sm sm:text-base"
            >
              <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
              Add Class
            </button>
          </div>

          {showAddClassForm && (
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-2xl mb-6 border-2 border-blue-200">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">New Class</h3>
              {classError && (
                <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg">
                  {classError}
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Class Name"
                  value={newClass.name}
                  onChange={(e) => setNewClass({ ...newClass, name: e.target.value })}
                  className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <select
                  value={newClass.day}
                  onChange={(e) => setNewClass({ ...newClass, day: e.target.value })}
                  className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option>Monday</option>
                  <option>Tuesday</option>
                  <option>Wednesday</option>
                  <option>Thursday</option>
                  <option>Friday</option>
                  <option>Saturday</option>
                  <option>Sunday</option>
                </select>
                <input
                  type="time"
                  value={newClass.time}
                  onChange={(e) => setNewClass({ ...newClass, time: e.target.value })}
                  className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <select
                  value={newClass.season}
                  onChange={(e) => setNewClass({ ...newClass, season: e.target.value })}
                  className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option>Winter</option>
                  <option>Spring</option>
                  <option>Summer</option>
                  <option>Fall</option>
                </select>
                <input
                  type="number"
                  placeholder="Year"
                  value={newClass.year}
                  onChange={(e) => setNewClass({ ...newClass, year: parseInt(e.target.value) })}
                  className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex flex-col">
                  <label className="text-xs text-gray-600 mb-1">Session Length (weeks)</label>
                  <input
                    type="number"
                    placeholder="8"
                    min="1"
                    max="52"
                    value={newClass.sessionLength}
                    onChange={(e) => setNewClass({ ...newClass, sessionLength: parseInt(e.target.value) || 8 })}
                    className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2 text-gray-700">Select Levels for this Class:</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 max-h-60 overflow-y-auto p-3 bg-white rounded-xl border border-gray-200">
                  {levels.map(level => (
                    <label key={level} className="flex items-center gap-2 p-2 hover:bg-blue-50 rounded-lg cursor-pointer transition">
                      <input
                        type="checkbox"
                        checked={newClass.levels.includes(level)}
                        onChange={() => toggleLevelSelection(level)}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">{level}</span>
                    </label>
                  ))}
                </div>
                {newClass.levels.length > 0 && (
                  <div className="mt-2 text-sm text-gray-600">
                    Selected: {newClass.levels.join(', ')}
                  </div>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleAddClass}
                  className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition"
                >
                  <Save className="w-4 h-4" />
                  Save Class
                </button>
                <button
                  onClick={() => {
                    setShowAddClassForm(false);
                    setClassError('');
                  }}
                  className="px-6 py-3 bg-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {classes.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <Users className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="text-lg">No classes yet. Add your first class to get started!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {classes.map(classObj => {
                const classStudents = getClassStudents(classObj.id);
                const isExpanded = expandedClass === classObj.id;

                return (
                  <div key={classObj.id} className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl border-2 border-gray-200 overflow-hidden">
                    <div className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 flex-1">
                          <button
                            onClick={() => setExpandedClass(isExpanded ? null : classObj.id)}
                            className="text-gray-600 hover:text-gray-900 transition"
                          >
                            {isExpanded ? <ChevronDown className="w-6 h-6" /> : <ChevronRight className="w-6 h-6" />}
                          </button>
                          
                          {editingClass?.id === classObj.id ? (
                            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-3">
                              <input
                                type="text"
                                value={editingClass.name}
                                onChange={(e) => setEditingClass({ ...editingClass, name: e.target.value })}
                                className="px-3 py-2 border border-gray-300 rounded-lg"
                              />
                              <input
                                type="time"
                                value={editingClass.time}
                                onChange={(e) => setEditingClass({ ...editingClass, time: e.target.value })}
                                className="px-3 py-2 border border-gray-300 rounded-lg"
                              />
                              <select
                                value={editingClass.day}
                                onChange={(e) => setEditingClass({ ...editingClass, day: e.target.value })}
                                className="px-3 py-2 border border-gray-300 rounded-lg"
                              >
                                <option>Monday</option>
                                <option>Tuesday</option>
                                <option>Wednesday</option>
                                <option>Thursday</option>
                                <option>Friday</option>
                                <option>Saturday</option>
                                <option>Sunday</option>
                              </select>
                            </div>
                          ) : (
                            <div>
                              <h3 className="text-xl font-bold text-gray-900">{classObj.name}</h3>
                              <p className="text-gray-600 text-sm">
                                {classObj.day} at {classObj.time} • {classObj.season} {classObj.year}
                              </p>
                              <p className="text-gray-500 text-sm mt-1">
                                Levels: {classObj.levels.join(', ')}
                              </p>
                              <p className="text-blue-600 font-semibold text-sm mt-1">
                                {classStudents.length} student{classStudents.length !== 1 ? 's' : ''}
                              </p>
                            </div>
                          )}
                        </div>

                        <div className="flex gap-2">
                          {editingClass?.id === classObj.id ? (
                            <>
                              <button
                                onClick={saveClassEdit}
                                className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                              >
                                <Save className="w-5 h-5" />
                              </button>
                              <button
                                onClick={() => setEditingClass(null)}
                                className="p-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
                              >
                                <X className="w-5 h-5" />
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                onClick={() => startEditingClass(classObj)}
                                className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                              >
                                <Edit2 className="w-5 h-5" />
                              </button>
                              <button
                                onClick={() => deleteClass(classObj.id)}
                                className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                              >
                                <X className="w-5 h-5" />
                              </button>
                            </>
                          )}
                        </div>
                      </div>

                      {isExpanded && (
                        <div className="mt-6">
                          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
                            <h4 className="text-lg font-semibold text-gray-900">Students</h4>
                            <button
                              onClick={() => {
                                setNewStudent({ ...newStudent, classId: classObj.id });
                                setShowAddStudentForm(true);
                              }}
                              className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-semibold rounded-lg hover:from-teal-700 hover:to-cyan-700 transition text-sm"
                            >
                              <Plus className="w-4 h-4" />
                              Add Student
                            </button>
                          </div>

                          {/* Attendance Tracker Section */}
                          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-3 sm:p-4 mb-4 border-2 border-purple-200">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-3">
                              <h5 className="font-bold text-gray-800 text-sm sm:text-base">📋 Attendance Tracker</h5>
                              <button
                                onClick={() => addSessionDate(classObj.id)}
                                className="w-full sm:w-auto px-3 py-1.5 bg-purple-600 text-white text-xs sm:text-sm font-semibold rounded-lg hover:bg-purple-700 transition"
                              >
                                + Today
                              </button>
                            </div>
                            
                            {(!classObj.sessionDates || classObj.sessionDates.length === 0) ? (
                              <p className="text-gray-600 text-xs sm:text-sm text-center py-2">No session dates yet. Click "+ Today" to add today's date.</p>
                            ) : (
                              <div className="overflow-x-auto -mx-3 sm:mx-0">
                                <div className="inline-block min-w-full align-middle">
                                  <table className="min-w-full text-xs sm:text-sm">
                                    <thead>
                                      <tr className="border-b-2 border-purple-200">
                                        <th className="text-left py-2 px-1 sm:px-2 font-semibold text-gray-700 sticky left-0 bg-gradient-to-r from-purple-50 to-pink-50 z-10">Student</th>
                                        {(classObj.sessionDates || []).map((date, idx) => (
                                          <th key={date} className="py-2 px-1 sm:px-2 text-center min-w-[60px] sm:min-w-[80px]">
                                            <div className="flex flex-col items-center gap-1">
                                              <span className="font-semibold text-gray-700">#{idx + 1}</span>
                                              <span className="text-[10px] sm:text-xs text-gray-500">{new Date(date + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                                              <button
                                                onClick={() => removeSessionDate(classObj.id, date)}
                                                className="text-red-500 hover:text-red-700 text-xs"
                                                title="Remove date"
                                              >
                                                ×
                                              </button>
                                            </div>
                                          </th>
                                        ))}
                                        <th className="text-center py-2 px-1 sm:px-2 font-semibold text-gray-700">Total</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {classStudents.map(student => {
                                        const stats = getAttendanceStats(student.id, classObj.id);
                                        return (
                                          <tr key={student.id} className="border-b border-purple-100 hover:bg-white/50">
                                            <td className="py-2 px-1 sm:px-2 font-medium text-gray-800 sticky left-0 bg-gradient-to-r from-purple-50 to-pink-50 z-10 text-xs sm:text-sm">
                                              {student.name}
                                            </td>
                                            {(classObj.sessionDates || []).map(date => {
                                              const attended = student.attendance?.[date];
                                              return (
                                                <td key={date} className="py-2 px-1 sm:px-2 text-center">
                                                  <input
                                                    type="checkbox"
                                                    checked={attended || false}
                                                    onChange={() => toggleAttendance(student.id, date)}
                                                    className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 rounded focus:ring-2 focus:ring-purple-500 cursor-pointer"
                                                  />
                                                </td>
                                              );
                                            })}
                                            <td className="py-2 px-1 sm:px-2 text-center font-semibold text-xs sm:text-sm">
                                              <span className={stats.percentage >= 80 ? 'text-green-600' : stats.percentage >= 60 ? 'text-yellow-600' : 'text-red-600'}>
                                                {stats.attended}/{stats.total} ({stats.percentage}%)
                                              </span>
                                            </td>
                                          </tr>
                                        );
                                      })}
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            )}
                          </div>

                          {showAddStudentForm && newStudent.classId === classObj.id && (
                            <div className="bg-white p-4 rounded-xl mb-4 border-2 border-teal-200">
                              <h5 className="font-semibold mb-3 text-gray-800">New Student</h5>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                                <input
                                  type="text"
                                  placeholder="Student Name"
                                  value={newStudent.name}
                                  onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                                />
                                <select
                                  value={newStudent.studentLevel}
                                  onChange={(e) => setNewStudent({ ...newStudent, studentLevel: e.target.value })}
                                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                                >
                                  <option value="">Select Level</option>
                                  {classObj.levels.map(level => (
                                    <option key={level} value={level}>{level}</option>
                                  ))}
                                </select>
                                <select
                                  value={newStudent.pronouns}
                                  onChange={(e) => setNewStudent({ ...newStudent, pronouns: e.target.value })}
                                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                                >
                                  <option value="they/them">they/them</option>
                                  <option value="she/her">she/her</option>
                                  <option value="he/him">he/him</option>
                                </select>
                              </div>
                              <div className="flex gap-2">
                                <button
                                  onClick={handleAddStudent}
                                  className="px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition text-sm"
                                >
                                  Save Student
                                </button>
                                <button
                                  onClick={() => {
                                    setShowAddStudentForm(false);
                                    setNewStudent({ name: '', classId: '', studentLevel: '', pronouns: 'they/them' });
                                  }}
                                  className="px-4 py-2 bg-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-400 transition text-sm"
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          )}

                          {classStudents.length === 0 ? (
                            <p className="text-gray-500 text-center py-8">No students in this class yet.</p>
                          ) : (
                            <div className="space-y-3">
                              {classStudents.map(student => {
                                const progress = getStudentProgress(student);
                                const isStudentExpanded = expandedStudent === student.id;
                                const skillsGrouped = {};
                                
                                student.skills.forEach(skill => {
                                  if (!skillsGrouped[skill.category]) {
                                    skillsGrouped[skill.category] = [];
                                  }
                                  skillsGrouped[skill.category].push(skill);
                                });

                                return (
                                  <div key={student.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                                    <div className="p-4">
                                      <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3 flex-1">
                                          <button
                                            onClick={() => setExpandedStudent(isStudentExpanded ? null : student.id)}
                                            className="text-gray-600 hover:text-gray-900 transition"
                                          >
                                            {isStudentExpanded ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                                          </button>
                                          
                                          {editingStudent?.id === student.id ? (
                                            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-2">
                                              <input
                                                type="text"
                                                value={editingStudent.name}
                                                onChange={(e) => setEditingStudent({ ...editingStudent, name: e.target.value })}
                                                className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                              />
                                              <select
                                                value={editingStudent.studentLevel}
                                                onChange={(e) => setEditingStudent({ ...editingStudent, studentLevel: e.target.value })}
                                                className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                              >
                                                {classObj.levels.map(level => (
                                                  <option key={level} value={level}>{level}</option>
                                                ))}
                                              </select>
                                              <select
                                                value={editingStudent.pronouns}
                                                onChange={(e) => setEditingStudent({ ...editingStudent, pronouns: e.target.value })}
                                                className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                              >
                                                <option value="they/them">they/them</option>
                                                <option value="she/her">she/her</option>
                                                <option value="he/him">he/him</option>
                                              </select>
                                            </div>
                                          ) : (
                                            <div className="flex-1">
                                              <h4 className="font-semibold text-gray-900">{student.name}</h4>
                                              <p className="text-sm text-gray-600">
                                                {student.studentLevel} • {student.pronouns}
                                              </p>
                                              <div className="mt-2">
                                                <div className="flex items-center gap-2">
                                                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                                                    <div
                                                      className="bg-gradient-to-r from-teal-500 to-cyan-500 h-2 rounded-full transition-all duration-300"
                                                      style={{ width: `${progress.percentage}%` }}
                                                    />
                                                  </div>
                                                  <span className="text-sm font-semibold text-gray-700">
                                                    {progress.percentage}%
                                                  </span>
                                                </div>
                                                <p className="text-xs text-gray-500 mt-1">
                                                  Proficient: {progress.proficient} | Practicing: {progress.practicing} | Learning: {progress.learning} | Not Started: {progress.notStarted}
                                                </p>
                                              </div>
                                            </div>
                                          )}
                                        </div>

                                        <div className="flex gap-2">
                                          {editingStudent?.id === student.id ? (
                                            <>
                                              <button
                                                onClick={saveStudentEdit}
                                                className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                                              >
                                                <Save className="w-4 h-4" />
                                              </button>
                                              <button
                                                onClick={() => setEditingStudent(null)}
                                                className="p-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
                                              >
                                                <X className="w-4 h-4" />
                                              </button>
                                            </>
                                          ) : (
                                            <>
                                              <button
                                                onClick={() => startEditingStudent(student)}
                                                className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                                              >
                                                <Edit2 className="w-4 h-4" />
                                              </button>
                                              <button
                                                onClick={() => deleteStudent(student.id)}
                                                className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                                              >
                                                <X className="w-4 h-4" />
                                              </button>
                                            </>
                                          )}
                                        </div>
                                      </div>

                                      {isStudentExpanded && (
                                        <div className="mt-4 pt-4 border-t">
                                          <h5 className="font-semibold text-gray-900 mb-3">Skills Progress</h5>
                                          <div className="space-y-4">
                                            {Object.keys(skillsGrouped).map(category => (
                                              <div key={category}>
                                                <h6 className="text-sm font-semibold text-gray-700 mb-2 bg-gray-100 px-3 py-2 rounded-lg">
                                                  {category}
                                                </h6>
                                                <div className="space-y-3 pl-2">
                                                  {skillsGrouped[category].map(skill => (
                                                    <div key={skill.id} className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                                                      <div className="flex items-start gap-3 mb-2">
                                                        <span className="text-sm flex-1 font-medium text-gray-800">
                                                          {skill.name}
                                                        </span>
                                                        <select
                                                          value={skill.progress}
                                                          onChange={(e) => updateSkillProgress(student.id, skill.id, e.target.value)}
                                                          className={`text-xs px-2 py-1 rounded-md border-2 font-semibold focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                                                            skill.progress === 'Proficient' ? 'bg-green-100 border-green-500 text-green-800' :
                                                            skill.progress === 'Practicing' ? 'bg-blue-100 border-blue-500 text-blue-800' :
                                                            skill.progress === 'Learning' ? 'bg-yellow-100 border-yellow-500 text-yellow-800' :
                                                            'bg-gray-100 border-gray-400 text-gray-600'
                                                          }`}
                                                        >
                                                          <option value="Not Started">Not Started</option>
                                                          <option value="Learning">Learning</option>
                                                          <option value="Practicing">Practicing</option>
                                                          <option value="Proficient">Proficient</option>
                                                        </select>
                                                      </div>
                                                      <textarea
                                                        value={skill.skillNotes || ''}
                                                        onChange={(e) => updateSkillNotes(student.id, skill.id, e.target.value)}
                                                        placeholder="Notes on this skill..."
                                                        className="w-full px-3 py-2 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                                                        rows="2"
                                                      />
                                                    </div>
                                                  ))}
                                                </div>
                                              </div>
                                            ))}
                                          </div>
                                          
                                          <div className="mt-4 pt-4 border-t">
                                            <label className="block text-sm font-semibold mb-2 text-gray-700">Notes</label>
                                            <textarea
                                              value={student.notes}
                                              onChange={(e) => updateNotes(student.id, e.target.value)}
                                              placeholder="Add notes about this student's progress..."
                                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
                                              rows="2"
                                            />
                                          </div>
                                          <div className="mt-4 pt-4 border-t">
                                            <button
                                              onClick={() => openReportDialog(student.id)}
                                              className="w-full px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition"
                                            >
                                              Generate Report Card Comment
                                            </button>
                                          </div>
                                          <div className="mt-4 pt-4 border-t flex justify-center">
                                            <button
                                              onClick={() => setExpandedStudent(null)}
                                              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition"
                                            >
                                              <span className="text-sm font-medium">Collapse</span>
                                              <ChevronDown className="w-4 h-4 rotate-180" />
                                            </button>
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="mt-6 flex justify-center gap-4">
          <button
            onClick={exportData}
            className="px-8 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition shadow-lg"
          >
            SAVE
          </button>
          <label className="px-8 py-3 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition shadow-lg cursor-pointer">
            Load Classes
            <input
              type="file"
              accept=".json"
              onChange={importData}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Report Card Dialog */}
      {showReportDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Generate Report Card Comment</h2>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">Report Type</label>
                <select
                  value={reportSettings.reportType}
                  onChange={(e) => {
                    const newType = e.target.value;
                    setReportSettings({ ...reportSettings, reportType: newType });
                    generatePrompt(reportSettings.studentId, reportSettings.wordLength, newType);
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="midterm">Midterm Report</option>
                  <option value="final">Final Report</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">Approximate Word Length</label>
                <input
                  type="number"
                  value={reportSettings.wordLength}
                  onChange={(e) => {
                    const newLength = parseInt(e.target.value) || 100;
                    setReportSettings({ ...reportSettings, wordLength: newLength });
                    generatePrompt(reportSettings.studentId, newLength, reportSettings.reportType);
                  }}
                  min="50"
                  max="500"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            {generatedComment && (
              <div className="mb-6">
                <label className="block text-sm font-semibold mb-2 text-gray-700">
                  {showingPrompt ? 'Generated Prompt' : 'Generated Comment'}
                </label>
                <textarea
                  value={generatedComment}
                  onChange={(e) => setGeneratedComment(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm font-mono"
                  rows="15"
                />
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(generatedComment);
                    alert(showingPrompt ? 'Prompt copied to clipboard!' : 'Comment copied to clipboard!');
                  }}
                  className="mt-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm"
                >
                  Copy to Clipboard
                </button>
              </div>
            )}

            <div className="flex gap-3 justify-end">
              {showingPrompt ? (
                <button
                  onClick={generateActualComment}
                  disabled={isGenerating}
                  className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-semibold disabled:bg-gray-400"
                >
                  {isGenerating ? 'Generating...' : 'Generate Comment'}
                </button>
              ) : (
                <button
                  onClick={() => generatePrompt()}
                  className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-semibold"
                >
                  Regenerate Prompt
                </button>
              )}
              <button
                onClick={() => setShowReportDialog(false)}
                className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Render the app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<SwimTracker />);

