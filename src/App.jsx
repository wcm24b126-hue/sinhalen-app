import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { supabase } from './lib/supabase';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';

function App() {
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setLoading(false);
        });

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => subscription.unsubscribe();
    }, []);

    if (loading) {
        return <div className="auth-container"><div className="glass-panel">Loading...</div></div>;
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={session ? <Navigate to="/dashboard" /> : <Navigate to="/auth" />}
                />
                <Route
                    path="/auth"
                    element={!session ? <Auth /> : <Navigate to="/dashboard" />}
                />
                <Route
                    path="/dashboard"
                    element={session ? <Dashboard session={session} /> : <Navigate to="/auth" />}
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
