import type { Entry, LanguageTable, Scope } from "../types";
import { constant, field, fn, method, cls } from "../types";

/**
 * Curated Java surface for algorithm submissions (JDK 21): the collections
 * framework's instance methods, String/StringBuilder, the static namespaces
 * (Arrays/Collections/Math/wrapper classes/Comparator/Map.Entry), and the
 * bundle-provided node classes. Static namespaces are modeled as "modules"
 * (offered after `Arrays.`), instance APIs as types (after `list.`).
 */

const KEYWORDS = [
  "abstract", "assert", "boolean", "break", "byte", "case", "catch", "char",
  "class", "continue", "default", "do", "double", "else", "enum", "extends",
  "final", "finally", "float", "for", "if", "implements", "import",
  "instanceof", "int", "interface", "long", "native", "new", "package",
  "private", "protected", "public", "return", "short", "static", "super",
  "switch", "synchronized", "this", "throw", "throws", "transient", "try",
  "void", "volatile", "while", "record", "var", "yield", "true", "false",
  "null",
];

/** Annotation/generic text -> canonical type id ("" = primitive/no members). */
function javaTypeOf(text: string): string | null {
  let t = text.replace(/<[^<>]*>/g, "").replace(/\[\s*\]/g, "").trim();
  // generic arguments may still name a type we know: List<Map<String,Integer>>
  const first = t.split(/\s+/)[0]?.replace(/,/g, "") ?? "";
  const ids: Record<string, string> = {
    List: "list", ArrayList: "list", LinkedList: "list",
    Map: "map", HashMap: "map", TreeMap: "map", LinkedHashMap: "map",
    Set: "set", HashSet: "set", TreeSet: "set", LinkedHashSet: "set",
    Deque: "deque", ArrayDeque: "deque", Queue: "queue", PriorityQueue: "queue",
    Stack: "stack",
    String: "string", StringBuilder: "stringBuilder", CharSequence: "string",
    TreeNode: "treeNode", ListNode: "listNode", GraphNode: "graphNode", Node: "graphNode",
    Optional: "optional", Iterator: "iterator", Comparator: "comparator",
    int: "", long: "", double: "", float: "", boolean: "", char: "",
    Integer: "", Long: "", Double: "", Float: "", Boolean: "", Character: "",
    Object: "", var: "",
  };
  if (Object.prototype.hasOwnProperty.call(ids, first)) return ids[first];
  return /^[A-Z]\w*$/.test(first) ? "" : null;
}

const KEYWORD_WORDS = KEYWORDS;

