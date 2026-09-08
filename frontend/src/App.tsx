import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  Braces,
  Check,
  ChevronDown,
  Copy,
  ChevronLeft,
  ChevronRight,
  CircleAlert,
  CircleCheck,
  CircleDashed,
  Clock3,
  Code2,
  FileText,
  Github,
  GripVertical,
  History,
  List,
  LoaderCircle,
  LogOut,
  Play,
  Plus,
  RotateCcw,
  Send,
  Moon,
  Sun,
  TerminalSquare,
  X,
} from "lucide-react";
import { api, onUnauthorized } from "./api";
import type { JudgeResult, Problem, ProblemSummary, SolutionsContent, Submission, TopicSummary } from "./types";

type Theme = "light" | "dark";

const THEME_STORAGE_KEY = "openoj:theme";

function storedTheme(): Theme | null {
  try {
    const value = localStorage.getItem(THEME_STORAGE_KEY);
    return value === "light" || value === "dark" ? value : null;
  } catch {
    return null;
  }
}

function preferredTheme(): Theme {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

// The active problem lives in the URL (/problems/:slug) so each problem is a
// page, browser back returns to the list, and links are shareable.
function slugFromPath(): string | null {
  const match = window.location.pathname.match(/^\/problems\/([a-z0-9]+(?:-[a-z0-9]+)*)\/?$/);
  return match ? match[1] : null;
}

// The last chosen language carries across problems within the session; each
// problem still keeps its own per-language server-side draft.
const LANGUAGE_STORAGE_KEY = "openoj:language";

function storedLanguage(): string {
  try {
    return sessionStorage.getItem(LANGUAGE_STORAGE_KEY) ?? "python3";
  } catch {
    return "python3";
  }
}

function statusLabel(status: string) {
  const labels: Record<string, string> = {
    accepted: "Accepted",
    completed: "Finished",
    wrong_answer: "Wrong answer",
    runtime_error: "Runtime error",
    compile_error: "Compile error",
    time_limit_exceeded: "Time limit exceeded",
    memory_limit_exceeded: "Memory limit exceeded",
    system_error: "Judge error",
  };
  return labels[status] ?? status.replaceAll("_", " ");
}

// The judge's own short-hand for a verdict — what competitive programmers
// read at a glance (AC, WA, TLE…). Stamped on the result seal.
function verdictCode(status: string) {
  const codes: Record<string, string> = {
    accepted: "AC",
    completed: "OK",
    wrong_answer: "WA",
    compile_error: "CE",
    runtime_error: "RE",
    time_limit_exceeded: "TLE",
    memory_limit_exceeded: "MLE",
    system_error: "JE",
  };
  return codes[status] ?? status.replaceAll("_", " ").split(" ").map((word) => word[0]?.toUpperCase() ?? "").join("").slice(0, 3);
}

function statusTone(status?: string) {
  if (!status) return "idle";
  if (status === "accepted" || status === "completed") return "success";
  if (status === "wrong_answer" || status === "compile_error") return "danger";
  return "warning";
}

// The bank carries the original source difficulty (Easy/Medium/Hard),
// mirrored from the crawl archive — shown as-is, with the usual tones.
function difficultyTone(difficulty: string) {
  const name = difficulty.trim().toLowerCase();
  if (name === "easy") return "easy";
  if (name === "hard") return "hard";
  return "medium";
}

// Search normalization: case-insensitive and blind to punctuation, so
// "two-sum" is found by "two sum" or "two+sum".
function searchText(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function matchesFilter(entry: ProblemSummary, normalizedQuery: string) {
  return searchText(entry.title).includes(normalizedQuery)
    || entry.tags.some((tag) => searchText(tag).includes(normalizedQuery))
    || numberMatches(entry.id, normalizedQuery);
}

// The topic filter's option list — fetched once per session and shared by
// the landing filter and the problem drawer. A rejected fetch is dropped
// from the cache so a later open retries instead of caching the failure.
let topicIndexPromise: Promise<TopicSummary[]> | null = null;
function loadTopicIndex() {
  topicIndexPromise ??= api.getTopicIndex()
    .then((data) => data.topics)
    .catch((error: unknown) => {
      topicIndexPromise = null;
      throw error;
    });
  return topicIndexPromise;
}

function matchesTopic(entry: ProblemSummary, topic: string) {
  return topic === "" || entry.topics.includes(topic);
}

function matchesType(entry: ProblemSummary, problemType: string) {
  return problemType === "" || entry.type === problemType;
}

function matchesHardness(entry: ProblemSummary, hardness: string) {
  return hardness === "" || entry.difficulty === hardness;
}

// Shell inputs and sql datasets are the raw text itself — shown and sent
// verbatim, never JSON-encoded.
function isRawTextParameter(problem: Problem, name: string) {
  if (problem.invocation.type === "shell") return true;
  return problem.invocation.parameters?.some(
    (parameter) => parameter.name === name && parameter.codec === "sql_setup",
  ) ?? false;
}

// The topic filter opens a modal grid rather than a dropdown: 175 topics
// do not read as a list, and the counts add noise to the choice.
function TopicSelect({ topic, onPick }: {
  topic: string;
  onPick: (topic: string) => void;
}) {
  const [topics, setTopics] = useState<TopicSummary[]>([]);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    let cancelled = false;
    loadTopicIndex().then((loaded) => {
      if (!cancelled) setTopics(loaded);
    }).catch(() => undefined);
    return () => { cancelled = true; };
  }, []);
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") { event.stopPropagation(); setOpen(false); }
    };
    document.addEventListener("keydown", onKey, true);
    return () => document.removeEventListener("keydown", onKey, true);
  }, [open]);
  const choose = (next: string) => { onPick(next); setOpen(false); };
  return (
    <div className="select-menu filter-select topic-select-menu">
      <button
        type="button"
        className="select-trigger"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen(true)}
      >
        <span className="select-trigger-label">{topic || "All topics"}</span>
        <ChevronDown size={14} className={open ? "select-chevron flipped" : "select-chevron"} />
      </button>
      {open && (
        <div className="dialog-backdrop" onMouseDown={() => setOpen(false)}>
          <div
            className="dialog topic-dialog"
            role="dialog"
            aria-modal="true"
            aria-label="Filter by topic"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="topic-dialog-head">
              <h2>Topics</h2>
              <button
                type="button"
                className="topic-dialog-close"
                aria-label="Close topics"
                onClick={() => setOpen(false)}
              >
                <X size={15} />
              </button>
            </div>
            <div className="topic-grid">
              <button
                type="button"
                className={topic === "" ? "topic-chip selected" : "topic-chip"}
                onClick={() => choose("")}
                autoFocus
              >
                All topics
              </button>
              {topics.map((entry) => (
                <button
                  key={entry.name}
                  type="button"
                  className={entry.name === topic ? "topic-chip selected" : "topic-chip"}
                  onClick={() => choose(entry.name)}
                >
                  {entry.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// A digits-only query also matches the displayed problem number, by
// prefix ("39" finds 39, 390–399, 3900–3999). Leading zeros are
// forgiven so "0042" finds 42.
function numberMatches(id: number, normalizedQuery: string) {
  if (!/^\d+$/.test(normalizedQuery)) return false;
  return String(id).startsWith(normalizedQuery.replace(/^0+(?=\d)/, ""));
}

function formatJson(value: unknown) {
  return JSON.stringify(value, null, 2);
}

function formatTolerance(tolerance: number | undefined) {
  const value = tolerance ?? 1e-9;
  return value >= 0.001 ? String(value) : value.toExponential(0);
}

function App() {
  const [themeOverride, setThemeOverride] = useState<Theme | null>(storedTheme);
  const [systemTheme, setSystemTheme] = useState<Theme>(preferredTheme);
  // Guest-session gate: "checking" while the session cookie is validated,
  // "gate" shows the Continue-as-guest entrance (the only way in until
  // accounts exist), "active" runs the app. An idle-expired session mid-use
  // lands on "logged-out" — a dedicated page back to login/signup.
  const [sessionPhase, setSessionPhase] = useState<"checking" | "gate" | "logged-out" | "active">("checking");
  // Who the expired session belonged to (drives the logged-out page copy)
  // and the mode the gate opens in after that page's buttons are used.
  const [expiredAsUser, setExpiredAsUser] = useState(false);
  const [gateEntryMode, setGateEntryMode] = useState<"welcome" | "signup" | "login">("welcome");
  // The server's idle window, for the inactivity watcher.
  const idleSecondsRef = useRef(3600);
  const [sessionExpired, setSessionExpired] = useState(false);
  const [gateError, setGateError] = useState("");
  const [needsSetup, setNeedsSetup] = useState(false);
  const [sessionUser, setSessionUser] = useState<{ username: string; is_admin: boolean } | null>(null);
  // Full problem list, fetched lazily only when the editor opens (prev/next
  // navigation and the drawer need the whole ordering). The landing page
  // fetches its own paginated slice instead.
  const [allProblems, setAllProblems] = useState<ProblemSummary[] | null>(null);
  const [problemsError, setProblemsError] = useState("");
  // Per-problem status marks for the current viewer (signed-in user or
  // guest): fetched once a session is active, updated after each submit.
  const [progress, setProgress] = useState<Record<string, "attempted" | "solved">>({});
  const [activeSlug, setActiveSlug] = useState<string | null>(slugFromPath);
  // Mirror of activeSlug kept in a ref so in-flight run/submit continuations
  // can detect that the user navigated to another problem mid-judge (state
  // alone is stale inside the awaited closure).
  const activeSlugRef = useRef<string | null>(slugFromPath());
  const sessionPhaseRef = useRef(sessionPhase);
  sessionPhaseRef.current = sessionPhase;
  const [problem, setProblem] = useState<Problem | null>(null);
  const [loadError, setLoadError] = useState("");
  const [language, setLanguage] = useState<string>(storedLanguage);
  const [code, setCode] = useState("");
  const [drafts, setDrafts] = useState<Array<Record<string, string>>>([]);
  const [activeCase, setActiveCase] = useState(0);
  const [result, setResult] = useState<JudgeResult | null>(null);
  const [busy, setBusy] = useState<"run" | "submit" | null>(null);
  const [actionError, setActionError] = useState("");
  const [leftTab, setLeftTab] = useState<"description" | "submissions" | "solutions">("description");
  const [bottomTab, setBottomTab] = useState<"testcase" | "result">("testcase");
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [problemListOpen, setProblemListOpen] = useState(false);
  const [confirmRestore, setConfirmRestore] = useState(false);
  // Stable identities: the drawer and dialog key their focus/keyboard
  // effects on onClose, and a fresh inline closure would re-run them (and
  // steal focus back) on every render of the workspace.
  const closeProblemList = useCallback(() => setProblemListOpen(false), []);
  const closeConfirmRestore = useCallback(() => setConfirmRestore(false), []);
  const [formatting, setFormatting] = useState(false);
  const [formatError, setFormatError] = useState("");
  const [splitX, setSplitX] = useState(46);
  const [splitY, setSplitY] = useState(61);
  const workspaceRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  // Live editor state for async guards: lets a slow callback (format) tell
  // whether the editor still shows what it was launched with.
  const editorCodeRef = useRef(code);
  editorCodeRef.current = code;
  const editorLanguageRef = useRef(language);
  editorLanguageRef.current = language;
  const theme = themeOverride ?? systemTheme;

  // Server-side drafts (session-scoped): loaded per problem, cached locally
  // for instant language switches, and flushed to the server on a short
  // debounce so editor state survives refreshes and idle-expiry clears it.
  const draftCache = useRef(new Map<string, string>());
  const pendingDrafts = useRef(new Map<string, { slug: string; language: string; code: string }>());
  const draftTimer = useRef<number | null>(null);
  const [draftSaveFailed, setDraftSaveFailed] = useState(false);
  const flushDrafts = useCallback(() => {
    if (draftTimer.current !== null) {
      window.clearTimeout(draftTimer.current);
      draftTimer.current = null;
    }
    const pending = [...pendingDrafts.current.values()];
    pendingDrafts.current.clear();
    for (const draft of pending) {
      api.putDraft(draft.slug, draft.language, draft.code)
        .then(() => setDraftSaveFailed(false))
        // a failed flush must not read "Saved": the local cache dies with
        // the session, so the status line has to admit the loss
        .catch(() => setDraftSaveFailed(true));
    }
  }, []);
  const saveDraft = useCallback((slug: string, language: string, code: string) => {
    draftCache.current.set(`${slug}:${language}`, code);
    pendingDrafts.current.set(`${slug}:${language}`, { slug, language, code });
    if (draftTimer.current === null) {
      draftTimer.current = window.setTimeout(flushDrafts, 700);
    }
  }, [flushDrafts]);

  useEffect(() => {
    if (sessionPhase !== "active") return;
    api.getProgress().then(setProgress).catch(() => undefined);
  }, [sessionPhase]);

  useEffect(() => {
    api.authStatus()
      .then((status) => setNeedsSetup(status.needs_setup))
      .catch(() => undefined);
    api.sessionStatus()
      .then((status) => {
        setSessionUser(status.user);
        idleSecondsRef.current = status.idle_seconds || 3600;
        setSessionPhase("active");
      })
      .catch(() => setSessionPhase("gate"));
    const onHide = () => {
      if (document.visibilityState === "hidden") flushDrafts();
    };
    document.addEventListener("visibilitychange", onHide);
    return () => {
      document.removeEventListener("visibilitychange", onHide);
      flushDrafts();
    };
  }, [flushDrafts]);

  // Any 401 once the app is running (idle expiry mid-use, or the idle
  // watcher's touch-free probe agreeing with the server) leaves the current
  // view for the dedicated logged-out page. The phase guard keeps the
  // expected first-visit 401 from reading as an expiry: only an ACTIVE
  // session can expire, so outside it (first visit, login screen) the 401
  // is left to the caller — this keeps shared /problems/<slug> links
  // intact through the sign-in round-trip.
  useEffect(() => {
    onUnauthorized(() => {
      if (sessionPhaseRef.current !== "active") return;
      flushDrafts();
      draftCache.current.clear();
      pendingDrafts.current.clear();
      setExpiredAsUser(sessionUser !== null);
      setSessionUser(null);
      setProgress({});
      activeSlugRef.current = null;
      setActiveSlug(null);
      // leave the problem URL behind too, so refresh/back lands on the
      // logged-out page, not the dead view
      window.history.replaceState({}, "", "/");
      setSessionExpired(false);
      setSessionPhase((phase) => (phase === "active" ? "logged-out" : phase));
    });
  }, [flushDrafts, sessionUser]);

  // Server-authoritative idle watch: once a full idle window has passed with
  // no user input, probe the session WITHOUT touching its clock (touch=0) —
  // a polling touch would keep abandoned sessions alive forever. A 401
  // routes to the logged-out page through the handler above. The deadline is
  // re-checked on a short interval rather than one long timer: background
  // tabs freeze timers (throttling, Memory Saver, system sleep), and a
  // returning user's first input must not postpone the overdue probe — it
  // fires right there, or on the tab becoming visible.
  useEffect(() => {
    if (sessionPhase !== "active") return;
    const idleMs = () => Math.max(60, idleSecondsRef.current) * 1000;
    let lastActivity = Date.now();
    const check = () => {
      if (Date.now() - lastActivity >= idleMs()) {
        api.probeSession().catch(() => undefined);
      }
    };
    const onActivity = () => {
      // Check BEFORE resetting the clock: if the idle window already elapsed
      // while the tab was frozen or the machine asleep, this input is the
      // first moment the expiry can be detected.
      check();
      lastActivity = Date.now();
    };
    const onVisible = () => {
      if (document.visibilityState === "visible") check();
    };
    const timer = window.setInterval(check, 30_000);
    window.addEventListener("pointerdown", onActivity);
    window.addEventListener("keydown", onActivity);
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      window.clearInterval(timer);
      window.removeEventListener("pointerdown", onActivity);
      window.removeEventListener("keydown", onActivity);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [sessionPhase]);

  const enterAsGuest = useCallback(() => {
    api.startSession()
      .then((status) => {
        idleSecondsRef.current = status.idle_seconds || idleSecondsRef.current;
        setSessionExpired(false);
        setGateError("");
        setSessionUser(null);
        setNeedsSetup(false);
        setSessionPhase("active");
      })
      .catch(() => setGateError("Could not start a session — check the connection and try again."));
  }, []);

  const registerAccount = useCallback((username: string, password: string) => {
    api.register(username, password)
      .then((session) => api.authStatus().then((status) => {
        setNeedsSetup(status.needs_setup);
        setSessionUser({ username: session.username, is_admin: session.is_admin });
      }))
      .then(() => {
        setGateError("");
        setSessionExpired(false);
        setSessionPhase("active");
      })
      .catch((error: Error) => setGateError(error.message || "Could not create the account."));
  }, []);

  const loginAccount = useCallback((username: string, password: string) => {
    api.startSession()
      .then(() => api.login(username, password))
      .then((result) => {
        setSessionUser({ username: result.username, is_admin: result.is_admin });
        setGateError("");
        setSessionExpired(false);
        setSessionPhase("active");
      })
      .catch((error: Error) => setGateError(error.message || "Could not sign in."));
  }, []);

  const logoutAccount = useCallback(() => {
    flushDrafts();
    const finish = () => {
      setSessionUser(null);
      setSessionExpired(false);
      setSessionPhase("gate");
    };
    if (sessionUser) {
      api.logout().then(finish).catch(finish);
    } else {
      // Guest: the session cookie stays server-side until it idles out, but
      // exiting drops all local state and returns to the entrance; Continue
      // as guest or Log in starts fresh.
      draftCache.current.clear();
      pendingDrafts.current.clear();
      finish();
    }
  }, [flushDrafts, sessionUser]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const update = () => setSystemTheme(media.matches ? "dark" : "light");
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute(
      "content",
      theme === "dark" ? "#0d1113" : "#f5f7f8",
    );
  }, [theme]);

  useEffect(() => {
    document.title = problem ? `CoderPuzzle — ${problem.id}. ${problem.title}` : "CoderPuzzle — Problem List";
  }, [problem]);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    try { localStorage.setItem(THEME_STORAGE_KEY, next); } catch { /* Theme still changes for this session. */ }
    setThemeOverride(next);
  };

  const problemsRequested = useRef(false);
  const ensureProblems = useCallback(() => {
    if (problemsRequested.current) return;
    problemsRequested.current = true;
    api.getProblems().then((page) => {
      setAllProblems(page.items);
    }).catch((error: Error) => {
      problemsRequested.current = false; // allow a retry on the next open
      setProblemsError(error.message);
    });
  }, []);
  const retryProblems = useCallback(() => {
    setProblemsError("");
    ensureProblems();
  }, [ensureProblems]);

  // Keep activeSlug in sync with the URL when the user navigates back/forward.
  useEffect(() => {
    const onPopState = () => {
      activeSlugRef.current = slugFromPath();
      setActiveSlug(slugFromPath());
      setProblemListOpen(false);
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const openProblem = useCallback((slug: string) => {
    if (slug === activeSlug) return;
    window.history.pushState(null, "", `/problems/${slug}`);
    activeSlugRef.current = slug;
    setActiveSlug(slug);
  }, [activeSlug]);

  const goHome = useCallback(() => {
    if (activeSlug === null) return;
    window.history.pushState(null, "", "/");
    activeSlugRef.current = null;
    setActiveSlug(null);
    setProblemListOpen(false);
  }, [activeSlug]);

  // Load the active problem. Keyed on the URL-derived activeSlug and on the
  // session phase: after an idle expiry the fetch that failed with 401 left a
  // stale load error, and re-entering (guest or login) must reload the
  // problem under the fresh session rather than showing it.
  useEffect(() => {
    if (sessionPhase !== "active") return;
    if (!activeSlug) {
      setProblem(null);
      setProblemListOpen(false);
      return;
    }
    ensureProblems();
    setProblem(null);
    setLoadError("");
    setResult(null);
    setActionError("");
    setActiveCase(0);
    setSubmissions([]);
    setBottomTab("testcase");
    let cancelled = false;
    Promise.all([
      api.getProblem(activeSlug),
      api.getDrafts(activeSlug).catch(() => []),
    ]).then(([loaded, draftRows]) => {
      if (cancelled) return;
      setProblem(loaded);
      for (const row of draftRows) {
        const key = `${loaded.slug}:${row.language}`;
        // A locally pending save is newer than whatever the server returned.
        if (!pendingDrafts.current.has(key)) {
          draftCache.current.set(key, row.code);
        }
      }
      const enabled = (key: string) => loaded.languages[key]?.enabled;
      const recent = draftRows.find((row) => enabled(row.language))?.language;
      const preferred = storedLanguage();
      const initialLanguage = (recent && enabled(recent) ? recent : undefined)
        ?? (enabled(preferred) ? preferred : undefined)
        ?? (Object.keys(loaded.languages).find(enabled) ?? "python3");
      setLanguage(initialLanguage);
      const saved = draftCache.current.get(`${loaded.slug}:${initialLanguage}`);
      const initialCode = saved ?? loaded.languages[initialLanguage].starter;
      setCode(initialCode);
      // Function-style problems ship named-argument inputs; sql ships a
      // positional list the manifest parameters name (dataset); shell ships
      // one raw string. Normalize all three into editable named fields —
      // raw-text parameters stay verbatim, everything else is JSON-encoded.
      setDrafts(loaded.public_cases.map((test) => {
        const parameters = loaded.invocation.parameters;
        let entries: Array<[string, string]>;
        if (Array.isArray(test.input) && parameters) {
          entries = test.input.map((value, index) => {
            const name = parameters[index]?.name ?? String(index);
            const text = isRawTextParameter(loaded, name)
              ? String(value)
              : JSON.stringify(value);
            return [name, text];
          });
        } else if (typeof test.input === "object" && test.input !== null) {
          entries = Object.entries(test.input)
            .map(([key, value]) => [key, JSON.stringify(value)]);
        } else {
          entries = [["input", String(test.input)]];
        }
        return Object.fromEntries(entries);
      }));
    }).catch((error: Error) => {
      if (!cancelled) setLoadError(error.message);
    });
    return () => { cancelled = true; };
  }, [activeSlug, ensureProblems, sessionPhase]);

  const refreshSubmissions = useCallback(() => {
    if (!problem) return;
    api.getSubmissions(problem.slug).then(setSubmissions).catch(() => undefined);
  }, [problem]);

  useEffect(() => {
    if (leftTab === "submissions") refreshSubmissions();
  }, [leftTab, refreshSubmissions]);

  const parsedCases = useMemo(() => {
    if (!problem) return null;
    try {
      return drafts.map((test) => Object.fromEntries(
        Object.entries(test).map(([key, value]) => [
          key,
          isRawTextParameter(problem, key) ? value : JSON.parse(value),
        ]),
      ));
    } catch {
      return null;
    }
  }, [drafts, problem]);

  const execute = useCallback(async (mode: "run" | "submit") => {
    if (!problem || busy) return;
    if (mode === "run" && !parsedCases) {
      setActionError("A testcase value is not valid JSON. Check the highlighted input and run again.");
      setBottomTab("testcase");
      return;
    }
    const slug = problem.slug;
    setBusy(mode);
    setActionError("");
    setBottomTab("result");
    setResult(null);
    try {
      const response = mode === "run"
        ? await api.run(slug, language, code, parsedCases!)
        : await api.submit(slug, language, code);
      if (activeSlugRef.current !== slug) return; // user moved on mid-judge
      setResult(response);
      if (mode === "submit") {
        refreshSubmissions();
        const state = response.status === "accepted" ? "solved" : "attempted";
        // the server's mark is sticky (solved forever once accepted) — a
        // failed resubmission must not downgrade the list badge
        setProgress((previous) => ({
          ...previous,
          [slug]: state === "attempted" && previous[slug] === "solved" ? "solved" : state,
        }));
      }
    } catch (error) {
      // Same guard as the success path: a failure arriving after the user
      // moved on belongs to the problem they left, not the one on screen.
      if (activeSlugRef.current !== slug) return;
      setActionError(error instanceof Error ? error.message : "The judge could not complete this request.");
    } finally {
      setBusy(null);
    }
  }, [busy, code, language, parsedCases, problem, refreshSubmissions]);

  const formatCode = useCallback(async () => {
    if (formatting || !code.trim() || !problem) return;
    const requestedCode = code;
    const requestedLanguage = language;
    const requestedSlug = problem.slug;
    setFormatting(true);
    setFormatError("");
    try {
      const report = await api.format(requestedLanguage, requestedCode);
      // The round trip outlives keystrokes: apply the result only when the
      // editor is exactly where it was when the request launched, so newer
      // edits (or a language switch) are never clobbered by an older
      // state's formatted text.
      if (activeSlugRef.current !== requestedSlug) return;
      if (editorCodeRef.current !== requestedCode || editorLanguageRef.current !== requestedLanguage) return;
      if (report.status === "unformatted") {
        setCode(report.code);
        saveDraft(requestedSlug, requestedLanguage, report.code);
      } else if (report.status === "error") {
        setFormatError(report.diagnostics);
      }
      // "formatted": the draft already conforms — nothing to change, and an
      // unchanged result must not clear the undo stack or mark the draft dirty.
    } catch (error) {
      setFormatError(error instanceof Error ? error.message : "The formatter could not complete this request.");
    } finally {
      setFormatting(false);
    }
  }, [code, formatting, language, problem]);

  // The message is transient: any edit, or a language switch, retires it.
  useEffect(() => setFormatError(""), [code, language]);

  const changeLanguage = (key: string) => {
    if (!problem) return;
    try { sessionStorage.setItem(LANGUAGE_STORAGE_KEY, key); } catch { /* Preference is best-effort. */ }
    flushDrafts();
    const next = draftCache.current.get(`${problem.slug}:${key}`) ?? problem.languages[key].starter;
    setLanguage(key);
    setCode(next);
  };

  const dragHorizontal = (event: React.PointerEvent) => {
    const startX = event.clientX;
    const start = splitX;
    const width = workspaceRef.current?.clientWidth ?? 1;
    event.currentTarget.setPointerCapture(event.pointerId);
    const move = (moveEvent: PointerEvent) => setSplitX(Math.min(68, Math.max(30, start + ((moveEvent.clientX - startX) / width) * 100)));
    const stop = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", stop);
      window.removeEventListener("pointercancel", stop);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", stop);
    window.addEventListener("pointercancel", stop);
  };

  const dragVertical = (event: React.PointerEvent) => {
    const startY = event.clientY;
    const start = splitY;
    const height = rightRef.current?.clientHeight ?? 1;
    event.currentTarget.setPointerCapture(event.pointerId);
    const move = (moveEvent: PointerEvent) => setSplitY(Math.min(78, Math.max(32, start + ((moveEvent.clientY - startY) / height) * 100)));
    const stop = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", stop);
      window.removeEventListener("pointercancel", stop);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", stop);
    window.addEventListener("pointercancel", stop);
  };

  if (sessionPhase !== "active") {
    if (sessionPhase === "checking") {
      return <FullPageMessage icon={<LoaderCircle className="spin" />} title="Preparing the judge bench" detail="Checking your session…" />;
    }
    if (sessionPhase === "logged-out") {
      return (
        <LoggedOut
          asUser={expiredAsUser}
          theme={theme}
          onToggleTheme={toggleTheme}
          onSignIn={() => { setGateEntryMode("login"); setSessionPhase("gate"); }}
          onGuest={() => { setGateEntryMode("welcome"); setSessionPhase("gate"); }}
        />
      );
    }
    return <GuestGate expired={sessionExpired} error={gateError} needsSetup={needsSetup} entryMode={gateEntryMode} onEnter={enterAsGuest} onRegister={registerAccount} onLogin={loginAccount} theme={theme} onToggleTheme={toggleTheme} />;
  }
  if (loadError) return <FullPageMessage icon={<CircleAlert />} title="CoderPuzzle could not load" detail={loadError} action={{ label: "Back to problems", onClick: goHome }} />;
  if (activeSlug === null) return <Landing theme={theme} onToggleTheme={toggleTheme} onOpen={openProblem} onLogout={logoutAccount} progress={progress} seed={allProblems} />;
  if (problemsError && allProblems === null) {
    return <FullPageMessage icon={<CircleAlert />} title="The problem set could not load" detail={problemsError} action={{ label: "Try again", onClick: retryProblems }} />;
  }
  if (!problem || !allProblems) return <FullPageMessage icon={<LoaderCircle className="spin" />} title="Preparing the judge bench" detail="Loading problem resources…" />;

  const currentIndex = allProblems.findIndex((entry) => entry.slug === activeSlug);
  const prevSlug = currentIndex > 0 ? allProblems[currentIndex - 1].slug : null;
  const nextSlug = currentIndex >= 0 && currentIndex + 1 < allProblems.length ? allProblems[currentIndex + 1].slug : null;

  const languageConfig = problem.languages[language];
  const verdictTone = statusTone(result?.status);

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="topbar-left">
          <button className="brand" onClick={goHome} aria-label="Back to all problems">
            <span className="brand-mark"><img src="/coderpuzzle-icon.svg" alt="" /></span>
            <span>CoderPuzzle</span>
          </button>
          <span className="topbar-divider" />
          <button className="problem-list-trigger" onClick={() => setProblemListOpen(true)}>
            <List size={16} /> Problem List
          </button>
          <button
            className="icon-button"
            title="Previous problem"
            aria-label="Previous problem"
            disabled={!prevSlug}
            onClick={() => prevSlug && openProblem(prevSlug)}
          ><ChevronLeft size={18} /></button>
          <button
            className="icon-button"
            title="Next problem"
            aria-label="Next problem"
            disabled={!nextSlug}
            onClick={() => nextSlug && openProblem(nextSlug)}
          ><ChevronRight size={18} /></button>
        </div>
        <div className="top-actions">
          <button className="run-button" onClick={() => void execute("run")} disabled={busy !== null} title="Run tests">
            {busy === "run" ? <LoaderCircle className="spin" size={16} /> : <Play size={16} fill="currentColor" />}
            Run
          </button>
          <button className="submit-button" onClick={() => void execute("submit")} disabled={busy !== null} title="Submit">
            {busy === "submit" ? <LoaderCircle className="spin" size={16} /> : <Send size={16} />}
            Submit
          </button>
        </div>
<div className="topbar-right">
          <a
            className="icon-button github-link"
            href="https://github.com/CoderPuzzle/coderpuzzle"
            target="_blank"
            rel="noopener noreferrer"
            title="CoderPuzzle on GitHub"
            aria-label="CoderPuzzle on GitHub"
          >
            <Github size={16} />
          </a>
          <button
            className="icon-button theme-toggle"
            onClick={toggleTheme}
            title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button
            className="icon-button"
            onClick={logoutAccount}
            title={sessionUser ? "Log out" : "Exit session"}
            aria-label={sessionUser ? "Log out" : "Exit session"}
          >
            <LogOut size={16} />
          </button>
        </div>
      </header>

      <main className="workspace" ref={workspaceRef} style={{ "--left-pane": `${splitX}%` } as React.CSSProperties}>
        <section className="panel problem-panel">
          <div className="panel-tabs">
            <button className={leftTab === "description" ? "tab active" : "tab"} onClick={() => setLeftTab("description")}>
              <FileText size={15} /> Description
            </button>
            <button className={leftTab === "submissions" ? "tab active" : "tab"} onClick={() => setLeftTab("submissions")}>
              <History size={15} /> Submissions
            </button>
            <button className={leftTab === "solutions" ? "tab active" : "tab"} onClick={() => setLeftTab("solutions")}>
              <Braces size={15} /> Solutions
            </button>
          </div>
          {leftTab === "description" ? (
            <article className="problem-scroll">
              <div className="problem-heading">
                <h1>{problem.id}. {problem.title}{progress[problem.slug] && <StatusMark state={progress[problem.slug]} size={17} />}</h1>
                <div className="problem-meta">
                  <span className={`difficulty ${difficultyTone(problem.difficulty)}`}>{problem.difficulty}</span>
                  {problem.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}
                </div>
              </div>
              <div className="markdown-body">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    // Statement figures live beside the bundle (figures/*.svg)
                    // and are served by the API; rewrite the relative refs.
                    img: ({ src, alt }) => (
                      <img
                        className="statement-figure"
                        src={typeof src === "string" && src.startsWith("figures/")
                          ? `/api/problems/${problem.slug}/${src}`
                          : src}
                        alt={alt ?? ""}
                        loading="lazy"
                      />
                    ),
                  }}
                >{problem.description}</ReactMarkdown>
              </div>
              <section className="hints">
                <h2>Hints</h2>
                {problem.hints.map((hint, index) => (
                  <details key={hint}>
                    <summary>Hint {index + 1}<ChevronDown size={16} /></summary>
                    <p>{hint}</p>
                  </details>
                ))}
              </section>
            </article>
          ) : leftTab === "solutions" ? (
            <Solutions
              key={problem.slug}
              slug={problem.slug}
              language={language}
              languages={problem.languages}
              theme={theme}
              onLanguageChange={(key) => problem.languages[key]?.enabled && setLanguage(key)}
            />
          ) : (
            <Submissions submissions={submissions} problem={problem} />
          )}
        </section>

        <button className="splitter splitter-x" onPointerDown={dragHorizontal} aria-label="Resize problem and editor panes">
          <GripVertical size={14} />
        </button>

        <section className="right-stack" ref={rightRef} style={{ "--editor-pane": `${splitY}%` } as React.CSSProperties}>
          <section className="panel editor-panel">
            <div className="panel-heading editor-heading">
              <span className="panel-title"><Code2 size={16} /> Code</span>
            </div>
            <div className="editor-toolbar">
              <LanguageMenu
                value={language}
                options={Object.entries(problem.languages).map(([key, config]) => ({
                  key,
                  label: config.display_name,
                  enabled: config.enabled,
                }))}
                onChange={changeLanguage}
              />
              <div className="editor-tools">
                <button
                  className="icon-button"
                  onClick={formatCode}
                  disabled={formatting || !code.trim()}
                  title={formatError || "Format Code"}
                  aria-label="Format Code"
                >
                  {formatting ? <LoaderCircle className="spin" size={15} /> : <FormatLinesIcon />}
                </button>
                <button
                  className="icon-button"
                  title="Reset to default code definition"
                  aria-label="Reset to default code definition"
                  onClick={() => setConfirmRestore(true)}
                >
                  <RotateCcw size={15} />
                </button>
              </div>
            </div>
            <div className="editor-wrap">
              <Editor
                height="100%"
                language={languageConfig.monaco_language}
                value={code}
                onChange={(value) => {
                  setCode(value ?? "");
                  saveDraft(problem.slug, language, value ?? "");
                }}
                theme={theme === "dark" ? "openoj-dark" : "openoj-light"}
                loading={<div className="editor-loading"><LoaderCircle className="spin" size={18} /> Loading syntax engine…</div>}
                options={{
                  automaticLayout: true,
                  fontFamily: "Roboto Mono, ui-monospace, monospace",
                  fontSize: 13,
                  fontLigatures: true,
                  lineHeight: 22,
                  minimap: { enabled: false },
                  padding: { top: 14 },
                  scrollBeyondLastLine: false,
                  smoothScrolling: true,
                  tabSize: 4,
                  renderLineHighlight: "line",
                  bracketPairColorization: { enabled: true },
                  guides: { bracketPairs: true, indentation: true },
                }}
              />
            </div>
            <div className="editor-status">
              {formatError
                ? <span className="editor-status-error"><CircleAlert size={12} /> {formatError}</span>
                : draftSaveFailed
                  ? <span className="editor-status-error"><CircleAlert size={12} /> Draft not saved</span>
                  : <span><span className="saved-dot" /> Saved</span>}
              <span>{problem.limits.time_ms / 1000}s · {problem.limits.memory_mb} MB</span>
            </div>
          </section>

          <button className="splitter splitter-y" onPointerDown={dragVertical} aria-label="Resize editor and results panes" />

          <section className={`panel console-panel verdict-${verdictTone}`}>
            <div className="verdict-rail" />
            <div className="panel-tabs console-tabs">
              <button className={bottomTab === "testcase" ? "tab active" : "tab"} onClick={() => setBottomTab("testcase")}>
                <Braces size={15} /> Testcase
              </button>
              <button className={bottomTab === "result" ? "tab active" : "tab"} onClick={() => setBottomTab("result")}>
                <TerminalSquare size={15} /> Test result
                {result && <span className={`result-dot ${verdictTone}`} />}
              </button>
            </div>
            <div className="console-body">
              {bottomTab === "testcase" ? (
                <Testcases
                  problem={problem}
                  drafts={drafts}
                  setDrafts={setDrafts}
                  activeCase={activeCase}
                  setActiveCase={setActiveCase}
                />
              ) : (
                <Results
                  result={result}
                  busy={busy}
                  error={actionError}
                  comparison={problem.invocation.comparison}
                  invocationType={problem.invocation.type}
                />
              )}
            </div>
          </section>
        </section>
      </main>

      {problemListOpen && (
        <ProblemDrawer
          problems={allProblems!}
          activeSlug={activeSlug}
          progress={progress}
          onSelect={(slug) => {
            setProblemListOpen(false);
            if (slug !== activeSlug) openProblem(slug);
          }}
          onClose={closeProblemList}
        />
      )}

      {confirmRestore && (
        <ConfirmDialog
          title="Restore code?"
          body="Your current draft will be replaced. Saved drafts for other languages are kept."
          confirmLabel="Restore"
          onConfirm={() => {
            setConfirmRestore(false);
            setCode(languageConfig.starter);
            saveDraft(problem.slug, language, languageConfig.starter);
          }}
          onClose={closeConfirmRestore}
        />
      )}
    </div>
  );
}

function SelectMenu({ value, options, onChange, ariaLabel, idPrefix, className }: {
  value: string;
  options: Array<{ key: string; label: string; disabled?: boolean }>;
  onChange: (key: string) => void;
  ariaLabel: string;
  idPrefix: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const selected = options.find((option) => option.key === value);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  useEffect(() => {
    if (open) listRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    document.getElementById(`${idPrefix}-option-${activeIndex}`)?.scrollIntoView({ block: "nearest" });
  }, [activeIndex, open, idPrefix]);

  const enabledIndexes = options
    .map((option, index) => (!option.disabled ? index : -1))
    .filter((index) => index >= 0);

  const openMenu = () => {
    const current = options.findIndex((option) => option.key === value && !option.disabled);
    setActiveIndex(current >= 0 ? current : (enabledIndexes[0] ?? 0));
    setOpen(true);
  };

  const close = (focusButton = true) => {
    setOpen(false);
    if (focusButton) buttonRef.current?.focus();
  };

  const select = (index: number) => {
    const option = options[index];
    if (!option || option.disabled) return;
    onChange(option.key);
    close();
  };

  const move = (direction: 1 | -1) => {
    if (!enabledIndexes.length) return;
    const position = enabledIndexes.indexOf(activeIndex);
    const next = position === -1
      ? (direction === 1 ? enabledIndexes[0] : enabledIndexes[enabledIndexes.length - 1])
      : enabledIndexes[(position + direction + enabledIndexes.length) % enabledIndexes.length];
    setActiveIndex(next);
  };

  return (
    <div className={className ? `select-menu ${className}` : "select-menu"} ref={rootRef}>
      <button
        ref={buttonRef}
        type="button"
        className="select-trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => (open ? close() : openMenu())}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown" || event.key === "ArrowUp") {
            event.preventDefault();
            openMenu();
          }
        }}
      >
        <span className="select-trigger-label">{selected?.label ?? value}</span>
        <ChevronDown size={14} className={open ? "select-chevron flipped" : "select-chevron"} />
      </button>
      {open && (
        <ul
          ref={listRef}
          className="select-popup"
          role="listbox"
          aria-label={ariaLabel}
          aria-activedescendant={`${idPrefix}-option-${activeIndex}`}
          tabIndex={-1}
          onKeyDown={(event) => {
          if (event.key === "ArrowDown") { event.preventDefault(); move(1); }
          else if (event.key === "ArrowUp") { event.preventDefault(); move(-1); }
          else if (event.key === "Home") { event.preventDefault(); if (enabledIndexes.length) setActiveIndex(enabledIndexes[0]); }
          else if (event.key === "End") { event.preventDefault(); if (enabledIndexes.length) setActiveIndex(enabledIndexes[enabledIndexes.length - 1]); }
          else if (event.key === "Enter" || event.key === " ") { event.preventDefault(); select(activeIndex); }
          else if (event.key === "Escape") { event.preventDefault(); close(); }
          else if (event.key === "Tab") close(false);
        }}>
          {options.map((option, index) => (
            <li
              key={option.key}
              id={`${idPrefix}-option-${index}`}
              role="option"
              aria-selected={option.key === value}
              aria-disabled={option.disabled ? true : undefined}
              className={[
                "select-option",
                index === activeIndex ? "active" : "",
                option.key === value ? "selected" : "",
                option.disabled ? "disabled" : "",
              ].filter(Boolean).join(" ")}
              onMouseEnter={() => !option.disabled && setActiveIndex(index)}
              onClick={() => select(index)}
            >
              <span>{option.label}</span>
              {option.key === value && <Check size={13} />}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function LanguageMenu({ value, options, onChange }: {
  value: string;
  options: Array<{ key: string; label: string; enabled: boolean }>;
  onChange: (key: string) => void;
}) {
  return (
    <SelectMenu
      value={value}
      ariaLabel="Programming language"
      idPrefix="language"
      options={options.map((option) => ({
        key: option.key,
        label: option.enabled ? option.label : `${option.label} — coming soon`,
        disabled: !option.enabled,
      }))}
      onChange={onChange}
    />
  );
}

// The format action's own mark: four left-aligned bars of alternating
// length — code re-wrapped to a margin (drawn after a user sketch).
function FormatLinesIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth={2} strokeLinecap="round" aria-hidden="true">
      <line x1="4" y1="5" x2="13" y2="5" />
      <line x1="4" y1="10" x2="20" y2="10" />
      <line x1="4" y1="15" x2="13" y2="15" />
      <line x1="4" y1="20" x2="20" y2="20" />
    </svg>
  );
}

function ConfirmDialog({ title, body, confirmLabel, cancelLabel = "Cancel", onConfirm, onClose }: {
  title: string;
  body: string;
  confirmLabel: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    dialog.querySelector<HTMLElement>("button")?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab") return;
      const focusables = Array.from(dialog.querySelectorAll<HTMLElement>("button:not(:disabled)"));
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    dialog.addEventListener("keydown", onKeyDown);
    return () => dialog.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <div className="dialog-backdrop" onMouseDown={onClose}>
      <div
        ref={dialogRef}
        className="dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
        aria-describedby="dialog-body"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <h2 id="dialog-title">{title}</h2>
        <p id="dialog-body">{body}</p>
        <div className="dialog-actions">
          <button type="button" className="dialog-cancel" onClick={onClose}>{cancelLabel}</button>
          <button type="button" className="dialog-confirm" onClick={onConfirm} autoFocus>{confirmLabel}</button>
        </div>
      </div>
    </div>
  );
}

const LANDING_PAGE_SIZE = 50;

function pageNumbers(current: number, pages: number): Array<number | "ellipsis-start" | "ellipsis-end"> {
  // Small sets get every page; larger ones keep the first and last page and
  // a seven-page window around the current one, shifted to stay full when the
  // current page hugs either end.
  if (pages <= 9) return Array.from({ length: pages }, (_, index) => index + 1);
  let start = Math.max(2, current - 3);
  let end = Math.min(pages - 1, current + 3);
  if (end - start < 6) {
    if (start === 2) end = Math.min(pages - 1, start + 6);
    else start = Math.max(2, end - 6);
  }
  const numbers: Array<number | "ellipsis-start" | "ellipsis-end"> = [1];
  if (start > 2) numbers.push("ellipsis-start");
  for (let page = start; page <= end; page += 1) numbers.push(page);
  if (end < pages - 1) numbers.push("ellipsis-end");
  numbers.push(pages);
  return numbers;
}

function Landing({ theme, onToggleTheme, onOpen, onLogout, progress, seed }: {
  theme: Theme;
  onToggleTheme: () => void;
  onOpen: (slug: string) => void;
  onLogout: () => void;
  progress: Record<string, "attempted" | "solved">;
  seed: ProblemSummary[] | null;
}) {
  // When the full list is already in memory (the editor was open before),
  // seed page 1 and the search index from it instead of refetching; paging
  // still goes through the API.
  const [items, setItems] = useState<ProblemSummary[]>(seed ? seed.slice(0, LANDING_PAGE_SIZE) : []);
  const [total, setTotal] = useState(seed ? seed.length : 0);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(seed ? Math.ceil(seed.length / LANDING_PAGE_SIZE) : 0);
  const [loading, setLoading] = useState(!seed);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [topic, setTopic] = useState("");
  const [problemType, setProblemType] = useState("");
  const [hardness, setHardness] = useState("");
  // Full problem set for the search box; the rendered page alone would miss
  // problems on later pages.
  const [allItems, setAllItems] = useState<ProblemSummary[] | null>(seed);
  const listRef = useRef<HTMLDivElement>(null);
  // Monotonic id per loadPage call: an out-of-order response from an earlier
  // page must never overwrite the page that was requested after it.
  const loadIdRef = useRef(0);

  const loadPage = useCallback((target: number) => {
    const requestId = ++loadIdRef.current;
    setLoading(true);
    setError("");
    api.getProblems(target, LANDING_PAGE_SIZE).then((data) => {
      if (loadIdRef.current !== requestId) return;
      setItems(data.items);
      setTotal(data.total);
      setPage(data.page);
      setPages(data.pages);
    }).catch((loadError: Error) => {
      if (loadIdRef.current !== requestId) return;
      setError(loadError.message);
    }).finally(() => {
      if (loadIdRef.current === requestId) setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (!seed) loadPage(1);
  }, [loadPage, seed]);

  useEffect(() => {
    if (seed) return;
    let cancelled = false;
    api.getProblems().then((data) => {
      if (!cancelled) setAllItems(data.items);
    }).catch(() => undefined);
    return () => { cancelled = true; };
  }, [seed]);

  const goToPage = (target: number) => {
    if (target < 1 || target > pages || target === page) return;
    loadPage(target);
    listRef.current?.scrollIntoView({ block: "start", behavior: "smooth" });
  };

  const normalized = searchText(query);
  const filtering = normalized !== "" || topic !== "" || problemType !== "" || hardness !== "";
  const filtered = filtering && allItems
    ? allItems.filter((entry) =>
        matchesFilter(entry, normalized)
        && matchesTopic(entry, topic)
        && matchesType(entry, problemType)
        && matchesHardness(entry, hardness))
    : null;

  const renderRow = (entry: ProblemSummary) => (
    <button
      key={entry.slug}
      className="problem-row"
      onClick={() => onOpen(entry.slug)}
    >
      <span className="problem-row-main">
        <strong>{entry.id}. {entry.title}</strong>
        {entry.tags.length > 0 && <small>{entry.tags.join(" · ")}</small>}
      </span>
      {progress[entry.slug] && <StatusMark state={progress[entry.slug]} />}
      <span className={`difficulty ${difficultyTone(entry.difficulty)}`}>{entry.difficulty}</span>
    </button>
  );

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="topbar-left">
          <button className="brand" aria-label="CoderPuzzle home">
            <span className="brand-mark"><img src="/coderpuzzle-icon.svg" alt="" /></span>
            <span>CoderPuzzle</span>
          </button>
        </div>
        <div className="topbar-right">
          <a
            className="icon-button github-link"
            href="https://github.com/CoderPuzzle/coderpuzzle"
            target="_blank"
            rel="noopener noreferrer"
            title="CoderPuzzle on GitHub"
            aria-label="CoderPuzzle on GitHub"
          >
            <Github size={16} />
          </a>
          <button
            className="icon-button theme-toggle"
            onClick={onToggleTheme}
            title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button
            className="icon-button"
            onClick={onLogout}
            title="Exit session"
            aria-label="Exit session"
          >
            <LogOut size={16} />
          </button>
        </div>
      </header>
      <main className="landing">
        <div className="landing-inner">
          <section className="landing-index" ref={listRef}>
            <header className="landing-masthead">
              <div className="landing-masthead-row">
                <h1>All problems</h1>
                <span className="landing-count">
                  {filtered !== null
                    ? `${filtered.length} of ${allItems?.length ?? total} problems`
                    : `${total} ${total === 1 ? "problem" : "problems"}`}
                </span>
              </div>
            </header>
            <div className="landing-filter">
              <input
                className="landing-search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Filter by title, tag, or number"
                aria-label="Filter problems"
              />
              <TopicSelect topic={topic} onPick={setTopic} />
              <SelectMenu
                className="filter-select type-select-menu"
                value={problemType}
                ariaLabel="Filter by type"
                idPrefix="type"
                onChange={setProblemType}
                options={[
                  { key: "", label: "All types" },
                  { key: "Algorithms", label: "Algorithms" },
                  { key: "Database", label: "Database" },
                  { key: "Shell", label: "Shell" },
                ]}
              />
              <SelectMenu
                className="filter-select hardness-select-menu"
                value={hardness}
                ariaLabel="Filter by level"
                idPrefix="hardness"
                onChange={setHardness}
                options={[
                  { key: "", label: "All Levels" },
                  { key: "Easy", label: "Easy" },
                  { key: "Medium", label: "Medium" },
                  { key: "Hard", label: "Hard" },
                ]}
              />
            </div>
            {error ? (
              <p className="landing-error">{error}</p>
            ) : filtered !== null ? (
              <div className="landing-list">
                {filtered.length ? filtered.map(renderRow) : (
                  <p className="landing-empty">
                    No problems match {query.trim() ? `“${query.trim()}”` : "the selected filters"}.
                  </p>
                )}
              </div>
            ) : filtering && !allItems ? (
              // filters are active but the full list they run against is
              // still loading — say so instead of showing the unfiltered
              // page under an active-looking filter
              <div className="landing-list">
                <p className="landing-loading"><LoaderCircle className="spin" size={16} /> Applying filters…</p>
              </div>
            ) : loading && items.length === 0 ? (
              <div className="landing-list">
                <p className="landing-loading"><LoaderCircle className="spin" size={16} /> Loading the problem set…</p>
              </div>
            ) : (
              <>
                <div className="landing-list">
                  {items.map(renderRow)}
                </div>
                {pages > 1 && (
                  <nav className="pagination" aria-label="Problem pages">
                    <button className="page-button" disabled={page <= 1} onClick={() => goToPage(1)} aria-label="First page">«</button>
                    <button className="page-button" disabled={page <= 1} onClick={() => goToPage(page - 1)} aria-label="Previous page">‹</button>
                    {pageNumbers(page, pages).map((entry) =>
                      typeof entry === "number" ? (
                        <button
                          key={entry}
                          className={`page-button${entry === page ? " active" : ""}`}
                          onClick={() => goToPage(entry)}
                          aria-current={entry === page ? "page" : undefined}
                        >
                          {entry}
                        </button>
                      ) : (
                        <span key={entry} className="page-ellipsis">…</span>
                      ),
                    )}
                    <button className="page-button" disabled={page >= pages} onClick={() => goToPage(page + 1)} aria-label="Next page">›</button>
                    <button className="page-button" disabled={page >= pages} onClick={() => goToPage(pages)} aria-label="Last page">»</button>
                    <span className="page-status">Page {page} of {pages}</span>
                  </nav>
                )}
              </>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}

function Testcases({ problem, drafts, setDrafts, activeCase, setActiveCase }: {
  problem: Problem;
  drafts: Array<Record<string, string>>;
  setDrafts: React.Dispatch<React.SetStateAction<Array<Record<string, string>>>>;
  activeCase: number;
  setActiveCase: (index: number) => void;
}) {
  const current = drafts[activeCase];
  if (!current) return null;
  // Function-shaped problems list their parameters in the manifest; other
  // invocation types have none (interactive manifests may carry an empty
  // list, which is as good as absent), so the custom-case fields follow
  // whatever keys the starter case carries.
  const manifest = problem.invocation.parameters;
  const parameters = manifest && manifest.length > 0
    ? manifest
    : Object.keys(current).map((name) => ({ name, codec: "" }));
  return (
    <div className="testcase-view">
      <div className="case-tabs">
        {drafts.map((_, index) => (
          <button key={index} className={index === activeCase ? "case-tab active" : "case-tab"} onClick={() => setActiveCase(index)}>
            Case {index + 1}
            {drafts.length > 1 && index === activeCase && (
              <span className="remove-case" role="button" aria-label={`Remove case ${index + 1}`} onClick={(event) => {
                event.stopPropagation();
                setDrafts((items) => items.filter((_, itemIndex) => itemIndex !== index));
                setActiveCase(Math.max(0, index - 1));
              }}><X size={12} /></span>
            )}
          </button>
        ))}
        <button
          className="add-case"
          title={drafts.length >= 20 ? "A run accepts at most 20 testcases" : "Add testcase"}
          disabled={drafts.length >= 20}
          onClick={() => {
            const blank = Object.fromEntries(parameters.map(({ name }) =>
              [name, isRawTextParameter(problem, name) ? "" : name === "nums" ? "[]" : "0"]));
            setDrafts((items) => [...items, blank]);
            setActiveCase(drafts.length);
          }}
        ><Plus size={15} /></button>
      </div>
      <div className="case-fields">
        {parameters.map(({ name: parameter }) => {
          const rawText = isRawTextParameter(problem, parameter);
          let valid = true;
          if (!rawText) {
            try { JSON.parse(current[parameter]); } catch { valid = false; }
          }
          return (
            <label className="case-field" key={parameter}>
              <span>{parameter} =</span>
              <textarea
                value={current[parameter] ?? ""}
                className={valid ? "" : "invalid"}
                spellCheck={false}
                rows={rawText ? 6 : parameter === "nums" ? 2 : 1}
                onChange={(event) => setDrafts((items) => items.map((item, index) =>
                  index === activeCase ? { ...item, [parameter]: event.target.value } : item,
                ))}
              />
            </label>
          );
        })}
      </div>
    </div>
  );
}

function Results({ result, busy, error, comparison, invocationType }: {
  result: JudgeResult | null;
  busy: string | null;
  error: string;
  comparison?: Problem["invocation"]["comparison"];
  invocationType?: string;
}) {
  const [openCase, setOpenCase] = useState(0);
  useEffect(() => setOpenCase(0), [result]);
  if (busy) return <ConsoleEmpty icon={<LoaderCircle className="spin" />} title="Executing code and judging" />;
  if (error) return <ConsoleEmpty icon={<CircleAlert />} title="Execution stopped" detail={error} tone="danger" />;
  if (!result) return <ConsoleEmpty icon={<TerminalSquare />} title="No results yet" detail="Run to check your code against the visible cases, or Submit to face the full judge." />;
  const active = result.results[openCase];
  const tone = statusTone(result.status);
  // A shell case's answer is the program's own stdout — raw text, shown with
  // its real newlines instead of one JSON-escaped line.
  const rawAnswer = (value: unknown) => invocationType === "shell" && typeof value === "string";
  return (
    <div className="results-view">
      <div className={`result-summary ${tone}`}>
        <span className="seal" title={statusLabel(result.status)}>{verdictCode(result.status)}</span>
        <div>
          <strong>{statusLabel(result.status)}</strong>
          <span>{result.passed} of {result.total} cases passed</span>
        </div>
        <div className="runtime"><Clock3 size={14} /> {result.runtime_ms} ms</div>
        {result.reference_runtime_ms != null && result.reference_runtime_ms > 0 && (
          <div
            className="runtime"
            title={`Reference solution: ${result.reference_runtime_ms} ms on the same judge and cases`}
          >
            <Clock3 size={14} /> {Math.round((result.runtime_ms / result.reference_runtime_ms) * 100)}% of reference
          </div>
        )}
      </div>
      {result.warnings && result.warnings.length > 0 && (
        <div className="tamper-warning" title="Advisory only — warnings never affect the verdict">
          <CircleAlert size={13} />
          <div>
            <strong>Provided-code tampering patterns flagged</strong>
            <ul>
              {result.warnings.map((warning, index) => (
                <li key={index}>{warning}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
      <div className="result-layout">
        <div className="result-case-list">
          {result.results.map((test, index) => (
            <button key={`${test.name}-${index}`} className={openCase === index ? "result-case active" : "result-case"} onClick={() => setOpenCase(index)}>
              <span className={`case-status ${statusTone(test.status)}`}>{statusTone(test.status) === "success" ? <Check size={12} /> : <X size={12} />}</span>
              <span>{test.name}</span>
              <small>{test.runtime_ms === undefined ? "Hidden" : `${test.runtime_ms} ms`}</small>
            </button>
          ))}
        </div>
        {active && (
          <div className="result-detail">
            <div className="detail-heading">
              <span className={`status-text ${statusTone(active.status)}`}>{statusLabel(active.status)}</span>
              <span>{active.runtime_ms === undefined
                ? "Timing hidden"
                : `${active.runtime_ms} ms${active.timeout_ms ? ` / ${active.timeout_ms} ms limit` : ""}`}</span>
            </div>
            {active.error && <div className="error-box">{active.error}</div>}
            {active.input !== undefined ? (
              <>
                <ResultValue label="Input" value={active.input} raw={typeof active.input === "string"} />
                {active.actual !== undefined && <ResultValue label="Output" value={active.actual} raw={rawAnswer(active.actual)} />}
                {active.expected !== undefined && <ResultValue
                    label={comparison === "close" || (typeof comparison === "object" && comparison !== null && comparison.mode === "close")
                      ? `Expected ±${formatTolerance(typeof comparison === "object" && comparison !== null ? comparison.tolerance : undefined)}`
                      : "Expected"}
                    value={active.expected}
                    raw={rawAnswer(active.expected)}
                  />}
                {active.stdout && <ResultValue label="Stdout" value={active.stdout} raw />}
              </>
            ) : <p className="hidden-copy">Hidden testcase details stay sealed inside the judge.</p>}
          </div>
        )}
      </div>
    </div>
  );
}

function ResultValue({ label, value, raw = false }: { label: string; value: unknown; raw?: boolean }) {
  return <div className="result-value"><span>{label}</span><pre>{raw ? String(value) : formatJson(value)}</pre></div>;
}

function Solutions({ slug, language, languages, theme, onLanguageChange }: {
  slug: string;
  language: string;
  languages: Problem["languages"];
  theme: Theme;
  onLanguageChange: (language: string) => void;
}) {
  const [content, setContent] = useState<SolutionsContent | null>(null);
  const [state, setState] = useState<"loading" | "ready" | "empty">("loading");

  useEffect(() => {
    let cancelled = false;
    setState("loading");
    api.getSolutions(slug).then((loaded) => {
      if (cancelled) return;
      setContent(loaded);
      setState("ready");
    }).catch(() => {
      if (!cancelled) setState("empty");
    });
    return () => { cancelled = true; };
  }, [slug]);

  if (state === "loading") {
    return <FullPageMessage icon={<LoaderCircle className="spin" />} title="Loading solutions" detail="Fetching the solution guides…" />;
  }
  if (state === "empty" || content === null) {
    return <FullPageMessage icon={<Braces />} title="No solutions published" detail="This problem has no solution guide yet." />;
  }

  // Variants are the named approaches (bfs, dfs, …); a canonical-only
  // problem shows its single solution untitled. Multi-solution problems
  // number their sections in the guide's authored order (worst-to-best,
  // optimal last) — the order the server reports, never alphabetical.
  const variants = Object.keys(content.implementations).sort();
  const authored = (content.order ?? []).filter((name) => variants.includes(name));
  const sequence = authored.length === variants.length ? authored : variants;
  const reference = content.reference ?? "";
  const entries = variants.length > 0
    ? sequence.map((variant, index) => ({
        name: variant,
        title: `Solution ${index + 1}: ${content.titles?.[variant] ?? variant.toUpperCase()}`,
        body: content.guide[variant] ?? "",
        code: content.implementations[variant],
        isReference: reference === variant,
      }))
    : Object.keys(content.canonical).length > 0
      ? [{
          name: "",
          title: "",
          body: Object.values(content.guide)[0] ?? "",
          code: content.canonical,
          isReference: reference === "",
        }]
      : [];
  if (entries.length === 0) {
    return <FullPageMessage icon={<Braces />} title="No solutions published" detail="This problem has no solution guide yet." />;
  }

  return (
    <article className="problem-scroll solutions">
      {entries.map((entry) => (
        <SolutionBlock
          key={entry.name || "canonical"}
          title={entry.title}
          body={entry.body}
          code={entry.code}
          isReference={entry.isReference}
          languages={languages}
          slug={slug}
          theme={theme}
          selected={language}
          onSelect={onLanguageChange}
        />
      ))}
    </article>
  );
}

function SolutionBlock({ title, body, code, isReference = false, languages, slug, theme, selected, onSelect }: {
  title: string;
  body: string;
  code: Record<string, string>;
  isReference?: boolean;
  languages: Problem["languages"];
  slug: string;
  theme: Theme;
  selected: string | undefined;
  onSelect: (language: string) => void;
}) {
  // Same canonical order as the editor dropdown: the manifest's languages
  // map is already author-ordered, so sort by its key order.
  const order = Object.keys(languages);
  const languageKeys = Object.keys(code).sort((a, b) => {
    const ia = order.indexOf(a), ib = order.indexOf(b);
    return (ia === -1 ? order.length : ia) - (ib === -1 ? order.length : ib);
  });
  const shown = selected && languageKeys.includes(selected) ? selected : languageKeys[0];
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(code[shown]).then(() => {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    }).catch(() => undefined);
  };

  return (
    <section className="solution-block">
      {title && (
        <h3 className="solution-block-title">
          {title}
          {isReference && (
            <span className="reference-badge" title="The time-cost percentage shown after a submission is measured against this solution">Reference</span>
          )}
        </h3>
      )}
      {!title && isReference && (
        <h3 className="solution-block-title">
          <span className="reference-badge" title="The time-cost percentage shown after a submission is measured against this solution">Reference</span>
        </h3>
      )}
      <div className="solution-block-bar">
        <LanguageMenu
          value={shown}
          options={languageKeys.map((key) => ({
            key,
            label: languages[key]?.display_name ?? key,
            enabled: true,
          }))}
          onChange={onSelect}
        />
        <button className={copied ? "solution-copy copied" : "solution-copy"} onClick={copy} title="Copy solution code" aria-label="Copy solution code">
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <div className="solution-code-scroll">
        <Editor
          height={Math.min(360, Math.max(96, code[shown].split("\n").length * 19 + 21))}
          language={languages[shown]?.monaco_language ?? "plaintext"}
          value={code[shown]}
          theme={theme === "dark" ? "openoj-dark" : "openoj-light"}
          loading={<div className="editor-loading"><LoaderCircle className="spin" size={18} /> Loading syntax engine…</div>}
          options={{
            readOnly: true,
            domReadOnly: true,
            automaticLayout: true,
            minimap: { enabled: false },
            fontFamily: "Roboto Mono, ui-monospace, monospace",
            fontSize: 12.5,
            lineHeight: 19,
            scrollBeyondLastLine: false,
            renderLineHighlight: "none",
            overviewRulerLanes: 0,
            scrollbar: { verticalScrollbarSize: 8, horizontalScrollbarSize: 8 },
            padding: { top: 10, bottom: 10 },
          }}
        />
      </div>
      {body && (
        <div className="markdown-body solutions-guide">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              img: ({ src, alt }) => (
                <img
                  className="statement-figure"
                  src={typeof src === "string" && src.startsWith("figures/") ? `/api/problems/${slug}/${src}` : src}
                  alt={alt ?? ""}
                  loading="lazy"
                />
              ),
            }}
          >{body}</ReactMarkdown>
        </div>
      )}
    </section>
  );
}

function Submissions({ submissions, problem }: { submissions: Submission[]; problem: Problem }) {
  if (!submissions.length) return <ConsoleEmpty icon={<History />} title="No submissions yet" detail="Submit a solution and its verdict will be saved here." />;
  return (
    <div className="submission-list">
      <div className="submission-header"><span>Verdict</span><span>Language</span><span>Runtime</span><span>Submitted</span></div>
      {submissions.map((submission) => (
        <div className="submission-row" key={submission.id}>
          <span className="submission-status">
            <span className={`result-dot ${statusTone(submission.status)}`} />
            <span className={`status-text ${statusTone(submission.status)}`}>{statusLabel(submission.status)}</span>
          </span>
          <span>{problem.languages[submission.language]?.display_name ?? submission.language}</span>
          <span>{submission.runtime_ms} ms</span>
          <time>{new Date(submission.created_at).toLocaleString()}</time>
        </div>
      ))}
    </div>
  );
}

function ProblemDrawer({ problems, activeSlug, progress, onSelect, onClose }: {
  problems: ProblemSummary[];
  activeSlug: string;
  progress: Record<string, "attempted" | "solved">;
  onSelect: (slug: string) => void;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const [topic, setTopic] = useState("");
  const [problemType, setProblemType] = useState("");
  const [hardness, setHardness] = useState("");
  const filterRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    filterRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  const normalized = searchText(query.trim());
  const filtering = normalized !== "" || topic !== "" || problemType !== "" || hardness !== "";
  const filtered = filtering
    ? problems.filter((entry) =>
        matchesFilter(entry, normalized)
        && matchesTopic(entry, topic)
        && matchesType(entry, problemType)
        && matchesHardness(entry, hardness))
    : problems;

  return (
    <div className="drawer-backdrop" onMouseDown={onClose}>
      <aside className="drawer" onMouseDown={(event) => event.stopPropagation()}>
        <div className="drawer-heading">
          <div><strong>Problem List</strong></div>
          <button className="icon-button" onClick={onClose} aria-label="Close problem list"><X size={18} /></button>
        </div>
        <div className="drawer-tools">
          <input
            ref={filterRef}
            className="drawer-filter"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Filter by title, tag, or number"
            aria-label="Filter problems"
          />
          <TopicSelect topic={topic} onPick={setTopic} />
          <SelectMenu
            className="filter-select type-select-menu"
            value={problemType}
            ariaLabel="Filter by type"
            idPrefix="drawer-type"
            onChange={setProblemType}
            options={[
              { key: "", label: "All types" },
              { key: "Algorithms", label: "Algorithms" },
              { key: "Database", label: "Database" },
              { key: "Shell", label: "Shell" },
            ]}
          />
          <SelectMenu
            className="filter-select hardness-select-menu"
            value={hardness}
            ariaLabel="Filter by level"
            idPrefix="drawer-hardness"
            onChange={setHardness}
            options={[
              { key: "", label: "All Levels" },
              { key: "Easy", label: "Easy" },
              { key: "Medium", label: "Medium" },
              { key: "Hard", label: "Hard" },
            ]}
          />
          <span className="drawer-count">{filtered.length} of {problems.length} problems</span>
        </div>
        <div className="drawer-list">
          {filtered.length ? filtered.map((entry) => (
            <button
              key={entry.slug}
              className={entry.slug === activeSlug ? "problem-row active" : "problem-row"}
              onClick={() => onSelect(entry.slug)}
            >
              <span className="problem-row-main">
                <strong>{entry.id}. {entry.title}</strong>
                {entry.tags.length > 0 && <small>{entry.tags.join(" · ")}</small>}
              </span>
              {progress[entry.slug] && <StatusMark state={progress[entry.slug]} />}
              <span className={`difficulty ${difficultyTone(entry.difficulty)}`}>{entry.difficulty}</span>
            </button>
          )) : <p className="drawer-empty">No problems match “{query.trim()}”.</p>}
        </div>
      </aside>
    </div>
  );
}

// The per-viewer solving mark: solved (any language passed every case) or
// attempted (submissions exist, none accepted). Never-tried renders nothing.
function StatusMark({ state, size = 14 }: { state: "attempted" | "solved"; size?: number }) {
  return state === "solved" ? (
    <span className="status-mark solved" title="Solved — a submission in some language passed every case"><CircleCheck size={size} /></span>
  ) : (
    <span className="status-mark attempted" title="Attempted — no passing submission yet"><CircleDashed size={size} /></span>
  );
}

function ConsoleEmpty({ icon, title, detail, tone = "" }: { icon: React.ReactNode; title: string; detail?: string; tone?: string }) {
  return <div className={`console-empty ${tone}`}><span>{icon}</span><strong>{title}</strong>{detail ? <p>{detail}</p> : null}</div>;
}

function FullPageMessage({ icon, title, detail, action }: { icon: React.ReactNode; title: string; detail: string; action?: { label: string; onClick: () => void } }) {
  return (
    <main className="full-page-message">
      <span>{icon}</span>
      <h1>{title}</h1>
      <p>{detail}</p>
      {action && <button className="message-action" onClick={action.onClick}>{action.label}</button>}
    </main>
  );
}

// Where an idle-expired session lands instead of a dead view: guests lose
// the session's ephemeral work, account holders keep everything under their
// user id and sign straight back in.
function LoggedOut({ asUser, onSignIn, onGuest, theme, onToggleTheme }: {
  asUser: boolean;
  onSignIn: () => void;
  onGuest: () => void;
  theme: Theme;
  onToggleTheme: () => void;
}) {
  return (
    <main className="guest-gate">
      <button
        className="icon-button theme-toggle gate-theme"
        onClick={onToggleTheme}
        title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
        aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
      >
        {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
      </button>
      <div className="guest-card">
        <span className="brand-mark gate-mark"><LogOut size={22} strokeWidth={2.4} /></span>
        <h1>Session ended</h1>
        {asUser ? (
          <p className="gate-copy">You were signed out after inactivity. Your submissions, drafts, and progress are saved under your account — sign in to pick up where you left off.</p>
        ) : (
          <p className="gate-copy">Your guest session idled out, and its drafts and submissions were cleared with it. Accounts keep their work — guests start fresh after every idle hour.</p>
        )}
        <button className="gate-enter" onClick={onSignIn}>Sign in</button>
        <div className="gate-links">
          <button className="gate-link" onClick={onGuest}>Continue as guest</button>
        </div>
      </div>
    </main>
  );
}

// The entrance: accounts persist their work under the user id; guests get an
// ephemeral session that idles out after about an hour. A fresh install
// (no accounts yet) offers the one-time admin setup.
function GuestGate({ expired, error, needsSetup, entryMode = "welcome", onEnter, onRegister, onLogin, theme, onToggleTheme }: {
  expired: boolean;
  error: string;
  needsSetup: boolean;
  entryMode: "welcome" | "signup" | "login";
  onEnter: () => void;
  onRegister: (username: string, password: string) => void;
  onLogin: (username: string, password: string) => void;
  theme: Theme;
  onToggleTheme: () => void;
}) {
  const [mode, setMode] = useState<"welcome" | "signup" | "login">(entryMode);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [formError, setFormError] = useState("");

  const submitAccount = () => {
    if (!username.trim()) { setFormError("Choose a username."); return; }
    if (password.length < 8) { setFormError("Password must be at least 8 characters."); return; }
    if (mode === "signup" && password !== confirm) { setFormError("Passwords do not match."); return; }
    setFormError("");
    if (mode === "login") onLogin(username.trim(), password);
    else onRegister(username.trim(), password);
  };

  const switchMode = (next: "welcome" | "signup" | "login") => {
    setMode(next);
    setFormError("");
  };

  return (
    <main className="guest-gate">
      <button
        className="icon-button theme-toggle gate-theme"
        onClick={onToggleTheme}
        title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
        aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
      >
        {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
      </button>
      <div className="guest-card">
        <span className="brand-mark gate-mark"><Code2 size={22} strokeWidth={2.4} /></span>
        <h1>CoderPuzzle</h1>
        {expired && <p className="gate-notice">Your session idled out — guest drafts and submissions from it are gone.</p>}
        {error && <p className="gate-notice">{error}</p>}

        {mode === "welcome" && (
          <>
            {needsSetup ? (
              <>
                <p className="gate-copy">Fresh install — set the admin password to create the admin account. The admin holds the highest privilege; the username is fixed as <strong>admin</strong>.</p>
                <button className="gate-enter" onClick={() => { setUsername("admin"); switchMode("signup"); }}>Set up admin</button>
              </>
            ) : (
              <>
                <p className="gate-copy">
                  Pick problems, write solutions, get verdicts. Guest sessions are ephemeral —
                  editor drafts persist for the session and clear after about an hour of inactivity.
                  Accounts keep their drafts and submission history under the user id.
                </p>
                <button className="gate-enter" onClick={onEnter}>Continue as guest</button>
                <div className="gate-links">
                  <button className="gate-link" onClick={() => switchMode("login")}>Log in</button>
                </div>
              </>
            )}
          </>
        )}

        {mode !== "welcome" && (
          <div className="gate-form">
            {mode === "login" ? (
              <p className="gate-copy">Sign in with your account.</p>
            ) : (
              <p className="gate-copy">Set the admin password (typed twice).</p>
            )}
            {!(needsSetup && mode === "signup") && (
              <label className="gate-field">
                <span>Username</span>
                <input
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  autoComplete="username"
                  autoFocus
                />
              </label>
            )}
            <label className="gate-field">
              <span>Password</span>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                onKeyDown={(event) => { if (event.key === "Enter") submitAccount(); }}
                autoComplete={mode === "login" ? "current-password" : "new-password"}
                autoFocus={needsSetup && mode === "signup"}
              />
            </label>
            {mode === "signup" && (
              <label className="gate-field">
                <span>Confirm password</span>
                <input
                  type="password"
                  value={confirm}
                  onChange={(event) => setConfirm(event.target.value)}
                  onKeyDown={(event) => { if (event.key === "Enter") submitAccount(); }}
                  autoComplete="new-password"
                />
              </label>
            )}
            {formError && <p className="gate-notice">{formError}</p>}
            <button className="gate-enter" onClick={submitAccount}>
              {mode === "login" ? "Log in" : "Create admin"}
            </button>
            {!needsSetup && (
              <div className="gate-links">
                <button className="gate-link" onClick={() => switchMode("welcome")}>Back</button>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}

export default App;
