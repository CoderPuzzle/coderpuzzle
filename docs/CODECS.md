# OpenOJ data conventions

How problem data crosses the language boundary: the JSON wire format every
`cases.json` uses, the binary stream the typed executors read, the wrapper
types injected into submissions, and the special invocation protocols.
Source of truth: `runner/leetcode_codecs.py` (JSON codecs),
`runner/executors/typed.py` (binary encoder), and the per-language wrapper
templates in `runner/executors/`.

## JSON wire format (cases.json, API payloads)

Function-problem inputs are positional argument arrays in `invocation`
parameter order — `[[2,7,11,15], 9]` for `twoSum(nums, target)`.

Structured values ride as plain JSON:

| `value_type.kind`             | JSON shape                                                                                                                     |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `integer` (+`bits` 32/64)     | number                                                                                                                         |
| `number`                      | float                                                                                                                          |
| `boolean`, `string`           | as-is                                                                                                                          |
| `array` (+`items`)            | JSON array                                                                                                                     |
| `linked_list`                 | array of node values (`[1,2,4]`); `[]` is the empty list                                                                       |
| `binary_tree`                 | trimmed level-order array with `null` holes — `[3,9,20,null,null,15,7]`; trailing nulls are stripped, `[]` is the empty tree   |
| `nary_tree`                   | LeetCode display array: children groups separated by `null`, one trailing `null` per node (`[1,null,3,2,4,null,5,6]`)          |
| `next_tree`                   | binary-tree display array (`[1,2,3,4,5,6,7]`) — same trimmed level order as `binary_tree`                                      |
| `quad_tree`                   | flat preorder of `[isLeaf,val]` pairs; a non-leaf's `val` normalizes to 0; `null` is the empty tree                            |
| `nested`                      | nested arrays of integers (`[1,[4,[6]]]`); a bare integer is an integer hold                                                   |
| `circular_list`               | the ring's values read from the head (`[3,4,1]`); `[]` is the empty ring                                                       |
| `doubly_circular`             | the ring's values read from the head; `[]` is the empty ring                                                                   |
| `alias_list`                  | `{"values": [...], "splice_at": n}` — the decode splices the prefix chain onto node `n` of the aliased `linked_list` parameter |
| `multi_list`                  | `{"values": [...], "children": [...]}` — children align slot for slot, each entry `null` or a nested chain object              |
| `graph`                       | adjacency rows by node index, 0-based (`[[2,4],[1,3]]`); row i lists node i's neighbors                                        |
| `random_list`                 | rows `[val, randomIndex]`, null random as `null` (`[[7,null],[13,0]]`); index counts from the head                             |
| `struct` (+`class`, `fields`) | positional array in field order (`[1, 5, [2, 3]]`)                                                                             |

Binary trees follow the LeetCode convention: children of missing nodes are
omitted, so `null` appears only between real nodes, never after the last one.
N-ary trees (python codec `nary_tree`) serialize children groups separated by
`null`, ending with a trailing `null` per LeetCode.

Return values use the same shapes: a solution returning `ListNode*` is
compared against the expected value array, a `TreeNode*` against the expected
level-order array. A `next_tree` return is the flat LC display read through
the solution-populated `next` chain — values with one `null` marker between
adjacent levels, trailing markers trimmed (`[1,null,2,3,null,4,5,6,7]`); the
level walk advances to the first child found anywhere in the level, so
non-perfect trees (LC 117) serialize correctly. Decode wires `parent` on
construction in every language (the LC 510 wire) — solutions may rely on
it; the probes never touch `parent`, so a decode-side gap passes the probe
suite silently.

## Typed binary stream (C++ / Go / Rust / JS / TS)

Managed-language submissions would pay JSON parsing per case, so the typed
executors encode each case into a compact big-endian stream that a generated
reader (`OpenOJReader`) decodes before calling the submission:

- `integer` 32 → `int32`; `integer` 64 → `int64`; `number` → IEEE `float64`
- `boolean` → one byte `0`/`1`
- `string` → `uint32` byte length + UTF-8 bytes
- `array` → `uint32` count + items back to back
- `linked_list` → presence byte (`0` = empty), then `uint32` count + values
- `binary_tree` → `uint32` slot count + per slot (`0` | (`1` + value)) — the
  same trimmed level-order shape as JSON, `null` slots encoded as bare `0`
- `nary_tree`, `next_tree` → binary-tree slots exactly like `binary_tree`
  (children groups decoded per the display rules of each kind)
- `quad_tree` → per node: presence byte, then `isLeaf` byte + `val` byte,
  then (inner nodes only) the four subtrees preorder
- `nested` → tag `1` + `int32` (integer hold) or tag `2` + `uint32` count +
  encoded children (list hold)
- `circular_list`, `doubly_circular` → `uint32` count + values (rings decode
  closed — see the invariants below)
- `alias_list` → presence byte, `uint32` count + prefix values, then the
  `uint32` splice index
- `multi_list` → per chain: `uint32` count, then per node the value, a
  child flag byte, and the flagged child's own chain
- `graph` → `uint32` node count, then per node `uint32` degree + 0-based
  neighbor indices
- `random_list` → `uint32` count, then per node value + `uint32` random
  index (`0xFFFFFFFF` = null)
- `doubly_list` → presence byte (`0` = empty), then `uint32` count + values
- `doubly_list_node` → the same chain encoding, then one value: the target
  node's val
- `random_tree` → `uint32` slot count + per slot `0` | (`1` + value +
  `uint32` random index, `0xFFFFFFFF` = null); the index counts present
  nodes in level order from the root
- `special_tree` → `binary_tree` slots exactly (the leaf ring is the
  reader's wiring, not the wire's)