const TYPES: LanguageTable["types"] = {
  string: {
    returns: {
      substring: "string", replace: "string", replaceAll: "string",
      replaceFirst: "string", toLowerCase: "string", toUpperCase: "string",
      trim: "string", strip: "string", stripLeading: "string",
      stripTrailing: "string", concat: "string", repeat: "string",
      split: "", toCharArray: "", concat2: "",
    },
    entries: [
      method("length", "() -> int", 0),
      method("charAt", "(int index) -> char", 1),
      method("substring", "(int begin[, int end]) -> String", 1, "end is exclusive."),
      method("indexOf", "(String|char[, fromIndex]) -> int", 1, "-1 when absent."),
      method("lastIndexOf", "(String|char) -> int", 1),
      method("equals", "(Object) -> boolean", 1, "Use this, never ==, for string content."),
      method("equalsIgnoreCase", "(String) -> boolean", 1),
      method("compareTo", "(String) -> int", 1),
      method("contains", "(CharSequence) -> boolean", 1),
      method("startsWith", "(String) -> boolean", 1),
      method("endsWith", "(String) -> boolean", 1),
      method("toLowerCase", "() -> String", 0),
      method("toUpperCase", "() -> String", 0),
      method("trim", "() -> String", 0),
      method("strip", "() -> String", 0, "Unicode-aware trim."),
      method("isEmpty", "() -> boolean", 0),
      method("isBlank", "() -> boolean", 0),
      method("replace", "(char|CharSequence old, new) -> String", 2),
      method("replaceAll", "(String regex, String replacement) -> String", 2),
      method("split", "(String regex) -> String[]", 1, "regex — split(\"\\\\s+\") on whitespace."),
      method("toCharArray", "() -> char[]", 0),
      method("chars", "() -> IntStream", 0),
      method("repeat", "(int count) -> String", 1),
      method("concat", "(String) -> String", 1),
      method("matches", "(String regex) -> boolean", 1),
      method("format", "(String format, Object... args) -> static String", 0),
      method("join", "(CharSequence delimiter, elements...) -> static String", 0),
      method("valueOf", "(...) -> static String", 0),
    ],
  },
  stringBuilder: {
    returns: { append: "stringBuilder", insert: "stringBuilder", toString: "string", reverse: "stringBuilder", delete: "stringBuilder" },
    entries: [
      method("append", "(any) -> StringBuilder", 1, "Accepts primitives, char[], String, Object."),
      method("insert", "(int offset, any) -> StringBuilder", 2),
      method("delete", "(int start, int end) -> StringBuilder", 2),
      method("deleteCharAt", "(int index) -> StringBuilder", 1),
      method("replace", "(int start, int end, String) -> StringBuilder", 3),
      method("reverse", "() -> StringBuilder", 0),
      method("toString", "() -> String", 0),
      method("length", "() -> int", 0),
      method("charAt", "(int index) -> char", 1),
      method("setCharAt", "(int index, char ch) -> void", 2),
      method("setLength", "(int newLength) -> void", 1),
      method("indexOf", "(String) -> int", 1),
    ],
  },
  list: {
    returns: { subList: "list", iterator: "iterator", get: "", getFirst: "", getLast: "" },
    entries: [
      method("add", "(E e) -> boolean | (int index, E e) -> void", 1, "Append (or insert at index with two args)."),
      method("get", "(int index) -> E", 1),
      method("set", "(int index, E e) -> E", 2),
      method("remove", "(int index | Object o) -> E | boolean", 1),
      method("size", "() -> int", 0),
      method("isEmpty", "() -> boolean", 0),
      method("contains", "(Object o) -> boolean", 1),
      method("clear", "() -> void", 0),
      method("indexOf", "(Object o) -> int", 1),
      method("sort", "(Comparator<? super E>) -> void", 1, "In-place; use Comparator.comparingInt(...) or (a, b) -> ..."),
      method("addAll", "(Collection<? extends E>) -> boolean", 1),
      method("removeAll", "(Collection<?>) -> boolean", 1),
      method("retainAll", "(Collection<?>) -> boolean", 1),
      method("subList", "(int fromIndex, int toIndex) -> List<E>", 2, "A view — structural changes to the view hit the list."),
      method("iterator", "() -> Iterator<E>", 0),
      method("stream", "() -> Stream<E>", 0),
      method("forEach", "(Consumer<? super E>) -> void", 1),
      method("toArray", "() -> Object[]", 0),
      method("addFirst", "(E) -> void", 1, "SequencedCollection (JDK 21)."),
      method("addLast", "(E) -> void", 1),
      method("getFirst", "() -> E", 0),
      method("getLast", "() -> E", 0),
      method("removeFirst", "() -> E", 0),
      method("removeLast", "() -> E", 0),
    ],
  },
  map: {
    returns: { keySet: "set", values: "", entrySet: "set", get: "", getOrDefault: "" },
    entries: [
      method("put", "(K key, V value) -> V", 2, "Returns the previous value (null when new)."),
      method("get", "(Object key) -> V", 1, "null when absent."),
      method("getOrDefault", "(Object key, V default) -> V", 2),
      method("containsKey", "(Object key) -> boolean", 1),
      method("containsValue", "(Object value) -> boolean", 1),
      method("remove", "(Object key) -> V", 1),
      method("keySet", "() -> Set<K>", 0),
      method("values", "() -> Collection<V>", 0),
      method("entrySet", "() -> Set<Map.Entry<K, V>>", 0, "Iterate entries: for (var e : map.entrySet())."),
      method("size", "() -> int", 0),
      method("isEmpty", "() -> boolean", 0),
      method("clear", "() -> void", 0),
      method("putIfAbsent", "(K, V) -> V", 2),
      method("computeIfAbsent", "(K, Function<K,V>) -> V", 2, "map.computeIfAbsent(key, k -> new ArrayList<>()).add(x)."),
      method("computeIfPresent", "(K, BiFunction<K,V,V>) -> V", 2),
      method("merge", "(K, V, BiFunction<V,V,V>) -> V", 3, "map.merge(key, 1, Integer::sum) counts."),
      method("replace", "(K, V) -> V", 2),
      method("forEach", "(BiConsumer<K, V>) -> void", 2),
    ],
  },
  set: {
    returns: { iterator: "iterator" },
    entries: [
      method("add", "(E e) -> boolean", 1, "false when already present."),
      method("remove", "(Object o) -> boolean", 1),
      method("contains", "(Object o) -> boolean", 1),
      method("size", "() -> int", 0),
      method("isEmpty", "() -> boolean", 0),
      method("clear", "() -> void", 0),
      method("addAll", "(Collection<? extends E>) -> boolean", 1),
      method("removeAll", "(Collection<?>) -> boolean", 1),
      method("retainAll", "(Collection<?>) -> boolean", 1),
      method("iterator", "() -> Iterator<E>", 0),
      method("stream", "() -> Stream<E>", 0),
      method("forEach", "(Consumer<? super E>) -> void", 1),
      method("toArray", "() -> Object[]", 0),
    ],
  },
  deque: {
    entries: [
      method("addLast", "(E) / offerLast(E) -> boolean", 1, "Offer returns false when full; add throws."),
      method("addFirst", "(E) / offerFirst(E) -> void|boolean", 1),
      method("pollFirst", "() -> E", 0, "Remove and return the head, null when empty."),
      method("pollLast", "() -> E", 0),
      method("peekFirst", "() -> E", 0, "Head without removing, null when empty."),
      method("peekLast", "() -> E", 0),
      method("removeFirst", "() -> E", 0, "Throws NoSuchElementException when empty."),
      method("removeLast", "() -> E", 0),
      method("getFirst", "() -> E", 0),
      method("getLast", "() -> E", 0),
      method("size", "() -> int", 0),
      method("isEmpty", "() -> boolean", 0),
      method("contains", "(Object) -> boolean", 1),
      method("push", "(E) -> void", 1, "Stack style: pushes onto the head."),
      method("pop", "() -> E", 0, "Stack style: pops the head."),
      method("peek", "() -> E", 0),
    ],
  },
  queue: {
    entries: [
      method("offer", "(E e) -> boolean", 1, "Insert; false when capacity-restricted and full."),
      method("poll", "() -> E", 0, "Remove and return the head, null when empty."),
      method("peek", "() -> E", 0, "Head without removing, null when empty."),
      method("add", "(E e) -> boolean", 1, "Throws IllegalStateException when full."),
      method("remove", "() -> E", 0, "Throws NoSuchElementException when empty."),
      method("element", "() -> E", 0),
      method("size", "() -> int", 0),
      method("isEmpty", "() -> boolean", 0),
      method("contains", "(Object) -> boolean", 1),
    ],
  },
  stack: {
    entries: [
      method("push", "(E) -> E", 1),
      method("pop", "() -> E", 0),
      method("peek", "() -> E", 0),
      method("empty", "() -> boolean", 0),
      method("search", "(Object) -> int", 1, "1-based distance from the top."),
      method("size", "() -> int", 0),
    ],
  },
  optional: {
    entries: [
      method("isPresent", "() -> boolean", 0),
      method("isEmpty", "() -> boolean", 0),
      method("get", "() -> T", 0, "Throws NoSuchElementException when empty."),
      method("orElse", "(T other) -> T", 1),
      method("orElseGet", "(Supplier<T>) -> T", 1),
      method("orElseThrow", "() -> T", 0),
      method("map", "(Function<T,U>) -> Optional<U>", 1),
      method("flatMap", "(Function<T,Optional<U>>) -> Optional<U>", 1),
      method("filter", "(Predicate<T>) -> Optional<T>", 1),
      method("ifPresent", "(Consumer<T>) -> void", 1),
      method("stream", "() -> Stream<T>", 0),
    ],
  },
  iterator: {
    entries: [
      method("hasNext", "() -> boolean", 0),
      method("next", "() -> E", 0),
      method("remove", "() -> void", 0),
    ],
  },
  comparator: {
    entries: [
      method("reversed", "() -> Comparator<T>", 0),
      method("thenComparing", "(Comparator|Function) -> Comparator<T>", 1),
      method("thenComparingInt", "(ToIntFunction) -> Comparator<T>", 1),
      method("thenComparingDouble", "(ToDoubleFunction) -> Comparator<T>", 1),
      method("thenComparingLong", "(ToLongFunction) -> Comparator<T>", 1),
    ],
  },
  treeNode: {
    entries: [
      field("val", ": int"),
      field("left", ": TreeNode"),
      field("right", ": TreeNode"),
    ],
  },
  listNode: {
    entries: [field("val", ": int"), field("next", ": ListNode")],
  },
  graphNode: {
    entries: [field("val", ": int"), field("neighbors", ": List<Node>")],
  },
};

