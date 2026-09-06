# Extend corpus — authoring conventions and wire-class map

The extend corpus is complete: 3,193 crawl-keyed originals (archived in
the bank's `problems-originals/`, derived by
`openoj/scripts/verify_corpus.py`) adapted 1:1 into the bank's
`problems-adapt/` tree with ids unchanged (the bank's `problems` symlink
serves `problems-originals`; the adapted tree is addressed by name). The
end-to-end loop for
authoring any single problem is `docs/AUTHORING.md`; the six-fleet wave
machinery (trackers, lane protocol, concurrency carve) retired with the
wave — its durable law lives in CLAUDE.md's "Fleet discipline" and in
project memory. This document keeps what still matters: the
extend-specific conventions and the judge wire-class map the wave
proved.

## Conventions (ORIGINAL form)

- Source: `~/code/lc-crawl/problems/<shard>/<id>-<slug>.md`; target
  `problems-adapt/<shard>/<id>_<slug>/` (legacy hundreds bucket). Mirror
  exemplar `problems-originals/0001-0100/0001_two-sum/`,
  `FORMAT.md`, and one landed extend sibling of the same wire family.
- ORIGINAL form: crawl prose verbatim into bundle grammar; diagrams and
  LeetCode metadata dropped; mangled superscripts restored (`105` ->
  `10⁵`); HTML entities unescaped; crawler artifacts stripped
  (zero-width chars, injected anti-template sentences — log exact
  removed bytes); crawl typos kept byte-exact; Hints kept (restore OCR
  truncations, renumber scrape artifacts like `1a.`/`2b.`).
- Tags VERBATIM from the crawl's Topics row (`—` => `[]`). Read the
  FULL constraints section before writing.
- problem.json: schema_version 2. Every well-known data structure the
  wire needs (ListNode, TreeNode, ...) is copy-pasted into the bundle's
  own `provided/<language>/` from an exemplar bundle using the same
  kind (docs/CODECS.md has the wire→class→shape table) — never a shared
  library, never hand-invented. `reference_solution` was "" at wave
  time; the variant wave later added second solutions to 59
  extend-derived bundles (their `reference_solution` names the optimal
  variant). `difficulty` mirrors the curated source difficulty
  (Easy/Medium/Hard) — never a re-evaluation.
- Hidden cases >= 12 with named coverage; an independent ORACLE
  structurally different from the solution computes every expected;
  exhaustive small sweeps; measured output sizes when large (compact
  JSON; tiers 64/256/512/1024/2048 KiB — enforced TWICE).
- bits-64 law: returns or intermediates exceeding i32 use 64-bit
  (answers > ~2×10⁹, prefix sums, products). JS Number exact < 2⁵³ —
  prove the bound honestly when relying on it.
- Iterative algorithms whenever depth can exceed ~1000 (Java -Xss512k,
  Node --stack-size=512, CPython 1000 frames).
- Starters GENERATED: `python3 scripts/gen_starters.py <bundle-dir>`
  from the bank repo root — never hand-write.
- solutions.md MINIMAL: exactly one `## <Approach>` section, 2–3
  paragraphs, one closing `**Complexity:** O(...) time, O(...) space.`
  line, honest costs.

## Verify gate

