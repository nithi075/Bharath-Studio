// Central place that talks to the backend.
export const API_URL = "https://bs-backend-gegc.onrender.com";

async function handleResponse(res) {
  if (!res.ok) {
    let message = "Something went wrong";

    try {
      const data = await res.json();
      message = data.message || message;
    } catch {
      // Ignore if response isn't JSON
    }

    throw new Error(message);
  }

  return res.json();
}

export async function apiGet(path) {
  const res = await fetch(`${API_URL}${path}`);
  return handleResponse(res);
}

export async function apiPostJSON(path, body) {
  const res = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  return handleResponse(res);
}

export async function apiPutJSON(path, body) {
  const res = await fetch(`${API_URL}${path}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  return handleResponse(res);
}

export async function apiPostForm(path, formData) {
  const res = await fetch(`${API_URL}${path}`, {
    method: "POST",
    body: formData,
  });

  return handleResponse(res);
}

export async function apiDelete(path) {
  const res = await fetch(`${API_URL}${path}`, {
    method: "DELETE",
  });

  return handleResponse(res);
}

export function toImageUrl(imageUrl) {
  if (!imageUrl) return "";

  if (imageUrl.startsWith("http")) {
    return imageUrl;
  }

  return `${API_URL}${imageUrl}`;
}
