# AI 상담 웹 애플리케이션

반려동물 건강 상담을 위한 AI 채팅 웹 애플리케이션입니다.

## 🚀 기술 스택

### Frontend

- **React 19** - UI 라이브러리
- **TypeScript** - 타입 안전성
- **Vite** - 빌드 도구
- **pnpm** - 패키지 매니저
- **Axios** - HTTP 클라이언트

### Backend

- **Python 3.8+** - 백엔드 언어
- **FastAPI** - 웹 프레임워크
- **Uvicorn** - ASGI 서버
- **Pydantic** - 데이터 검증

## 📁 프로젝트 구조

```
vite-react-pwa-chat-test/
├── src/
│   ├── components/
│   │   ├── LLMChat.tsx      # 메인 채팅 컴포넌트
│   │   └── LLMChat.css      # 채팅 스타일
│   ├── services/
│   │   └── api.ts           # API 통신 서비스
│   ├── types/
│   │   └── chat.ts          # 타입 정의
│   ├── App.tsx              # 메인 앱 컴포넌트
│   └── main.tsx             # 앱 진입점
└── package.json             # Node.js 의존성
```

## 🛠️ 설치 및 실행

### 프론트엔드 실행

```bash
# 의존성 설치
pnpm install

# 개발 서버 실행
pnpm run dev
```

프론트엔드는 http://localhost:5174 에서 실행됩니다.

### 백엔드

백엔드는 별도로 배포되어 있으며, 프론트엔드에서 자동으로 연결됩니다.

**API 서버**: https://www.example.com

- **채팅 엔드포인트**: `/llm/chat`
- **상태 확인**: `/health`
- **모델 정보**: `/model-info`

## 🎯 주요 기능

- 💬 **실시간 AI 채팅** - 반려동물 건강 상담
- 📱 **반응형 디자인** - 모바일 친화적 UI
- 🔄 **서버 상태 모니터링** - 연결 상태 실시간 확인
- 🎨 **모던 UI/UX** - 깔끔하고 직관적인 인터페이스
- ⚡ **빠른 응답** - Vite 기반 빠른 개발 환경

## 🔧 환경 설정

프로젝트 루트에 `.env` 파일을 생성하고 다음 내용을 추가하세요:

```env
# API 서버 설정 (기본값: https://www.example.com)
VITE_API_BASE_URL=https://www.example.com

# 개발 환경 설정
VITE_APP_TITLE=AI 상담
VITE_APP_VERSION=1.0.0
```

## 🚀 배포

### 프론트엔드 빌드

```bash
pnpm run build
```

빌드된 파일은 `dist/` 폴더에 생성됩니다.

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

## ⚠️ 주의사항

본 AI 상담은 참고용으로 제공되며, 정확한 진단과 치료는 반드시 수의사와 상담 후 진행해주세요.
# test-llm
