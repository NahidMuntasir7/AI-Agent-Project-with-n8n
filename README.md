# 🤖 AI Article Processor

An AI-powered system that analyzes web articles and emails summaries using Google Gemini 2.0 Flash, n8n, and automation tools.

---

## 🎯 What It Does

1. **Enter** article URL + your email
2. **AI analyzes** the article (summary + insights)
3. **Saves** to Google Sheets
4. **Emails** results to you

---

## 🛠️ Tech Stack

- **Frontend:** React + TypeScript + Tailwind CSS
- **Backend:** Python + FastAPI
- **AI:** Google Gemini 2.0 Flash
- **Automation:** n8n workflow
- **Tools:** Jina AI (scraping), Google Sheets, Gmail

---

## 📋 Prerequisites

- Node.js 20.19+
- Python 3.8+
- n8n account ([n8n.io](https://n8n.io))
- Google Gemini API key ([Get here](https://aistudio.google.com/app/apikey))

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

### 3. Setup Frontend

```bash
cd frontend
npm install
```

---

## ⚙️ n8n Workflow Setup

### Create Workflow in n8n:

1. **Webhook Node** - Receives data from backend
2. **AI Agent Node** - Google Gemini 2.0 Flash with 3 tools:
   - **Web Scraping Tool** - Jina AI (GET `https://r.jina.ai/={{ $parameter.url }}`)
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

## 📂 Project Structure

```
ai-article-processor/
├── backend/
│   ├── main.py              # FastAPI server
│   ├── requirements.txt     # Python dependencies
│   └── .env                 # Config (webhook URL)
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── ArticleProcessor.tsx
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   └── tailwind.config.js
└── README.md
```

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Frontend won't start | Delete `node_modules`, run `npm install` again |
| Backend error | Check `.env` has correct webhook URL |
| n8n workflow fails | Activate workflow, check all tools configured |
| No email received | Check spam folder, reconnect Gmail OAuth |

---

## 📸 Screenshots

**Frontend:**

![Frontend](https://via.placeholder.com/600x400/667eea/ffffff?text=Article+Processor+UI)

**Email Result:**

![Email](https://via.placeholder.com/600x400/4CAF50/ffffff?text=AI+Analysis+Email)

---

## 🎓 Project Info

- **Author:** NahidMuntasir7
- **Date:** 2025-11-19
- **Purpose:** Module 16 AI Agent Assignment
- **License:** MIT

---

## ⭐ Features

✅ AI-powered article analysis  
✅ Automatic web scraping  
✅ Google Sheets database  
✅ Email delivery  
✅ Session tracking  
✅ Modern UI  

---

## 🙏 Credits

- Google Gemini 2.0 Flash
- n8n Workflow Automation
- Jina AI Reader
- FastAPI & React

---

Made with ❤️ by **NahidMuntasir7**

[⬆ Back to Top](#-ai-article-processor)
