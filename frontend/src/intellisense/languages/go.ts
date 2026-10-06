import type { Entry, LanguageTable, Scope } from "../types";
import { constant, field, fn } from "../types";

/**
 * Curated Go surface for algorithm submissions (Go 1.24): builtins, the
 * standard-library packages algorithm code actually reaches for (sort,
 * slices, maps, strings, strconv, math, heap, fmt, math/bits), and the
 * bundle-provided structs (exported field spellings: Val/Left/Right/Next).
 * Composite values carry no instance methods in Go — member completion is
 * for struct fields; package work happens through the module namespaces.
 */

const KEYWORDS = [
  "break", "case", "chan", "const", "continue", "default", "defer", "else",
  "fallthrough", "for", "func", "go", "goto", "if", "import", "interface",
  "map", "package", "range", "return", "select", "struct", "switch", "type",
  "var", "nil", "true", "false", "iota",
];

const BUILTINS: Entry[] = [
  fn("append", "(slice, elems...) -> slice", 1, "append(s, x); append(s, s2...); append([]int{}, n) allocates."),
  fn("len", "(v) -> int", 1, "Slice/array/map/string/chan length."),
  fn("cap", "(v) -> int", 1),
  fn("make", "(T, size..., cap) -> T", 1, "make([]int, n), make(map[K]V, hint), make(chan T, n)."),
  fn("new", "(T) -> *T", 1),
  fn("copy", "(dst, src) -> int", 2),
  fn("delete", "(m, key)", 2, "Remove a map entry; safe on missing keys."),
  fn("min", "(x, y...) -> T", 1, "Ordered builtin (Go 1.21)."),
  fn("max", "(x, y...) -> T", 1),
  fn("clear", "(m|s)", 1, "Empties a map or zeroes a slice (Go 1.21)."),
  fn("panic", "(v)", 1),
  fn("recover", "() -> any", 0),
  fn("print", "(args...)", 0, "stderr, no newline — prefer fmt for debugging."),
  fn("println", "(args...)", 0, "stderr, newline-terminated."),
  fn("close", "(c)", 1),
];

const SLICES_MODULE: Entry[] = [
  fn("Sort", "(s) / SortFunc(s, cmp) / SortStableFunc(s, cmp)", 1, "cmp: func(a, b E) int — return -1/0/1."),
  fn("Contains", "(s, v) -> bool", 2),
  fn("Index", "(s, v) -> int", 2, "-1 when absent."),
  fn("BinarySearch", "(s, target) -> (int, bool)", 2, "Sorted only."),
  fn("BinarySearchFunc", "(s, target, cmp) -> (int, bool)", 3),
  fn("Max", "(s) -> E", 1, "Zero value for empty slices."),
  fn("Min", "(s) -> E", 1),
  fn("Reverse", "(s)", 1),
  fn("Clone", "(s) -> []E", 1),
  fn("Compact", "(s) / CompactFunc(s, eq) -> []E", 1, "Collapses consecutive duplicates."),
  fn("Equal", "(s1, s2) -> bool", 2),
  fn("Delete", "(s, i, j) -> []E", 3, "Removes s[i:j]; keeps order."),
  fn("Insert", "(s, i, v...) -> []E", 3),
  fn("IsSorted", "(s) -> bool", 1),
  fn("Concat", "(s...) -> []E", 0),
];

const MAPS_MODULE: Entry[] = [
  fn("Keys", "(m) -> []K", 1),
  fn("Values", "(m) -> []V", 1),
  fn("Clone", "(m) -> map[K]V", 1),
  fn("Copy", "(dst, src)", 2),
  fn("DeleteFunc", "(m, f)", 2),
  fn("Equal", "(m1, m2) -> bool", 2),
  fn("Contains", "(m, key) -> bool", 2),
];

const STRINGS_MODULE: Entry[] = [
  fn("Split", "(s, sep) -> []string", 2),
  fn("Fields", "(s) -> []string", 1, "Split on whitespace, dropping empties."),
  fn("Join", "(elems []string, sep) -> string", 2),
  fn("Contains", "(s, substr) -> bool", 2),
  fn("ContainsAny", "(s, chars) -> bool", 2),
  fn("HasPrefix", "(s, prefix) -> bool", 2),
  fn("HasSuffix", "(s, suffix) -> bool", 2),
  fn("Index", "(s, substr) -> int", 2, "-1 when absent."),
  fn("Count", "(s, substr) -> int", 2),
  fn("Repeat", "(s, count) -> string", 2),
  fn("Replace", "(s, old, new, n) -> string", 4, "n = -1 replaces all."),
  fn("ReplaceAll", "(s, old, new) -> string", 3),
  fn("ToLower", "(s) -> string", 1),
  fn("ToUpper", "(s) -> string", 1),
  fn("TrimSpace", "(s) -> string", 1),
  fn("Trim", "(s, cutset) -> string", 2),
  fn("TrimLeft", "(s, cutset) -> string", 2),
  fn("TrimRight", "(s, cutset) -> string", 2),
  fn("TrimPrefix", "(s, prefix) -> string", 2),
  fn("TrimSuffix", "(s, suffix) -> string", 2),
  fn("EqualFold", "(s, t) -> bool", 2, "Case-insensitive equality."),
  fn("Compare", "(a, b) -> int", 2),
  fn("Cut", "(s, sep) -> (before, after string, found bool)", 2),
  fn("NewBuilder", "() -> *Builder", 0, "Efficient incremental concatenation."),
  fn("NewReplacer", "(oldnew ...string) -> *Replacer", 0),
];

