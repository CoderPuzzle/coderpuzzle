# Solutions — Smallest Rotation with Highest Score

## Score ranges marked in a difference array

Scoring all n rotations one by one costs O(n²), but a single element tells
you everything: value `v` at index `i` moves to index `(i - k) mod n` under
rotation `k`, and it earns its point exactly when that landing index is at
least `v`. As `k` walks from 0 to `n - 1`, the landing index walks `i`,
`i - 1`, …, `0`, then wraps to `n - 1` and descends again — so the element
scores on a contiguous range of rotations, just possibly split by the wrap.
Splitting it there gives the two cases: when `v <= i`, the element scores at
`k` in `[0, i - v]` and again at every `k` past `i`; when `v > i` it scores
only after the wrap, at `k` in `[i + 1, i + n - v]`. Contiguous ranges are
exactly what a difference array turns into totals: mark `+1` at each range's
start, `-1` just past its end, then one prefix pass reads off the score of
every rotation at once.

The marks need `n + 1` slots because a range can end at `k = n - 1`, whose
closing `-1` lands at index `n`; and the second range of the `v <= i` branch
starts at `i + 1` only when `i + 1 < n`. The constraints promise
`0 <= nums[i] < n`, so `i - v + 1` and `i + n - v + 1` always index inside
the array and every score fits comfortably in 32 bits (each is at most `n`).
The final scan prefixes the array and tracks the maximum; comparing with
strict `>` is what implements the tie rule — an equal maximum later in the
walk never displaces the earlier index, so the smallest winning `k` is
returned, exactly as Example 2 demands when every rotation scores 3.

Example 1, `[2,3,1,4,0]`: the elements' ranges are `[1,3]`, `[2,3]`,
`[0,1]` plus `[3,4]`, `[4,4]`, and `[0,4]`, and the prefix pass yields the
profile `[2,3,3,4,3]` — the maximum 4 first appears at `k = 3`, the answer.
The whole pipeline touches each element a constant number of times, and the
single auxiliary array is the difference array itself.

**Complexity:** `O(n)` time, `O(n)` space.
