import type { Entry, LanguageTable, Scope } from "../types";
import { constant, field, fn, method } from "../types";

/**
 * Curated Rust surface for algorithm submissions (rustc 1.85, edition 2021):
 * Vec/VecDeque/String/&str (merged as "string"), the hash/BTree maps and
 * sets, BinaryHeap, Option/Result (with `option:treeNode` wrapper ids so
 * `root.unwrap().` completes the wrapped node), iterator adapters, macros,
 * and the bundle-provided node structs (accessed through borrow()).
 */

const KEYWORDS = [
  "as", "async", "await", "break", "const", "continue", "dyn", "else",
  "enum", "extern", "false", "fn", "for", "if", "impl", "in", "let", "loop",
  "match", "mod", "move", "mut", "pub", "ref", "return", "static", "struct",
  "trait", "true", "type", "unsafe", "use", "where", "while",
];

const ITERATOR_METHODS: Entry[] = [
  method("map", "(FnMut(T) -> U) -> Map", 1, "Lazy; collect() to materialize."),
  method("filter", "(FnMut(&T) -> bool) -> Filter", 1),
  method("filter_map", "(FnMut(T) -> Option<U>) -> FilterMap", 1),
  method("take", "(n) -> Take", 1),
  method("skip", "(n) -> Skip", 1),
  method("take_while", "(pred) -> TakeWhile", 1),
  method("skip_while", "(pred) -> SkipWhile", 1),
  method("enumerate", "() -> Enumerate", 0, "(index, item) pairs."),
  method("zip", "(other) -> Zip", 1),
  method("rev", "() -> Rev", 0, "Reversible iterators only."),
  method("cloned", "() -> Cloned", 0, "For iterators of &T where T: Clone."),
  method("copied", "() -> Copied", 0, "For iterators of &T where T: Copy."),
  method("flat_map", "(FnMut(T) -> IntoIterator) -> FlatMap", 1),
  method("flatten", "() -> Flatten", 0),
  method("windows", "(size) -> iterator of &[T]", 1, "Slice method: overlapping windows."),
  method("chunks", "(size) -> iterator of &[T]", 1, "Slice method: non-overlapping."),
  method("peekable", "() -> Peekable", 0),
  method("collect", "() -> B", 0, "collect::<Vec<_>>(); collect::<HashSet<_>>()."),
  method("sum", "() -> S", 0, "Type annotation often needed: .sum::<i64>()."),
  method("product", "() -> P", 0),
  method("count", "() -> usize", 0),
  method("max", "() -> Option<T>", 0),
  method("min", "() -> Option<T>", 0),
  method("max_by_key", "(FnMut(&T) -> K) -> Option<T>", 1),
  method("min_by_key", "(FnMut(&T) -> K) -> Option<T>", 1),
  method("fold", "(init, FnMut(A, T) -> A) -> A", 2),
  method("reduce", "(FnMut(T, T) -> T) -> Option<T>", 1),
  method("any", "(pred) -> bool", 1, "Short-circuits."),
  method("all", "(pred) -> bool", 1, "Short-circuits."),
  method("find", "(pred) -> Option<T>", 1),
  method("position", "(pred) -> Option<usize>", 1),
  method("for_each", "(FnMut(T))", 1),
];

