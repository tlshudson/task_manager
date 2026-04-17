const BASE_URL = import.meta.env.VITE_API_URL;

export async function apiFetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const cleanBaseUrl = (BASE_URL || '').replace(/\/+$/, '');
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const url = `${cleanBaseUrl}${cleanEndpoint}`;

  const defaultHeaders = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };

  const config: RequestInit = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options?.headers,
    },
  };

  const response = await fetch(url, config);

  // We should only attempt to parse JSON if there is content
  const contentType = response.headers.get('content-type');
  let data: any = null;

  if (contentType && contentType.includes('application/json')) {
    data = await response.json();
  }

  if (!response.ok) {
    throw new Error((data && data.message) || `Erro HTTP: ${response.status}`);
  }

  // Se for 204 No Content, a resposta pode não ter json
  return data as T;
}
