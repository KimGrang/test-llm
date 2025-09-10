import React from 'react';
import LLMChat from './components/LLMChat';
import './App.css';

/**
 * 메인 애플리케이션 컴포넌트
 * AI 상담 채팅 인터페이스를 제공
 */
function App() {
  return (
    <div className='App'>
      <LLMChat />
    </div>
  );
}

export default App;