const VEC_METHODS: Entry[] = [
  ...ITERATOR_METHODS.filter((e) => !["windows", "chunks"].includes(e.name)),
  method("iter", "() -> Iter<T>", 0, "&T items — the usual read-only pass."),
  method("iter_mut", "() -> IterMut<T>", 0),
  method("into_iter", "() -> IntoIter", 0, "Consumes the vec, yields T by value."),
  method("push", "(value) -> ()", 1, "Amortized O(1); needs mut."),
  method("pop", "() -> Option<T>", 0),
  method("insert", "(index, value)", 2, "O(n) shift."),
  method("remove", "(index) -> T", 1, "O(n) shift."),
  method("swap_remove", "(index) -> T", 1, "O(1): swaps with the last element."),
  method("truncate", "(len)", 1),
  method("clear", "() -> ()", 0),
  method("contains", "(&x) -> bool", 1, "Needs T: PartialEq."),
  method("get", "(index) -> Option<&T>", 1, "None out of bounds; v[i] panics instead."),
  method("first", "() -> Option<&T>", 0),
  method("last", "() -> Option<&T>", 0),
  method("len", "() -> usize", 0),
  method("is_empty", "() -> bool", 0),
  method("sort", "() -> ()", 0, "Ascending, T: Ord."),
  method("sort_by", "(cmp) -> ()", 1, "v.sort_by(|a, b| a.cmp(b)) or b.cmp(a) to descend."),
  method("sort_by_key", "(key) -> ()", 1, "v.sort_by_key(|x| -x.val)."),
  method("sort_unstable_by_key", "(key) -> ()", 1, "Faster, non-stable."),
  method("reverse", "() -> ()", 0),
  method("dedup", "() -> ()", 0, "Consecutive duplicates; sort first for all."),
  method("retain", "(pred)", 1, "Keep only elements satisfying pred."),
  method("split_off", "(at) -> Vec<T>", 1),
  method("append", "(other: &mut Vec<T>)", 1, "Moves all of other into self."),
  method("extend", "(IntoIterator<Item = T>)", 1, "v.extend(other.iter().copied())."),
  method("drain", "(range) -> Drain<T>", 1, "v.drain(..) empties while iterating."),
  method("binary_search", "(&x) -> Result<usize, usize>", 1, "Ok(index) when found; must be sorted."),
  method("join", "(sep) -> String", 1, "For Vec<String> / Vec<&str>."),
];

const STRING_METHODS: Entry[] = [
  method("len", "() -> usize", 0, "Byte length, not char count."),
  method("is_empty", "() -> bool", 0),
  method("chars", "() -> Chars", 0, "Iterate chars: s.chars().rev().collect::<String>()."),
  method("bytes", "() -> Bytes", 0),
  method("char_indices", "() -> CharIndices", 0),
  method("split", "(pattern) -> Split", 1, "s.split(' '); s.split(\",\")."),
  method("split_whitespace", "() -> SplitWhitespace", 0),
  method("splitn", "(n, pattern) -> SplitN", 2),
  method("lines", "() -> Lines", 0),
  method("trim", "() -> &str", 0),
  method("trim_start", "() -> &str", 0),
  method("trim_end", "() -> &str", 0),
  method("to_lowercase", "() -> String", 0),
  method("to_uppercase", "() -> String", 0),
  method("replace", "(pattern, replacement) -> String", 2),
  method("replacen", "(pattern, replacement, n) -> String", 3),
  method("contains", "(pattern) -> bool", 1),
  method("starts_with", "(pattern) -> bool", 1),
  method("ends_with", "(pattern) -> bool", 1),
  method("find", "(pattern) -> Option<usize>", 1, "Byte index or None."),
  method("rfind", "(pattern) -> Option<usize>", 1),
  method("repeat", "(n) -> String", 1),
  method("push", "(char)", 1, "String only."),
  method("push_str", "(&str)", 1, "String only."),
  method("pop", "() -> Option<char>", 0, "String only."),
  method("as_str", "() -> &str", 0),
  method("as_bytes", "() -> &[u8]", 0),
  method("to_string", "() -> String", 0, "Clone the content."),
  method("to_owned", "() -> String", 0),
  method("parse", "() -> Result<F, ParseIntError>", 0, "\"123\".parse::<i32>().unwrap()."),
];

const MAP_METHODS: Entry[] = [
  method("insert", "(K, V) -> Option<V>", 2, "Returns the old value."),
  method("get", "(&K) -> Option<&V>", 1, "m.get(&key) — takes a reference."),
  method("get_mut", "(&K) -> Option<&mut V>", 1),
  method("get_key_value", "(&K) -> Option<(&K, &V)>", 1),
  method("remove", "(&K) -> Option<V>", 1),
  method("remove_entry", "(&K) -> Option<(K, V)>", 1),
  method("contains_key", "(&K) -> bool", 1),
  method("entry", "(K) -> Entry", 1, "*m.entry(k).or_insert(0) += 1 counts."),
  method("iter", "() -> Iter<K, V>", 0, "(K, V) tuple pairs."),
  method("keys", "() -> Keys<K, V>", 0),
  method("values", "() -> Values<K, V>", 0),
  method("values_mut", "() -> ValuesMut<K, V>", 0),
  method("len", "() -> usize", 0),
  method("is_empty", "() -> bool", 0),
  method("clear", "() -> ()", 0),
];

