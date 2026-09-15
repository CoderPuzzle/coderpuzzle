# Solutions — Longest Substring with At Most K Distinct Characters

Both solutions chase the same predicate — a stretch of the string in which
at most `k` distinct symbols appear — and both lean on the one structural
fact that makes windows tractable: dropping symbols from a legal stretch
can never make it illegal. One solution uses it sideways: since every
substring of a feasible window is feasible, "some window of length `L`
works" is a predicate that flips from true to false exactly once as `L`
grows — the shape a binary search feeds on — and each probe of a candidate
length costs one sweep of the string. The other uses the fact directly,
growing and shrinking a single window as its right edge walks the string,
so the answer is complete after one pass.

![Window snapshots for s = "opoqr" with k = 2: the window grows through o, op, and opo (best 3), then shrinks twice as q and r each bring in a third symbol.](figures/solution-sliding-window.svg)

## Binary Search on the Window Length

Turn the question inside out: instead of asking, for every right edge, how
far left the window can reach, ask — for a candidate length `L` — whether
_any_ stretch of `L` consecutive symbols stays within the budget. The
predicate is honest work but easy: sweep the string once with a map of
multiplicities, letting the left edge of a fixed-size window trail `L`
steps behind the right edge, and declare the length feasible the moment
some window's distinct count dips to `k` or below. That sweep is exactly
the sliding window below with the shrink pinned to one shape — the window
never varies its size, only its position.

Why binary search applies: any substring of a legal window is legal (it
uses a subset of the symbols), so if length `L` is feasible then so is
every shorter length — the predicate is true on a prefix of the length
range and false beyond it, with the answer sitting on the boundary. The
search keeps `lo` feasible and shrinks `hi`, taking the upper midpoint so
the loop drives toward the last true; a string of length `n` needs about
`log n` probes. On `s = "opoqr"` with `k = 2`: length 3 is feasible
(`"opo"` carries `{o, p}`), length 4 is not (`"opoq"` adds the third
symbol, and so does every other placement), so the boundary lands on 3.

Both edges fall out of the search itself: `lo` starts at 0, which is
feasible by definition, so `k = 0` returns 0 after every positive probe
fails; and a string whose every symbol fits inside the budget leaves
`lo` walking all the way to `n`. The added price is a logarithmic factor
over the one-pass window, with the same per-probe map never holding more
than the distinct symbols of a single `L`-window.

**Complexity:** `O(n log n)` time, `O(min(n, Σ))` space.

## Sliding window with character counts

Maintain a window `[left, right]` together with a hash map counting how many times each character occurs inside it. The right end advances one character per iteration; whenever the map grows beyond `k` distinct keys, the left end shrinks in lockstep — decrementing the count of `s[left]` and deleting the key entirely when it reaches zero — until the window is valid again. After each step the window is the longest valid one ending at `right`, so the maximum of `right - left + 1` over the whole sweep is the answer.

![Window snapshots for s = "eceba" with k = 2: the window grows through e, ec, and ece (best 3), then shrinks twice as b and a each introduce a third distinct letter.](figures/solution-sliding-window.svg)

Correctness rests on monotonicity: if a window is invalid (more than `k` distinct characters), every window containing it is invalid too, so shrinking from the left never skips a candidate; and each extension by one character can raise the distinct count by at most one, so a short bounded shrink always restores validity. Because `left` and `right` each only move forward, every character is added once and removed at most once.

Edge cases are absorbed by the loop structure: with `k = 0` the shrink loop empties the window after every extension, so the length computed is 0 and the function returns 0; a string shorter than or equal to the first valid window simply never triggers a shrink. The counts map never holds more than `k + 1` entries, since the shrink fires as soon as the `k + 1`-th distinct character appears.

**Complexity:** `O(n)` time, `O(k)` space.