const STRCONV_MODULE: Entry[] = [
  fn("Itoa", "(i int) -> string", 1),
  fn("Atoi", "(s string) -> (int, error)", 1, "The usual err != nil check applies."),
  fn("ParseInt", "(s, base, bitSize) -> (int64, error)", 3),
  fn("FormatInt", "(i int64, base int) -> string", 2),
  fn("ParseFloat", "(s, bitSize) -> (float64, error)", 2),
  fn("FormatFloat", "(f, fmt, prec, bitSize) -> string", 4),
  fn("Quote", "(s) -> string", 1),
];

const SORT_MODULE: Entry[] = [
  fn("Slice", "(x any, less func(i, j int) bool)", 2, "sort.Slice(items, func(i, j int) bool { return items[i].val < items[j].val })."),
  fn("SliceIsSorted", "(x, less) -> bool", 2),
  fn("SliceStable", "(x, less)", 2),
  fn("Sort", "(x Interface)", 1, "Interface: Len/Less/Swap."),
  fn("SortInts", "(x []int)", 1),
  fn("Ints", "(x []int)", 1),
  fn("Strings", "(x []string)", 1),
  fn("SearchInts", "(a []int, x int) -> int", 2, "Smallest index with a[i] >= x."),
  fn("Search", "(n int, f func(int) bool) -> int", 2, "Binary search over a predicate."),
];

const HEAP_MODULE: Entry[] = [
  fn("Init", "(h Interface)", 1, "Establish the heap invariant; your type needs Len/Less/Swap/Push/Pop."),
  fn("Push", "(h Interface, x any)", 2, "heap.Push(&h, x)."),
  fn("Pop", "(h Interface) -> any", 1, "Pops the minimum per your Less."),
  fn("Fix", "(h Interface, i int)", 2, "After mutating element i."),
  fn("Remove", "(h Interface, i int) -> any", 2),
];

const MATH_MODULE: Entry[] = [
  fn("Abs", "(x) -> T", 1),
  fn("Max", "(x, y) -> T", 2),
  fn("Min", "(x, y) -> T", 2),
  fn("Sqrt", "(x) -> float64", 1),
  fn("Pow", "(x, y) -> float64", 2),
  fn("Floor", "(x) -> float64", 1),
  fn("Ceil", "(x) -> float64", 1),
  fn("Inf", "(sign int) -> float64", 1),
  fn("IsNaN", "(x) -> bool", 1),
  constant("Pi", ""),
  constant("MaxInt", "", "math.MaxInt / math.MinInt (int extremes)."),
  constant("MinInt", ""),
];

const FMT_MODULE: Entry[] = [
  fn("Sprintf", "(format, args...) -> string", 1, "%d %s %v %T; %02d zero-pads."),
  fn("Printf", "(format, args...)", 1, "stdout; debug output may count toward limits."),
  fn("Errorf", "(format, args...) -> error", 1),
  fn("Sprint", "(args...) -> string", 0),
];

const BITS_MODULE: Entry[] = [
  fn("OnesCount", "(x) -> int", 1, "Also OnesCount8/16/32/64."),
  fn("LeadingZeros", "(x) -> int", 1),
  fn("Len", "(x) -> int", 1, "Bit length."),
];

const MODULES: Record<string, Entry[]> = {
  sort: SORT_MODULE,
  slices: SLICES_MODULE,
  maps: MAPS_MODULE,
  strings: STRINGS_MODULE,
  strconv: STRCONV_MODULE,
  heap: HEAP_MODULE,
  math: MATH_MODULE,
  fmt: FMT_MODULE,
  bits: BITS_MODULE,
};

const TYPES: LanguageTable["types"] = {
  treeNode: {
    entries: [
      field("Val", ": int", "Access with node.Val (auto-deref through the pointer)."),
      field("Left", ": *TreeNode"),
      field("Right", ": *TreeNode"),
    ],
  },
  listNode: {
    entries: [field("Val", ": int"), field("Next", ": *ListNode")],
  },
  graphNode: {
    entries: [
      field("Val", ": int"),
      field("Neighbors", ": []*Node", "Undirected edges appear on both endpoints."),
      field("Random", "", "On random-pointer variants only."),
    ],
  },
  nodeWithNext: {
    entries: [field("Val", ": int"), field("Left", ""), field("Right", ""), field("Next", "")],
  },
  multiListNode: {
    entries: [field("Val", ": int"), field("Prev", ""), field("Next", ""), field("Child", "")],
  },
  quadNode: {
    entries: [
      field("Val", ": bool"),
      field("IsLeaf", ": bool"),
      field("TopLeft", ""),
      field("TopRight", ""),
      field("BottomLeft", ""),
      field("BottomRight", ""),
    ],
  },
};

