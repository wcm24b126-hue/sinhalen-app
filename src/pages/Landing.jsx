import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Zap, Target, PieChart, Wallet } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';

export default function Landing() {
    const navigate = useNavigate();
    const { t, language, setLanguage } = useLanguage();

    return (
        <div className="min-h-screen flex flex-col relative overflow-hidden bg-[#0b1120]">
            {/* Dynamic Background Elements */}
            <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-blue-600/20 rounded-full blur-[100px] -z-10 animate-[float_20s_infinite_alternate]"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-purple-600/20 rounded-full blur-[100px] -z-10 animate-[float_20s_infinite_alternate]" style={{ animationDelay: '-10s' }}></div>

            {/* Navigation Layer */}
            <nav className="relative z-50 flex justify-between items-center px-6 py-6 md:px-12 max-w-7xl mx-auto w-full">
                <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
                        <Wallet className="text-white w-6 h-6" />
                    </div>
                    <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                        {t('appName').split(' ')[0]}
                    </h1>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex bg-slate-800/50 backdrop-blur-md rounded-full p-1 border border-white/5">
                        <button
                            className={`px-4 py-1.5 text-sm font-medium rounded-full transition-all ${language === 'en' ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
                            onClick={() => setLanguage('en')}
                        >
                            EN
                        </button>
                        <button
                            className={`px-4 py-1.5 text-sm font-medium rounded-full transition-all ${language === 'si' ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
                            onClick={() => setLanguage('si')}
                        >
                            සිංහල
                        </button>
                    </div>
                    <button
                        onClick={() => navigate('/auth')}
                        className="hidden md:block px-6 py-2.5 rounded-full font-medium text-white border border-white/10 hover:bg-white/5 transition-all"
                    >
                        {t('loginBtn')}
                    </button>
                </div>
            </nav>

            {/* Hero Section */}
            <main className="flex-1 flex flex-col justify-center items-center text-center px-6 pt-12 pb-24 relative z-10 w-full max-w-5xl mx-auto mt-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-8 animate__animated animate__fadeInDown">
                    <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                    </span>
                    Live in Sri Lanka
                </div>

                <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 animate__animated animate__fadeInUp leading-tight text-white">
                    {t('heroTitle').split(',')[0]} <br className="hidden md:block" />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">{t('heroTitle').split(',')[1] || ''}</span>
                </h1>

                <p className="text-lg md:text-xl text-slate-400 max-w-2xl mb-12 animate__animated animate__fadeInUp animate__delay-1s leading-relaxed">
                    {t('heroSubtitle')}
                </p>

                <div className="flex flex-col sm:flex-row gap-4 w-full justify-center px-4 md:px-0 animate__animated animate__fadeInUp animate__delay-2s">
                    <button
                        onClick={() => navigate('/auth')}
                        className="px-8 py-4 rounded-xl font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 transition-all transform hover:-translate-y-1 shadow-[0_10px_30px_rgba(59,130,246,0.4)] flex items-center justify-center gap-2 text-lg"
                    >
                        {t('getStartedBtn')} <Zap size={20} className="fill-white/20" />
                    </button>
                    <button
                        onClick={() => navigate('/auth')}
                        className="md:hidden px-8 py-4 rounded-xl font-bold text-slate-300 bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-lg"
                    >
                        {t('loginBtn')}
                    </button>
                </div>
            </main>

            {/* Features Showcase */}
            <section className="relative z-10 px-6 py-24 bg-slate-900/50 backdrop-blur-xl border-t border-white/5 mt-auto">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

                    <div className="bg-slate-800/40 border border-white/5 p-8 rounded-2xl hover:bg-slate-800/60 transition-all transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/10 group">
                        <div className="w-14 h-14 bg-blue-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <Target className="w-7 h-7 text-blue-400" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">{t('feature1Title')}</h3>
                        <p className="text-slate-400 leading-relaxed text-sm md:text-base">
                            {t('feature1Desc')}
                        </p>
                    </div>

                    <div className="bg-slate-800/40 border border-white/5 p-8 rounded-2xl hover:bg-slate-800/60 transition-all transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/10 group">
                        <div className="w-14 h-14 bg-purple-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <PieChart className="w-7 h-7 text-purple-400" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">{t('feature2Title')}</h3>
                        <p className="text-slate-400 leading-relaxed text-sm md:text-base">
                            {t('feature2Desc')}
                        </p>
                    </div>

                    <div className="bg-slate-800/40 border border-white/5 p-8 rounded-2xl hover:bg-slate-800/60 transition-all transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-emerald-500/10 group">
                        <div className="w-14 h-14 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <Shield className="w-7 h-7 text-emerald-400" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">{t('feature3Title')}</h3>
                        <p className="text-slate-400 leading-relaxed text-sm md:text-base">
                            {t('feature3Desc')}
                        </p>
                    </div>

                </div>
            </section>

            <footer className="w-full text-center py-6 text-slate-500 text-sm bg-slate-900 border-t border-white/5 z-10">
                © 2026 Personal Finance Pro. Made for Sri Lanka.
            </footer>
        </div>
    );
}
