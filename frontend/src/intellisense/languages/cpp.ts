import type { Entry, LanguageTable, Scope } from "../types";
import { constant, field, fn, method, cls } from "../types";

/**
 * Curated C++ surface for algorithm submissions (G++ 14, C++20, bits/stdc++.h
 * prepended by the runner, `using namespace std;` assumed): the STL containers'
 * instance members plus the free algorithm functions, and the bundle-provided
 * node classes (accessed with `->`).
 */

const KEYWORDS = [
  "alignas", "auto", "bool", "break", "case", "catch", "char", "class",
  "const", "constexpr", "continue", "default", "delete", "do", "double",
  "else", "enum", "explicit", "export", "extern", "false", "float",
  "for", "friend", "goto", "if", "inline", "int", "long", "mutable",
  "namespace", "new", "noexcept", "nullptr", "operator", "private",
  "protected", "public", "register", "return", "short", "signed", "sizeof",
  "static", "struct", "switch", "template", "this", "throw", "true", "try",
  "typedef", "typename", "union", "unsigned", "using", "virtual", "void",
  "while",
];

const CONTAINER_WORDS = [
  "unordered_map", "unordered_set", "multiset", "multimap", "priority_queue",
  "vector", "map", "set", "deque", "queue", "stack", "array", "list", "pair",
  "tuple", "string",
];

/** Declaration / initializer text -> canonical type id, via TYPE_OF order. */
function cppTypeOf(text: string): string | null {
  for (const [pattern, typeId] of TYPE_OF) {
    if (pattern.test(text)) return typeId || null;
  }
  return null;
}

const TREE_NODE: Entry[] = [
  field("val", ": int", "Access with root->val."),
  field("left", ": TreeNode*", "nullptr on missing children."),
  field("right", ": TreeNode*"),
];

