# 🤖 AI Article Processor

An AI-powered system that takes users Gmail and a webpage link and analyzes web articles, then emails summaries using Google Gemini 2.5 Flash, n8n, and automation tools.

---

# Project Walkthrough Video Link

---


## 🎯 What It Does

1. **Enter** article URL + your email in the frontend
2. **AI analyzes** the article (summary + insights)
3. **Saves** Summary and Insights to Google Sheets
4. **Emails** results to you

---

## 🛠️ Tech Stack

- **Frontend:** React + TypeScript + Tailwind CSS
- **Backend:** Python + FastAPI
- **AI:** Google Gemini 2.5 Flash
- **Automation:** n8n workflow
- **Tools:** Firecrawl (scraping), Google Sheets, Gmail

---

## 🚀 Installation

### 1. Clone Repository

```bash
git clone https://github.com/NahidMuntasir7/AI-Agent-Project-with-n8n.git
cd ai-article-processor
```

### 2. Setup Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate  # Windows
# source venv/bin/activate  # Mac/Linux
pip install -r requirements.txt
```

Create `backend/.env`:
```env
N8N_WEBHOOK_URL=your-n8n-webhook-url-here
```

---

## ⚙️ n8n Workflow Setup

### Create Workflow in n8n:

1. **Webhook Node** - Receives data from backend
2. **AI Agent Node** - Google Gemini 2.5 Flash with 3 tools:
   - **Web Scraping Tool** - Firecrawl
   - **Google Sheets Tool** - Saves data to spreadsheet
   - **Gmail Tool** - Sends email to user

### Google Sheet Setup:

Create spreadsheet with headers:

| Session ID | Article URL | Summary | Insights | Email | Timestamp |
|------------|-------------|---------|----------|-------|-----------|

---

## ▶️ Run the App

### Terminal 1 - Backend:
```bash
cd backend
venv\Scripts\activate
python main.py
For Swagger: uvicorn main:app --reload
```
Runs on: **http://localhost:8000**

### Terminal 2 - Frontend:
```bash
cd frontend
npm run dev
```
Runs on: **http://localhost:5173**

---

## 💻 Usage

1. Open **http://localhost:5173**
2. Enter your email
3. Paste article URL (e.g., Wikipedia link)
4. Click **"Process Article"**
5. Check your email for results! ✅

---

## 📸 Screenshots

**Frontend:**
<img width="969" height="830" alt="Screenshot 2025-11-19 191940" src="https://github.com/user-attachments/assets/f7a0fd32-d07d-4a99-b016-8e504524f435" />


**n8n Agent:**

<img width="808" height="585" alt="Screenshot 2025-11-19 185822" src="https://github.com/user-attachments/assets/608eed61-c2ee-46cd-80fe-4c6588635c65" />

---
