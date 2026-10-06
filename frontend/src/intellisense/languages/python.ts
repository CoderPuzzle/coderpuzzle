import type { Entry, LanguageTable, Scope } from "../types";
import { constant, fn, field, method, cls } from "../types";

/**
 * Curated Python surface for algorithm submissions: builtins, the
 * str/list/dict/set/tuple methods, collections/itertools/heapq/bisect/math/
 * functools/re namespaces, keywords, and the bundle-provided types
 * (TreeNode/ListNode/graph-class/...). Members mirror CPython 3.14; the
 * judge's provided/ sources define the node classes.
 */

// Class names as they appear in annotations, mapped to canonical type ids.
// "" = primitive with no curated members.
const CLASS_IDS: Record<string, string> = {
  TreeNode: "treeNode",
  ListNode: "listNode",
  GraphNode: "graphNode",
  Node: "graphNode",
  RandomListNode: "randomListNode",
  NodeWithNext: "nodeWithNext",
  MultiListNode: "multiListNode",
  QuadNode: "quadNode",
  NestedInteger: "nestedInteger",
  GridMaster: "gridMaster",
  SharedListNode: "listNode",
  str: "str",
  deque: "deque",
  Counter: "counter",
  defaultdict: "defaultDict",
  list: "list",
  List: "list",
  dict: "dict",
  Dict: "dict",
  set: "set",
  Set: "set",
  frozenset: "set",
  tuple: "tuple",
  Tuple: "tuple",
  int: "",
  float: "",
  bool: "",
  bytes: "",
  object: "",
  Any: "",
  Callable: "",
  Iterable: "",
  Iterator: "",
  Sequence: "",
  Mapping: "",
  Optional: "",
  Union: "",
};

/** `Optional[TreeNode]` / `list[list[int]]` / `TreeNode` -> type id or null. */
function annotationType(annotation: string): string | null {
  let text = annotation.trim();
  for (;;) {
    const wrapper = /^(?:Optional|Union|List|Dict|Set|Tuple|list|dict|set|tuple|Iterable|Iterator|Sequence|Mapping|Final|ClassVar)\[(.+)\]$/.exec(
      text,
    );
    if (!wrapper) break;
    text = wrapper[1].trim();
    // Union splits keep the first non-None arm: "TreeNode | None" style below
    const union = /^(.+?)\s*\|\s*None$/.exec(text);
    if (union) text = union[1].trim();
  }
  const union = /^(.+?)\s*\|\s*None$/.exec(text);
  if (union) text = union[1].trim();
  // Unknown capitalized names (problem-specific structs) yield "" — the name
  // still shows up in bare completion, just without curated members.
  if (Object.prototype.hasOwnProperty.call(CLASS_IDS, text)) return CLASS_IDS[text];
  return /^[A-Z]\w*$/.test(text) ? "" : null;
}

const KEYWORDS = [
  "and", "as", "assert", "async", "await", "break", "class", "continue", "def",
  "del", "elif", "else", "except", "finally", "for", "from", "global", "if",
  "import", "in", "is", "lambda", "nonlocal", "not", "or", "pass", "raise",
  "return", "try", "while", "with", "yield", "match", "case",
];