const SET_METHODS: Entry[] = [
  method("insert", "(T) -> bool", 1, "false when already present."),
  method("contains", "(&T) -> bool", 1),
  method("get", "(&T) -> Option<&T>", 1),
  method("remove", "(&T) -> bool", 1),
  method("take", "(&T) -> Option<T>", 1),
  method("iter", "() -> Iter<T>", 0),
  method("union", "(other) -> Union", 1),
  method("intersection", "(other) -> Intersection", 1),
  method("difference", "(other) -> Difference", 1),
  method("symmetric_difference", "(other) -> SymmetricDifference", 1),
  method("is_disjoint", "(other) -> bool", 1),
  method("is_subset", "(other) -> bool", 1),
  method("is_superset", "(other) -> bool", 1),
  method("len", "() -> usize", 0),
  method("is_empty", "() -> bool", 0),
  method("clear", "() -> ()", 0),
];

const OPTION_METHODS: Entry[] = [
  method("is_some", "() -> bool", 0),
  method("is_none", "() -> bool", 0),
  method("unwrap", "() -> T", 0, "Panics on None."),
  method("expect", "(msg) -> T", 1, "unwrap with a custom panic message."),
  method("unwrap_or", "(default) -> T", 1),
  method("unwrap_or_else", "(FnOnce() -> T) -> T", 1),
  method("unwrap_or_default", "() -> T", 0),
  method("as_ref", "() -> Option<&T>", 0, "Borrow instead of moving — the usual pre-unwrap step on node params."),
  method("as_mut", "() -> Option<&mut T>", 0),
  method("map", "(FnOnce(T) -> U) -> Option<U>", 1),
  method("and_then", "(FnOnce(T) -> Option<U>) -> Option<U>", 1),
  method("or_else", "(FnOnce() -> Option<T>) -> Option<T>", 1),
  method("ok_or", "(err) -> Result<T, E>", 1),
  method("filter", "(pred) -> Option<T>", 1),
  method("take", "() -> Option<T>", 0),
  method("replace", "(T) -> Option<T>", 1),
  method("iter", "() -> Iter<T>", 0),
  method("cloned", "() -> Option<T>", 0),
  method("copied", "() -> Option<T>", 0),
];

const RESULT_METHODS: Entry[] = [
  method("is_ok", "() -> bool", 0),
  method("is_err", "() -> bool", 0),
  method("unwrap", "() -> T", 0),
  method("unwrap_err", "() -> E", 0),
  method("expect", "(msg) -> T", 1),
  method("unwrap_or", "(default) -> T", 1),
  method("unwrap_or_else", "(f) -> T", 1),
  method("ok", "() -> Option<T>", 0),
  method("err", "() -> Option<E>", 0),
  method("map", "(FnOnce(T) -> U) -> Result<U, E>", 1),
  method("map_err", "(FnOnce(E) -> F) -> Result<T, F>", 1),
  method("and_then", "(FnOnce(T) -> Result<U, E>) -> Result<U, E>", 1),
];

const INTEGER_METHODS: Entry[] = [
  method("pow", "(exp: u32) -> Self", 1, "Panics on overflow in debug; wrapping_pow never does."),
  method("abs", "() -> Self", 0),
  method("signum", "() -> Self", 0),
  method("checked_add", "(rhs) -> Option<Self>", 1),
  method("checked_mul", "(rhs) -> Option<Self>", 1),
  method("wrapping_add", "(rhs) -> Self", 1),
  method("wrapping_mul", "(rhs) -> Self", 1),
  method("div_euclid", "(rhs) -> Self", 1),
  method("rem_euclid", "(rhs) -> Self", 1),
  method("count_ones", "() -> u32", 0),
  method("count_zeros", "() -> u32", 0),
  method("leading_zeros", "() -> u32", 0),
  method("trailing_zeros", "() -> u32", 0),
  method("swap_bytes", "() -> Self", 0),
];

