import { loader } from "@monaco-editor/react";
import * as monaco from "monaco-editor";
import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
// The basic-languages bundles ship without type declarations; the Monarch
// grammar shape is all this file needs from it.
// @ts-expect-error -- untyped ESM module
import { language as pythonLanguage } from "monaco-editor/esm/vs/basic-languages/python/python.js";
// @ts-expect-error -- untyped ESM module
import { language as javaLanguage } from "monaco-editor/esm/vs/basic-languages/java/java.js";
// @ts-expect-error -- untyped ESM module
import { language as cppLanguage } from "monaco-editor/esm/vs/basic-languages/cpp/cpp.js";
// @ts-expect-error -- untyped ESM module
import { language as goLanguage } from "monaco-editor/esm/vs/basic-languages/go/go.js";
// @ts-expect-error -- untyped ESM module
import { language as rustLanguage } from "monaco-editor/esm/vs/basic-languages/rust/rust.js";
// @ts-expect-error -- untyped ESM module
import { language as typescriptLanguage } from "monaco-editor/esm/vs/basic-languages/typescript/typescript.js";
// @ts-expect-error -- untyped ESM module
import { language as javascriptLanguage } from "monaco-editor/esm/vs/basic-languages/javascript/javascript.js";
import jsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker";

self.MonacoEnvironment = {
  getWorker(_: string, label: string) {
    if (label === "json") return new jsonWorker();
    return new editorWorker();
  },
};

loader.config({ monaco });

// Blend Monaco into the app's surfaces instead of letting its default gray
// slab float inside the editor panel. Both themes carry LeetCode's palette:
// the light theme is sampled directly from its editor (purple keywords, blue
// types, tan functions), and the dark theme is the same hues with the dark
// values lifted for legibility on dark backgrounds (dark tan -> light
// yellow, dark navy -> sky blue), the way LeetCode's dark editor adapts it.
monaco.editor.defineTheme("coderpuzzle-dark", {
  base: "vs-dark",
  inherit: true,
  rules: [
    { token: "keyword", foreground: "b392f0" },
    { token: "keyword.flow", foreground: "b392f0" },
    { token: "keyword.control", foreground: "b392f0" },
    { token: "keyword.operator", foreground: "c9d1d9" },
    { token: "keyword.operator.logical", foreground: "79b8ff" },
    { token: "type.identifier", foreground: "79b8ff" },
    { token: "entity.name.type", foreground: "79b8ff" },
    { token: "support.class", foreground: "79b8ff" },
    { token: "support.type", foreground: "79b8ff" },
    { token: "keyword.type", foreground: "79b8ff" },
    { token: "entity.name.function", foreground: "dcdcaa" },
    { token: "support.function", foreground: "dcdcaa" },
    { token: "variable.language", foreground: "569cd6" },
    { token: "variable.parameter", foreground: "9cdcfe" },
    { token: "variable", foreground: "9cdcfe" },
    { token: "variable.other", foreground: "9cdcfe" },
    { token: "identifier", foreground: "9cdcfe" },
    { token: "number", foreground: "79b8ff" },
    { token: "string", foreground: "a5d6ff" },
    { token: "string.escape", foreground: "d2b8ff" },
    { token: "comment", foreground: "7ee787" },
    { token: "constant", foreground: "8b949e" },
    { token: "delimiter", foreground: "c9d1d9" },
  ],
  colors: {
    "editor.background": "#15191c",
    "editorGutter.background": "#15191c",
    "editor.lineHighlightBackground": "#1d2327",
    "editor.lineHighlightBorder": "#00000000",
    "editor.selectionBackground": "#2c3a44aa",
    "editor.inactiveSelectionBackground": "#2c3a4455",
    "editorLineNumber.foreground": "#65717b",
    "editorLineNumber.activeForeground": "#929ca5",
    "editorCursor.foreground": "#62b8ca",
    "editorIndentGuide.background": "#2b3237",
    "editorIndentGuide.activeBackground": "#3a444b",
    "editorScrollbarSlider.background": "#3a444b80",
    "editorScrollbarSlider.hoverBackground": "#46535b80",
    "editorWidget.background": "#1b2024",
    "editorWidget.border": "#3a444b",
    "editorSuggestWidget.background": "#1b2024",
    "editorSuggestWidget.selectedBackground": "#262d32",
    "editorSuggestWidget.border": "#3a444b",
    "input.background": "#1b2024",
    "input.border": "#3a444b",
  },
});