const BUILTINS: Entry[] = [
  fn("abs", "(x) -> number", 1, "Absolute value."),
  fn("all", "(iterable) -> bool", 1, "True when every element is truthy."),
  fn("any", "(iterable) -> bool", 1, "True when any element is truthy."),
  fn("bin", "(x) -> str", 1, "Binary string of an int, e.g. '0b1010'."),
  fn("bool", "(x=...) -> bool", 0, "Boolean value of x."),
  fn("chr", "(i) -> str", 1, "Character with Unicode code point i."),
  fn("dict", "(**kw) -> dict", 0, "New empty dict."),
  fn("divmod", "(a, b) -> tuple", 2, "(a // b, a % b)."),
  fn("enumerate", "(iterable, start=0) -> iterator", 1, "(index, item) pairs."),
  fn("filter", "(function, iterable) -> iterator", 2, "Items where function(item) is truthy."),
  fn("float", "(x=...) -> float", 0),
  fn("frozenset", "(iterable=...) -> frozenset", 0),
  fn("getattr", "(obj, name[, default]) -> Any", 2),
  fn("hasattr", "(obj, name) -> bool", 2),
  fn("hash", "(obj) -> int", 1),
  fn("hex", "(x) -> str", 1, "Hex string of an int, e.g. '0xff'."),
  fn("int", "(x=..., base=10) -> int", 0, "int('101', 2) parses binary strings."),
  fn("isinstance", "(obj, classinfo) -> bool", 2),
  fn("iter", "(iterable) -> iterator", 1),
  fn("len", "(obj) -> int", 1, "Length of a sized object."),
  fn("list", "(iterable=...) -> list", 0, "Shallow copy / conversion to list."),
  fn("map", "(function, iterable, ...) -> iterator", 2, "function applied to each item."),
  fn("max", "(iterable|a, b, ..., key=..., default=...) -> Any", 1, "Largest item; use key= for custom order."),
  fn("min", "(iterable|a, b, ..., key=..., default=...) -> Any", 1, "Smallest item."),
  fn("next", "(iterator[, default]) -> Any", 1),
  fn("oct", "(x) -> str", 1),
  fn("ord", "(c) -> int", 1, "Unicode code point of a one-character string."),
  fn("pow", "(base, exp[, mod]) -> number", 2, "pow(base, exp, mod) is modular exponentiation."),
  fn("print", "(*objects, sep=' ', end='\\n') -> None", 0, "Debug output (stdout may count toward limits)."),
  fn("range", "(stop) | (start, stop[, step]) -> range", 1, "Half-open integer interval."),
  fn("repr", "(obj) -> str", 1),
  fn("reversed", "(sequence) -> iterator", 1, "Items in reverse order."),
  fn("round", "(number[, ndigits]) -> number", 1),
  fn("set", "(iterable=...) -> set", 0),
  fn("sorted", "(iterable, *, key=None, reverse=False) -> list", 1, "New sorted list; key= picks the sort key."),
  fn("str", "(object='') -> str", 0),
  fn("sum", "(iterable, start=0) -> number", 1),
  fn("tuple", "(iterable=...) -> tuple", 0),
  fn("type", "(obj) -> type", 1),
  fn("zip", "(*iterables) -> iterator", 0, "i-th tuple = i-th element of each argument."),
];

