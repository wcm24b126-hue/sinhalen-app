import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Mail, Lock, User, ArrowRight, Languages } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';

export default function Auth() {
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [error, setError] = useState(null);

    const { t, language, setLanguage } = useLanguage();

    const handleAuth = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            if (isLogin) {
                const { error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });
                if (error) throw error;
            } else {
                const { error } = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        data: {
                            first_name: firstName,
                            last_name: lastName,
                        }
                    }
                });
                if (error) throw error;
                alert(language === 'si' ? 'ලියාපදිංචිය සාර්ථකයි. කරුණාකර පිවිසෙන්න.' : 'Registration successful. Please log in.');
                setIsLogin(true);
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="lang-selector">
                <button
                    className={`lang-btn ${language === 'en' ? 'active' : ''}`}
                    onClick={() => setLanguage('en')}
                >
                    EN
                </button>
                <button
                    className={`lang-btn ${language === 'si' ? 'active' : ''}`}
                    onClick={() => setLanguage('si')}
                >
                    සිංහල
                </button>
            </div>

            <div className="glass-panel">
                <h2 style={{ textAlign: 'center', marginBottom: '0.5rem' }}>{isLogin ? t('welcomeBack') : t('createAccount')}</h2>
                <p className="subtitle" style={{ textAlign: 'center' }}>
                    {isLogin ? t('enterDetails') : t('startManaging')}
                </p>

                <form onSubmit={handleAuth}>
                    {!isLogin && (
                        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                            <div className="form-group" style={{ margin: 0, flex: 1 }}>
                                <label>{t('firstName')}</label>
                                <div style={{ position: 'relative' }}>
                                    <User size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                                    <input
                                        type="text"
                                        className="form-control"
                                        style={{ paddingLeft: '2.5rem' }}
                                        placeholder="Kasun"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="form-group" style={{ margin: 0, flex: 1 }}>
                                <label>{t('lastName')}</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Perera"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                    )}

                    <div className="form-group">
                        <label>{t('email')}</label>
                        <div style={{ position: 'relative' }}>
                            <Mail size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                            <input
                                type="email"
                                className="form-control"
                                style={{ paddingLeft: '2.5rem' }}
                                placeholder="kasun@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>{t('password')}</label>
                        <div style={{ position: 'relative' }}>
                            <Lock size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                            <input
                                type="password"
                                className="form-control"
                                style={{ paddingLeft: '2.5rem' }}
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    {error && <div className="error-msg">{error}</div>}

                    <button type="submit" className="btn-primary" disabled={loading} style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}>
                        {loading ? t('processing') : (isLogin ? t('signIn') : t('createAccount'))}
                        {!loading && <ArrowRight size={18} />}
                    </button>
                </form>

                <div className="switch-mode">
                    {isLogin ? t('dontHaveAccount') : t('alreadyHaveAccount')}
                    <button
                        type="button"
                        className="link-text"
                        style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 'inherit' }}
                        onClick={() => { setIsLogin(!isLogin); setError(null); }}
                    >
                        {isLogin ? t('signUp') : t('logIn')}
                    </button>
                </div>
            </div>
        </div>
    );
}
