import React, { useState } from 'react';
import { 
  Key, 
  X, 
  CheckCircle2, 
  AlertCircle, 
  ExternalLink, 
  Trash2, 
  Loader2, 
  ShieldCheck 
} from 'lucide-react';

export default function ApiKeyModal({ isOpen, onClose, onSaveKey, currentKey }) {
  const [keyInput, setKeyInput] = useState(currentKey || '');
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState(null); // { success: boolean, message: string }

  if (!isOpen) return null;

  const handleTestAndSave = async () => {
    if (!keyInput.trim()) {
      onSaveKey('');
      setTestResult({ success: true, message: 'API key cleared. Offline GeoAI engine active.' });
      setTimeout(() => {
        onClose();
        setTestResult(null);
      }, 1000);
      return;
    }

    setIsTesting(true);
    setTestResult(null);

    try {
      // Test Gemini API key with models query
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${keyInput.trim()}`);
      if (res.ok) {
        onSaveKey(keyInput.trim());
        setTestResult({
          success: true,
          message: 'Gemini API Key verified successfully! Live multimodal vision active.'
        });
        setTimeout(() => {
          onClose();
          setTestResult(null);
        }, 1200);
      } else {
        const data = await res.json().catch(() => ({}));
        setTestResult({
          success: false,
          message: data?.error?.message || 'Invalid Gemini API key or quota exceeded.'
        });
      }
    } catch (err) {
      setTestResult({
        success: false,
        message: 'Could not connect to Google Generative AI API. Check your internet connection.'
      });
    } finally {
      setIsTesting(false);
    }
  };

  const handleClearKey = () => {
    setKeyInput('');
    onSaveKey('');
    setTestResult({ success: true, message: 'Key removed. Reverted to Smart GeoAI Engine.' });
    setTimeout(() => {
      onClose();
      setTestResult(null);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="glass-panel w-full max-w-md rounded-2xl border border-slate-700 p-6 bg-slate-900 shadow-2xl space-y-4">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-cyan-950 border border-cyan-500/30 text-cyan-300">
              <Key className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Google Gemini API</h3>
              <p className="text-xs text-slate-400">Enable real-time multimodal satellite vision</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Informational description */}
        <p className="text-xs text-slate-300 leading-relaxed">
          Provide your Google Gemini API key to run live multimodal vision models (<code>gemini-1.5-flash</code>) directly on satellite imagery. If no key is provided, the application runs on its built-in GeoAI engine.
        </p>

        {/* Input Field */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
            <span>Gemini API Key</span>
            <a 
              href="https://aistudio.google.com/app/apikey" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[11px] text-cyan-400 hover:underline flex items-center gap-1"
            >
              Get free API key <ExternalLink className="w-3 h-3" />
            </a>
          </label>
          <input
            type="password"
            value={keyInput}
            onChange={(e) => setKeyInput(e.target.value)}
            placeholder="AIzaSy..."
            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 font-mono focus:outline-none focus:border-cyan-500"
          />
        </div>

        {/* Test Result Message */}
        {testResult && (
          <div className={`p-3 rounded-lg text-xs flex items-center gap-2 ${
            testResult.success 
              ? 'bg-emerald-950/80 border border-emerald-500/50 text-emerald-300' 
              : 'bg-red-950/80 border border-red-500/50 text-red-300'
          }`}>
            {testResult.success ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
            <span>{testResult.message}</span>
          </div>
        )}

        {/* Modal Actions */}
        <div className="pt-2 border-t border-slate-800 flex items-center justify-between gap-3">
          {currentKey ? (
            <button
              onClick={handleClearKey}
              className="flex items-center gap-1 text-xs text-red-400 hover:text-red-300 py-1.5 px-2 rounded hover:bg-red-950/40 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Remove Key</span>
            </button>
          ) : <div />}

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleTestAndSave}
              disabled={isTesting}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg shadow-cyan-600/30 disabled:opacity-50 transition-all cursor-pointer"
            >
              {isTesting ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Verifying...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Save &amp; Verify Key</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
