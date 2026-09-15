# Solutions — Rearrange String k Distance Apart

## Greedy passes over a 26-letter count table

The distance rule reads cleanest as a window statement: any `k` consecutive
positions of a valid arrangement hold `k` distinct letters, since two
equal letters inside one window sit less than `k` apart. Two consequences
follow. A letter occurring `m` times needs `(m - 1) * k + 1` positions to
spread over, so `m > (n + k - 1) // k` (the ceiling of `n / k`) rules the
string out immediately — that is the loudest infeasibility signal, but not
the whole story: `"aabb"` with `k = 3` passes the bound (`2 <= 2`) yet no
arrangement exists, because both letters demand the only pair of positions
that are 3 apart. The exact test is the window statement itself, and the
canonical turns it into a loop.

Emit passes until no letters remain: each pass takes up to `k` distinct
letters — the ones with the largest remaining counts, ties to the smaller
letter — appends them in that order, and decrements each by one. If a pass
fills fewer than `k` letters while letters would remain after it, the
remaining multiset cannot fill any window of `k` positions distinctly (and
if fewer than `k` letters remain at all, a repeat is unavoidable), so the
answer is `""`. This detection is exact in both directions: a filled pass
never breaks the rule — a letter taken at offset `j` of one pass cannot
rise above offset `j` in the next, because every letter ranked ahead of it
loses exactly one count too and keeps its tie-break edge, so consecutive
occurrences sit `k + (j' - j) >= k` apart. `k <= 1` never enters the loop:
every pair of positions already satisfies the rule, and the canonical
returns `s` unchanged.

The implementation keeps the counts in a max-heap keyed by (count
descending, letter ascending), so each pass is a bounded drain of `k` pops
followed by re-pushing the decremented survivors — only afterwards, so a
letter never repeats within its own pass. At most 26 letters ever compete,
which makes every heap operation constant work.

**Complexity:** `O(n log 26)` time, `O(n)` space — the emitted string itself
dominates the space; with a 26-letter alphabet each of the `n` emissions is
one constant-cost heap operation.
