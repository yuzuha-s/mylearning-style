"use client";
import React, { useState, Suspense } from 'react';
import LoadingScreen from '../components/LoadingScreen'; 
import ResultScreen from '../components/ResultScreen';

// Next.jsのルールで、useSearchParamsを使うときはSuspenseで囲む必要があるよ
export default function ResultPage() {
  const [currentView, setCurrentView] = useState('loading');

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="app-container">
        {currentView === 'loading' ? (
          <LoadingScreen onFinish={() => setCurrentView('result')} />
        ) : (
          <ResultScreen />
        )}
      </div>
    </Suspense>
  );
}