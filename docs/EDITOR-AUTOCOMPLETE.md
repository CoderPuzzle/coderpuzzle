# Editor autocomplete (IntelliSense)

How the problem editor's autocomplete, hover, and parameter hints work, and
how to maintain them. The frontend owns this entirely — nothing here touches
the judge.

## Two engines

**TypeScript / JavaScript — the real language service.** Monaco's
`ts.worker` (the same engine VS Code uses for JS/TS) is wired in
`frontend/src/intellisense/tsworker.ts`: the worker is imported with vite's
`?worker` and routed by label in `MonacoEnvironment.getWorker`
(`"typescript"`/`"javascript"`). It provides completions, signature help,
hover, AND live diagnostics — deliberately lenient (strict off,
noImplicitAny off, unused-symbol codes ignored, suggestion squiggles off):
the runner's tsc gate stays authoritative, the editor flags typos and type
misuse without nagging. `checkJs` starts on for JavaScript; if real starters
show noise, flip it in `setupTypeScriptWorker()`.

Gotcha: models have extension-less in-memory URIs, and the worker picks the
script kind with `allowJs ? JS : TS`. `allowJs: true` on the **TypeScript**
defaults would parse every TS starter as JavaScript ("Type annotations can
only be used in TypeScript files") — keep `allowJs` on the JavaScript
defaults only.

The bundle-provided types (TreeNode, ListNode, GraphNode and the legacy
`Node` spellings, RandomListNode, GridMaster, ...) are declared to the
worker through `addExtraLib`, so TS/JS get completions and correct
diagnostics for them for free. There are deliberately **no curated providers
registered for ts/js** — worker + word-based suggestions only, no doubles.

**Python / Java / C++ / Go / Rust / SQL — a curated engine.** Monaco ships
no language service for these, so `frontend/src/intellisense/` implements
one from authored data tables plus light static analysis:

- `languages/<lang>.ts` — the per-language table: keywords, global
  functions/classes (`Entry`: name, kind, signature `detail`, one-line
  `doc`, optional `args` count that turns insertion into a snippet),
  per-type member tables, dotted namespaces (python `heapq`, go `sort`),
  ordered literal/constructor regexes (`typeOf`), and a `scan(source)`
  whole-file scope pass.
- `engine.ts` — on every request: a scope scan memoized per model version
  (imports, annotated/assigned locals, function parameters, `self.`/`this.`
  fields, enclosing-class methods), a bounded backward expression walk, and
  receiver resolution: literal/constructor regexes → scope variables →
  self/this fields → method-return chaining (`returns` maps, including
  wrapper ids like rust's `option:treeNode`, where `unwrap` passes the
  inner type through) → unknown receivers return empty immediately so
  Monaco's word-based suggestions stay the fallback.
- `guard.ts` — suggestions never fire inside strings/comments (the model's
  cached Monarch tokens, with a public-`tokenize` fallback) or after a
  number's decimal point.
- `register.ts` — completion/hover/signature-help providers per language;
  called once from `monaco.ts` before the first editor mounts. sql is
  completion-only.

The canonical hidden-type member spellings per language (root.val/root.left,
node.Val/node.Left, rust `borrow()` chains) live in the language tables' type
entries, keyed to the same `provided/` shapes docs/CODECS.md documents.

Editor options (`quickSuggestions`, `wordBasedSuggestions: "currentDocument"`
fallback, snippet/selection tuning) sit on the main editor only
(`App.tsx`); the read-only solutions editor never shows suggestions.

## Maintenance

- Add a method/field: one `Entry` line in the right `languages/<lang>.ts`
  table. Signatures are display strings; keep them short and idiomatic.
- Add a type: a new key in `types` plus a `typeOf` regex for its literal or
  constructor form (e.g. `new TreeMap<`, `VecDeque::`).
- Add a language: a new `languages/<lang>.ts` exporting a `LanguageTable`,
  register it in `register.ts`, and decide ts-worker-vs-curated.
- The `debug.html` harness (vite dev only, not in the built app) loads
  `monaco.ts` with per-language starter snippets and exposes
  `window.__monaco` — use it to probe providers without the API server.

## Verification

`npm run build` must pass. The worker chunk (`ts.worker-*.js`, ~1MB gz)
must appear in `dist/assets` and load lazily only on a ts/js model. Manual
cases that must hold (see the plan of record in git history for the full
list): python `x = []` → `x.` list methods; `self.` → declared fields;
`root.` on `Optional[TreeNode]` → val/left/right; nothing inside string
literals or after `1.`; java `l.` on `new ArrayList<>()` → add/get/size;
cpp `root->` → val/left/right; rust `v.` on `Vec::new()` → push/pop/iter;
ts/js member completions plus a red squiggle on a deliberate type error and
zero squiggles on untouched starters.
