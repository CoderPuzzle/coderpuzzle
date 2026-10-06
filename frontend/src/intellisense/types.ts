/**
 * Curated IntelliSense data schema for the languages Monaco ships no language
 * service for (python, java, cpp, go, rust, sql). Everything here is pure
 * data plus two small per-language hooks; the rendering, walking, and
 * provider plumbing live in engine.ts / register.ts. The maintenance guide
 * is docs/EDITOR-AUTOCOMPLETE.md.
 */

export type ItemKind =
  | "method"
  | "field"
  | "variable"
  | "function"
  | "class"
  | "module"
  | "keyword"
  | "constant";

/** One completable member (typed after ".") or global. The engine renders it. */
export interface Entry {
  /** Identifier exactly as spelled in this language ("push_back", "Val", "startswith"). */
  name: string;
  kind: ItemKind;
  /** Signature shown in the suggest widget's detail column and in hover. */
  detail?: string;
  /** One-line markdown doc (suggest doc pane + hover). */
  doc?: string;
  /** Tab stops to synthesize: `name($1)$0` when > 0, `name()$0` when 0.
   *  Omit for fields/keywords/macros — inserts the bare identifier. */
  args?: number;
}

export interface TypeMembers {
  entries: Entry[];
  /** Sparse method name -> canonical type id of its return value (chaining). */
  returns?: Record<string, string>;
}

/** Language-specific scope extracted by the table's scan(). */
export interface Scope {
  /** Frames of name -> canonical type id; innermost function/class level last. */
  vars: Array<Record<string, string>>;
  /** self./this. fields: name -> canonical type id. */
  fields: Record<string, string>;
  /** Method names of the enclosing Solution class (offered on self/this). */
  selfMethods: string[];
  /** Module names in play (python imports, go imports, cpp using).
   *  Populated by every table; reserved for future module-aware completion. */
  imports: string[];
}

export interface LanguageTable {
  /** Monaco language id ("python", "java", ...). */
  id: string;
  /** Trigger characters for member completion; e.g. cpp carries "-". */
  triggerCharacters: string[];
  keywords: string[];
  /** Ordered literal/constructor patterns -> canonical type id; first match wins. */
  typeOf: Array<[RegExp, string]>;
  /** Canonical type id -> members. Ids are engine-level labels per language. */
  types: Record<string, TypeMembers>;
  /** Unqualified free functions/classes/constants. */
  globals: Entry[];
  /** Dotted namespaces offered after "name." (python heapq, go sort, ...). */
  modules?: Record<string, Entry[]>;
  /** Whole-source scan into a Scope (one regex pass, memoized per version). */
  scan: (source: string) => Scope;
  /** Reserved language hook tried after the shared resolution steps; no
   *  table implements it yet (rust's wrapper ids cover the known cases). */
  receiverOf?: (expr: string, scope: Scope, table: LanguageTable) => string | null;
}

// Compact authoring helpers — the table files read as one line per entry.

export const method = (name: string, detail: string, args = 0, doc?: string): Entry => ({
  name,
  kind: "method",
  detail,
  args,
  doc,
});

export const field = (name: string, detail: string, doc?: string): Entry => ({
  name,
  kind: "field",
  detail,
  doc,
});

export const fn = (name: string, detail: string, args = 0, doc?: string): Entry => ({
  name,
  kind: "function",
  detail,
  args,
  doc,
});

export const cls = (name: string, detail?: string, doc?: string): Entry => ({
  name,
  kind: "class",
  detail,
  doc,
});

export const constant = (name: string, detail?: string, doc?: string): Entry => ({
  name,
  kind: "constant",
  detail,
  doc,
});
