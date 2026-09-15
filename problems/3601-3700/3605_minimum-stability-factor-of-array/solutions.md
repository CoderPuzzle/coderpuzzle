# Solutions — Minimum Stability Factor of Array

## Binary search over the target length, greedy window cover

Editing one element to `1` is the cheapest possible act: any window that
contains the edited position then has HCF exactly 1, so a single edit
silences every stable window overlapping it. The answer therefore depends
only on how many windows can be silenced per edit. The stability factor
never needs to be checked one value at a time — "can the longest stable
subarray be kept at most `k`" is monotone in `k` (making it smaller only
adds windows that must be hit), so binary search locates the minimum `k`.

To make that bound hold, every window of length `k + 1` with gcd greater
than 1 must contain an edit; once they are all hit, every longer window
contains a hit as well, because it embeds a length-`(k+1)` window. For a
fixed `k` the scan sweeps window starts left to right, and whenever an
uncovered window still has gcd > 1 it edits the window's rightmost element.
That is the classic point-cover greedy for equal-length intervals: the
rightmost edit position lies inside the maximal suffix of subsequent
windows, so it dominates any other choice inside the same window. The scan
skips every start already covered by a placed edit, making each check a
single pass.

Range gcds drive the whole search. A sparse table stores, for each power of
two `2^k`, the gcd of every run of that length; two precomputed runs tile
any query window, so each window's gcd is answered in constant time after
the `O(n log n)` table build. With that, a feasibility check costs one
linear scan, and the outer binary search over `[0, n]` multiplies it by
`O(log n)`.

**Complexity:** `O(n log n)` time, `O(n log n)` space.
