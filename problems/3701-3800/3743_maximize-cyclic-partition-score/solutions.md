# Solutions — Maximize Cyclic Partition Score

## Paired-extremes scan

Every subarray contributes exactly two marked elements — its maximum and its
minimum — so a partition into m <= k subarrays produces at most 2k marks
arranged around the cycle, where each maximum adds nums[i] and each minimum
subtracts nums[i]. Marks of the two kinds alternate around that cycle, which
means they group into consecutive opposite pairs: a plus immediately followed
by a minus closes one block's top-and-bottom, and vice versa. Conversely any
such pairing realizes its value as a genuine partition score, because making
each pair one subarray and letting extra elements ride along can only widen
ranges. A pair's credit is its plus mark minus its minus mark — exactly one
subarray's range — regardless of orientation, so the problem reduces to
choosing positions and orientations of at most min(k, n / 2) pairs maximizing
the total credit.

On the linear scan there are exactly two ways the marks pair up cyclically.
In the first, every pair closes inside the array: the DP keeps j completed
pairs, a pair opened with a plus that still owes a minus, and the mirror
image, closing a pair only when the owed sign arrives. In the second, the
seam-straddling pair opens at the very first mark and closes at the very
last, while the middle marks pair among themselves; states additionally
remember whether such a wrap pair is pending (with which orientation) and,
if so, whether a middle pair is also open. Every transition either skips the
current element, opens a pair with one of the two orientations, or closes a
pending pair with the owed sign; opening the wrap pair is legal only before
anything else has been taken, and closing it ends the phase.

The budget caps at min(k, n // 2) because each pair consumes two distinct
elements. Both phases run over n elements with O(min(k, n // 2)) live states
per element, and the answer is the best finished value of either phase,
floored at 0 for the empty partition. Each pair credits less than 10^9, so
the score stays below about 5 · 10^11: fixed-width languages accumulate in
64-bit integers and the judge returns a 64-bit integer, while JavaScript
doubles hold the exact result since it stays far below 2^53.

**Complexity:** `O(n · min(k, n / 2))` time, `O(min(k, n / 2))` space.