const ARRAY_MODULE: Entry[] = [
  fn("sort", "(type[] a[, int from, int to][, Comparator]) -> void", 1, "In-place; primitive overloads and a comparator overload for objects."),
  fn("fill", "(type[] a, value) -> void", 2),
  fn("copyOf", "(type[] original, int newLength) -> type[]", 2),
  fn("copyOfRange", "(type[] a, int from, int to) -> type[]", 3),
  fn("asList", "(T... a) -> List<T>", 1, "Fixed-size view backed by the array."),
  fn("stream", "(type[] a) -> Stream", 1),
  fn("toString", "(type[] a) -> String", 1, "[1, 2, 3]; deepToString for nested arrays."),
  fn("deepToString", "(Object[] a) -> String", 1),
  fn("equals", "(type[] a, type[] b) -> boolean", 2),
  fn("deepEquals", "(Object[] a, Object[] b) -> boolean", 2),
  fn("binarySearch", "(type[] a, key) -> int", 2, "Array must be sorted."),
  fn("hashCode", "(type[] a) -> int", 1),
];

const COLLECTIONS_MODULE: Entry[] = [
  fn("sort", "(List<T>[, Comparator<? super T>]) -> void", 1),
  fn("reverse", "(List<?>) -> void", 1),
  fn("shuffle", "(List<?>) -> void", 1),
  fn("reverseOrder", "() -> Comparator<T>", 0, "Comparator.naturalOrder()'s inverse."),
  fn("min", "(Collection[, Comparator]) -> T", 1),
  fn("max", "(Collection[, Comparator]) -> T", 1),
  fn("fill", "(List, T) -> void", 2),
  fn("copy", "(List dest, List src) -> void", 2),
  fn("swap", "(List, int i, int j) -> void", 3),
  fn("frequency", "(Collection, Object) -> int", 2),
  fn("disjoint", "(Collection, Collection) -> boolean", 2),
  fn("singleton", "(T) -> Set<T>", 1),
  fn("singletonList", "(T) -> List<T>", 1),
  fn("emptyList", "() -> List<T>", 0),
  fn("emptyMap", "() -> Map<K, V>", 0),
  fn("unmodifiableList", "(List) -> List", 1),
  fn("nCopies", "(int n, T) -> List<T>", 2),
  fn("rotate", "(List, int distance) -> void", 2),
  fn("binarySearch", "(List, key[, Comparator]) -> int", 2),
];

