/**
 * API 통신 서비스
 * Python backend와의 통신을 담당
 */

import axios from 'axios';
import type { AxiosInstance, AxiosResponse } from 'axios';
import type { ChatRequest, ChatResponse, ApiError } from '../types/chat';

class ApiService {
  private api: AxiosInstance;
  private baseURL: string;

  constructor() {
    // 배포된 LLM API 서버 URL
    this.baseURL = import.meta.env.VITE_API_BASE_URL || 'https://www.example.com';

    this.api = axios.create({
      baseURL: this.baseURL,
      timeout: 120000, // 2분 타임아웃 (LLM 응답 시간 고려)
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // 요청 인터셉터
    this.api.interceptors.request.use(
      (config) => {
        console.log('🚀 API 요청:', config.method?.toUpperCase(), config.url);
        return config;
      },
      (error) => {
        console.error('❌ API 요청 오류:', error);
        return Promise.reject(error);
      }
    );

    // 응답 인터셉터
    this.api.interceptors.response.use(
      (response) => {
        console.log('✅ API 응답:', response.status, response.config.url);
        return response;
      },
      (error) => {
        console.error('❌ API 응답 오류:', error.response?.status, error.message);
        return Promise.reject(this.handleApiError(error));
      }
    );
  }

  /**
   * API 오류 처리
   */
  private handleApiError(error: unknown): ApiError {
    // Axios 오류 타입 가드
    if (error && typeof error === 'object' && 'response' in error) {
      const axiosError = error as { response: { status: number; data?: { message?: string; code?: string } } };
      // 서버에서 응답을 받았지만 오류 상태 코드
      return {
        message: axiosError.response.data?.message || '서버 오류가 발생했습니다.',
        status: axiosError.response.status,
        code: axiosError.response.data?.code,
      };
    } else if (error && typeof error === 'object' && 'request' in error) {
      // 요청은 보냈지만 응답을 받지 못함
      return {
        message: '서버에 연결할 수 없습니다. 네트워크를 확인해주세요.',
        code: 'NETWORK_ERROR',
      };
    } else if (error && typeof error === 'object' && 'message' in error) {
      // 요청 설정 중 오류
      const errorWithMessage = error as { message: string };
      return {
        message: errorWithMessage.message || '알 수 없는 오류가 발생했습니다.',
        code: 'REQUEST_ERROR',
      };
    } else {
      // 알 수 없는 오류
      return {
        message: '알 수 없는 오류가 발생했습니다.',
        code: 'UNKNOWN_ERROR',
      };
    }
  }

  /**
   * 채팅 메시지 전송
   */
  async sendChatMessage(request: ChatRequest): Promise<ChatResponse> {
    try {
      // 백엔드 API 형식에 맞춰 요청 데이터 변환
      const backendRequest = {
        message: request.message,
      };

      const response: AxiosResponse<{
        response: string;
        model_info: {
          model_path: string;
          context_length: number;
          threads: number;
          max_tokens: number;
          timing: {
            total_time: number;
            llm_inference_time: number;
            pre_processing_time: number;
            post_processing_time: number;
          };
        };
      }> = await this.api.post('/llm/chat', backendRequest);

      // 응답을 프론트엔드 형식으로 변환
      return {
        message: response.data.response,
        timestamp: new Date(),
        success: true,
      };
    } catch (error) {
      throw error as ApiError;
    }
  }

  /**
   * API 기본 URL 반환
   */
  getBaseURL(): string {
    return this.baseURL;
  }
}

// 싱글톤 인스턴스 생성
export const apiService = new ApiService();
export default apiService;
