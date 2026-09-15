# Solutions — Convert Object to JSON String

## Iterative Work-Stack Emission

Serialization runs as a depth-first walk over an explicit work stack instead
of recursive calls, because legal inputs may nest hundreds of levels deep —
far beyond what a call stack comfortably handles. The stack mixes two kinds
of jobs: raw text fragments appended verbatim, and values awaiting
rendering. Rendering a container appends its opening bracket immediately,
then parks the closing bracket followed by its children in REVERSE order with
commas interleaved — so pops replay children in index order and land on the
closer last. A rendered object pair is itself three stacked jobs (quoted key
text, colon, value), keeping `Object.keys()` order intact without any
temporary string concatenation trees.

Leaf handling follows the problem's grammar directly: strings are wrapped in
double quotes untouched (case data is alphanumeric only), numbers print their
shortest exact decimal form via `String`, and booleans plus null render as
literals. Empty containers fall out naturally — a bracket pair parks with no
children between them. Every input character survives exactly one push and
one emit, so the pass touches each token once.

**Complexity:** `O(n)` time and space for an output of `n` characters (each
input token pushes exactly one job).
