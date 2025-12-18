
import React, { createContext, useContext, useState, useEffect } from 'react';

interface SubscriptionContextType {
  isPremium: boolean;
  upgradeToPremium: () => void;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export const SubscriptionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    const status = localStorage.getItem('voxfit_is_premium');
    if (status === 'true') {
      setIsPremium(true);
    }
  }, []);

  const upgradeToPremium = () => {
    setIsPremium(true);
    localStorage.setItem('voxfit_is_premium', 'true');
  };

  return (
    <SubscriptionContext.Provider value={{ isPremium, upgradeToPremium }}>
      {children}
    </SubscriptionContext.Provider>
  );
};

export const useSubscription = () => {
  const context = useContext(SubscriptionContext);
  if (!context) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
};
