
export function getApiBaseUrl(): string {
  // Get the URL from environment variable if available (deployed environments)
  const envUrl = import.meta.env.VITE_API_BASE_URL;
  
  if (envUrl) {
    return envUrl;
  }
  
  // For local development, use the proxy setup in vite.config.ts
  return '';
}

export function getOpenAIApiKey(): string | null {
  return import.meta.env.VITE_OPENAI_API_KEY || localStorage.getItem('openai_api_key') || null;
}
