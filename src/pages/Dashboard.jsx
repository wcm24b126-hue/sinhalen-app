import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { LogOut, Home, PieChart, Plus, CreditCard, Wallet, TrendingUp, TrendingDown, Building2, Smartphone, Zap, Droplets } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';

export default function Dashboard({ session }) {
    const [profile, setProfile] = useState(null);
    const [balance, setBalance] = useState(0);
    const [income, setIncome] = useState(0);
    const [expense, setExpense] = useState(0);
    const [transactions, setTransactions] = useState([]);

    const { t, language, setLanguage, formatCurrency } = useLanguage();

    useEffect(() => {
        fetchProfile();
        fetchAccounts();
        fetchTransactions();
        setupDefaultCategories();
    }, [session, language]);

    // Setup local categories for Sri Lankan context if first time
    const setupDefaultCategories = async () => {
        const { data: existing } = await supabase
            .from('categories')
            .select('id')
            .eq('user_id', session.user.id)
            .limit(1);

        if (!existing || existing.length === 0) {
            const sriLankanCategories = [
                { user_id: session.user.id, name: 'Keells/Cargills (Groceries)', icon: 'ShoppingCart', color: '#10b981', type: 'expense' },
                { user_id: session.user.id, name: 'Dialog/Mobitel (Mobile)', icon: 'Smartphone', color: '#3b82f6', type: 'expense' },
                { user_id: session.user.id, name: 'CEB (Electricity)', icon: 'Zap', color: '#eab308', type: 'expense' },
                { user_id: session.user.id, name: 'Water Board', icon: 'Droplets', color: '#0ea5e9', type: 'expense' },
                { user_id: session.user.id, name: 'PickMe/Uber (Transport)', icon: 'Car', color: '#ef4444', type: 'expense' },
                { user_id: session.user.id, name: 'Salary', icon: 'Briefcase', color: '#8b5cf6', type: 'income' },
            ];
            await supabase.from('categories').insert(sriLankanCategories);
        }
    };

    const fetchProfile = async () => {
        const { data } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();
        if (data) setProfile(data);
    };

    const fetchAccounts = async () => {
        const { data } = await supabase
            .from('accounts')
            .select('*')
            .eq('user_id', session.user.id);

        // Auto create default account if null
        if (!data || data.length === 0) {
            const { data: newAcc } = await supabase.from('accounts').insert({
                user_id: session.user.id,
                name: 'Cash / Main Bank',
                type: 'cash',
                balance: 0
            }).select();
        } else {
            const total = data.reduce((acc, account) => acc + Number(account.balance), 0);
            setBalance(total);
        }
    };

    const fetchTransactions = async () => {
        const { data } = await supabase
            .from('transactions')
            .select('*, categories(*)')
            .eq('user_id', session.user.id)
            .order('date', { ascending: false })
            .limit(10);

        if (data) {
            setTransactions(data);
            let inc = 0;
            let exp = 0;
            data.forEach(t => {
                if (t.type === 'income') inc += Number(t.amount);
                if (t.type === 'expense') exp += Number(t.amount);
            });
            setIncome(inc);
            setExpense(exp);
        }
    };

    const handleSignOut = async () => {
        await supabase.auth.signOut();
    };

    const getDayGreeting = () => {
        const hour = new Date().getHours();
        if (language === 'si') {
            if (hour < 12) return 'සුබ උදෑසනක්';
            if (hour < 15) return 'සුබ දහවලක්';
            if (hour < 19) return 'සුබ සවසක්';
            return 'සුබ රාත්‍රියක්';
        } else {
            if (hour < 12) return 'Good Morning';
            if (hour < 17) return 'Good Afternoon';
            return 'Good Evening';
        }
    };

    return (
        <div className="dashboard-container">
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

            <nav className="navbar">
                <h1>{t('appName')}</h1>
                <div className="nav-actions">
                    <span style={{ color: 'var(--text-secondary)' }}>
                        {getDayGreeting()}, {profile?.first_name || t('user')}
                    </span>
                    <button className="btn-secondary" onClick={handleSignOut} title={t('signOut')}>
                        <LogOut size={18} />
                    </button>
                </div>
            </nav>

            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-title">{t('totalBalance')}</div>
                    <div className="stat-value">{formatCurrency(balance)}</div>
                </div>
                <div className="stat-card">
                    <div className="stat-title">{t('monthlyIncome')}</div>
                    <div className="stat-value stat-positive">+{formatCurrency(income)}</div>
                </div>
                <div className="stat-card">
                    <div className="stat-title">{t('monthlyExpenses')}</div>
                    <div className="stat-value stat-negative">-{formatCurrency(expense)}</div>
                </div>
            </div>

            <div className="dashboard-content">
                <div className="content-panel">
                    <div className="panel-header">
                        <h3>{t('recentTransactions')}</h3>
                        <button className="btn-primary" style={{ width: 'auto', padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Plus size={16} /> {t('addNew')}
                        </button>
                    </div>

                    <div className="transaction-list">
                        {transactions.length === 0 ? (
                            <p style={{ color: 'var(--text-secondary)', textAlign: 'center', padding: '2rem' }}>
                                {t('noTransactions')}
                            </p>
                        ) : (
                            transactions.map(tx => (
                                <div key={tx.id} className="transaction-item">
                                    <div className="tx-info">
                                        <div className="tx-icon">
                                            {tx.type === 'income' ? <TrendingUp size={20} color="var(--success-color)" /> : <TrendingDown size={20} color="var(--danger-color)" />}
                                        </div>
                                        <div className="tx-details">
                                            <h4>{tx.notes || tx.payee || t('transaction')}</h4>
                                            <p>{new Date(tx.date).toLocaleDateString()} • {tx.categories?.name || t('uncategorized')}</p>
                                        </div>
                                    </div>
                                    <div className={`tx-amount ${tx.type}`}>
                                        {tx.type === 'income' ? '+' : '-'}{formatCurrency(tx.amount)}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                <div className="content-panel">
                    <div className="panel-header">
                        <h3>{t('yourAccounts')}</h3>
                    </div>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                        {t('accountComingSoon')}
                    </p>
                </div>
            </div>
        </div>
    );
}