const CHAR_METHODS: Entry[] = [
  method("is_ascii_digit", "() -> bool", 0),
  method("is_alphanumeric", "() -> bool", 0),
  method("is_alphabetic", "() -> bool", 0),
  method("is_uppercase", "() -> bool", 0),
  method("is_lowercase", "() -> bool", 0),
  method("is_whitespace", "() -> bool", 0),
  method("to_digit", "(radix) -> Option<u32>", 1),
  method("to_uppercase", "() -> ToUppercase", 0),
  method("to_lowercase", "() -> ToLowercase", 0),
];

const BOOL_METHODS: Entry[] = [
  method("then", "(f: FnOnce() -> T) -> Option<T>", 1),
  method("then_some", "(value) -> Option<T>", 1),
];

const TYPES: LanguageTable["types"] = {
  vec: { returns: { iter: "iterator", iter_mut: "iterator", into_iter: "iterator", drain: "iterator", get: "option:", first: "option:", last: "option:", max: "option:", min: "option:", pop: "option:" }, entries: VEC_METHODS },
  vecDeque: {
    returns: { iter: "iterator", pop_front: "option:", pop_back: "option:", get: "option:", front: "option:", back: "option:" },
    entries: [
      method("push_back", "(value)", 1),
      method("push_front", "(value)", 1),
      method("pop_front", "() -> Option<T>", 0, "O(1) — the queue operations."),
      method("pop_back", "() -> Option<T>", 0),
      method("front", "() -> Option<&T>", 0),
      method("back", "() -> Option<&T>", 0),
      method("get", "(index) -> Option<&T>", 1),
      ...ITERATOR_METHODS.filter((e) => ["len", "is_empty", "iter", "clear", "contains"].includes(e.name)),
    ],
  },
  binaryHeap: {
    returns: { pop: "option:", peek: "option:", iter: "iterator" },
    entries: [
      method("push", "(item)", 1),
      method("pop", "() -> Option<T>", 0, "Largest per Ord; BinaryHeap::new() is a max-heap."),
      method("peek", "() -> Option<&T>", 0),
      method("peek_mut", "() -> PeekMut<T>", 0),
      method("into_sorted_vec", "() -> Vec<T>", 0),
      method("len", "() -> usize", 0),
      method("is_empty", "() -> bool", 0),
      method("clear", "() -> ()", 0),
    ],
  },
  string: {
    returns: { chars: "iterator", bytes: "iterator", char_indices: "iterator", split: "iterator", split_whitespace: "iterator", splitn: "iterator", lines: "iterator", find: "option:", rfind: "option:", pop: "option:", parse: "", trim: "string", to_lowercase: "string", to_uppercase: "string", replace: "string", repeat: "string", to_string: "string", to_owned: "string", as_str: "string" },
    entries: STRING_METHODS,
  },
  hashMap: { returns: { iter: "iterator", keys: "iterator", values: "iterator", get: "option:", get_mut: "option:", remove: "option:", insert: "option:", remove_entry: "" }, entries: MAP_METHODS },
  hashSet: { returns: { iter: "iterator", get: "option:", take: "option:" }, entries: SET_METHODS },
  bTreeMap: { returns: { iter: "iterator", keys: "iterator", values: "iterator", get: "option:", get_mut: "option:", remove: "option:", insert: "option:" }, entries: [...MAP_METHODS, method("range", "(range) -> Range", 1)] },
  bTreeSet: { returns: { iter: "iterator", get: "option:", take: "option:" }, entries: [...SET_METHODS, method("range", "(range) -> Range", 1)] },
  option: { returns: { iter: "iterator", as_ref: "same", as_mut: "same", cloned: "", copied: "" }, entries: OPTION_METHODS },
  result: { returns: { ok: "option:", err: "option:" }, entries: RESULT_METHODS },
  iterator: { entries: ITERATOR_METHODS },
  integer: { entries: INTEGER_METHODS },
  char: { entries: CHAR_METHODS },
  bool: { entries: BOOL_METHODS },
  treeNode: {
    returns: { borrow: "treeNode", borrow_mut: "treeNode" },
    entries: [
      field("val", ": i32", "Read through the Rc: node.borrow().val."),
      field("left", ": Option<Rc<RefCell<TreeNode>>>", "Clone the Rc: Rc::clone(&node.left.unwrap())."),
      field("right", ": Option<Rc<RefCell<TreeNode>>>"),
      method("borrow", "() -> Ref<T>", 0, "Immutable access to the RefCell's contents; auto-deref reads fields after it."),
      method("borrow_mut", "() -> RefMut<T>", 0),
      { name: "TreeNode::new", kind: "function", detail: "(val: i32) -> Self", doc: "Bundle-provided constructor." },
    ],
  },
  listNode: {
    entries: [
      field("val", ": i32"),
      field("next", ": Option<Box<ListNode>>", "Take it: node.next.take()."),
      { name: "ListNode::new", kind: "function", detail: "(val: i32) -> Self" },
    ],
  },
  graphNode: {
    returns: { borrow: "graphNode", borrow_mut: "graphNode" },
    entries: [
      field("val", ": i32"),
      field("neighbors", ": Vec<Rc<RefCell<Node>>>", "Shared nodes: Rc::clone(&n)."),
      field("random", ""),
      method("borrow", "() -> Ref<T>", 0),
    ],
  },
};