// Ordered constructor / literal patterns.
const TYPE_OF: Array<[RegExp, string]> = [
  [/TreeNode\{/, "treeNode"],
  [/ListNode\{/, "listNode"],
  [/&TreeNode\{/, "treeNode"],
  [/&ListNode\{/, "listNode"],
  [/\*TreeNode\b/, "treeNode"],
  [/\*ListNode\b/, "listNode"],
  [/\*NodeWithNext\b/, "nodeWithNext"],
  [/\*MultiListNode\b/, "multiListNode"],
  [/\*QuadNode\b/, "quadNode"],
  [/\*GraphNode\b/, "graphNode"],
  [/\*Node\b/, "graphNode"],
];

const GLOBALS: Entry[] = [...BUILTINS];

/** Go type text (from declarations or rhs) -> canonical type id. */
function goTypeOf(text: string): string | null {
  for (const [pattern, typeId] of TYPE_OF) {
    if (pattern.test(text)) return typeId || null;
  }
  return null;
}

function splitTopLevel(text: string): string[] {
  const parts: string[] = [];
  let depth = 0;
  let current = "";
  for (const ch of text) {
    if (ch === "(" || ch === "[" || ch === "{") depth += 1;
    else if (ch === ")" || ch === "]" || ch === "}") depth -= 1;
    if (ch === "," && depth === 0) {
      parts.push(current);
      current = "";
    } else current += ch;
  }
  if (current.trim()) parts.push(current);
  return parts;
}

function scan(source: string): Scope {
  const scope: Scope = { vars: [{}], fields: {}, selfMethods: [], imports: [] };
  const vars = scope.vars[0];
  const lines = source.split("\n");
  let inImportBlock = false;

  for (const rawLine of lines) {
    const line = rawLine.trim();
    let match: RegExpExecArray | null;

    if (inImportBlock) {
      match = /^"([^"]+)"$/.exec(line);
      if (match) {
        scope.imports.push(match[1].split("/").pop() ?? match[1]);
        continue;
      }
      if (line === ")") inImportBlock = false;
      continue;
    }
    match = /^import\s+\($/.exec(line);
    if (match) {
      inImportBlock = true;
      continue;
    }
    match = /^import\s+"([^"]+)"$/.exec(line);
    if (match) {
      scope.imports.push(match[1].split("/").pop() ?? match[1]);
      continue;
    }
    // functions and methods: func (s *Solution) Name(a int, b *TreeNode) (…) {
    match = /^func\s+(?:\([^)]*\)\s*)?(\w+)\s*\(([^)]*)\)/.exec(line);
    if (match) {
      const isMethod = /^\s+func\s+\(/.test(rawLine);
      if (isMethod && !scope.selfMethods.includes(match[1])) scope.selfMethods.push(match[1]);
      for (const param of splitTopLevel(match[2])) {
        // Go groups types: "a, b int" — take the LAST name typed individually
        const tokens = param.trim().split(/\s+/);
        if (tokens.length < 2) continue;
        const name = tokens[0];
        const typeId = goTypeOf(tokens.slice(1).join(" "));
        if (/^[A-Za-z_]\w*$/.test(name)) vars[name] = typeId ?? "";
      }
      continue;
    }
    // short declarations and assignments
    match = /^(\w+)\s*(?::=|=)\s*(.+)$/.exec(line);
    if (match && !/^(if|for|return)\b/.test(line)) {
      const typeId = goTypeOf(match[2].trim());
      if (/^[A-Za-z_]\w*$/.test(match[1])) vars[match[1]] = typeId ?? "";
      continue;
    }
    // var declarations
    match = /^var\s+(\w+)\s+([\w\[\]\*\.]+)/.exec(line);
    if (match) {
      const typeId = goTypeOf(match[2]);
      if (/^[A-Za-z_]\w*$/.test(match[1])) vars[match[1]] = typeId ?? "";
      continue;
    }
    // range loops: for i, v := range xs
    match = /^for\s+([\w, ]+?)\s*:=\s*range\s+/.exec(line);
    if (match) {
      for (const name of match[1].split(",")) {
        const clean = name.trim();
        if (/^[A-Za-z_]\w*$/.test(clean)) vars[clean] = "";
      }
    }
  }
  return scope;
}

export const go: LanguageTable = {
  id: "go",
  triggerCharacters: ["."],
  keywords: KEYWORDS,
  typeOf: TYPE_OF,
  types: TYPES,
  globals: GLOBALS,
  modules: MODULES,
  scan,
};
