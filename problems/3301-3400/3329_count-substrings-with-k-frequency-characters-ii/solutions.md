# Solutions — Count Substrings With K-Frequency Characters II

## Minimal-window two pointers

Validity is monotone in both directions: widening a window can only help,
and if `[l, j]` contains some character k times then so does every
`[l, j']` with `j' > j`. So for each left end l there is a minimal valid
right end f(l), every end from f(l) through n - 1 contributes a valid
substring, and f is non-decreasing as l grows — exactly the shape a
sliding window consumes in linear time. For each l the window `[l, r)`
expands only while no character has reached count k; the first end that
satisfies some character is r - 1, contributing `n - (r - 1)` substrings.
If the window exhausts the string without ever reaching count k, no later
left end can succeed either and the scan stops.

A `sat` counter (how many of the 26 characters are currently at count ≥
k) makes both transitions O(1): the extend loop bumps it when a count
hits exactly k, and the shrink step lowers it when the leaving character
was the only one at k. Because each of r and l only ever moves forward,
the whole pass is linear; the answer is at most `n(n + 1) / 2 ≤ 4.5 ×
10¹⁰` for the crawl's `n ≤ 3 × 10⁵`, so 64-bit accumulators are required
(and double-precision integers stay exact, far below 2⁵³).

**Complexity:** `O(n)` time, `O(1)` space.
