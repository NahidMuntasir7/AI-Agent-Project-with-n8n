import { useState } from 'react';

interface ProcessResponse {
  status: string;
  message: string;
  session_id: string;
}

export default function ArticleProcessor() {
  const [email, setEmail] = useState('');
  const [articleUrl, setArticleUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [sessionId, setSessionId] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setSessionId('');

    try {
      console.log('📤 Sending request to backend...');
      
      const response = await fetch('http://localhost:8000/api/process-article', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim(),
          article_url: articleUrl.trim(),
        }),
      });

      const data: ProcessResponse = await response.json();
      
      console.log('📥 Response:', data);

      if (response.ok) {
        setMessage('✅ ' + data.message);
        setSessionId(data.session_id);
        
        setTimeout(() => {
          setEmail('');
          setArticleUrl('');
        }, 500);
      } else {
        setMessage('❌ Error: ' + (data as any).detail);
      }
    } catch (error) {
      console.error('❌ Error:', error);
      setMessage('❌ Error connecting to server. Make sure backend is running on port 8000.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-lg w-full">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🤖</div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            AI Article Processor
          </h1>
          <p className="text-gray-600">
            Powered by n8n + Gemini Flash 2.5
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
              <span className="text-2xl mr-2">📧</span>
              Your Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
              placeholder="your@email.com"
              disabled={loading}
            />
          </div>

          <div>
            <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
              <span className="text-2xl mr-2">🔗</span>
              Article URL
            </label>
            <input
              type="url"
              value={articleUrl}
              onChange={(e) => setArticleUrl(e.target.value)}
              required
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
              placeholder="https://example.com/article"
              disabled={loading}
            />
            <p className="text-xs text-gray-500 mt-1">
              Example: https://en.wikipedia.org/wiki/Artificial_intelligence
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-lg font-bold text-lg hover:from-indigo-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Processing...
              </span>
            ) : (
              <span>🚀 Process Article</span>
            )}
          </button>
        </form>

        {message && (
          <div className={`mt-6 p-4 rounded-lg border-2 ${
            message.includes('✅') 
              ? 'bg-green-50 border-green-300 text-green-800' 
              : 'bg-red-50 border-red-300 text-red-800'
          }`}>
            <p className="font-medium">{message}</p>
            {sessionId && (
              <p className="text-xs mt-2 opacity-75">
                Session ID: {sessionId}
              </p>
            )}
          </div>
        )}

        <div className="mt-6 p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-2">📋 What happens next?</h3>
          <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
            <li>Article is scraped and analyzed</li>
            <li>AI generates summary & insights</li>
            <li>Results saved to Google Sheets</li>
            <li>Email sent to your inbox</li>
          </ol>
        </div>

        <div className="mt-6 text-center text-xs text-gray-500">
          Built by NahidMuntasir7
        </div>
      </div>
    </div>
  );
}