const TYPES: LanguageTable["types"] = {
  vector: {
    returns: { begin: "iterator", end: "iterator", rbegin: "iterator", rend: "iterator", at: "", front: "", back: "", data: "" },
    entries: [
      method("push_back", "(const T& value) -> void", 1, "Append; amortized O(1)."),
      method("pop_back", "() -> void", 0),
      method("emplace_back", "(Args&&...) -> T&", 0, "Construct in place."),
      method("size", "() -> size_t", 0),
      method("empty", "() -> bool", 0),
      method("clear", "() -> void", 0),
      method("at", "(size_t i) -> T&", 1, "Bounds-checked []; throws std::out_of_range."),
      method("front", "() -> T&", 0),
      method("back", "() -> T&", 0),
      method("insert", "(const_iterator pos, const T& value) -> iterator", 2),
      method("erase", "(const_iterator pos) | (first, last) -> iterator", 1),
      method("resize", "(size_t n[, T value]) -> void", 1),
      method("reserve", "(size_t n) -> void", 1, "Pre-allocate; prevents reallocation during pushes."),
      method("assign", "(count, value) -> void", 2),
      method("swap", "(vector&) -> void", 1),
      method("begin", "() -> iterator", 0, "Use *it / it != v.end(); sort(v.begin(), v.end())."),
      method("end", "() -> iterator", 0),
      method("rbegin", "() -> reverse_iterator", 0),
      method("rend", "() -> reverse_iterator", 0),
      method("data", "() -> T*", 0),
    ],
  },
  string: {
    returns: { substr: "string", append: "string", erase: "string", insert: "string", replace: "string", find: "", rfind: "", c_str: "", begin: "iterator", end: "iterator" },
    entries: [
      method("size", "() -> size_t", 0, "Same as length()."),
      method("length", "() -> size_t", 0),
      method("empty", "() -> bool", 0),
      method("clear", "() -> void", 0),
      method("push_back", "(char) -> void", 1),
      method("pop_back", "() -> void", 0),
      method("append", "(const string&) -> string&", 1, "Also the += operator."),
      method("substr", "(size_t pos = 0, size_t count = npos) -> string", 1),
      method("find", "(const string&[, pos]) -> size_t", 1, "Index or string::npos."),
      method("rfind", "(const string&[, pos]) -> size_t", 1),
      method("find_first_of", "(chars[, pos]) -> size_t", 1),
      method("find_last_of", "(chars[, pos]) -> size_t", 1),
      method("replace", "(pos, count, const string&) -> string&", 3),
      method("insert", "(pos, const string&) -> string&", 2),
      method("erase", "(pos[, count]) -> string&", 1),
      method("c_str", "() -> const char*", 0),
      method("compare", "(const string&) -> int", 1),
      method("resize", "(size_t n[, char]) -> void", 1),
      method("begin", "() -> iterator", 0),
      method("end", "() -> iterator", 0),
      method("back", "() -> char&", 0),
      method("front", "() -> char&", 0),
      method("at", "(size_t) -> char&", 1),
    ],
  },
  map: {
    returns: { find: "iterator", begin: "iterator", end: "iterator", lower_bound: "iterator", upper_bound: "iterator", at: "", operator: "" },
    entries: [
      method("operator[]", "(const K& key) -> V&", 0, "Inserts a default value when the key is missing — use find() to probe."),
      method("at", "(const K& key) -> V&", 1, "Throws std::out_of_range when missing."),
      method("insert", "({key, value} | const_iterator, ...) -> pair<iterator,bool>", 1),
      method("emplace", "(key, value) -> pair<iterator,bool>", 2),
      method("erase", "(key | iterator) -> size_t | iterator", 1),
      method("find", "(const K& key) -> iterator", 1, "m.find(key) != m.end() is the membership test."),
      method("count", "(const K& key) -> size_t", 1, "0 or 1 on map/set."),
      method("contains", "(const K& key) -> bool", 1, "C++20."),
      method("lower_bound", "(const K& key) -> iterator", 1, "First key >= key."),
      method("upper_bound", "(const K& key) -> iterator", 1, "First key > key."),
      method("begin", "() -> iterator", 0, "Iterates keys in sorted order (map)."),
      method("end", "() -> iterator", 0),
      method("size", "() -> size_t", 0),
      method("empty", "() -> bool", 0),
      method("clear", "() -> void", 0),
      method("swap", "(map&) -> void", 1),
    ],
  },
  unordered_map: {
    returns: { find: "iterator", begin: "iterator", end: "iterator" },
    entries: [
      method("operator[]", "(const K& key) -> V&", 0, "Inserts a default value when missing."),
      method("at", "(const K& key) -> V&", 1),
      method("insert", "({key, value}) -> pair<iterator,bool>", 1),
      method("emplace", "(key, value) -> pair<iterator,bool>", 2),
      method("erase", "(key | iterator)", 1),
      method("find", "(const K& key) -> iterator", 1),
      method("count", "(const K& key) -> size_t", 1),
      method("contains", "(const K& key) -> bool", 1, "C++20."),
      method("begin", "() -> iterator", 0, "Unordered iteration order."),
      method("end", "() -> iterator", 0),
      method("size", "() -> size_t", 0),
      method("empty", "() -> bool", 0),
      method("clear", "() -> void", 0),
      method("reserve", "(size_t) -> void", 1),
    ],
  },
  set: {
    returns: { find: "iterator", begin: "iterator", end: "iterator", lower_bound: "iterator", upper_bound: "iterator", insert: "" },
    entries: [
      method("insert", "(const T& value) -> pair<iterator,bool>", 1, "bool is false when the value was already present."),
      method("emplace", "(Args&&...) -> pair<iterator,bool>", 0),
      method("erase", "(value | iterator) -> size_t | iterator", 1),
      method("find", "(const T& value) -> iterator", 1),
      method("count", "(const T& value) -> size_t", 1),
      method("contains", "(const T& value) -> bool", 1, "C++20."),
      method("lower_bound", "(const T&) -> iterator", 1),
      method("upper_bound", "(const T&) -> iterator", 1),
      method("begin", "() -> iterator", 0, "Sorted ascending order."),
      method("end", "() -> iterator", 0),
      method("size", "() -> size_t", 0),
      method("empty", "() -> bool", 0),
      method("clear", "() -> void", 0),
    ],
  },
  unordered_set: {
    returns: { find: "iterator", begin: "iterator", end: "iterator" },
    entries: [
      method("insert", "(const T& value) -> pair<iterator,bool>", 1),
      method("erase", "(value | iterator)", 1),
      method("find", "(const T& value) -> iterator", 1, "s.find(x) != s.end() is the membership test."),
      method("count", "(const T& value) -> size_t", 1),
      method("contains", "(const T& value) -> bool", 1, "C++20."),
      method("begin", "() -> iterator", 0),
      method("end", "() -> iterator", 0),
      method("size", "() -> size_t", 0),
      method("empty", "() -> bool", 0),
      method("clear", "() -> void", 0),
      method("reserve", "(size_t) -> void", 1),
    ],
  },
  multiset: {
    returns: { find: "iterator", begin: "iterator", end: "iterator", lower_bound: "iterator", upper_bound: "iterator" },
    entries: [
      method("insert", "(const T& value) -> iterator", 1, "Duplicates allowed; equal keys group together."),
      method("erase", "(value) -> size_t | (iterator) -> iterator", 1, "Erasing by value removes ALL copies."),
      method("find", "(const T&) -> iterator", 1),
      method("count", "(const T&) -> size_t", 1),
      method("lower_bound", "(const T&) -> iterator", 1),
      method("upper_bound", "(const T&) -> iterator", 1),
      method("begin", "() -> iterator", 0),
      method("end", "() -> iterator", 0),
      method("size", "() -> size_t", 0),
      method("empty", "() -> bool", 0),
      method("clear", "() -> void", 0),
    ],
  },
  deque: {
    returns: { begin: "iterator", end: "iterator" },
    entries: [
      method("push_back", "(const T&) -> void", 1),
      method("push_front", "(const T&) -> void", 1),
      method("pop_back", "() -> void", 0),
      method("pop_front", "() -> void", 0, "O(1) — the BFS queue operations."),
      method("emplace_back", "(Args&&...) -> void", 0),
      method("emplace_front", "(Args&&...) -> void", 0),
      method("front", "() -> T&", 0),
      method("back", "() -> T&", 0),
      method("at", "(size_t) -> T&", 1),
      method("size", "() -> size_t", 0),
      method("empty", "() -> bool", 0),
      method("clear", "() -> void", 0),
      method("insert", "(const_iterator, const T&) -> iterator", 2),
      method("erase", "(const_iterator) -> iterator", 1),
      method("resize", "(size_t) -> void", 1),
    ],
  },
  queue: {
    entries: [
      method("push", "(const T&) -> void", 1),
      method("pop", "() -> void", 0, "Removes the front; returns nothing — read front() first."),
      method("front", "() -> T&", 0),
      method("back", "() -> T&", 0),
      method("emplace", "(Args&&...) -> void", 0),
      method("empty", "() -> bool", 0),
      method("size", "() -> size_t", 0),
      method("swap", "(queue&) -> void", 1),
    ],
  },
  priority_queue: {
    entries: [
      method("push", "(const T&) -> void", 1, "Default is a max-heap; min-heap: priority_queue<int, vector<int>, greater<int>>."),
      method("pop", "() -> void", 0, "Removes the top; returns nothing — read top() first."),
      method("top", "() -> const T&", 0, "The largest (max-heap) element."),
      method("emplace", "(Args&&...) -> void", 0),
      method("empty", "() -> bool", 0),
      method("size", "() -> size_t", 0),
      method("swap", "(priority_queue&) -> void", 1),
    ],
  },
  stack: {
    entries: [
      method("push", "(const T&) -> void", 1),
      method("pop", "() -> void", 0, "Removes the top; returns nothing — read top() first."),
      method("top", "() -> T&", 0),
      method("emplace", "(Args&&...) -> void", 0),
      method("empty", "() -> bool", 0),
      method("size", "() -> size_t", 0),
      method("swap", "(stack&) -> void", 1),
    ],
  },
  array: {
    entries: [
      method("at", "(size_t) -> T&", 1),
      method("fill", "(const T&) -> void", 1),
      method("size", "() -> size_t", 0, "Compile-time constant."),
      method("empty", "() -> bool", 0),
      method("front", "() -> T&", 0),
      method("back", "() -> T&", 0),
      method("swap", "(array&) -> void", 1),
      method("begin", "() -> iterator", 0),
      method("end", "() -> iterator", 0),
    ],
  },
  list: {
    returns: { begin: "iterator", end: "iterator" },
    entries: [
      method("push_back", "(const T&) -> void", 1),
      method("push_front", "(const T&) -> void", 1),
      method("pop_back", "() -> void", 0),
      method("pop_front", "() -> void", 0),
      method("front", "() -> T&", 0),
      method("back", "() -> T&", 0),
      method("remove", "(const T&) -> void", 1, "Erases all equal values."),
      method("remove_if", "(predicate) -> void", 1),
      method("sort", "([Compare]) -> void", 0, "Member sort — std::sort needs random access."),
      method("reverse", "() -> void", 0),
      method("unique", "([predicate]) -> void", 0, "Collapses consecutive duplicates; sort first."),
      method("merge", "(list&) -> void", 1),
      method("splice", "(const_iterator, list&) -> void", 2),
      method("size", "() -> size_t", 0),
      method("empty", "() -> bool", 0),
      method("clear", "() -> void", 0),
      method("begin", "() -> iterator", 0),
      method("end", "() -> iterator", 0),
    ],
  },
  pair: {
    entries: [
      field("first", ""),
      field("second", ""),
      method("swap", "(pair&) -> void", 1),
    ],
  },
  tuple: {
    entries: [
      method("swap", "(tuple&) -> void", 1),
      fn("get", "(tuple t) -> free std::get<I>(t)", 0, "Free function: get<0>(t), get<T>(t)."),
    ],
  },
  iterator: {
    entries: [
      method("operator*", "() -> T&", 0, "Also just *it."),
      method("operator->", "() -> T*", 0, "Also just it->."),
      method("operator++", "() -> iterator&", 0, "Also ++it."),
      method("operator==", "(iterator) -> bool", 1, "Compare against container.end()."),
      method("operator!=", "(iterator) -> bool", 1),
    ],
  },
  unique_ptr: {
    entries: [
      method("get", "() -> T*", 0),
      method("release", "() -> T*", 0),
      method("reset", "(T* ptr = nullptr) -> void", 0),
      method("swap", "(unique_ptr&) -> void", 1),
      method("operator*", "() -> T&", 0),
      method("operator->", "() -> T*", 0),
    ],
  },
  treeNode: {
    entries: [...TREE_NODE, { name: "TreeNode", kind: "class", detail: "(int x) / (int x, TreeNode *left, TreeNode *right)", doc: "Bundle-provided struct; children are TreeNode*." }],
  },
  listNode: {
    entries: [
      field("val", ": int", "Access with head->val."),
      field("next", ": ListNode*"),
      { name: "ListNode", kind: "class", detail: "(int x) / (int x, ListNode *next)", doc: "Bundle-provided struct." },
    ],
  },
  graphNode: {
    entries: [
      field("val", ": int"),
      field("neighbors", ": vector<Node*>&", "Undirected edges appear on both endpoints."),
    ],
  },
};

