// Authentication utilities for LinkedIn OAuth flow
export const linkedinOAuthConfig = {
  clientId: process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID || "",
  redirectUri: process.env.NEXT_PUBLIC_LINKEDIN_REDIRECT_URI || `${typeof window !== "undefined" ? window.location.origin : ""}/auth/callback`,
  scope: "openid profile email",
};

export const getLinkedInAuthUrl = () => {
  const params = new URLSearchParams({
    response_type: "code",
    client_id: linkedinOAuthConfig.clientId,
    redirect_uri: linkedinOAuthConfig.redirectUri,
    scope: linkedinOAuthConfig.scope,
    state: Math.random().toString(36).substring(7),
  });

  return `https://www.linkedin.com/oauth/v2/authorization?${params.toString()}`;
};

export const setAuthToken = (token) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("linkedinToken", token);
    localStorage.setItem("isAuthenticated", "true");
  }
};

export const getAuthToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("linkedinToken");
  }
  return null;
};

export const clearAuthToken = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("linkedinToken");
    localStorage.removeItem("isAuthenticated");
  }
};

export const isAuthenticated = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("isAuthenticated") === "true";
  }
  return false;
};
