// AI Service — Rule-based knowledge engine for government form questions
// Can be swapped out for an actual LLM API call in production

const knowledgeBase = {
  pan: {
    keywords: {
      'documents required': {
        answer: `For a PAN Card application, you need the following documents:\n\n📋 **Identity Proof** (any one): Aadhaar Card, Voter ID, Passport, Driving License, or Arms License\n\n🏠 **Address Proof** (any one): Aadhaar Card, Voter ID, Passport, Bank Statement (last 3 months), Electricity/Water Bill (last 3 months)\n\n📅 **Date of Birth Proof** (any one): Aadhaar Card, Birth Certificate, Matriculation Certificate, Passport, or Driving License\n\n📸 **Passport Photo**: 3.5cm × 4.5cm, white background, recent, no spectacles\n\n✍️ **Signature**: On white paper, black ink, within 2cm × 7cm box\n\n💡 Aadhaar Card alone can serve as identity, address, AND date of birth proof.`
      },
      'ao code': {
        answer: `**AO Code** (Assessing Officer Code) identifies which Income Tax office will manage your PAN account.\n\nIt consists of 3 parts:\n\n🔷 **Area Code** — Identifies your geographic tax jurisdiction\n🔷 **AO Type** — W (Wage earner/Salaried), P (Business/Profession), etc.\n🔷 **Range Code** — Sub-division of the area\n🔷 **AO Number** — Specific officer number\n\n**How to find your AO Code:**\n1. On the NSDL portal, click the "AO Code Search" button\n2. Enter your city and state\n3. Select the result matching your residential address\n\n⚠️ Wrong AO Code is the most common reason for PAN rejection. Always use the portal's search tool.`
      },
      'area code': {
        answer: `The **Area Code** is part of your AO Code that identifies your geographic tax jurisdiction area. It is assigned by the Income Tax Department based on your residential address.\n\nYou do NOT need to know it in advance. Simply:\n1. Go to the NSDL PAN portal\n2. Click "AO Code Search"\n3. Enter your city/state\n4. The system will auto-populate the Area Code, Range Code, and AO Number for you.`
      },
      'range code': {
        answer: `**Range Code** is a sub-division within your tax jurisdiction Area Code. It helps narrow down which specific Income Tax range office handles your PAN.\n\nLike the Area Code, you don't need to find this manually. Use the "AO Code Search" tool on the NSDL portal — enter your city and state, and all the codes (Area Code, Range Code, AO Number) will auto-fill based on your location.`
      },
      'photo rejected': {
        answer: `Common reasons why passport photos get rejected for PAN:\n\n❌ **Face not fully visible** — must show full face, ears visible\n❌ **Spectacles/sunglasses** — not allowed in PAN photos\n❌ **Background not white** — must be plain white\n❌ **Photo too old** — must be recent (within 6 months)\n❌ **Low resolution** — blurry or pixelated\n❌ **Wrong dimensions** — must be exactly 3.5×4.5cm\n❌ **File too large** — must be under 50KB\n\n✅ **Fix:** Use the GovGuide Photo Resizer tool to automatically resize your photo to exact specifications, then take a new photo in good lighting with a white wall background.`
      },
      'processing time': {
        answer: `PAN Card processing times:\n\n⚡ **e-PAN (Digital)**: 48–72 hours after successful payment\n📬 **Physical PAN Card**: 15–20 working days after payment\n\nFor physical delivery:\n- Week 1–2: Application processing\n- Week 3: Printing and dispatch\n- Week 3–4: Postal delivery\n\n📍 **Track your status** at: track.onlineservices.nsdl.com using your 15-digit Acknowledgement Number.\n\nIf your card doesn't arrive in 30 days, contact NSDL helpline: **1800-222-990** (toll-free)`
      },
      'fee': {
        answer: `PAN Card Application Fees:\n\n💳 **Physical PAN Card**: ₹107 (₹93 processing + ₹18 GST) — dispatched to Indian address\n📱 **e-PAN Only (Digital PDF)**: ₹72 — sent to your registered email\n\nAccepted payment methods:\n✅ UPI (Google Pay, PhonePe, Paytm)\n✅ Net Banking\n✅ Debit Card\n✅ Credit Card\n\n💡 e-PAN is legally valid and accepted everywhere. Choose this for faster delivery.`
      },
      'acknowledgement': {
        answer: `Your **Acknowledgement Number** is a 15-digit reference number generated after you complete payment for your PAN application.\n\n**Why it's important:**\n- Used to track your PAN application status\n- Proof of application submission\n- Required for follow-up queries with NSDL\n\n**How to find it:**\n- It appears on screen immediately after payment\n- A PDF acknowledgement slip is generated — download it immediately\n- Also sent to your registered email\n\n**Track status:** https://track.onlineservices.nsdl.com/TrackApplication.html`
      },
      'form 49a': {
        answer: `**Form 49A** is the official application form for a new PAN Card for Indian citizens.\n\n- **Form 49A** → For Indian Citizens (most people)\n- **Form 49AA** → For Foreign Citizens\n\nYou fill this form online at the NSDL portal. The form captures your personal details, AO Code, and allows document uploads.\n\nThe form was last revised by the Income Tax Department and is only available through the official NSDL or UTIITSL portals.`
      },
      'nsdl': {
        answer: `**NSDL** (National Securities Depository Limited) is one of the two authorized agencies to process PAN applications in India.\n\n🌐 **Official Portal**: https://www.onlineservices.nsdl.com/paam/endUserRegisterContact.html\n📞 **Helpline**: 1800-222-990 (Toll-free) | 020-27218080\n📧 **Email**: tininfo@nsdl.co.in\n🕐 **Hours**: Monday–Saturday, 7:00 AM to 11:00 PM\n\nAlternatively, you can also apply through **UTIITSL**: https://www.pan.utiitsl.com/PAN/\n\nBoth are officially authorized. Results and processing time are identical.`
      },
      'correction': {
        answer: `To correct details on an existing PAN Card:\n\n1. Go to NSDL portal → Click "Changes or Correction in existing PAN data"\n2. Select Form 49A (same form, different option)\n3. Enter your existing PAN number\n4. Modify the incorrect fields\n5. Upload supporting documents for the corrected information\n6. Pay ₹107 fee\n\n⚠️ Do NOT apply for a new PAN if you already have one. Having two PANs is illegal and results in a ₹10,000 penalty.`
      }
    },
    default: `I can help you with your PAN Card application! Here are some common questions I can answer:\n\n• What documents are required?\n• What is AO Code and how to find it?\n• Why was my photo rejected?\n• How long does processing take?\n• What is the application fee?\n• How to track my application?\n\nPlease ask me a specific question about your PAN Card application.`
  },
  general: {
    keywords: {
      'pan': {
        answer: `PAN (Permanent Account Number) is a 10-character alphanumeric identifier issued by the Income Tax Department of India.\n\n**Why you need PAN:**\n- Filing income tax returns\n- Opening a bank account\n- Transactions above ₹50,000\n- Buying/selling property\n- Applying for loans\n- Getting a SIM card\n\nApply at NSDL: https://www.onlineservices.nsdl.com/\nFee: ₹107 (physical) | ₹72 (e-PAN)\nProcessing: 15–20 days (physical) | 48 hours (e-PAN)`
      },
      'govguide': {
        answer: `**GovGuide AI** helps you prepare to fill government application forms correctly.\n\n🗺️ **Form Guides** — Step-by-step visual instructions for forms like PAN, Passport, Driving License\n\n🛠️ **Document Tools** — Resize passport photos and signatures, compress PDFs to exact government specifications\n\n🤖 **AI Assistant** — Ask questions about any form and get instant answers\n\nSelect a form category to get started, or use the navigation menu above.`
      }
    },
    default: `Hello! I'm the GovGuide AI assistant. I can help you with questions about government applications.\n\n**Select a form context** from the dropdown above to get more specific help, or ask me a general question about:\n\n🪪 PAN Card Application\n🚗 Driving License\n📕 Passport\n🎓 Scholarships\n\nWhat would you like to know?`
  }
};

function findAnswer(question, context) {
  const q = question.toLowerCase();
  const kb = knowledgeBase[context] || knowledgeBase.general;

  // Check context-specific keywords first
  for (const [keyword, data] of Object.entries(kb.keywords)) {
    if (q.includes(keyword)) {
      return data.answer;
    }
  }

  // Check general keywords if context-specific didn't match
  if (context !== 'general') {
    for (const [keyword, data] of Object.entries(knowledgeBase.general.keywords)) {
      if (q.includes(keyword)) {
        return data.answer;
      }
    }
  }

  // Cross-context search
  for (const [ctxKey, ctx] of Object.entries(knowledgeBase)) {
    if (ctxKey === context) continue;
    for (const [keyword, data] of Object.entries(ctx.keywords)) {
      if (q.includes(keyword)) {
        return data.answer;
      }
    }
  }

  return null;
}

exports.getAnswer = async (question, formContext = 'general') => {
  const answer = findAnswer(question, formContext);
  if (answer) return answer;

  // Fallback responses
  const ctx = knowledgeBase[formContext];
  if (ctx) return ctx.default;
  return knowledgeBase.general.default;
};