// Ordered: more specific patterns before their substrings (unordered_map
// before map).
const TYPE_OF: Array<[RegExp, string]> = [
  [/^"/, "string"],
  [/unordered_map/, "unordered_map"],
  [/unordered_set/, "unordered_set"],
  [/multiset/, "multiset"],
  [/priority_queue/, "priority_queue"],
  [/\bvector\s*[<&(]/, "vector"],
  [/\bmap\s*[<&(]/, "map"],
  [/\bset\s*[<&(]/, "set"],
  [/\bdeque\s*[<&(]/, "deque"],
  [/\bqueue\s*[<&(]/, "queue"],
  [/\bstack\s*[<&(]/, "stack"],
  [/\barray\s*[<&(]/, "array"],
  [/\blist\s*[<&(]/, "list"],
  [/\bpair\s*[<&(]/, "pair"],
  [/make_pair\s*\(/, "pair"],
  [/\btuple\s*[<&(]/, "tuple"],
  [/make_tuple\s*\(/, "tuple"],
  [/unique_ptr/, "unique_ptr"],
  [/TreeNode\s*\(/, "treeNode"],
  [/ListNode\s*\(/, "listNode"],
  [/basic_string|""s/, "string"],
  // declarations: TreeNode* root, GraphNode& n
  [/\bTreeNode\b/, "treeNode"],
  [/\bListNode\b/, "listNode"],
  [/\bGraphNode\b/, "graphNode"],
  [/\bNode\b/, "graphNode"],
];

const GLOBALS: Entry[] = [
  fn("sort", "(first, last[, compare]) -> void", 2, "sort(v.begin(), v.end()); pass greater<int>() to descend."),
  fn("stable_sort", "(first, last[, compare]) -> void", 2),
  fn("partial_sort", "(first, middle, last[, compare]) -> void", 3, "Smallest (middle-first) elements, sorted, at the front."),
  fn("nth_element", "(first, nth, last[, compare]) -> void", 3, "nth element as if sorted; O(n) average."),
  fn("reverse", "(first, last) -> void", 2),
  fn("min", "(a, b[, compare]) -> const T&", 2),
  fn("max", "(a, b[, compare]) -> const T&", 2),
  fn("minmax", "(a, b) -> pair", 2),
  fn("min_element", "(first, last[, compare]) -> iterator", 2),
  fn("max_element", "(first, last[, compare]) -> iterator", 2),
  fn("abs", "(int|double) -> same", 1),
  fn("swap", "(T&, T&) -> void", 2),
  fn("lower_bound", "(first, last, value[, compare]) -> iterator", 3, "First element >= value; range must be sorted."),
  fn("upper_bound", "(first, last, value[, compare]) -> iterator", 3, "First element > value."),
  fn("binary_search", "(first, last, value[, compare]) -> bool", 3),
  fn("accumulate", "(first, last, init[, op]) -> T", 3, "Sum with init 0; numeric header is in bits/stdc++.h."),
  fn("iota", "(first, last, start) -> void", 3, "Fills with ++start: iota(v.begin(), v.end(), 0)."),
  fn("count", "(first, last, value) -> ptrdiff_t", 3),
  fn("count_if", "(first, last, pred) -> ptrdiff_t", 3),
  fn("find", "(first, last, value) -> iterator", 3),
  fn("find_if", "(first, last, pred) -> iterator", 3),
  fn("fill", "(first, last, value) -> void", 3),
  fn("transform", "(first, last, out, op) -> iterator", 4),
  fn("for_each", "(first, last, f) -> f", 3),
  fn("unique", "(first, last[, pred]) -> iterator", 2, "Moves duplicates to the back; erase(remove-idiom) after sorting."),
  fn("remove", "(first, last, value) -> iterator", 3),
  fn("remove_if", "(first, last, pred) -> iterator", 3),
  fn("next_permutation", "(first, last[, compare]) -> bool", 2),
  fn("prev_permutation", "(first, last[, compare]) -> bool", 2),
  fn("make_heap", "(first, last[, compare]) -> void", 2),
  fn("push_heap", "(first, last[, compare]) -> void", 2),
  fn("pop_heap", "(first, last[, compare]) -> void", 2),
  fn("stoi", "(const string&[, pos[, base]]) -> int", 1),
  fn("stol", "(const string&[, pos[, base]]) -> long", 1),
  fn("stoll", "(const string&[, pos[, base]]) -> long long", 1),
  fn("stod", "(const string&[, pos]) -> double", 1),
  fn("to_string", "(int|long|double...) -> string", 1),
  fn("gcd", "(m, n) -> common_type_t", 2, "C++17 std::gcd."),
  fn("lcm", "(m, n) -> common_type_t", 2, "C++17 std::lcm."),
  fn("popcount", "(unsigned x) -> int", 1, "C++20 std::popcount."),
  fn("__builtin_popcount", "(unsigned x) -> int", 1),
  fn("__builtin_popcountll", "(unsigned long long x) -> int", 1),
  fn("__builtin_clz", "(unsigned x) -> int", 1, "Leading zeros; 31 - clz(x) = floor(log2(x))."),
  fn("memset", "(ptr, ch, count) -> ptr", 3, "Byte fill: memset(dp, 0, sizeof dp)."),
  constant("INT_MAX", ""),
  constant("INT_MIN", ""),
  constant("LONG_MAX", ""),
  constant("LLONG_MAX", ""),
  constant("string::npos", "", "size_t(-1): find() miss sentinel."),
  cls("TreeNode", "", "Bundle-provided struct (val, left, right as pointers)."),
  cls("ListNode", "", "Bundle-provided struct (val, next)."),
];

function splitTopLevel(text: string, separator: string): string[] {
  const parts: string[] = [];
  let depth = 0;
  let current = "";
  for (const ch of text) {
    if (ch === "<" || ch === "(" || ch === "[") depth += 1;
    else if (ch === ">" || ch === ")" || ch === "]") depth -= 1;
    if (ch === separator && depth === 0) {
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

  for (const rawLine of source.split("\n")) {
    const line = rawLine.trim();
    let match: RegExpExecArray | null;

    match = /^#\s*include\s*<([^>]+)>/.exec(line);
    if (match) {
      scope.imports.push(match[1]);
      continue;
    }
    // function/method definitions with typed parameters
    match = /^[\w:<>&*\s]+?\b(\w+)\s*\(([^)]*)\)\s*(?:const\s*)?\{/.exec(line);
    if (match && !/^(if|for|while|switch|catch)\b/.test(line)) {
      if (!scope.selfMethods.includes(match[1])) scope.selfMethods.push(match[1]);
      for (const param of splitTopLevel(match[2], ",")) {
        const tokens = param.trim().split(/\s+/);
        if (tokens.length < 2) continue;
        const name = tokens[tokens.length - 1].replace(/^[*&]+|[,&*]+$/g, "");
        const typeId = cppTypeOf(tokens.slice(0, -1).join(" "));
        if (/^[A-Za-z_]\w*$/.test(name)) vars[name] = typeId ?? "";
      }
      continue;
    }
    // range-for: for (auto& x : container)
    match = /^for\s*\(\s*(?:const\s+)?(?:[\w:<>&*\s]+?)\s*&?\s*([\w, ]+):\s*([^)]+)\)/.exec(line);
    if (match) {
      for (const name of match[1].split(",")) {
        const clean = name.trim();
        if (/^[A-Za-z_]\w*$/.test(clean)) vars[clean] = "";
      }
      continue;
    }
    // typed declarations: vector<int> v = ...; unordered_map<int,int> m;
    match = /^(?:const\s+)?(?:std::)?((?:unordered_)?(?:map|set)|multiset|vector|deque|queue|priority_queue|stack|array|list|pair|tuple|unique_ptr)\b\s*<[^;=]*?[&*\s]([\w]+)\s*(?:=|;|\(|\{)/.exec(line);
    if (match) {
      const typeId = cppTypeOf(match[1]);
      if (typeId && /^[A-Za-z_]\w*$/.test(match[2])) vars[match[2]] = typeId;
      continue;
    }
    // plain string declarations (no template): string s = ..., string t;
    match = /^(?:const\s+)?(?:std::)?string\s+[&*]?\s*([\w]+)\s*(?:=|;|\()/.exec(line);
    if (match) {
      if (/^[A-Za-z_]\w*$/.test(match[1])) vars[match[1]] = "string";
      continue;
    }
    // auto declarations
    match = /^auto\s+(\w+)\s*=\s*([^;]+);/.exec(line);
    if (match) {
      const typeId = cppTypeOf(match[2].trim());
      if (/^[A-Za-z_]\w*$/.test(match[1])) vars[match[1]] = typeId ?? "";
      continue;
    }
    // fields: this->x = ...
    match = /^this->(\w+)\s*=\s*([^;]+);/.exec(line);
    if (match) {
      scope.fields[match[1]] = cppTypeOf(match[2].trim()) ?? "";
    }
  }
  return scope;
}

export const cpp: LanguageTable = {
  id: "cpp",
  // "-" is a trigger only to catch "->"; the engine guards it.
  triggerCharacters: [".", "-"],
  keywords: KEYWORDS,
  typeOf: TYPE_OF,
  types: TYPES,
  globals: GLOBALS,
  scan,
};
