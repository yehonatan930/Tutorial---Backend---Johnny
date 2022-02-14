import { HeadersInterceptor } from './headers.interceptor';

describe('HeadersMiddleware', () => {
  it('should be defined', () => {
    expect(new HeadersInterceptor()).toBeDefined();
  });
});
