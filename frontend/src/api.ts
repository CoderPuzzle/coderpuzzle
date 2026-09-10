import type { FormatReport, JudgeResult, Problem, ProblemPage, SolutionsContent, Submission, TopicIndex } from "./types";

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

// Set by App: a 401 on an active session (idle expiry) routes the app to the
// logged-out page.
let unauthorizedHandler: (() => void) | null = null;

export function onUnauthorized(handler: () => void) {
  unauthorizedHandler = handler;
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`/api${path}`, {
    ...options,
    headers: { "Content-Type": "application/json", ...options?.headers },
  });
  if (!response.ok) {
    if (response.status === 401) unauthorizedHandler?.();
    const payload = await response.json().catch(() => null);
    // FastAPI validation errors carry detail as an array — stringify
    // instead of letting it render as "[object Object]".
    const detail = payload?.detail;
    const message = typeof detail === "string" && detail
      ? detail
      : Array.isArray(detail)
        ? detail.map((entry: { msg?: string }) => entry?.msg ?? "").join("; ").trim()
        : "";
    throw new ApiError(message || `Request failed with status ${response.status}`, response.status);
  }
  return response.json() as Promise<T>;
}

export type SessionStatus = {
  status: string;
  idle_seconds: number;
  user: { username: string; is_admin: boolean } | null;
};
// POST /auth/register and /auth/complete answer with the account, not a
// session payload (the idle window lives on SessionStatus alone).
export type AuthResult = { status: string; username: string; is_admin: boolean };
export type AuthField = {
  name: string;
  label: string;
  kind: "text" | "password" | "email";
  autocomplete?: string;
  required?: boolean;
  min_length?: number;
  readonly?: boolean;
  default?: string;
  confirm?: boolean;
};
export type AuthProviderInfo = {
  id: string;
  label: string;
  flow: "credentials" | "redirect" | "challenge";
  can_login: boolean;
  can_register: boolean;
  can_bootstrap: boolean;
  hint?: string;
  fields: AuthField[];
  register_fields: AuthField[];
  start_fields: AuthField[];
};
export type AuthStatus = { needs_setup: boolean; providers: AuthProviderInfo[] };
export type AuthStartResult = {
  next: "complete" | "redirect" | "challenge";
  redirect_url?: string;
  challenge_id?: string;
  message?: string;
};
export type DraftRow = { language: string; code: string; updated_at: number };

// The full problem list (page_size=0) is fixed for the lifetime of a server
// deployment, and two independent consumers need all of it — the editor's
// drawer and prev/next ordering, and the landing search index. Serve both
// from one session cache so a fresh visit downloads the list once.
let fullListCache: ProblemPage | null = null;

export const api = {
  sessionStatus: (): Promise<SessionStatus> => request<SessionStatus>("/session"),
  // Idle-expiry probe: validates without extending the session's clock, so
  // the inactivity watcher can poll without keeping the session alive.
  probeSession: (): Promise<SessionStatus> => request<SessionStatus>("/session?touch=0"),
  startSession: (): Promise<SessionStatus> =>
    request<SessionStatus>("/session", { method: "POST" }),
  authStatus: (): Promise<AuthStatus> =>
    request<AuthStatus>("/auth/status"),
  authStart: (provider: string, payload: Record<string, string>): Promise<AuthStartResult> =>
    request<AuthStartResult>("/auth/start", {
      method: "POST",
      body: JSON.stringify({ provider, ...payload }),
    }),
  authComplete: (provider: string, payload: Record<string, string>): Promise<AuthResult> =>
    request<AuthResult>("/auth/complete", {
      method: "POST",
      body: JSON.stringify({ provider, ...payload }),
    }),
  authRegister: (provider: string, payload: Record<string, string>): Promise<AuthResult> =>
    request<AuthResult>("/auth/register", {
      method: "POST",
      body: JSON.stringify({ provider, ...payload }),
    }),
  logout: (): Promise<{ status: string }> =>
    request<{ status: string }>("/auth/logout", { method: "POST" }),
  getProblem: (slug: string) => request<Problem>(`/problems/${slug}`),
  // pageSize of 0 (default) returns the full list in one page — the editor
  // needs the whole ordering for prev/next and the drawer. The landing page
  // passes an explicit page_size to fetch just the page it renders.
  getProblems: (page = 1, pageSize = 0) => {
    if (page === 1 && pageSize === 0) {
      if (fullListCache) return Promise.resolve(fullListCache);
      return request<ProblemPage>("/problems?page=1&page_size=0").then((list) => {
        fullListCache = list;
        return list;
      });
    }
    return request<ProblemPage>(`/problems?page=${page}&page_size=${pageSize}`);
  },
  getTopicIndex: () => request<TopicIndex>("/problems/topics"),
  getSolutions: (slug: string): Promise<SolutionsContent> =>
    request<SolutionsContent>(`/problems/${encodeURIComponent(slug)}/solutions`),
  getDrafts: (slug: string): Promise<DraftRow[]> =>
    request<DraftRow[]>(`/drafts/${encodeURIComponent(slug)}`),
  putDraft: (slug: string, language: string, code: string) => {
    const body = JSON.stringify({ code });
    // keepalive requests are capped at 64 KiB by the fetch spec and the
    // PUT would then throw before reaching the server — only use it for
    // small payloads, where surviving tab teardown matters and the cap
    // cannot bite.
    return request<{ status: string }>(`/drafts/${encodeURIComponent(slug)}/${encodeURIComponent(language)}`, {
      method: "PUT",
      body,
      keepalive: body.length < 48 * 1024,
    });
  },
  run: (slug: string, language: string, code: string, cases: Record<string, unknown>[]) =>
    request<JudgeResult>("/run", {
      method: "POST",
      body: JSON.stringify({ slug, language, code, cases }),
    }),
  // Formatting depends on the language alone, so no slug is sent.
  format: (language: string, code: string) =>
    request<FormatReport>("/format", {
      method: "POST",
      body: JSON.stringify({ language, code }),
    }),
  submit: (slug: string, language: string, code: string) =>
    request<JudgeResult>("/submit", {
      method: "POST",
      body: JSON.stringify({ slug, language, code }),
    }),
  getSubmissions: (slug: string) => request<Submission[]>(`/submissions?slug=${encodeURIComponent(slug)}`),
  // Per-problem status marks for the current viewer (user or guest):
  // "solved" (any language accepted) or "attempted"; absent slugs are never-tried.
  getProgress: (): Promise<Record<string, "attempted" | "solved">> => request("/progress"),
};
