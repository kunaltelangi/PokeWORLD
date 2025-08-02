const BASE_URL = 'https://pokeapi.co/api/v2';

export async function apiFetch(endpoint, options = {}, timeout = 10_000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      let errorPayload;
      try {
        errorPayload = await response.json();
      } catch {}

      const message =
        errorPayload?.message ||
        errorPayload?.error ||
        response.statusText ||
        'Unknown error';

      const err = new Error(`API Error: ${message}`);
      err.status = response.status;
      err.payload = errorPayload;
      throw err;
    }

    return await response.json();
  } catch (err) {
    if (err.name === 'AbortError') {
      throw new Error(`Request timed out after ${timeout}ms`);
    }
    throw err;
  }
}