monaco.editor.defineTheme("coderpuzzle-light", {
  base: "vs",
  inherit: true,
  rules: [
    // LeetCode's light editor palette (sampled from its screenshots):
    // purple keywords, blue types, tan function names, near-black text.
    { token: "keyword", foreground: "6f42c1" },
    { token: "keyword.flow", foreground: "6f42c1" },
    { token: "keyword.control", foreground: "6f42c1" },
    { token: "keyword.operator", foreground: "24292e" },
    { token: "type.identifier", foreground: "2b6cb0" },
    { token: "entity.name.type", foreground: "2b6cb0" },
    { token: "support.class", foreground: "2b6cb0" },
    { token: "support.type", foreground: "2b6cb0" },
    { token: "keyword.type", foreground: "2b6cb0" },
    { token: "entity.name.function", foreground: "b07d62" },
    { token: "support.function", foreground: "b07d62" },
    { token: "variable.language", foreground: "0000ff" },
    { token: "variable.parameter", foreground: "001080" },
    { token: "variable", foreground: "001080" },
    { token: "variable.other", foreground: "001080" },
    { token: "identifier", foreground: "001080" },
    { token: "number", foreground: "005cc5" },
    { token: "string", foreground: "0a3069" },
    { token: "string.escape", foreground: "032f62" },
    { token: "comment", foreground: "22863a" },
    { token: "constant", foreground: "6a737d" },
    { token: "delimiter", foreground: "24292e" },
  ],
  colors: {
    "editor.background": "#f8f9fa",
    "editorGutter.background": "#f8f9fa",
    "editor.lineHighlightBackground": "#eef1f2",
    "editor.lineHighlightBorder": "#00000000",
    "editor.selectionBackground": "#cfe3e9aa",
    "editor.inactiveSelectionBackground": "#cfe3e955",
    "editorLineNumber.foreground": "#7b8891",
    "editorLineNumber.activeForeground": "#596771",
    "editorCursor.foreground": "#16738a",
    "editorIndentGuide.background": "#d8e0e4",
    "editorIndentGuide.activeBackground": "#c3ced4",
    "editorScrollbarSlider.background": "#c3ced480",
    "editorScrollbarSlider.hoverBackground": "#aab8c080",
    "editorWidget.background": "#ffffff",
    "editorWidget.border": "#c3ced4",
    "editorSuggestWidget.background": "#ffffff",
    "editorSuggestWidget.selectedBackground": "#e8edef",
    "editorSuggestWidget.border": "#c3ced4",
    "input.background": "#ffffff",
    "input.border": "#c3ced4",
  },
});

// Monaco's Monarch tokenizers label every name `identifier` and file the
// built-in type names under `keywords`, so a class name, a function name, a
// parameter, and `int` would all land on two colors. Each language's grammar
// gets four rules prepended — a type declaration, a function declaration, a
// call site, and the type-name list — which is what gives the editor the
// same distinctions LeetCode shows.
type Grammar = monaco.languages.IMonarchLanguage & {
  tokenizer: Record<string, unknown[]>;
};

