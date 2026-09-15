# Solutions — Subsequence With the Minimum Score

Removing scattered characters is charged only at the two extreme removed
indices, so any optimal selection widens to one contiguous block: padding
the selection never raises `right - left + 1`, and shrinking what stays
can only help `t`'s remains stay a subsequence of `s`. What is left around
the block is a prefix of `t` plus a suffix of `t`, so the whole problem
becomes a search over split points — exactly what the statement's hints
describe.

## Greedy reach from both ends plus a split sweep

Two greedy walks measure how far each flank reaches into `s`. Scanning
forward gives `pre[i]`: the earliest position in `s` where the match of
`t[:i]` can end — `-1` for the empty prefix — and this stays finite up to
some length `L`; scanning backward gives `suf[j]`: the latest position
where the match of `t[j:]` can start, finite from some index on down to
`Rsuf`. Both walks are optimal placements: if a flank fits anywhere, it
fits at its greedy anchor, because consuming the earliest possible
position never hurts whatever follows.

A deletion block `[i, j)` is feasible exactly when `pre[i] < suf[j]` —
greedy anchors ordered means every other placement orders too — and then
costs `j - i`. Since `pre` rises as `i` grows while `suf` rises as `j`
grows, the smallest feasible `j` for each `i` moves only forward, so one
descending-free pointer sweep prices all interior blocks in linear time.
Whole-tail deletion (`j = m`), whole-head deletion (`i = 0`), and the
remove-everything fallback collapse onto the same sentinels (`pre[0] = -1`,
empty suffix, score `m`), so no separate edge cases survive; when `L = m`
nothing needs removing and the answer is 0.

**Complexity:** `O(n + m)` time, `O(m)` extra space.