const MODULES: Record<string, Entry[]> = {
  heapq: [
    fn("heapify", "(x) -> None", 1, "Rearrange a list in-place into a min-heap."),
    fn("heappush", "(heap, item) -> None", 2, "Push item onto the min-heap."),
    fn("heappop", "(heap) -> Any", 1, "Pop and return the smallest item."),
    fn("heapreplace", "(heap, item) -> Any", 2, "Pop smallest, then push item (more efficient than pop+push)."),
    fn("heappushpop", "(heap, item) -> Any", 2, "Push item, then pop the smallest."),
    fn("nlargest", "(n, iterable, key=None) -> list", 2),
    fn("nsmallest", "(n, iterable, key=None) -> list", 2),
    fn("merge", "(*iterables, key=None, reverse=False) -> iterator", 0, "Merge sorted inputs into one sorted iterator."),
  ],
  bisect: [
    fn("bisect_left", "(a, x, lo=0, hi=len(a)) -> int", 2, "Leftmost insertion point keeping a sorted."),
    fn("bisect_right", "(a, x, lo=0, hi=len(a)) -> int", 2, "Rightmost insertion point keeping a sorted."),
    fn("insort_left", "(a, x, lo=0, hi=len(a)) -> None", 2, "Insert x at its leftmost sorted position."),
    fn("insort_right", "(a, x, lo=0, hi=len(a)) -> None", 2),
  ],
  collections: [
    { name: "deque", kind: "class", detail: "[iterable[, maxlen]]", doc: "Double-ended queue with O(1) append/popleft." },
    { name: "Counter", kind: "class", detail: "[iterable|mapping]", doc: "Hashable-item counts; most_common(n) ranks them." },
    { name: "defaultdict", kind: "class", detail: "(default_factory)", doc: "dict whose missing keys are auto-created, e.g. defaultdict(list)." },
    { name: "OrderedDict", kind: "class", detail: "()", doc: "dict that remembers insertion order (move_to_end)." },
  ],
  itertools: [
    fn("permutations", "(iterable, r=len(iterable)) -> iterator", 1, "r-length tuples, in all orders, no repeats."),
    fn("combinations", "(iterable, r) -> iterator", 2, "r-length tuples, in sorted order, no repeats."),
    fn("combinations_with_replacement", "(iterable, r) -> iterator", 2),
    fn("product", "(*iterables, repeat=1) -> iterator", 0, "Cartesian product; product(range(n), repeat=k) is an n^k grid."),
    fn("accumulate", "(iterable, func=operator.add) -> iterator", 1, "Running totals / prefix sums."),
    fn("chain", "(*iterables) -> iterator", 0, "Concatenate iterables; chain.from_iterable flattens one level."),
    fn("groupby", "(iterable, key=None) -> iterator", 1, "(key, group) pairs of consecutive equal keys — sort first."),
    fn("islice", "(iterable, stop) | (iterable, start, stop[, step]) -> iterator", 1, "Iterator slice."),
    fn("pairwise", "(iterable) -> iterator", 1, "Consecutive overlapping pairs."),
    fn("starmap", "(function, iterable) -> iterator", 2, "function(*args) for each args tuple."),
    fn("count", "(start=0, step=1) -> iterator", 0, "Infinite arithmetic progression."),
    fn("cycle", "(iterable) -> iterator", 1, "Repeat elements endlessly."),
    fn("repeat", "(object[, times]) -> iterator", 1),
    fn("tee", "(iterable, n=2) -> tuple", 1, "n independent iterators from one."),
    fn("zip_longest", "(*iterables, fillvalue=None) -> iterator", 0, "zip padded to the longest input."),
  ],
  functools: [
    fn("cache", "(function) -> function", 0, "Unbounded memoization decorator."),
    fn("lru_cache", "(maxsize=128, typed=False) -> decorator", 0, "Memoization decorator with a size bound."),
    fn("reduce", "(function, iterable[, initial]) -> Any", 2, "Fold left."),
    fn("cmp_to_key", "(cmp) -> key", 1, "Turn an old-style comparator into a sort key."),
    fn("partial", "(function, *args, **kw) -> callable", 1, "Freeze some arguments."),
  ],
  math: [
    fn("ceil", "(x) -> int", 1),
    fn("floor", "(x) -> int", 1),
    fn("sqrt", "(x) -> float", 1),
    fn("gcd", "(*integers) -> int", 0),
    fn("lcm", "(*integers) -> int", 0),
    fn("factorial", "(n) -> int", 1),
    fn("comb", "(n, k) -> int", 2, "Binomial coefficient n choose k."),
    fn("perm", "(n, k=None) -> int", 1, "nPk permutations."),
    fn("log", "(x[, base]) -> float", 1),
    fn("log2", "(x) -> float", 1),
    fn("log10", "(x) -> float", 1),
    fn("isclose", "(a, b, rel_tol=1e-09, abs_tol=0.0) -> bool", 2),
    fn("inf", "", undefined, "Positive floating infinity."),
    constant("pi", "= 3.14159..."),
    constant("e", "= 2.71828..."),
  ],
  re: [
    fn("compile", "(pattern, flags=0) -> Pattern", 1),
    fn("match", "(pattern, string, flags=0) -> Match | None", 2, "Anchored at the start."),
    fn("fullmatch", "(pattern, string, flags=0) -> Match | None", 2),
    fn("search", "(pattern, string, flags=0) -> Match | None", 2),
    fn("findall", "(pattern, string, flags=0) -> list", 2, "All non-overlapping matches."),
    fn("finditer", "(pattern, string, flags=0) -> iterator", 2),
    fn("sub", "(pattern, repl, string, count=0, flags=0) -> str", 3),
    fn("split", "(pattern, string, maxsplit=0, flags=0) -> list", 2),
  ],
  string: [
    constant("ascii_lowercase", "= 'abcdefghijklmnopqrstuvwxyz'"),
    constant("ascii_uppercase", "= 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'"),
    constant("ascii_letters", "= ascii_lowercase + ascii_uppercase"),
    constant("digits", "= '0123456789'"),
    constant("printable", ""),
  ],
};

