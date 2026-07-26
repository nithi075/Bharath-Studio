// Central place that talks to the backend.
// Change VITE_API_URL in your .env file if the backend runs somewhere else.
export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

async function handleResponse(res) {
  if (!res.ok) {
    let message = "Something went wrong";
    try {
      const data = await res.json();
      message = data.message || message;
    } catch {
      // response wasn't JSON, keep default message
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
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return handleResponse(res);
}

export async function apiPutJSON(path, body) {
  const res = await fetch(`${API_URL}${path}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return handleResponse(res);
}

// formData should be a FormData instance (used for image uploads)
export async function apiPostForm(path, formData) {
  const res = await fetch(`${API_URL}${path}`, {
    method: "POST",
    body: formData,
  });
  return handleResponse(res);
}

export async function apiDelete(path) {
  const res = await fetch(`${API_URL}${path}`, { method: "DELETE" });
  return handleResponse(res);
}

// Gallery/portfolio/instagram images are stored as relative paths like
// "/uploads/xyz.jpg" - this turns them into a full URL the <img> tag can load.
export function toImageUrl(imageUrl) {
  if (!imageUrl) return "";
  if (imageUrl.startsWith("http")) return imageUrl;
  return `${API_URL}${imageUrl}`;
}
