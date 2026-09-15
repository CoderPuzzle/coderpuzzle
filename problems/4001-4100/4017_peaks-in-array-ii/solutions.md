# Solutions — Peaks in Array II

## Peak Gaps and Range Counting

Count each peak subarray through its leftmost interior peak. If the peaks
strictly inside `[l, r]` are `a = p1 < p2 < ... < pt = b`, a subarray whose
leftmost peak is `pi` starts at any `i'` from `max(l, prev(pi))` through
`p_i - 1` — starting exactly on the previous peak is allowed, since that
peak then sits on the boundary rather than strictly inside — and ends at any
`j'` from `p_i + 1` through `r`, so its contribution is
`(p - max(l, prev(p))) * (r - p)`. Because consecutive peaks inside the
range are also consecutive globally, the total telescopes: with
`value[p] = p * (p - prev(p))` kept in a Fenwick tree (`prev` global, 0 when
the peak has no predecessor), the raw sum over the range equals
`r * (b - q) - W` with `q = prev(a)` and `W` the tree sum over `[a, b]`, and
subtracting the first-peak correction `(r - a) * (l - q)` collapses to the
closed form `r * (b - l) - W + a * (l - q)` — exact whenever `q <= l`, which
always holds, because a predecessor above `l` would itself be an earlier
peak inside the range. A query is therefore two predecessor/successor lookups
plus one range sum, and 0 when no peak lies strictly inside.

An assignment `nums[index] = val` only changes comparisons that read cell
`index`, so only positions `index - 1`, `index`, and `index + 1` can change
peak status; the solution re-evaluates those three candidates before and
after the write, removes the ones that stopped being peaks, inserts the ones
that became peaks, and repairs the single affected neighbour link per flip.
The ordered set is a native balanced tree where the language ships one
(`std::set`, `TreeSet`, `BTreeSet`) and otherwise an implicit one: a second
Fenwick tree of 0/1 counts whose prefix sums locate predecessors and
successors by descending the tree (Go, JavaScript, TypeScript), or a sorted
list kept ordered by binary search insertion (Python). Every flip touches
two Fenwick cells of `value` plus at most one neighbour repair, all
logarithmic.

Widths matter here. Answers count subarrays, reaching about `n^2 / 2` near
`5 * 10^9` at `n = 10^5`, past the 32-bit range; Fenwick cells hold
`p * (p - prev(p))` whose range sum telescopes below `b^2 <= 10^10`; and
products like `r * (b - l)` stay under `10^10`. Everything fits comfortably
in signed 64-bit, return elements are 64-bit, and all intermediates stay far
below `2^53`, so JavaScript's doubles are exact throughout.

**Complexity:** `O((n + q) log n)` time, `O(n)` space.