- `nary_tree_nodes` → `nary_tree` slots exactly (the node list is the
  reader's handover)
- `nary_tree_ref` → one value: the referenced node's val
- `json` (JS/TS only) → `uint32` byte length + UTF-8 compact JSON
- `struct` → field values in declaration order

The reader rejects trailing bytes (`finished()`), truncation, and — for the
JS/TS family — 64-bit inputs beyond the safe-integer range. Results flow back
as the JSON wire shapes above; the JS/TS wrappers serialize integer doubles
beyond 2^53 as exact decimal digits (see `openojSerialize` in the wrapper
templates).

## Return-serialization invariants (every language identically)

- A missing list/tree/ring return (`nullptr`, `null`, `None`) serializes as
  `[]`. The one exception is `quad_tree`, where a missing tree serializes as
  `null` (an empty preorder would be indistinguishable from garbage).
- `circular_list` / `doubly_circular` inputs decode **closed** (tail wired to
  head) — solutions always see a genuine ring. Return serialization walks the
  ring and raises "not closed" / "not properly linked" when the solution
  breaks the invariant, so an unclosed ring can never pass as `[]`.
- `multi_list` returns must be fully flattened: every `prev` back-link set
  and no `child` left anywhere; otherwise serialization raises. The LC 430
  order is: a child chain splices in immediately after its parent node.
- `graph` returns normalize: rows emit in node-value order, each row's
  neighbors sorted — adjacency order is irrelevant on LC 133. The judge also
  clone-checks: the returned graph must not alias any input node (python/java
  identity sets; the typed wrappers collect input pointers alongside).
- `random_tree` returns serialize the RETURNED tree's own level order as
  `[val, randomIndex-or-null]` rows. Two checks guard the wire: the clone
  check (no returned node may alias an input node — "shares nodes with the
  input tree") and the containment check (every random pointer must land
  inside the returned tree — "leaves the returned tree").
- `doubly_list` returns walk via `next` (bound 1<<20) and verify every
  `prev` back-link, mirroring the doubly_circular invariant on an open
  chain ("not properly linked" / "exceeds the walk bound").
- `alias_list` returns serialize the aliased segment from the returned node;
  a null return serializes as `[]` (LC 160's "no intersection").
- An array-of-rings return (LC 2674's split) declares `return_codec:
"circular_list_array"` with `return_type` an array of `circular_list`;
  each element serializes through the ring walk, in every language.

## Wrapper types and the provided-class contract

**Every well-known data structure a bundle's wire touches is that
bundle's own definition.** The judge holds no predefined data
structures of its own — no shared library is assembled into a
submission. Assembly reads exactly one well-known path,
`provided/<language>/`, and nothing else (`docs/TRUST-BOUNDARIES.md`).
This is deliberate, not an oversight: it keeps authoring simple (no
"is there already a matching structure?" search before writing one),
avoids naming collisions between bundles that use the same display
name for structurally different shapes (a singly linked `Node` in one
problem, a doubly linked `Node` in another), and keeps every language's
import/include story flat — a bundle's own `provided/` files, nothing
resolved from a repo-root package.

A wire kind or codec that needs a class names it by convention, and
the bundle must ship a matching definition in every language it
offers:

| kind / codec | required class | shape |
|---|---|---|
| `linked_list`, `list_node(_array)`, `circular_list(_array)`, `alias_list` | `ListNode` | `val`, `next` |
| `binary_tree`, `tree_node(_array)`, `special_tree` | `TreeNode` | `val`, `left`, `right` |
| `nary_tree`, `nary_tree_nodes`, `nary_tree_ref` | `Node` | `val`, `children` |
| `quad_tree` | `QuadNode` | `val`, `isLeaf`, `topLeft`, `topRight`, `bottomLeft`, `bottomRight` |
| `nested` | `NestedInteger` | `isInteger`/`getInteger`/`setInteger`/`add`/`getList` |
| `next_tree` | `NodeWithNext` | `val`, `left`, `right`, `next` (+`parent` for LC 510) |
| `doubly_circular` | `NodeWithNext` | same shape, LC 426 ring (`left`=prev, `right`=next) |
| `multi_list` | `MultiListNode` | `val`, `prev`, `next`, `child` |

Copy these shapes from an exemplar bundle that already uses the kind
(the authoring guide points at one per kind) — never hand-invent a
shape, and never share one class across two bundles. A bundle whose
wire needs a class it doesn't provide fails loudly at judge time,
naming the missing class and pointing at this table.

Java resolves each class reflectively (`Class.forName`, then
constructor/field/method reflection) against the compiled job's own
classpath — the compiled submission's classes always shadow anything
else on the path. The Python harness resolves each class from the
submission's own loaded module namespace (`getattr(module, name)`).
The five compiled/generated-wrapper languages (C++, Go, Rust,
JavaScript, TypeScript) reference every class purely by name in
generated wire-codec source, compiled or run in the same unit as
whatever the bundle's `provided/` defines — the generator itself never
emits a fallback definition.

Graph (LC 133) and random list (LC 138) nodes carry their OWN
bundle-chosen name (not a fixed convention) because their identity is
part of the LeetCode contract: every bundle that needs them names its
own class in the manifest and ships the sources in
`provided/<language>/`:

    "value_type": {"kind": "graph", "items": {"kind": "integer", "bits": 32},
                   "class": "GraphNode"}

- `class` (optional, identifier) is honored for `graph`, `random_list`,
  `doubly_list`, `doubly_list_node`, and `random_tree` in every typed
  renderer, and additionally for `special_tree` and `nary_tree` (the
  `nary_tree_nodes`/`nary_tree_ref` shapes) in Rust — the one renderer
  whose conventional node shapes (`Box` children) cannot alias, so a leaf
  ring or shared n-ary tree needs the bundle's own Rc-shared provided
  class; the raw-pointer and JS-object renderers build the ring over the
  bundle-provided `TreeNode`/`Node` directly. Renderers re-decorate around the provided
  name (`GraphNode*` in C++, `*GraphNode` in Go, `GraphNode | null` in
  TS, `Option<Rc<RefCell<GraphNode>>>` in Rust); legacy manifests without
  `class` fall back to `Node`.
- Java resolves the node type reflectively from the solution's declared
  parameter type; the python harness decodes into the classes its
  namespace carries.
- Same contract on the return side: return_codec `graph`/`random_list`
  serialize through the provided class's `neighbors` / `next`+`random`
  fields; `random_tree` through `left`/`right`/`random`.

The second wave adds four shapes built on the wire-kind vocabulary above
plus one generic value:

- `special_tree` (LC 2773) decodes an ordinary `TreeNode` display, then
  ring-wires its leaves — collected BEFORE wiring, sorted by value — with
  `leaf.left = previous leaf`, `leaf.right = next leaf`, wrap-around
  (a single leaf self-loops both ways). The statement's property
  (`v.left.right == v`) is constructed by the decoder, not encoded in
  the wire.
- `nary_tree_nodes` (LC 1506) decodes a plain n-ary display and hands the
  solution the node LIST (`std::vector<Node*>` / `[]*Node` /
  `Array<Node | null>` / `Vec<Rc<RefCell<Node>>>`) in level order — any
  order is faithful; the statement grants an arbitrary permutation.
- `nary_tree_ref` (LC 1516) carries just a value; the parameter declares
  `"alias": N` pointing at an earlier `nary_tree` parameter (validated),
  and the reader hands over THAT tree's node with the given value — shared
  identity, so mutations through it land in the aliased tree. Rust renders
  the aliased tree `Option<Rc<RefCell<Node>>>` for the same reason.
- `doubly_list_node` (LC 3294) carries `{"values": [...], "node": v}` and
  hands over the chain node whose value is `v` (values unique per the
  constraints).
- `json` (LC 2755/2759) is the generic any-shaped value: JS/TS readers
  parse the framed JSON and pass it through; the API's structural
  `exact` comparison needs no codec on the way back. Other renderers
  reject the kind at assembly time.

`struct` fields name their own provided class the same way: the struct's
`class` must exist in `provided/` (constructed positionally from the
decoded field values in every language — a C++ struct needs a matching
positional constructor). Declared field order is the positional order in
every language; Go's reader builds the composite literal positionally, so
the provided struct's field order must match the manifest exactly.

Provided Rust sources share one compilation unit with the generated
wrapper, so they use fully-qualified paths (`std::rc::Rc<...>`) and
carry no `use` lines; the submission's own `solution.rs` MAY import. The assembled Go
`NestedInteger` is pointer-based (`GetList() []*NestedInteger`, `Add`/
`SetInteger` on pointer receivers) — Go solutions walk `*NestedInteger`
items, mirroring LeetCode's own Go template.

Debugging note (Rust): a panic inside a solution reaches the protocol
through Rust's `Debug` formatting, which doubles every literal brace
(`{{`). If a verify run or the judge reports "unparseable protocol
output" for a Rust solution, suspect the panic first, not the wire.

## Design problems (`type: "design"`)

Cases carry LeetCode-style sequences instead of positional arguments:

```json
{
    "input": { "actions": ["NumArray", "update", "sumRange"], "params": [[[1, 3, 5]], [1, 2], [0, 2]] },
    "expected": [null, null, 9]
}
```

`params[0]` goes to the class constructor; each later `actions[i]` names a
method invoked with `params[i]`. The recorded output starts with `null` (the
constructor returns nothing); methods without a declared `return_type`
contribute `null` slots. Offered in all seven languages. Constructor
parameters take the full `value_type` vocabulary — a `nested` constructor
parameter (LC 341) decodes into the language's NestedInteger in every
offered language.

### Statistical judging of randomized methods

A method whose LeetCode contract is "pick uniformly at random" cannot be
compared against a single expected value, so an action may instead be
`{"call": "getRandom", "repeat": 2000}`. The harness invokes the method
that many times and reports a frequency table keyed by the canonical JSON
of each returned value (`json.dumps(value, sort_keys=True,
separators=(",", ":"))` in Python; `Json.stringify` in Java). The matching
expected slot carries the distribution:

```json
{ "mode": "distribution", "repeat": 2000, "tolerance": 0.12, "probabilities": { "1": 0.5, "2": 0.5 } }
```

The judge requires the observed total to equal `repeat`, every observed
value to be a declared key, and each bucket to land inside the wider of
`tolerance × expected` and 4.0 binomial standard deviations — a band that
a correct sampler effectively never leaves (a per-cell two-sided miss is
near 6e-5, invisible even across a 10,000-cell table) while a biased one
still fails. Buckets whose expected count falls below 10 merge into a
single tail bucket. Exact and statistical slots mix freely in one case, so
`insert`/`remove` stay exactly judged alongside a sampled `getRandom`.
Case authors should size `repeat` so each bucket expects a few hundred
draws or more.

### Multiple instances (`{"new": handle}`, `"on"`, `{"$ref": handle}`)

LeetCode's sparse-vector pair (LC 1570) constructs **two** submitted
objects and calls one with the other, so the replay can name instances:

```json
{
    "input": {
        "actions": [{"new": "v1"}, {"new": "v2"}, {"call": "dotProduct", "on": "v1"}],
        "params": [[[1, 0, 0, 2, 3]], [[0, 3, 0, 4, 0]], [{"$ref": "v2"}]]
    },
    "expected": [null, null, 8]
}
```

- `actions[0]` may be `{"new": "v1"}` instead of the class-name string:
  the params[0] instance is registered under `v1`. Both forms construct
  the primary instance; absent `"on"`, every method call targets it.
- Any later `{"new": "v2"}` action constructs another instance from that
  step's params row and records `null` (constructors return nothing).
- `{"call": "dotProduct", "on": "v1"}` dispatches on the named instance;
  the field composes with `"repeat"`.
- An argument `{"$ref": "v2"}` passes the live object itself. It is only
  valid on a parameter whose `value_type` is `{"kind": "instance"}` —
  another instance of the design class. No object ever crosses the wire:
  only the handle name does, and the language wrapper resolves it.

Duplicate handles, unknown handles in `"on"`/`$ref`, and a `$ref` marker
(or a plain value) reaching an `instance` parameter are hard errors in
every language. Existing single-instance cases are untouched — the plain
string action forms keep their meaning.

## Interactive problems (`type: "interactive"`)

The oracle ships **with the problem** in `provided/` (all seven languages),
hidden from the editor. The judge assembles it with the submission and
constructs it from the case's hidden state per `invocation.provided.oracle`:

    "provided": {"oracle": {"class": "SequenceReader",
                            "construct": ["arr"], "auxiliary": ["target"]}}

- `construct`: case keys passed to the constructor, in order; the query
  budget (`invocation.query_limit`, default 1 000 000) is appended last
- `auxiliary`: case keys passed to the solution method after the oracle,
  converted to the method's own parameter types
- a void method is judged by the oracle's `verdict()` final state

Out-buffer parameters: an interactive method may declare

    {"name": "buf", "codec": "json",
     "value_type": {"kind": "array", "items": {"kind": "string"}},
     "out_buffer": {"capacity_from": "n"}}

The harness allocates the buffer (length taken from the named case key)
and passes it in its declared position; an out-buffer parameter consumes
no case input — the LC 157/158 read4 wire. `capacity_from` must name an
integer-valued case key: when the natural source is an array (158's
queries), add a dedicated integer `capacity` key and point at it. The
judged result becomes
`[result, buffer[:result]]` (the written prefix), so the case's expected
value carries both.

Offered in all seven languages. Authoring a new interactive problem
touches only its own bundle — no judge changes. The wrapper constructs
the oracle class the bundle ships, and the constructor signature is
per-language (the budget parameter carries `query_limit`):

| Language                | Construction (one `construct` key shown)                                   | Budget type |
| ----------------------- | -------------------------------------------------------------------------- | ----------- |
| Python 3                | `File(content, budget)` — construct values flattened                       | `int`       |
| Java                    | `new File(content, budget)` — flattened                                    | `long`      |
| C++                     | `File(openoj_value_0, …, budget)` — one `OjValue` per construct key        | `long long` |
| Go                      | `NewFile([]any{content…}, budget)` — construct values wrapped in one slice | `int64`     |
| TypeScript / JavaScript | `new File([content…], budget)` — wrapped in one array                      | `number`    |
| Rust                    | `File::new(&[OjValue…], budget)` — wrapped in one slice                    | `i64`       |

C++ and Rust see generic `OjValue`s (decode with the language's helpers in
the wrapper prelude); every other language receives decoded values. A void
method is judged by the oracle's final `verdict()` state (the bundle ships
that method under the language's own casing — `Verdict()` in Go).

## Concurrency problems (`type: "concurrent"`)

LeetCode's concurrency problems hand the same object to several threads
at once. The case carries a schedule, one entry per thread:

```json
{
    "constructor": [3],
    "threads": [
        { "call": "hydrogen", "emits": "H" },
        { "call": "hydrogen", "emits": "H" },
        { "call": "oxygen", "emits": "O" }
    ]
}
```

Each entry becomes one real thread. `emits` marks the LeetCode shape
where the method receives a release callback: the harness passes a
callback that appends that token to a shared log, so the log is the
interleaving the submission actually produced. `records: true` instead
appends the call's return value when it completes. Everything else runs
for its side effects only.

The callback parameter itself is a `value_type`, with four shapes:

- `{"kind": "callback"}` — plain release callback; records the `emits`
  token of the thread that received it
- `{"kind": "callback", "event": [...]}` — composes the log entry from
  the method's own arguments: `"#0"` inserts argument 0, any other
  string verbatim (LC 1279's `carArrived(3, 1, 0, turnGreen, crossCar)`)
- `{"kind": "callback", "value": true}` — records the VALUE the solution
  passes to the callback rather than a fixed token (LC 1195's
  `printNumber(value)`) — the fizzbuzz wire
- `{"kind": "callback", "record": false}` — silent; runs the callback
  for the solution's synchronization only and records nothing

Java materializes the callback with `java.lang.reflect.Proxy`
implementing whatever interface the solution's method declares, so a
bundle may ship its own single-method interface (e.g.
`interface PrintNumber { void accept(int value); }`) — no fixed
harness-side functional type.

The invocation declares the class the way a design problem does —
`class_name`, `constructor.parameters`, `methods` — with one extra
parameter kind: `{"kind": "callback"}` is the release callback the judge
supplies, rendered as `Callable[[], None]` in the Python starter and
`Runnable` in Java. Every Java method of a concurrent class is generated
with `throws InterruptedException`, since any of them may block.

`limits.threads` tells the sandbox how many threads the schedule
spawns — threads count against the runtime process cap, which would
otherwise stop the schedule short. A schedule that deadlocks never
returns, so the case's ordinary time limit is the deadlock detector.

Because a correct concurrent program has many valid interleavings, these
cases are judged by invariant rather than by one expected order:
`multiset` comparison where only the collection of results matters, or
`{"mode": "grouped", "size": 3, "counts": {"H": 2, "O": 1}}`, which
requires every consecutive group of that size to hold exactly those
tokens. Offered in Python 3 and Java only.

## SQL judging (`type: "sql"`)

The submission file is one SELECT whose row set is the answer; each case
seeds an in-memory sqlite with `invocation.sql.schema` then the case's
setup statements. Flags on `invocation.sql`:

- `"headers": true` — the result carries column names:
  `{"columns": [...], "rows": [...]}` (expected compares both — the LC
  2884-2886 rename family). Without the flag the result is bare rows.
- `"dynamic_columns": true` — the submission may run several statements.
  Statement 1 is a discovery SELECT returning exactly one row/one column
  (a text column list); its output substitutes raw into every
  `__COLUMNS__` placeholder (default; `separator`/`placeholder` flags
  customize the split and the marker) of the remaining statements, of
  which the last is the answer SELECT (the LC 2252/2253/2889 pivot
  family). The default marker is deliberately a bare word: the pinned
  SQL formatter rewrites `%`-wrapped markers (`%COLUMNS%` becomes
  `% COLUMNS %`) but leaves name tokens byte-exact, so submissions
  survive the in-image format pass. ATTACH is denied on this path.
  Requires `comparison: "exact"` discovery hygiene — malformed
  discovery raises a runtime error, never a wrong answer.

Multi-statement submissions without `dynamic_columns` are rejected up
front. Expected rows compare through the invocation's ordinary
comparison mode (`set`/`multiset`/`exact`).

## Shell judging (`type: "shell"`)

The submission file is a bash script and nothing else — no wrapper, no
assembled bundle sources. Each case's input is the raw
text fed on stdin verbatim (no JSON envelope); the script's captured
stdout, trailing newlines stripped, is the judged value, compared under
the invocation's mode — usually

    {"type": "shell", "comparison": "exact"}

against a string expected value (stored without its trailing newline;
`echo`'s newline and `printf`'s absence both compare clean). A nonzero
exit is a runtime error carrying the last stderr lines; stdout past
`limits.output_kb` is a runtime error, not a truncation. Starters are
`starter.sh` only; solutions are `solution*.sh`.

## Validator judging (`{"mode": "validator", ...}`)

When a problem accepts many correct answers, the expected slot can name a
judge-side checker instead of one value:

    {"mode": "validator", "name": "flip_permutation"}

The registry lives in `api/app/validators.py`; an unknown name fails the
case loudly at judge time (the comparison raises, surfacing as a case
error), so a typo'd bundle is caught the first time it runs. Every
validator receives the submission's output, the case input, and optional
`params`, and answers one question — is THIS output a correct answer to
THIS input:

- `fizzbuzz` — the recorded value-callback stream is exactly the fizzbuzz
  sequence for `params.n` (LC 1195)
- `knight_tour` — a full n×n tour: every cell once, every step a legal
  knight move (LC 2664-ish tour contracts)
- `last_marked_nodes` — for every node i the answer names a node at
  maximum distance from i, the crawl's "choose any one answer"
  (input `[edges]`, LC 3313)
- `grid_layout`, `grid_paths`, `grid_k_paths`, `grid_k_paths_free` —
  grid-construction families; `params.impossible: true` (or a derived
  impossibility) accepts an explicitly declared impossible answer
- `rearrange_pair_order` — output is a permutation of the input string
  in which every `y` precedes every `x` (input `[s, x, y]`, LC 3992)
- `flip_permutation` — the recorded flip stream is a permutation of all
  m·n cells since the last reset (LC 519)

Design-problem validator slots (`flip_permutation`, `fizzbuzz`) apply to
the recorded action outputs, not a single return.

## Solution files (`solution*.<ext>`)

A bundle carries either a single canonical `solution.<ext>` per language, or
named variants `solution_<variant>.<ext>` (e.g. `solution_dfs.py`,
`solution_bfs.py`) for problems with multiple equivalent approaches. Rules
(enforced by coderpuzzle-problems' check.py):

- every language the problem offers has at least one solution file;
- the variant set is identical across languages — `dfs` in Python means
  `dfs` in Java too, with equivalent behavior;
- `problem.json`'s `reference_solution` designates the ONE reference whose
  runtime is the time-cost baseline (the canonical `solution.<ext>` when
  it is `""`, else that named variant) — it is the optimal-last approach,
  and the judge runs exactly it alongside the submission.

## Comparison modes (`invocation.comparison`)

- `exact` (default) — structural equality
- `sorted` — order-insensitive top level (any valid order passes)
- `multiset` — duplicates matter, order does not
- `set` — neither order nor duplicates matter
- `close` — per-scalar tolerance for floats: 1e-9 relative and absolute,
  recursively through nested arrays/objects; structure must still match.
  `{"mode": "close", "tolerance": …}` customizes the tolerance in the
  problem source.

Some modes live in the expected value rather than the invocation, so a
single case can mix them with exactly-judged slots:

- `{"mode": "any_of", "values": [...]}` — any listed answer passes. Used
  where LeetCode itself accepts several results, e.g. `getMaxKey` when two
  keys share the extreme count.
- `{"mode": "distribution", ...}` — statistical judging of a randomized
  method (see "Statistical judging of randomized methods" above).
- `{"mode": "validator", "name": ...}` — a judge-side checker decides
  (see "Validator judging" above).
- `{"mode": "opaque"}` — accepts any value: the slot is an intermediate
  whose format the problem deliberately leaves free.
