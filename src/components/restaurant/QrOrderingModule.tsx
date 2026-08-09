import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { QrCode, ExternalLink, Download, Copy, CheckCircle2 } from 'lucide-react';

export const QrOrderingModule: React.FC = () => {
  const { activeRestaurant, tables } = useApp();
  const [selectedTable, setSelectedTable] = useState('Table 04');
  const [copied, setCopied] = useState(false);

  const qrUrl = `https://aetherresto.app/qr/${activeRestaurant.id}?table=${encodeURIComponent(selectedTable)}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(qrUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">QR Code Table Ordering</h1>
        <p className="text-xs text-slate-500 mt-1">Generate dynamic table QR codes for contactless digital menu ordering.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* QR Config Card */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Select Table Location</label>
            <select
              value={selectedTable}
              onChange={(e) => setSelectedTable(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800"
            >
              {tables.map(t => (
                <option key={t.id} value={t.tableNumber}>{t.tableNumber} ({t.section})</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Direct Table Ordering Link</label>
            <div className="flex gap-2">
              <input
                type="text"
                readOnly
                value={qrUrl}
                className="flex-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono text-[11px] text-slate-600"
              />
              <button
                onClick={handleCopy}
                className="px-3 py-2 bg-slate-900 text-white font-semibold rounded-xl hover:bg-slate-800 cursor-pointer"
              >
                {copied ? 'Copied!' : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Live QR Image Display */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs text-center flex flex-col items-center justify-center space-y-3">
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl shadow-inner">
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(qrUrl)}`}
              alt="Table QR Code"
              className="w-44 h-44 object-contain"
            />
          </div>
          <p className="font-bold text-slate-900 text-sm">{selectedTable} • {activeRestaurant.name}</p>
          <p className="text-xs text-slate-400">Scan with smartphone camera to open live mobile menu</p>
        </div>

      </div>
    </div>
  );
};