// Ordered constructor / literal patterns.
const TYPE_OF: Array<[RegExp, string]> = [
  [/^"/, "string"],
  [/^r#"/, "string"],
  [/^'/, "char"],
  [/vec!/, "vec"],
  [/Vec::/, "vec"],
  [/VecDeque::/, "vecDeque"],
  [/BinaryHeap::/, "binaryHeap"],
  [/HashMap::/, "hashMap"],
  [/HashSet::/, "hashSet"],
  [/BTreeMap::/, "bTreeMap"],
  [/BTreeSet::/, "bTreeSet"],
  [/String::/, "string"],
  [/Option::/, "option"],
  [/TreeNode\s*\{/, "treeNode"],
  [/ListNode\s*\{/, "listNode"],
  [/&str\b/, "string"],
  [/\bi(8|16|32|64|128|size)\b/, "integer"],
  [/\bu(8|16|32|64|128|size)\b/, "integer"],
  [/\bf(32|64)\b/, "integer"],
];

const GLOBALS: Entry[] = [
  { name: "vec!", kind: "function", detail: "vec![1, 2, 3] | vec![0; n]", args: 0, doc: "Vec literal; vec![value; n] repeats." },
  { name: "println!", kind: "function", detail: "println!(\"{}\", x)", args: 0, doc: "stdout with newline; debug output may count toward limits." },
  { name: "print!", kind: "function", detail: "print!(\"{}\", x)", args: 0 },
  { name: "format!", kind: "function", detail: "format!(\"{}-{}\", a, b) -> String", args: 0 },
  { name: "assert!", kind: "function", detail: "assert!(cond)", args: 0 },
  { name: "assert_eq!", kind: "function", detail: "assert_eq!(a, b)", args: 0 },
  { name: "dbg!", kind: "function", detail: "dbg!(&expr)", args: 0, doc: "Prints file:line and the expression's value; returns it." },
  { name: "matches!", kind: "function", detail: "matches!(expr, pattern)", args: 0 },
  constant("i32", "", "Also i64/i128/isize and u*/usize; usize for indices."),
  constant("usize", ""),
];

/** Rust type text -> canonical type id (wrapper ids carry "option:<inner>"). */
export function rustTypeOf(text: string): string | null {
  let t = text.trim();
  for (;;) {
    const wrapper = /^(?:Box|Rc|RefCell|Arc|Mutex|&)\s*<(.+)>$/.exec(t);
    if (!wrapper) break;
    t = wrapper[1].trim();
  }
  const opt = /^(?:Option|&?Option)\s*<(.+)>$/.exec(t);
  if (opt) {
    const inner = rustTypeOf(opt[1]);
    return inner ? `option:${inner}` : "option:";
  }
  const simple: Record<string, string> = {
    TreeNode: "treeNode",
    ListNode: "listNode",
    GraphNode: "graphNode",
    Node: "graphNode",
    NodeWithNext: "nodeWithNext",
    MultiListNode: "multiListNode",
    QuadNode: "quadNode",
    String: "string",
    str: "string",
    bool: "bool",
    char: "char",
  };
  if (Object.prototype.hasOwnProperty.call(simple, t)) return simple[t];
  if (/^i(8|16|32|64|128|size)$/.test(t) || /^u(8|16|32|64|128|size)$/.test(t) || /^f(32|64)$/.test(t)) {
    return "integer";
  }
  if (/^(Vec|VecDeque|BinaryHeap|HashMap|HashSet|BTreeMap|BTreeSet)\b/.test(t)) {
    const names: Record<string, string> = {
      Vec: "vec", VecDeque: "vecDeque", BinaryHeap: "binaryHeap",
      HashMap: "hashMap", HashSet: "hashSet", BTreeMap: "bTreeMap", BTreeSet: "bTreeSet",
    };
    return names[t.split(/[<\s]/)[0]] ?? null;
  }
  if (/^[A-Z]\w*$/.test(t)) return "";
  return null;
}

function splitTopLevel(text: string): string[] {
  const parts: string[] = [];
  let depth = 0;
  let current = "";
  for (const ch of text) {
    if (ch === "<" || ch === "(" || ch === "[") depth += 1;
    else if (ch === ">" || ch === ")" || ch === "]") depth -= 1;
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
  let inImpl = false;

  for (const rawLine of source.split("\n")) {
    const line = rawLine.trim();
    let match: RegExpExecArray | null;

    match = /^use\s+([\w:]+)/.exec(line);
    if (match) {
      scope.imports.push(match[1].split("::")[0]);
      continue;
    }
    if (/^impl\b/.test(line)) inImpl = true;
    else if (inImpl && line === "}") inImpl = false;
    // functions and methods
    match = /fn\s+(\w+)\s*\(([^)]*)\)/.exec(line);
    if (match) {
      if (inImpl && match[1] !== "new" && !scope.selfMethods.includes(match[1])) {
        scope.selfMethods.push(match[1]);
      }
      for (const param of splitTopLevel(match[2])) {
        const paramMatch = /^&?(?:mut\s+)?(\w+)\s*:\s*(.+)$/.exec(param.trim());
        if (!paramMatch) continue;
        vars[paramMatch[1]] = rustTypeOf(paramMatch[2]) ?? "";
      }
      continue;
    }
    // let bindings
    match = /^let\s+(?:mut\s+)?(\w+)\s*(?::\s*([^=;]+))?\s*=\s*([^;]+);/.exec(line);
    if (match) {
      const typeId = (match[2] ? rustTypeOf(match[2]) : null) ?? literalType(match[3].trim());
      if (/^[A-Za-z_]\w*$/.test(match[1])) vars[match[1]] = typeId ?? "";
      continue;
    }
    // for loops
    match = /^for\s+(\w+)\s+in\s+/.exec(line);
    if (match) {
      vars[match[1]] = "";
      continue;
    }
    // fields of user-declared structs (design problems)
    match = /^\s*pub\s+(?:mut\s+)?(\w+)\s*:\s*(.+?),?$/.exec(line);
    if (match) {
      scope.fields[match[1]] = rustTypeOf(match[2]) ?? "";
    }
  }
  return scope;
}

function literalType(rhs: string): string | null {
  for (const [pattern, typeId] of TYPE_OF) {
    if (pattern.test(rhs)) return typeId || null;
  }
  return null;
}

export const rust: LanguageTable = {
  id: "rust",
  triggerCharacters: ["."],
  keywords: KEYWORDS,
  typeOf: TYPE_OF,
  types: TYPES,
  globals: GLOBALS,
  scan,
};