const TYPES: LanguageTable["types"] = {
  str: {
    returns: {
      split: "list", splitlines: "list", rsplit: "list", partition: "tuple",
      rpartition: "tuple", replace: "str", strip: "str", lstrip: "str",
      rstrip: "str", removeprefix: "str", removesuffix: "str", lower: "str",
      upper: "str", title: "str", capitalize: "str", casefold: "str",
      swapcase: "str", join: "str", format: "str", zfill: "str", center: "str",
      ljust: "str", rjust: "str",
    },
    entries: [
      method("join", "(iterable_of_str) -> str", 1, "Concatenate with self between items."),
      method("split", "(sep=None, maxsplit=-1) -> list[str]", 1, "Split on whitespace by default."),
      method("rsplit", "(sep=None, maxsplit=-1) -> list[str]", 1),
      method("splitlines", "() -> list[str]", 0),
      method("strip", "(chars=None) -> str", 0, "Trim leading/trailing whitespace (or chars)."),
      method("lstrip", "(chars=None) -> str", 0),
      method("rstrip", "(chars=None) -> str", 0),
      method("removeprefix", "(prefix) -> str", 1),
      method("removesuffix", "(suffix) -> str", 1),
      method("replace", "(old, new[, count]) -> str", 2),
      method("startswith", "(prefix[, start[, end]]) -> bool", 1),
      method("endswith", "(suffix[, start[, end]]) -> bool", 1),
      method("find", "(sub[, start[, end]]) -> int", 1, "Index of first occurrence, -1 when absent."),
      method("rfind", "(sub[, start[, end]]) -> int", 1),
      method("index", "(sub[, start[, end]]) -> int", 1, "Like find but raises ValueError."),
      method("count", "(sub[, start[, end]]) -> int", 1),
      method("lower", "() -> str", 0),
      method("upper", "() -> str", 0),
      method("title", "() -> str", 0),
      method("capitalize", "() -> str", 0),
      method("casefold", "() -> str", 0, "Aggressive lower() for matching."),
      method("swapcase", "() -> str", 0),
      method("isalnum", "() -> bool", 0),
      method("isalpha", "() -> bool", 0),
      method("isdigit", "() -> bool", 0),
      method("isascii", "() -> bool", 0),
      method("isspace", "() -> bool", 0),
      method("islower", "() -> bool", 0),
      method("isupper", "() -> bool", 0),
      method("zfill", "(width) -> str", 1, "Pad with leading zeros."),
      method("ljust", "(width, fillchar=' ') -> str", 1),
      method("rjust", "(width, fillchar=' ') -> str", 1),
      method("center", "(width, fillchar=' ') -> str", 1),
      method("format", "(*args, **kw) -> str", 0, "'{}'.format(...) substitution."),
      method("encode", "(encoding='utf-8') -> bytes", 0),
      method("partition", "(sep) -> tuple[str, str, str]", 1),
      method("rpartition", "(sep) -> tuple[str, str, str]", 1),
      field("__len__" , "", "Dunder hooks; prefer len(s)."),
    ],
  },
  list: {
    returns: { copy: "list" },
    entries: [
      method("append", "(object) -> None", 1, "Add to the end; amortized O(1)."),
      method("extend", "(iterable) -> None", 1, "Append each item."),
      method("insert", "(index, object) -> None", 2),
      method("pop", "(index=-1) -> Any", 0, "Remove and return; last item by default."),
      method("remove", "(value) -> None", 1, "Remove the first equal value."),
      method("clear", "() -> None", 0),
      method("index", "(value[, start[, stop]]) -> int", 1, "First equal position, ValueError when absent."),
      method("count", "(value) -> int", 1),
      method("sort", "(*, key=None, reverse=False) -> None", 0, "In-place Timsort; key= picks the sort key."),
      method("reverse", "() -> None", 0),
      method("copy", "() -> list", 0, "Shallow copy (same as lst[:])."),
    ],
  },
  dict: {
    returns: { keys: "list", values: "list", items: "list", copy: "dict", get: "", pop: "" },
    entries: [
      method("get", "(key[, default]) -> Any", 1, "Value or default (None) when the key is missing."),
      method("keys", "() -> KeysView", 0, "Iterable view of keys."),
      method("values", "() -> ValuesView", 0, "Iterable view of values."),
      method("items", "() -> ItemsView", 0, "Iterable view of (key, value) pairs."),
      method("pop", "(key[, default]) -> Any", 1, "Remove and return; KeyError without default."),
      method("popitem", "() -> tuple", 0, "Remove and return the last (key, value)."),
      method("setdefault", "(key[, default]) -> Any", 2, "Return d[key], setting default when missing."),
      method("update", "(mapping|iterable, **kw) -> None", 1, "Merge other into self."),
      method("copy", "() -> dict", 0),
      method("clear", "() -> None", 0),
    ],
  },
  set: {
    returns: { union: "set", intersection: "set", difference: "set", copy: "set" },
    entries: [
      method("add", "(element) -> None", 1),
      method("remove", "(element) -> None", 1, "KeyError when absent."),
      method("discard", "(element) -> None", 1, "Remove when present, never raises."),
      method("pop", "() -> Any", 0, "Remove and return an arbitrary element."),
      method("clear", "() -> None", 0),
      method("union", "(*others) -> set", 1, "Also the | operator."),
      method("intersection", "(*others) -> set", 1, "Also the & operator."),
      method("difference", "(*others) -> set", 1, "Also the - operator."),
      method("symmetric_difference", "(other) -> set", 1, "Also the ^ operator."),
      method("update", "(*others) -> None", 1, "In-place union (|=)."),
      method("intersection_update", "(*others) -> None", 1),
      method("difference_update", "(*others) -> None", 1),
      method("issubset", "(other) -> bool", 1),
      method("issuperset", "(other) -> bool", 1),
      method("isdisjoint", "(other) -> bool", 1),
      method("copy", "() -> set", 0),
    ],
  },
  tuple: {
    entries: [
      method("count", "(value) -> int", 1),
      method("index", "(value[, start[, stop]]) -> int", 1),
    ],
  },
  deque: {
    returns: { copy: "deque" },
    entries: [
      method("append", "(x) -> None", 1, "Add to the right end."),
      method("appendleft", "(x) -> None", 1, "Add to the left end."),
      method("pop", "() -> Any", 0, "Remove from the right end."),
      method("popleft", "() -> Any", 0, "Remove from the left end; O(1) — this is the queue operation."),
      method("extend", "(iterable) -> None", 1),
      method("extendleft", "(iterable) -> None", 1, "Extends left, so the iterable's order reverses."),
      method("rotate", "(n=1) -> None", 1, "Positive n rotates right."),
      method("clear", "() -> None", 0),
      method("copy", "() -> deque", 0),
      method("count", "(x) -> int", 1),
      method("remove", "(x) -> None", 1),
      method("reverse", "() -> None", 0),
      method("maxlen", "", undefined, "Bound from construction (read-only), or None."),
    ],
  },
  counter: {
    returns: { most_common: "list" },
    entries: [
      method("most_common", "(n=None) -> list[(key, count)]", 1, "The n highest-count items, highest first."),
      method("elements", "() -> iterator", 0, "Each element repeated by its count."),
      method("update", "(iterable|mapping) -> None", 1, "Add counts."),
      method("subtract", "(iterable|mapping) -> None", 1, "Subtract counts."),
      method("get", "(key[, default]) -> int", 1, "Count of key (0 when missing — d[k] never raises)."),
      method("keys", "() -> KeysView", 0),
      method("values", "() -> ValuesView", 0),
      method("items", "() -> ItemsView", 0),
    ],
  },
  defaultDict: {
    returns: { keys: "list", values: "list", items: "list" },
    entries: [
      method("get", "(key[, default]) -> Any", 1),
      method("keys", "() -> KeysView", 0),
      method("values", "() -> ValuesView", 0),
      method("items", "() -> ItemsView", 0),
      method("pop", "(key[, default]) -> Any", 1),
      method("update", "(mapping, **kw) -> None", 1),
      field("default_factory", "", "Callable producing missing values, e.g. list or int."),
    ],
  },
  treeNode: {
    entries: [
      field("val", ": int", "Node value."),
      field("left", ": TreeNode | None", "Left subtree."),
      field("right", ": TreeNode | None", "Right subtree."),
      { name: "TreeNode", kind: "class", detail: "(val=0, left=None, right=None)", doc: "Bundle-provided class." },
    ],
  },
  listNode: {
    entries: [
      field("val", ": int"),
      field("next", ": ListNode | None", "Next node."),
      { name: "ListNode", kind: "class", detail: "(val=0, next=None)", doc: "Bundle-provided class." },
    ],
  },
  graphNode: {
    entries: [
      field("val", ": int"),
      field("neighbors", ": list[Node]", "Adjacent nodes (undirected edges appear on both endpoints)."),
      field("next", "", "On random-pointer variants only."),
      field("random", "", "On random-pointer variants only."),
      field("children", "", "On n-ary variants only."),
    ],
  },
  randomListNode: {
    entries: [
      field("val", ": int"),
      field("next", ": Node | None"),
      field("random", ": Node | None", "Points anywhere in the list (or None)."),
    ],
  },
  nodeWithNext: {
    entries: [
      field("val", ": int"),
      field("left", ""),
      field("right", ""),
      field("next", "", "Populated to the in-level successor on perfect trees."),
    ],
  },
  multiListNode: {
    entries: [
      field("val", ": int"),
      field("prev", ""),
      field("next", ""),
      field("child", "", "Head of the child (multilevel) list."),
    ],
  },
  quadNode: {
    entries: [
      field("val", ": bool"),
      field("isLeaf", ": bool"),
      field("topLeft", ""),
      field("topRight", ""),
      field("bottomLeft", ""),
      field("bottomRight", ""),
    ],
  },
  nestedInteger: {
    entries: [
      method("isInteger", "() -> bool", 0),
      method("getInteger", "() -> int | None", 0, "The held integer when isInteger(), else None."),
      method("getList", "() -> list[NestedInteger] | None", 0, "The held list when not isInteger()."),
      method("add", "(ni: NestedInteger) -> None", 1),
      method("setInteger", "(value: int) -> None", 1),
    ],
  },
  gridMaster: {
    entries: [
      method("canMove", "(direction: str) -> bool", 1, "direction is one of 'U' 'D' 'L' 'R'."),
      method("move", "(direction: str) -> int", 1, "Move and return the target-cell value."),
      method("isTarget", "() -> bool", 0),
    ],
  },
};