const MATH_MODULE: Entry[] = [
  fn("abs", "(int|long|float|double) -> same", 1),
  fn("max", "(a, b) -> same", 2),
  fn("min", "(a, b) -> same", 2),
  fn("pow", "(double a, double b) -> double", 2),
  fn("sqrt", "(double) -> double", 1),
  fn("floor", "(double) -> double", 1),
  fn("ceil", "(double) -> double", 1),
  fn("round", "(float|double) -> int|long", 1, "Rounds half up."),
  fn("floorDiv", "(int, int) -> int", 2),
  fn("floorMod", "(int, int) -> int", 2, "Always non-negative for positive divisors — the % you usually want."),
  fn("addExact", "(int, int) -> int", 2, "Throws on overflow."),
  fn("multiplyExact", "(int, int) -> int", 2),
  fn("toIntExact", "(long) -> int", 1),
  constant("PI", ""),
  constant("E", ""),
];

const INTEGER_MODULE: Entry[] = [
  fn("parseInt", "(String[, int radix]) -> int", 1),
  fn("valueOf", "(int|String) -> Integer", 1),
  fn("toString", "(int[, int radix]) -> String", 1),
  fn("toBinaryString", "(int) -> String", 1),
  fn("toHexString", "(int) -> String", 1),
  fn("bitCount", "(int) -> int", 1, "Number of one-bits."),
  fn("compare", "(int, int) -> int", 2),
  fn("max", "(int, int) -> int", 2),
  fn("min", "(int, int) -> int", 2),
  fn("numberOfLeadingZeros", "(int) -> int", 1),
  fn("highestOneBit", "(int) -> int", 1),
  constant("MAX_VALUE", ""),
  constant("MIN_VALUE", ""),
];