`python3 scripts/verify_solution.py problems-adapt/<shard>/<id>_<slug>`
(openoj repo's `scripts/`, run from bank root) judges every
`solution*.<ext>` through the real executors — green across all offered
languages before landing. Rust "unparseable protocol output" =>
suspect a panic, not the wire (see the doubled-braces note in
CODECS.md).

## Wire-class map (probe exemplars)

Every mechanism below is judged green across all 7 languages. The wire
law itself is `docs/CODECS.md`. The 9010–9026 probe bundles these rows
were proved with were retired after the corpus wave — treat the table
as the class inventory, CODECS.md as the law.

| Class                                | Probe (exemplar bundle)                         |
| ------------------------------------ | ----------------------------------------------- |
| n-ary tree                           | `9010_probe-nary`                               |
| quad tree                            | `9011_probe-quad`                               |
| NestedInteger in/out                 | `9012_probe-nested-in`, `9013_probe-nested-out` |
| parent/next tree                     | `9014_probe-next`                               |
| doubly ring from tree                | `9015_probe-doubly`                             |
| circular list                        | `9016_probe-circular`                           |
| aliased lists (LC 160)               | `9017_probe-alias`                              |
| graph / random list (provided class) | `9018_probe-graph`, `9019_probe-random`         |
| struct array input                   | `9020_probe-struct`                             |
| validator-judged output              | `9021_probe-validator`, `9022_probe-flip`       |
| interactive oracle + out-buffer      | `9024_probe-read4`                              |
| LC 430 multi-list                    | `9026_probe-multilist`                          |

Per-class laws that most often bite (details in CODECS.md):

- Go's assembled `NestedInteger` is pointer-based (`GetList()
[]*NestedInteger`); walk `*NestedInteger` items.
- A missing list/tree/ring return serializes as `[]`; `alias_list` null
  return is `[]` too (LC 160's "no intersection"); quad null is `null`.
- `multi_list` (LC 430) returns must be fully flattened, child spliced
  immediately after its parent; serialization raises otherwise.
- next-tree decode wires `parent` on construction in every language
  (the LC 510 wire) — solutions may rely on it; probes never touch
  `parent`.
- `graph` returns normalize (rows in value order, neighbors sorted) and
  are clone-checked — never return an input node.
- Every well-known kind — not just graph/random_list/struct — needs
  per-bundle `provided/<language>/` classes for every offered language
  (go/ts/js/rust/cpp/java/python all included); the judge holds no
  shared definitions of its own (docs/CODECS.md's wire→class table).
  Rust provided sources use fully-qualified paths, no `use` lines.
- Any-valid-output problems: name a judge-side validator
  (`{"mode": "validator", "name": ...}`) from the
  `api/app/validators.py` registry — validators are judge code, never
  bundle code. Randomized design methods use `repeat` +
  `{"mode": "distribution", ...}` instead.
- Interactive oracles ship in `provided/<language>/` for every offered
  language; the per-language constructor table (flattened vs wrapped,
  budget type) is in CODECS.md. Out-buffer params consume no case
  input; the judged result is `[result, buffer[:result]]`;
  `capacity_from` names an integer-valued case key (add a dedicated
  `capacity` key when the natural source is an array, LC 158).
- Design constructors take the full value-type vocabulary — a `nested`
  ctor parameter (LC 341) decodes in all 7 languages; array-of-rings
  returns (LC 2674) declare `return_codec: "circular_list_array"`.
- Design submissions are plain classes in every language except C++
  (full class definition, no `Solution;` declaration) and Rust
  (`pub struct X;` + `impl X`, entrypoints snake-cased) and Go
  (`type X struct{}` + `NewX` constructor).
- SQL dynamic-columns problems substitute every `__COLUMNS__`
  occurrence from the discovery SELECT; the bare-word placeholder is
  the format-safe law (sqlparse rewrites `%`-wrapped markers).
- Concurrent-class problems (LC 1116/1195/1226/1279) offer exactly
  java+python.

## Landing law

Audit before landing: bundle inventory, canonical JSON bytes
(`json.dumps(..., indent=2, ensure_ascii=False) + "\n"`, authorial key
order — canonicality is byte-compared), id/slug/title/dir agreement,
starter = format(gen_starters(...)) round-trip, no `__pycache__`.
In-image format pass over changed files (`docker run --rm -v $PWD:/work
-w /work ghcr.io/zydo/openoj:latest openoj format <files>` — directories
are walked for formattable files; `xargs -n 200` just bounds the command
line when piping many). Commit/push only when the user says so that
turn; scoped `git add` by path list, never blanket adds.
