# Solutions — Maximum Sum of Two Non-Overlapping Subarrays

Any subarray sum can be answered in O(1) once prefix sums are built, so
the search reduces to finding, for every possible position of one
window, the best sum of the other window lying entirely on one fixed
side of it. Sweeping left to right while tracking the best window of one
fixed length seen so far turns that search into a single linear pass —
but only for the relative order "that length comes first"; the mirrored
order needs its own pass, since a window sum maximized while scanning
forward for one length does not also tell you the best trailing window
of the other length.

## Prefix sums with a running best-window tracker, tried in both orders

Build a prefix-sum array over `nums` so any window sum is a difference
of two prefix values. Write a helper that, given a "leading" length `L`
and a "trailing" length `M`, sweeps every position where an `M`-length
window could end, keeping a running maximum of every `L`-length window
sum that ends at or before the start of the current `M`-length window
(so the two windows never overlap, whether they touch or leave a gap).
At each step, combine that running maximum with the current `M`-length
window's sum and keep the best total seen.

That helper only accounts for "the `L`-length window occurs before the
`M`-length window" — the array could just as well place `firstLen`
after `secondLen`, so the helper is called twice, once with
`(firstLen, secondLen)` and once with `(secondLen, firstLen)`, and the
answer is the larger of the two results. Running both orders is
essential: a solution that only tries one direction silently misses
every input where the better placement puts the second window first.

**Complexity:** `O(n)` time and `O(n)` space, where `n` is the length of
`nums`, since prefix sums and both linear sweeps are each proportional
to `n`.
