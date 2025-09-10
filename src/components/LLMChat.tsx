import React, { useState, useEffect, useRef } from 'react';
import type { ChatMessage } from '../types/chat';
import { apiService } from '../services/api';
import './LLMChat.css';

/**
 * AI 상담 화면 컴포넌트
 * AI 채팅 인터페이스와 상담 기능을 제공
 */

const LLMChat: React.FC = () => {
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 제안 질문들
  const suggestedQuestions = [
    '강아지가 밥을 안 먹어요',
    '예방접종 주기는 어떻게 되나요?',
    '강아지가 이상 행동을 보이고 있어요',
    '오늘 식욕이 없어요',
  ];

  // 메시지 목록 끝으로 스크롤
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isStreaming) return;

    const userMessage: ChatMessage = {
      role: 'user',
      content: inputMessage,
      timestamp: new Date(),
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInputMessage('');
    setIsStreaming(true);

    try {
      // API로 메시지 전송 (백엔드는 단일 메시지만 처리)
      const response = await apiService.sendChatMessage({
        message: inputMessage,
      });

      const assistantMessage: ChatMessage = {
        role: 'assistant',
        content: response.message,
        timestamp: new Date(),
      };

      setMessages([...newMessages, assistantMessage]);
    } catch (error: unknown) {
      console.error('❌ 채팅 오류:', error);

      const errorMessage: ChatMessage = {
        role: 'assistant',
        content: `죄송합니다. 오류가 발생했습니다. 나중에 다시 시도해주세요.`,
        timestamp: new Date(),
      };
      setMessages([...newMessages, errorMessage]);
    } finally {
      setIsStreaming(false);
    }
  };

  const handleSuggestedQuestion = (question: string) => {
    setInputMessage(question);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className='screen-container'>
      {/* 상단 헤더 */}
      <div className='screen-header'>
        <div className='header-left'>{/* 빈 공간 - 중앙 정렬을 위한 플레이스홀더 */}</div>
        <div className='header-center'>
          <span className='title'>AI 상담</span>
        </div>
        <div className='header-right'>{/* 빈 공간 - 중앙 정렬을 위한 플레이스홀더 */}</div>
      </div>

      {/* 메인 콘텐츠 */}
      <div className='screen-scrollable-content'>
        {/* 채팅 메시지 목록 */}
        <div className='chat-messages'>
          {messages.length === 0 ? (
            <div className='welcome-section'>
              {/* 경고 배너 */}
              <div className='warning-banner'>
                본 AI 상담은 참고용으로 제공되며, 정확한 진단과 치료는 반드시 수의사와 상담 후 진행해주세요.
              </div>

              {/* AI 인사말 */}
              <div className='ai-greeting'>
                <div className='ai-avatar'>🤖</div>
                <div className='ai-message'>안녕하세요! 반려동물 건강 상담 AI입니다. 무엇을 도와드릴까요?</div>
              </div>

              {/* 제안 질문들 */}
              <div className='suggested-questions'>
                {suggestedQuestions.map((question, index) => (
                  <button
                    key={index}
                    className='suggested-question'
                    onClick={() => handleSuggestedQuestion(question)}
                    disabled={isStreaming}
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            messages.map((message, index) => (
              <div key={index} className={`message ${message.role === 'user' ? 'user-message' : 'ai-message'}`}>
                <div className='message-content'>{message.content}</div>
                <div className='message-time'>
                  {message.timestamp.toLocaleTimeString('ko-KR', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* 입력 필드 */}
        <div className='chat-input-section'>
          <input
            type='text'
            placeholder='메시지를 입력하세요...'
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            className='chat-input'
            disabled={isStreaming}
          />
          <button className='send-button' onClick={handleSendMessage} disabled={!inputMessage.trim() || isStreaming}>
            {isStreaming ? '⏳' : '📤'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LLMChat;