const CHARACTER_MODULE: Entry[] = [
  fn("isDigit", "(char) -> boolean", 1),
  fn("isLetter", "(char) -> boolean", 1),
  fn("isLetterOrDigit", "(char) -> boolean", 1),
  fn("isAlphabetic", "(int) -> boolean", 1),
  fn("isLowerCase", "(char) -> boolean", 1),
  fn("isUpperCase", "(char) -> boolean", 1),
  fn("isWhitespace", "(char) -> boolean", 1),
  fn("toLowerCase", "(char) -> char", 1),
  fn("toUpperCase", "(char) -> char", 1),
  fn("getNumericValue", "(char) -> int", 1),
];

const MAP_MODULE: Entry[] = [
  fn("of", "(k1, v1, ...) -> Map<K, V>", 0, "Immutable map, up to 10 pairs; Map.ofEntries for more."),
  fn("entry", "(K, V) -> Map.Entry<K, V>", 2),
  fn("copyOf", "(Map) -> Map", 1),
];

const COMPARATOR_MODULE: Entry[] = [
  fn("comparing", "(Function<T,U> keyExtractor) -> Comparator<T>", 1),
  fn("comparingInt", "(ToIntFunction<T>) -> Comparator<T>", 1, "Comparator.comparingInt(arr -> arr[0]) — avoids boxing."),
  fn("comparingDouble", "(ToDoubleFunction<T>) -> Comparator<T>", 1),
  fn("comparingLong", "(ToLongFunction<T>) -> Comparator<T>", 1),
  fn("naturalOrder", "() -> Comparator<T>", 0),
  fn("reverseOrder", "() -> Comparator<T>", 0),
];

const MODULES: Record<string, Entry[]> = {
  Arrays: ARRAY_MODULE,
  Collections: COLLECTIONS_MODULE,
  Math: MATH_MODULE,
  Integer: INTEGER_MODULE,
  Long: [
    fn("parseLong", "(String) -> long", 1),
    fn("valueOf", "(long|String) -> Long", 1),
    fn("compare", "(long, long) -> int", 2),
    constant("MAX_VALUE", ""),
    constant("MIN_VALUE", ""),
  ],
  Double: [
    fn("parseDouble", "(String) -> double", 1),
    fn("valueOf", "(double|String) -> Double", 1),
    fn("compare", "(double, double) -> int", 2),
    fn("compare NaN-safe", "", 0),
    constant("MAX_VALUE", ""),
    constant("MIN_VALUE", ""),
  ],
  Boolean: [fn("parseBoolean", "(String) -> boolean", 1), fn("valueOf", "(boolean) -> Boolean", 1)],
  Character: CHARACTER_MODULE,
  Comparator: COMPARATOR_MODULE,
  Map: MAP_MODULE,
  Objects: [
    fn("equals", "(Object, Object) -> boolean", 2, "Null-safe equals."),
    fn("hashCode", "(Object) -> int", 1),
    fn("requireNonNull", "(Object) -> T", 1),
  ],
};

