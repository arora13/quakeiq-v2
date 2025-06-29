
import React from 'react';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { Header } from '@/components/Header';
import { HomePage } from './HomePage';

const Index = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <HomePage />
      </div>
    </ThemeProvider>
  );
};

export default Index;
