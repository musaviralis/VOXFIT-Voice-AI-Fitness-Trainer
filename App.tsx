
import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import WorkoutGenerator from './pages/WorkoutGenerator';
import CoachChat from './pages/CoachChat';
import Nutrition from './pages/Nutrition';
import CreatorStudio from './pages/CreatorStudio';
import VoiceTrainer from './pages/VoiceTrainer';
import Premium from './pages/Premium';
import { LanguageProvider } from './contexts/LanguageContext';
import { SubscriptionProvider } from './contexts/SubscriptionContext';

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <SubscriptionProvider>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/workouts" element={<WorkoutGenerator />} />
              <Route path="/voice" element={<VoiceTrainer />} />
              <Route path="/nutrition" element={<Nutrition />} />
              <Route path="/creator" element={<CreatorStudio />} />
              <Route path="/coach" element={<CoachChat />} />
              <Route path="/premium" element={<Premium />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </SubscriptionProvider>
    </LanguageProvider>
  );
};

export default App;