// Ordered literal / constructor patterns; first match wins.
const TYPE_OF: Array<[RegExp, string]> = [
  [/^['"]/, "str"],
  [/^f['"]/, "str"],
  [/^\[/, "list"],
  [/^\{\s*\}?\s*$/, "dict"],
  [/^\{[^}:]*\}$/, "set"],
  [/^\{/, "dict"],
  [/\bset\(/, "set"],
  [/\bfrozenset\(/, "set"],
  [/\blist\(/, "list"],
  [/\bdict\(/, "dict"],
  [/\bstr\(/, "str"],
  [/\bdeque\(/, "deque"],
  [/\bCounter\(/, "counter"],
  [/\bdefaultdict\(/, "defaultDict"],
  [/\bTreeNode\(/, "treeNode"],
  [/\bListNode\(/, "listNode"],
  [/\bNode\(/, "graphNode"],
  [/\bNestedInteger\(/, "nestedInteger"],
];

const GLOBALS: Entry[] = [
  ...BUILTINS,
  cls("TreeNode", "(val=0, left=None, right=None)", "Bundle-provided binary-tree node."),
  cls("ListNode", "(val=0, next=None)", "Bundle-provided linked-list node."),
  cls("Node", "", "Bundle-provided graph / n-ary / random-pointer node (see statement)."),
  cls("NestedInteger", "", "Bundle-provided nested-list wrapper (LC 341 API)."),
  constant("True", ""),
  constant("False", ""),
  constant("None", ""),
];

function scan(source: string): Scope {
  const scope: Scope = {
    vars: [{}],
    fields: {},
    selfMethods: [],
    imports: [],
  };
  const vars = scope.vars[0];
  const importNames = new Set<string>();
  const paramRe = /:\s*([A-Za-z_][\w.\[\]| ,]*)/g;

  for (const rawLine of source.split("\n")) {
    const line = rawLine.trim();
    let match: RegExpExecArray | null;

    match = /^from\s+([\w.]+)\s+import\s+/.exec(line);
    if (match) {
      importNames.add(match[1].split(".")[0]);
      continue;
    }
    match = /^import\s+([\w.]+(?:\s*,\s*[\w.]+)*)/.exec(line);
    if (match) {
      for (const name of match[1].split(",")) importNames.add(name.trim().split(".")[0]);
      continue;
    }
    match = /^def\s+(\w+)\s*\(([^)]*)\)/.exec(line);
    if (match) {
      const isMethod = /^\s+def\s+/.test(rawLine);
      if (isMethod && match[1] !== "__init__") scope.selfMethods.push(match[1]);
      const params = match[2];
      let paramMatch: RegExpExecArray | null;
      paramRe.lastIndex = 0;
      while ((paramMatch = paramRe.exec(params)) !== null) {
        // pair the annotation with the name that precedes it
        const before = params.slice(0, paramMatch.index);
        const nameMatch = /([A-Za-z_]\w*)\s*$/.exec(before);
        if (!nameMatch || nameMatch[1] === "self" || nameMatch[1] === "cls") continue;
        const typeId = annotationType(paramMatch[1]);
        if (typeId !== null) vars[nameMatch[1]] = typeId;
      }
      continue;
    }
    match = /^(\w+)\s*:\s*([^=#]+?)\s*(?:#.*)?$/.exec(line);
    if (match) {
      const typeId = annotationType(match[2]);
      if (typeId !== null) vars[match[1]] = typeId;
      continue;
    }
    match = /^(?:self\.)?(\w+)\s*(?::\s*([^=]+?))?\s*=\s*(.+?)(?:\s*#.*)?$/.exec(line);
    if (match && !match[3].startsWith("=")) {
      const isField = /^\s+self\./.test(rawLine);
      const rhs = match[3].trim();
      const typeId = (match[2] ? annotationType(match[2]) : null) ?? literalType(rhs);
      if (typeId !== null) {
        if (isField) scope.fields[match[1]] = typeId;
        else vars[match[1]] = typeId;
      } else if (isField) {
        scope.fields[match[1]] = "";
      }
    }
  }
  scope.imports = [...importNames];
  return scope;
}

function literalType(rhs: string): string | null {
  for (const [pattern, typeId] of TYPE_OF) {
    if (pattern.test(rhs)) return typeId || null;
  }
  return null;
}

export const python: LanguageTable = {
  id: "python",
  triggerCharacters: ["."],
  keywords: KEYWORDS,
  typeOf: TYPE_OF,
  types: TYPES,
  globals: GLOBALS,
  modules: MODULES,
  scan,
};
