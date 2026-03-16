# GovGuide

**Guidance for Government Applications**

GovGuide is a web portal designed to help citizens understand and correctly complete government applications before submitting them on official portals.

The platform provides step-by-step visual guides, document preparation tools, and an AI assistant to answer common questions about government forms.

---

## Problem

Many people struggle with government portals because:

- Instructions are unclear
- Document requirements are confusing
- Image/PDF specifications are strict
- Users often submit incorrect information

GovGuide solves this by providing **visual guidance and document preparation tools before submission.**

---

## Key Features

### Form Guides
Step-by-step visual guides explaining how to complete government applications.

Currently supported:
- PAN Card Application

Planned guides:
- Driving License
- Passport
- Scholarships

---

### Document Preparation Tools

Tools to prepare documents before uploading them on government portals.

- Passport photo resizer
- Signature resizer
- PDF compressor

These tools automatically convert files to the required format.

---

### AI Assistant

An interactive chatbot that helps users understand form requirements.

Users can ask questions such as:

- What documents are required for PAN card?
- What does AO Code mean?
- Why was my photo rejected?

The assistant responds with relevant guidance.

---

## Technology Stack

### Frontend
- HTML
- CSS
- JavaScript

### Backend
- Node.js
- Express.js

### Libraries
- Multer — file uploads
- Sharp — image processing
- pdf-lib — PDF compression
- dotenv — environment configuration
- cors — API access control
- uuid — unique file names

---

## Project Structure

govguide-ai/

frontend/
- index.html (Homepage)
- guides.html (Form Guides listing)
- guide-pan.html (PAN Card step guide)
- tools.html (Document tools page)
- assistant.html (AI chatbot page)

frontend/css/
- styles.css

frontend/js/
- api.js
- guides.js
- tools.js
- assistant.js

backend/
- server.js (Express server entry point)
- package.json
- .env.example

backend/routes/
- guideRoutes.js
- toolRoutes.js
- assistantRoutes.js

backend/controllers/
- guideController.js
- toolController.js
- assistantController.js

backend/services/
- imageService.js
- pdfService.js
- aiService.js

backend/utils/
- fileCleanup.js

backend/uploads/
- temporary processed files

# Installation

-npm install #install dependencies
-node server.js #start the server
-https://localhost:5000 #open the web-application
