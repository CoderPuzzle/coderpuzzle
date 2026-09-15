# Solutions — Subsequences with a Unique Middle Mode II

Fix the middle element first: sweep `i` left to right and count, for
`v = nums[i]`, the size-5 subsequences whose third index is exactly `i`.
The two other left picks come from the prefix before `i` and the two
right picks from the suffix after it, so with `l` and `r` counting `v` on
each side, every case reduces to binomials in `l`, `r`, `NL = i - l`,
`NR = n - 1 - i - r`, summed over `i` — no enumeration of
subsequences anywhere.

## Classify by the middle value's frequency, sweep with power-sum aggregates

Group the picks by `f`, how often `v` occurs in the five chosen values.
When `f >= 3` the remaining `5 - f` picks are free: no other value can
reach `f`, so those cases are plain binomial products (`f = 5, 4, 3`).
`f = 1` never works — four other values each appear at least once and
`v` does not strictly beat a count of 1. Only `f = 2` needs care: the
three non-`v` fills must be pairwise distinct, and counting the fill
combinations where some other value repeats is an inclusion-exclusion
over "the two same-side fills share a value" versus "the opposite-side
fill equals a same-side fill"; the both-`w` overlap of the two events
cancels inside `|A ∪ B| = |A| + |B| − |A ∩ B|` exactly. Each correction
term is a sum over all other values `w` of a polynomial in `w`'s left
count `lw` and right count `rw`.

Those per-value sums are the cost center: re-deriving them per middle
would be quadratic. Instead maintain six aggregates over the left counts
— `Σlw`, `Σlw²`, `Σlw³`, `Σlw·cnt`, `Σlw·cnt²`, `Σlw²·cnt` — each an
O(1) update when `nums[i]` joins the left side, plus the static
`Σcnt²`. Since `rw = cnt − lw`, every needed sum (including the
exclusion of `v` itself, whose moment right-count still contains the
middle element — hence an `(r + 1)²` correction) factors back into these
aggregates by expansion. All aggregate arithmetic stays on exact
integers bounded by `n³ ≤ 10¹⁵`: comfortably inside `int64`, and inside
JavaScript's `2⁵³` too, with the final binomial products reduced through
a lossless 15-bit-split modular multiply. Modulo `10⁹ + 7` applies only
to the assembled per-middle total.

**Complexity:** `O(n)` time, `O(n)` space.
