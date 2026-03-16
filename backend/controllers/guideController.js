const guides = {
  pan: {
    id: 'pan',
    title: 'PAN Card Application',
    description: 'Permanent Account Number — required for tax filing, banking, and financial transactions in India.',
    authority: 'NSDL / UTIITSL',
    processingTime: '15–20 working days',
    fee: '₹107 (physical) | ₹72 (e-PAN)',
    difficulty: 'Easy',
    totalSteps: 8,
    portalUrl: 'https://www.onlineservices.nsdl.com/paam/endUserRegisterContact.html',
    requiredDocuments: [
      { name: 'Identity Proof', examples: 'Aadhaar Card, Voter ID, Passport, Driving License' },
      { name: 'Address Proof', examples: 'Aadhaar Card, Electricity Bill, Bank Statement (last 3 months)' },
      { name: 'Date of Birth Proof', examples: 'Birth Certificate, Aadhaar Card, Matriculation Certificate' },
      { name: 'Passport Photo', examples: '3.5cm × 4.5cm, white background, recent, clear face' },
      { name: 'Signature', examples: 'On white paper, black ink, within 2cm × 7cm box' }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Go to NSDL PAN Portal',
        instruction: 'Open your web browser and navigate to the official NSDL PAN application portal. Always use the official government website to avoid fraudulent third-party portals.',
        url: 'https://www.onlineservices.nsdl.com/paam/endUserRegisterContact.html',
        tips: ['Use Chrome or Firefox for best compatibility', 'Bookmark the official NSDL URL to avoid phishing sites', 'Ensure your internet connection is stable before starting'],
        highlight: 'Look for the green padlock 🔒 in the browser address bar — this confirms you are on a secure official site.',
        imageLabel: 'NSDL PAN Portal Homepage',
        imageBg: '#e8f0fe',
        imageIcon: '🌐'
      },
      {
        stepNumber: 2,
        title: 'Click "Apply for New PAN"',
        instruction: 'On the homepage, find and click the "Apply Online" section. Select "New PAN – Indian Citizen (Form 49A)" from the dropdown menu for individual applicants.',
        tips: ['Form 49A is for Indian citizens', 'Form 49AA is for foreign citizens', 'Do NOT click "Changes or Correction in existing PAN" unless you already have a PAN'],
        highlight: 'Select Form 49A for a new PAN card as an Indian citizen.',
        imageLabel: 'Application Type Selection',
        imageBg: '#fef3c7',
        imageIcon: '📋'
      },
      {
        stepNumber: 3,
        title: 'Select "Individual" Category',
        instruction: 'In the "Application Type" field, keep it as "Form 49A". In the "Category" dropdown, select "Individual". This is the correct category for personal PAN card applications.',
        tips: ['Category: Individual = for a person applying for themselves', 'HUF = Hindu Undivided Family (different type)', 'Company/Firm = for businesses'],
        highlight: 'Most people should select "Individual". Do not select Company or HUF unless applicable.',
        imageLabel: 'Category Selection Dropdown',
        imageBg: '#ede9fe',
        imageIcon: '👤'
      },
      {
        stepNumber: 4,
        title: 'Fill Personal Details',
        instruction: 'Enter your personal information exactly as it appears on your identity documents. This section includes your full name, date of birth, and contact details.',
        fields: [
          { label: 'Last Name / Surname', explanation: 'Enter your family surname. Example: If your name is "Rahul Kumar Sharma", enter "Sharma".' },
          { label: 'First Name', explanation: 'Your given first name. Example: "Rahul"' },
          { label: 'Middle Name', explanation: 'Optional. Enter middle name if applicable. Example: "Kumar"' },
          { label: 'Date of Birth', explanation: 'Enter in DD/MM/YYYY format exactly as on your birth certificate or Aadhaar card.' },
          { label: 'Email Address', explanation: 'Required for communication. Enter your active email — PAN status updates will be sent here.' },
          { label: 'Mobile Number', explanation: 'Active Indian mobile number — OTP verification will be sent to this number.' }
        ],
        tips: ['Name must match EXACTLY with your Aadhaar/identity documents', 'No nicknames or shortened names', 'Double-check spelling before proceeding'],
        highlight: 'Name spelling must be identical to your supporting documents. Mismatch = rejection.',
        imageLabel: 'Personal Details Form',
        imageBg: '#dcfce7',
        imageIcon: '📝'
      },
      {
        stepNumber: 5,
        title: 'Understand & Fill AO Code',
        instruction: 'AO Code (Assessing Officer Code) identifies the Income Tax office that will handle your PAN. This is one of the most confusing parts of the form. Use the search tool provided on the portal.',
        fields: [
          { label: 'AO Type', explanation: 'Select your category: W = Wage earner (salaried), P = Business income, etc.' },
          { label: 'Area Code', explanation: 'A code that identifies your geographic tax jurisdiction area. Found by entering your city/state in the portal\'s AO Code search.' },
          { label: 'AO Number', explanation: 'Specific officer number within your area. Auto-fills after selecting Area Code.' },
          { label: 'Range Code', explanation: 'Subdivision of the area. Also auto-filled after AO Code search.' }
        ],
        tips: ['Click "AO Code Search" button on the portal', 'Enter your city and state in the search box', 'Select the result that matches your residential address', 'If unsure, call the Income Tax helpline: 1800-103-0025'],
        highlight: '⚠️ Wrong AO Code is the #1 reason for PAN rejection. Always use the portal\'s built-in AO Code Search tool.',
        imageLabel: 'AO Code Search Tool',
        imageBg: '#fee2e2',
        imageIcon: '🔍'
      },
      {
        stepNumber: 6,
        title: 'Upload Documents & Photo',
        instruction: 'Upload scanned copies of your required documents. Each document has specific size and format requirements.',
        uploads: [
          { type: 'Passport Photo', specs: '3.5cm × 4.5cm, JPEG, max 50KB, white background, no spectacles' },
          { type: 'Signature', specs: '2cm × 7cm, JPEG, max 30KB, black ink on white paper' },
          { type: 'Identity Proof', specs: 'PDF or JPEG, max 300KB, clearly legible' },
          { type: 'Address Proof', specs: 'PDF or JPEG, max 300KB, address clearly visible' },
          { type: 'Date of Birth Proof', specs: 'PDF or JPEG, max 300KB, date clearly legible' }
        ],
        tips: ['Use our Document Tool (Tools page) to resize your photo and signature to exact required dimensions', 'Scan documents at 200–300 DPI for clarity', 'Black & white scans are acceptable for documents'],
        highlight: '💡 Use the GovGuide Document Tools to automatically resize your passport photo and signature to exact required specifications.',
        imageLabel: 'Document Upload Section',
        imageBg: '#e0f2fe',
        imageIcon: '📎'
      },
      {
        stepNumber: 7,
        title: 'Pay Application Fee',
        instruction: 'Complete payment for your PAN card application. Fee depends on whether you want a physical PAN card or only an e-PAN (digital).',
        paymentOptions: [
          { method: 'Physical PAN Card', fee: '₹107', delivery: 'Delivered to your address in 15–20 days' },
          { method: 'e-PAN Only (Digital)', fee: '₹72', delivery: 'PDF sent to your email in 48 hours' }
        ],
        paymentMethods: ['Debit Card', 'Credit Card', 'Net Banking', 'UPI (Google Pay, PhonePe, etc.)'],
        tips: ['Save the payment receipt — you will need the transaction ID to track your application', 'UPI is the easiest payment method', 'Payment failure is common — try a different browser if it fails'],
        highlight: 'After payment, you will receive an Acknowledgement Number. This is critical — save it immediately.',
        imageLabel: 'Payment Gateway',
        imageBg: '#fdf4ff',
        imageIcon: '💳'
      },
      {
        stepNumber: 8,
        title: 'Download Acknowledgement & Track Status',
        instruction: 'After successful payment, download the Acknowledgement slip. You can use your 15-digit Acknowledgement Number to track your PAN card status.',
        trackingUrl: 'https://www.onlineservices.nsdl.com/paam/requestAndDownloadEPAN.html',
        tips: ['Acknowledgement slip PDF — download and save it', 'Track status after 3 working days', 'e-PAN is usually available within 48 hours of payment', 'Physical card takes 15–20 working days'],
        highlight: '✅ Application complete! Track your PAN at track.onlineservices.nsdl.com using your Acknowledgement Number.',
        imageLabel: 'Acknowledgement Download',
        imageBg: '#dcfce7',
        imageIcon: '✅'
      }
    ]
  },
  'driving-license': {
    id: 'driving-license',
    title: 'Driving License Application',
    description: 'Apply for a new driving license through the Parivahan Sewa portal.',
    authority: 'Regional Transport Office (RTO)',
    processingTime: '30–45 working days',
    fee: '₹200–₹1000 (varies by state)',
    difficulty: 'Medium',
    totalSteps: 6,
    portalUrl: 'https://parivahan.gov.in/parivahan/',
    comingSoon: true
  },
  passport: {
    id: 'passport',
    title: 'Passport Application',
    description: 'Apply for a new Indian passport through the Passport Seva portal.',
    authority: 'Ministry of External Affairs',
    processingTime: '30–45 working days (Normal) | 7–14 days (Tatkal)',
    fee: '₹1500 (Normal) | ₹3500 (Tatkal)',
    difficulty: 'Medium',
    totalSteps: 7,
    portalUrl: 'https://www.passportindia.gov.in/',
    comingSoon: true
  },
  scholarship: {
    id: 'scholarship',
    title: 'National Scholarship Application',
    description: 'Apply for central and state government scholarships through the National Scholarship Portal.',
    authority: 'Ministry of Education',
    processingTime: 'Varies by scholarship',
    fee: 'Free',
    difficulty: 'Easy',
    totalSteps: 5,
    portalUrl: 'https://scholarships.gov.in/',
    comingSoon: true
  }
};

exports.getAllGuides = (req, res) => {
  const guideList = Object.values(guides).map(g => ({
    id: g.id,
    title: g.title,
    description: g.description,
    authority: g.authority,
    processingTime: g.processingTime,
    fee: g.fee,
    difficulty: g.difficulty,
    totalSteps: g.totalSteps,
    comingSoon: g.comingSoon || false
  }));
  res.json({ success: true, guides: guideList });
};

exports.getGuideById = (req, res) => {
  const { formId } = req.params;
  const guide = guides[formId];
  if (!guide) {
    return res.status(404).json({ success: false, error: 'Guide not found' });
  }
  res.json({ success: true, guide });
};

exports.getGuideSteps = (req, res) => {
  const { formId } = req.params;
  const guide = guides[formId];
  if (!guide) {
    return res.status(404).json({ success: false, error: 'Guide not found' });
  }
  res.json({ success: true, steps: guide.steps || [], formId });
};