// Ordered constructor / literal patterns.
const TYPE_OF: Array<[RegExp, string]> = [
  [/^"/, "string"],
  [/^'/, ""],
  [/new\s+ArrayList\s*[<>]/, "list"],
  [/new\s+LinkedList\s*[<>]/, "list"],
  [/new\s+ArrayDeque\s*[<>]/, "deque"],
  [/new\s+PriorityQueue\s*[<>]/, "queue"],
  [/new\s+Stack\s*[<>]/, "stack"],
  [/new\s+(?:Hash|Tree|LinkedHash)Map\s*[<>]/, "map"],
  [/new\s+(?:Hash|Tree|LinkedHash)Set\s*[<>]/, "set"],
  [/new\s+StringBuilder\s*\(/, "stringBuilder"],
  [/new\s+TreeNode\s*\(/, "treeNode"],
  [/new\s+ListNode\s*\(/, "listNode"],
  [/List\.of/, "list"],
  [/Set\.of/, "set"],
  [/Map\.of/, "map"],
  [/Arrays\.asList/, "list"],
  [/Optional\.of/, "optional"],
  [/String\.join/, "string"],
  [/new\s+[A-Z]\w*\s*[<>]/, ""],
];

const GLOBALS: Entry[] = [
  fn("System.out.println", "(...) -> void", 0, "Debug output (stdout may count toward limits)."),
  cls("TreeNode", "", "Bundle-provided binary-tree node (fields val/left/right)."),
  cls("ListNode", "", "Bundle-provided linked-list node (fields val/next)."),
];

/** Split a parameter list on top-level commas (generics-aware). */
function splitParams(params: string): string[] {
  const parts: string[] = [];
  let depth = 0;
  let current = "";
  for (const ch of params) {
    if (ch === "<") depth += 1;
    else if (ch === ">") depth -= 1;
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

  for (const rawLine of source.split("\n")) {
    const line = rawLine.trim();
    let match: RegExpExecArray | null;

    match = /^import\s+(?:static\s+)?[\w.]*\.?(\w+|\*)?;/.exec(line);
    if (match) {
      if (match[1] && match[1] !== "*") scope.imports.push(match[1]);
      continue;
    }
    // method/constructor signatures: (public ...) Type name(params) {
    match = /(?:public|private|protected)?\s*[\w<>\[\], .]+\s+(\w+)\s*\(([^)]*)\)\s*\{?/.exec(line);
    if (match && /^(?:public|private|protected)/.test(line)) {
      if (!scope.selfMethods.includes(match[1])) scope.selfMethods.push(match[1]);
      for (const param of splitParams(match[2])) {
        const tokens = param.trim().split(/\s+/);
        if (tokens.length < 2) continue;
        const name = tokens[tokens.length - 1];
        const typeId = javaTypeOf(tokens.slice(0, -1).join(" "));
        if (typeId !== null && /^[A-Za-z_]\w*$/.test(name)) vars[name] = typeId;
      }
      continue;
    }
    // for-each: for (Type name : expr)
    match = /^for\s*\(\s*([\w<>\[\], .]+?)\s+(\w+)\s*:/.exec(line);
    if (match) {
      const typeId = javaTypeOf(match[1]);
      if (typeId !== null) vars[match[2]] = typeId;
      continue;
    }
    // declarations: [final] Type name = rhs;
    match = /^(?:final\s+)?([\w<>\[\], .]+?)\s+(\w+)\s*=\s*([^;]+);/.exec(line);
    if (match) {
      const typeId = javaTypeOf(match[1]) ?? literalType(match[3].trim());
      if (typeId !== null && /^[A-Za-z_]\w*$/.test(match[2])) vars[match[2]] = typeId;
      continue;
    }
    // fields: this.x = rhs;
    match = /^this\.(\w+)\s*=\s*([^;]+);/.exec(line);
    if (match) {
      scope.fields[match[1]] = literalType(match[2].trim()) ?? "";
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

export const java: LanguageTable = {
  id: "java",
  triggerCharacters: ["."],
  keywords: KEYWORD_WORDS,
  typeOf: TYPE_OF,
  types: TYPES,
  globals: GLOBALS,
  modules: MODULES,
  scan,
};