function enhance(
  languageId: string,
  base: Grammar,
  options: {
    types: string[];
    typeDeclarations: string;
    functionDeclarations: string;
    selfNames?: string[];
  },
) {
  const declaration = new RegExp(
    `(${options.typeDeclarations})(\\s+)([A-Za-z_]\\w*)`,
  );
  const functionDeclaration = new RegExp(
    `(${options.functionDeclarations})(\\s+)([A-Za-z_]\\w*)`,
  );
  const grammar = {
    ...base,
    coderpuzzleTypes: options.types,
    coderpuzzleSelf: options.selfNames ?? [],
    tokenizer: {
      ...base.tokenizer,
      root: [
        [declaration, ["keyword", "white", "type.identifier"]],
        [functionDeclaration, ["keyword", "white", "entity.name.function"]],
        [
          /[a-zA-Z_]\w*(?=\s*\()/,
          {
            cases: {
              "@coderpuzzleTypes": "keyword.type",
              "@keywords": "keyword",
              "@default": "support.function",
            },
          },
        ],
        [
          /[a-zA-Z_]\w*/,
          {
            cases: {
              "@coderpuzzleTypes": "keyword.type",
              "@coderpuzzleSelf": "variable.language",
              "@keywords": "keyword",
              "@default": "identifier",
            },
          },
        ],
        ...base.tokenizer.root,
      ],
    },
  } as monaco.languages.IMonarchLanguage;
  monaco.languages.setMonarchTokensProvider(languageId, grammar);
}

// Names commonly exposed by a bundle or submission; syntax highlighting only.
const BUNDLE_API_TYPES = ["TreeNode", "ListNode", "Node", "GridMaster", "Solution"];

enhance("python", pythonLanguage as Grammar, {
  types: [
    "int", "float", "str", "bool", "bytes", "complex", "list", "tuple", "dict",
    "set", "frozenset", "object", "type", "List", "Dict", "Set", "Tuple",
    "Optional", "Iterable", "Iterator", "Sequence", "Mapping", "Any", "Union",
    "Callable", "Deque", "Counter", "DefaultDict", ...BUNDLE_API_TYPES,
  ],
  typeDeclarations: "class",
  functionDeclarations: "def",
  selfNames: ["self", "cls"],
});

enhance("java", javaLanguage as Grammar, {
  types: [
    "int", "long", "short", "byte", "char", "boolean", "float", "double",
    "void", "String", "Integer", "Long", "Double", "Boolean", "Character",
    "Object", "List", "ArrayList", "LinkedList", "Map", "HashMap", "TreeMap",
    "LinkedHashMap", "Set", "HashSet", "TreeSet", "LinkedHashSet", "Deque",
    "ArrayDeque", "Queue", "PriorityQueue", "Stack", "Arrays", "Collections",
    "Math", "StringBuilder", "Comparator", "Optional", "Iterator", "Number",
    ...BUNDLE_API_TYPES,
  ],
  typeDeclarations: "class|interface|enum|record",
  functionDeclarations: "(?!)",
  selfNames: ["this", "super"],
});

enhance("cpp", cppLanguage as Grammar, {
  types: [
    "int", "long", "short", "char", "bool", "float", "double", "void",
    "size_t", "int64_t", "int32_t", "uint64_t", "uint32_t", "string",
    "vector", "map", "unordered_map", "set", "unordered_set", "multiset",
    "pair", "tuple", "deque", "queue", "priority_queue", "stack", "array",
    "list", "unique_ptr", "shared_ptr", "function", "optional",
    ...BUNDLE_API_TYPES,
  ],
  typeDeclarations: "class|struct|union|enum",
  functionDeclarations: "(?!)",
  selfNames: ["this"],
});

enhance("go", goLanguage as Grammar, {
  types: [
    "int", "int8", "int16", "int32", "int64", "uint", "uint8", "uint16",
    "uint32", "uint64", "uintptr", "float32", "float64", "complex64",
    "complex128", "byte", "rune", "string", "bool", "error", "any",
    ...BUNDLE_API_TYPES,
  ],
  typeDeclarations: "type",
  functionDeclarations: "func",
});

enhance("typescript", typescriptLanguage as Grammar, {
  types: [
    "number", "string", "boolean", "void", "any", "unknown", "never",
    "object", "bigint", "symbol", "Array", "Map", "Set", "Promise", "Record",
    "Readonly", "Partial", "Date", "RegExp", "Math", "JSON", "BigInt",
    ...BUNDLE_API_TYPES,
  ],
  typeDeclarations: "class|interface|enum|type",
  functionDeclarations: "function",
  selfNames: ["this"],
});

enhance("javascript", javascriptLanguage as Grammar, {
  types: [
    "Array", "Map", "Set", "Promise", "Date", "RegExp", "Math", "JSON",
    "Number", "String", "Boolean", "Object", "BigInt", ...BUNDLE_API_TYPES,
  ],
  typeDeclarations: "class",
  functionDeclarations: "function",
  selfNames: ["this"],
});

enhance("rust", rustLanguage as Grammar, {
  types: [
    "i8", "i16", "i32", "i64", "i128", "isize", "u8", "u16", "u32", "u64",
    "u128", "usize", "f32", "f64", "bool", "char", "str", "String", "Vec",
    "VecDeque", "HashMap", "HashSet", "BTreeMap", "BTreeSet", "BinaryHeap",
    "Option", "Result", "Box", "Rc", "RefCell", "Ordering", "Reverse",
    ...BUNDLE_API_TYPES,
  ],
  typeDeclarations: "struct|enum|trait|impl|type",
  functionDeclarations: "fn",
  selfNames: ["self", "Self"],
});
