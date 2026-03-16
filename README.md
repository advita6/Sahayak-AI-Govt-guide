# GovGuide AI

**A portal that helps people correctly complete government applications.**

GovGuide AI provides step-by-step visual guides, document preparation tools, and an AI assistant to help users prepare before submitting on official government portals.

---

## Features

- **Form Guides** — Visual step-by-step guides for PAN Card (+ more coming soon)
- **Document Tools** — Passport photo resizer, signature resizer, PDF compressor
- **AI Assistant** — Chatbot that answers questions about government forms
- **Responsive** — Works on desktop and mobile

---

## Quick Start

### 1. Extract and enter the project

```bash
unzip govguide-ai.zip
cd govguide-ai
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the server

```bash
node server.js
```

### 4. Open in browser

```
http://localhost:5000
```

> **Note:** `npm install` and `node server.js` are run from the `govguide-ai/` project root.  
> The root `package.json` points automatically to `backend/server.js`.

---

## 📁 Project Structure

```
govguide-ai/
├── frontend/
│   ├── index.html          ← Homepage
│   ├── guides.html         ← Form Guides listing
│   ├── guide-pan.html      ← PAN Card Guide (8 steps)
│   ├── tools.html          ← Document Tools
│   ├── assistant.html      ← AI Chatbot
│   ├── css/
│   │   └── styles.css      ← All styles
│   └── js/
│       ├── api.js          ← Shared API utility
│       ├── guides.js       ← Guides page logic
│       ├── tools.js        ← Tools page logic
│       └── assistant.js    ← Chatbot logic
├── backend/
│   ├── server.js           ← Express server (entry point)
│   ├── package.json
│   ├── .env.example
│   ├── routes/
│   │   ├── guideRoutes.js
│   │   ├── toolRoutes.js
│   │   └── assistantRoutes.js
│   ├── controllers/
│   │   ├── guideController.js
│   │   ├── toolController.js
│   │   └── assistantController.js
│   ├── services/
│   │   ├── imageService.js ← sharp-based image processing
│   │   ├── pdfService.js   ← pdf-lib PDF compression
│   │   └── aiService.js    ← Rule-based AI knowledge base
│   ├── utils/
│   │   └── fileCleanup.js  ← Auto-delete old uploads
│   └── uploads/            ← Temporary processed files
└── README.md
```

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Server health check |
| GET | `/api/guides` | List all form guides |
| GET | `/api/guides/:id` | Get guide details |
| GET | `/api/guides/:id/steps` | Get step-by-step content |
| POST | `/api/tools/resize-photo` | Resize passport photo |
| POST | `/api/tools/resize-signature` | Resize signature |
| POST | `/api/tools/compress-pdf` | Compress PDF |
| POST | `/api/assistant/ask` | Ask AI assistant |
| GET | `/api/assistant/forms` | List supported forms |

---

## Dependencies

| Package | Purpose |
|---------|---------|
| `express` | Web server framework |
| `multer` | File upload handling |
| `sharp` | Image resizing (passport photo, signature) |
| `pdf-lib` | PDF compression and optimization |
| `cors` | Cross-origin resource sharing |
| `dotenv` | Environment variables |
| `uuid` | Unique file name generation |

---

## Configuration

Copy `.env.example` to `.env` and adjust:

```bash
cp .env.example .env
```

```env
PORT=5000
NODE_ENV=development
```

---

## Create ZIP Archive

```bash
cd ..
zip -r govguide-ai.zip govguide-ai/
```

---

## Disclaimer

GovGuide AI is an **educational tool only**. It does not process government applications. All actual applications must be submitted on official government portals:

- PAN Card: https://www.onlineservices.nsdl.com
- Driving License: https://parivahan.gov.in
- Passport: https://www.passportindia.gov.in
- Scholarship: https://scholarships.gov.in

---

## License

MIT — Free for educational and personal use.
