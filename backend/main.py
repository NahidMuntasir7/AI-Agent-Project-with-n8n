from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
import httpx
import uuid
from datetime import datetime
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = FastAPI(
    title="AI Article Processor API",
    description="Backend API for processing articles with n8n",
    version="1.0.0"
)

# Enable CORS for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],  # Vite default ports
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Get n8n webhook URL from environment variable
N8N_WEBHOOK_URL = os.getenv("N8N_WEBHOOK_URL", "")

class ArticleRequest(BaseModel):
    email: EmailStr
    article_url: str

class ArticleResponse(BaseModel):
    status: str
    message: str
    session_id: str

@app.get("/")
async def root():
    """Root endpoint - API health check"""
    return {
        "message": "AI Article Processor API is running! 🚀",
        "status": "healthy",
        "endpoints": {
            "process_article": "/api/process-article",
            "docs": "/docs"
        }
    }

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    webhook_configured = bool(N8N_WEBHOOK_URL)
    return {
        "status": "healthy",
        "webhook_configured": webhook_configured,
        "timestamp": datetime.utcnow().isoformat()
    }

@app.post("/api/process-article", response_model=ArticleResponse)
async def process_article(request: ArticleRequest):
    """
    Process article by sending to n8n webhook
    
    Args:
        request: ArticleRequest with email and article_url
        
    Returns:
        ArticleResponse with status and session_id
    """
    try:
        # Validate n8n webhook URL is configured
        if not N8N_WEBHOOK_URL:
            raise HTTPException(
                status_code=500,
                detail="N8N_WEBHOOK_URL is not configured. Please set it in .env file"
            )
        
        # Generate unique session ID
        session_id = str(uuid.uuid4())
        
        # Prepare payload for n8n
        payload = {
            "email": request.email,
            "article_url": request.article_url,
            "session_id": session_id,
            "timestamp": datetime.utcnow().isoformat(),
            "source": "api"
        }
        
        print(f"📤 Sending to n8n webhook: {N8N_WEBHOOK_URL}")
        print(f"📦 Payload: {payload}")
        
        # Send to n8n webhook
        async with httpx.AsyncClient() as client:
            response = await client.post(
                N8N_WEBHOOK_URL,
                json=payload,
                timeout=30.0
            )
            
            print(f"📥 n8n Response Status: {response.status_code}")
            
            if response.status_code in [200, 201]:
                return ArticleResponse(
                    status="success",
                    message="Article processing started! Check your email in a few moments.",
                    session_id=session_id
                )
            else:
                print(f"❌ n8n Error Response: {response.text}")
                raise HTTPException(
                    status_code=500,
                    detail=f"n8n workflow failed with status {response.status_code}"
                )
                
    except httpx.TimeoutException:
        raise HTTPException(
            status_code=504,
            detail="Request to n8n timed out. Please try again."
        )
    except httpx.RequestError as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to connect to n8n: {str(e)}"
        )
    except Exception as e:
        print(f"❌ Error: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"Internal server error: {str(e)}"
        )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )