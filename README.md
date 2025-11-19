# 🤖 AI Article Processor

An AI-powered system that takes users Gmail and webpage link and analyzes web articles, then emails summaries using Google Gemini 2.5 Flash, n8n, and automation tools.

---

## 🎯 What It Does

1. **Enter** article URL + your email
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
git clone https://github.com/NahidMuntasir7/ai-article-processor.git
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

![Frontend](https://via.placeholder.com/600x400/667eea/ffffff?text=Article+Processor+UI)

**Email Result:**

![Email](https://via.placeholder.com/600x400/4CAF50/ffffff?text=AI+Analysis+Email)

---

ticle-processor)
