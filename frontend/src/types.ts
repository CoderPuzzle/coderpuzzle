export type ProblemSummary = {
    id: number;
    slug: string;
    title: string;
    difficulty: string;
    tags: string[];
    topics: string[];
    type: string;
};

export type TopicIndex = {
    topics: TopicSummary[];
};

export type TopicSummary = {
    name: string;
    count: number;
};

export type ProblemPage = {
    items: ProblemSummary[];
    total: number;
    page: number;
    page_size: number;
    pages: number;
};

export type Language = {
    display_name: string;
    monaco_language: string;
    starter: string;
    enabled: boolean;
};

export type Problem = {
    id: number;
    slug: string;
    title: string;
    difficulty: string;
    tags: string[];
    description: string;
    hints: string[];
    invocation: {
        type: "function" | "design" | "interactive" | "concurrent" | "sql" | "shell";
        class_name: string;
        method: string;
        // Only function-shaped invocations carry parameters; design,
        // interactive, concurrent, sql, and shell manifests omit it.
        parameters?: Array<{ name: string; codec: string }>;
        return_codec: string;
        // "exact" (default), "sorted", "multiset", "close", or
        // { mode: "close", tolerance } for float-tolerant comparison.
        comparison?: string | { mode: string; tolerance?: number };
    };
    limits: {
        time_ms: number;
        memory_mb: number;
    };
    languages: Record<string, Language>;
    public_cases: Array<{ name: string; input: Record<string, unknown> }>;
};

export type CaseResult = {
    index: number;
    name: string;
    status: string;
    runtime_ms?: number;
    timeout_ms?: number | null;
    input?: Record<string, unknown>;
    expected?: unknown;
    actual?: unknown;
    stdout?: string;
    error?: string;
};

export type JudgeResult = {
    status: string;
    passed: number;
    total: number;
    runtime_ms: number;
    reference_runtime_ms?: number | null;
    results: CaseResult[];
    submission_id?: number;
};

export type Submission = {
    id: number;
    problem_slug: string;
    language: string;
    status: string;
    passed: number;
    total: number;
    runtime_ms: number;
    created_at: string;
};

// GET /problems/{slug}/solutions — the Solutions tab payload.
export type SolutionsContent = {
    guide: Record<string, string>;
    // The guide's own heading per variant ("Randomized quickselect"),
    // which reads better than the bare variant token.
    titles: Record<string, string>;
    implementations: Record<string, Record<string, string>>;
    canonical: Record<string, string>;
    // Variant keys in the guide's authored order (worst-to-best; "" for the
    // canonical solution's section), so the page reads as written.
    order: string[];
    // The designated time-cost reference — the variant ("" = canonical) whose
    // runtime the time-cost percentage is measured against.
    reference: string;
};

export type FormatReport =
  | { status: "formatted" }
  | { status: "unformatted"; code: string }
  | { status: "error"; diagnostics: string };
