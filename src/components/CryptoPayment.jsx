import React, { useState, useEffect, useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { CheckCircle, RefreshCcw, AlertTriangle } from 'lucide-react';

export default function CryptoPayment() {
    const address = "0xF2617C02880Fb7312f388dA03644bA9bA0E12266";
    const [status, setStatus] = useState('idle'); // idle | verifying | success | error
    const [useMock, setUseMock] = useState(false);
    const [countdown, setCountdown] = useState(0);
    const intervalRef = useRef(null);

    // Cleanup interval on unmount
    useEffect(() => {
        return () => stopVerification();
    }, []);

    const stopVerification = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    };

    const startVerification = () => {
        if (status === 'verifying') return; // Prevent multiple clicks

        setStatus('verifying');
        setCountdown(10);
        checkTransaction(); // Check immediately

        // Polling every 10 seconds to avoid hitting API rate limits
        intervalRef.current = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    checkTransaction();
                    return 10;
                }
                return prev - 1;
            });
        }, 1000);
    };

    const checkTransaction = async () => {
        if (useMock) {
            // Mock logic: Simulate network delay then success
            setTimeout(() => {
                setStatus('success');
                stopVerification();
            }, 1500);
            return;
        }

        try {
            // Get the injected API key or fallback to provided one
            const apiKey = import.meta.env.VITE_POLYGONSCAN_API_KEY || 'YNRRYGSDJETQMK7F2SFY1YF8RZPB3X9FV9';

            // Using Etherscan API V2 using chainid=137 for Polygon Mainnet
            const url = `https://api.etherscan.io/v2/api?chainid=137&module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=10&sort=desc&apikey=${apiKey}`;

            const res = await fetch(url);
            const data = await res.json();

            if (data.status === '1' && data.message === 'OK' && data.result && data.result.length > 0) {
                // Transaction found. Marking as success
                setStatus('success');
                stopVerification();
            } else {
                // No transaction yet. The interval will check again in 10s.
                console.log("No new transaction found yet...");
                if (data.status === '0' && data.message !== 'No transactions found') {
                    console.error("API error:", data.result); // Helps in debugging ratelimits
                }
            }
        } catch (e) {
            console.error("API error while fetching transactions", e);
            // Wait for next polling attempt
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
                    disabled={status === 'verifying'}
                />
                <label htmlFor="mockMode" className="text-sm text-slate-400 cursor-pointer">Use Mock Payment (Testing)</label>
            </div>

            {status === 'success' ? (
                <div className="flex items-center gap-2 text-emerald-400 bg-emerald-400/10 px-4 py-3 rounded-xl w-full justify-center animate__animated animate__fadeIn">
                    <CheckCircle size={20} />
                    <span className="font-medium">Payment Received! Thank you.</span>
                </div>
            ) : status === 'error' ? (
                <div className="flex items-center gap-2 text-rose-400 bg-rose-400/10 px-4 py-3 rounded-xl w-full justify-center animate__animated animate__shakeX cursor-pointer hover:bg-rose-400/20" onClick={() => setStatus('idle')}>
                    <AlertTriangle size={20} />
                    <span className="font-medium">Error checking payment. Tap to retry.</span>
                </div>
            ) : (
                <button
                    onClick={startVerification}
                    disabled={status === 'verifying'}
                    className={`flex flex-col items-center justify-center gap-1 w-full px-4 py-3 rounded-xl font-medium transition-all ${status === 'verifying'
                            ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                            : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-500 hover:to-purple-500 shadow-lg shadow-blue-500/20'
                        }`}
                >
                    {status === 'verifying' ? (
                        <>
                            <div className="flex items-center gap-2">
                                <RefreshCcw size={18} className="animate-spin" /> Verifying on Polygon...
                            </div>
                            <span className="text-xs text-slate-400 font-normal mt-1">
                                Checking again in {countdown}s
                            </span>
                        </>
                    ) : (
                        'Verify Payment'
                    )}
                </button>
            )}

            {status === 'verifying' && (
                <button className="text-xs text-rose-400 mt-4 hover:underline" onClick={() => { setStatus('idle'); stopVerification(); }}>
                    Cancel Verification
                </button>
            )}
        </div>
    );
}
