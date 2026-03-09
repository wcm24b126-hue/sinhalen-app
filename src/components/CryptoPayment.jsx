import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { CheckCircle, RefreshCcw, AlertTriangle } from 'lucide-react';

export default function CryptoPayment() {
    const address = "0xF2617C02880Fb7312f388dA03644bA9bA0E12266";
    const [status, setStatus] = useState('idle'); // idle | verifying | success | error
    const [useMock, setUseMock] = useState(true);

    // Polygonscan Free API
    const verifyPayment = async () => {
        setStatus('verifying');

        if (useMock) {
            // Mock logic: Simulate network delay then success
            setTimeout(() => {
                setStatus('success');
            }, 2000);
            return;
        }

        try {
            const apiKey = import.meta.env.VITE_POLYGONSCAN_API_KEY || ''; // Optional API Key
            // Using Polygon mainnet api
            const res = await fetch(`https://api.polygonscan.com/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=10&sort=desc&apikey=${apiKey}`);
            const data = await res.json();

            if (data.status === '1' && data.message === 'OK' && data.result.length > 0) {
                // If transactions exist, we count it as a success for demonstration.
                // In reality, we would check for a 'new' unhandled transaction.
                setStatus('success');
            } else {
                setStatus('error');
            }
        } catch (e) {
            console.error(e);
            setStatus('error');
        }
    };

    return (
        <div className="p-6 rounded-2xl bg-slate-800/40 border border-white/5 flex flex-col items-center">
            <h3 className="text-xl font-bold mb-2">Deposit Crypto (Polygon MATIC)</h3>
            <p className="text-sm text-slate-400 mb-6 text-center">
                Send funds using the Polygon network only (Mainnet).
            </p>

            <div className="bg-white p-4 rounded-xl mb-4">
                <QRCodeSVG value={address} size={150} />
            </div>

            <div className="bg-slate-900/50 rounded-lg p-3 w-full text-center mb-6 break-all">
                <code className="text-xs text-blue-400 select-all">{address}</code>
            </div>

            <div className="flex items-center gap-2 mb-4 w-full justify-center">
                <input
                    type="checkbox"
                    id="mockMode"
                    checked={useMock}
                    onChange={(e) => setUseMock(e.target.checked)}
                    className="accent-blue-500"
                />
                <label htmlFor="mockMode" className="text-sm text-slate-400 cursor-pointer">Use Mock Payment (Testing)</label>
            </div>

            {status === 'success' ? (
                <div className="flex items-center gap-2 text-emerald-400 bg-emerald-400/10 px-4 py-3 rounded-xl w-full justify-center animate__animated animate__fadeIn">
                    <CheckCircle size={20} />
                    <span className="font-medium">Payment Received! Thank you.</span>
                </div>
            ) : status === 'error' ? (
                <div className="flex items-center gap-2 text-rose-400 bg-rose-400/10 px-4 py-3 rounded-xl w-full justify-center animate__animated animate__shakeX">
                    <AlertTriangle size={20} />
                    <span className="font-medium">No new transaction found</span>
                </div>
            ) : (
                <button
                    onClick={verifyPayment}
                    disabled={status === 'verifying'}
                    className={`flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl font-medium transition-all ${status === 'verifying'
                            ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                            : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-500 hover:to-purple-500 shadow-lg shadow-blue-500/20'
                        }`}
                >
                    {status === 'verifying' ? (
                        <><RefreshCcw size={18} className="animate-spin" /> Verifying on Polygon...</>
                    ) : (
                        'Verify Payment'
                    )}
                </button>
            )}

            {status === 'error' && (
                <button className="text-xs text-blue-400 mt-4 hover:underline" onClick={() => setStatus('idle')}>
                    Check Again
                </button>
            )}
        </div>
    );
}
