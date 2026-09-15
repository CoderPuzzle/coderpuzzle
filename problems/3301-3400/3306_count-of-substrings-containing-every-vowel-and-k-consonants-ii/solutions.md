# Solutions — Count of Substrings Containing Every Vowel and K Consonants II

## Sliding window over "at least", differenced to "exactly"

Counting windows with _exactly_ k consonants directly is awkward because the
predicate is not monotone — adding a character can push the consonant count
past k and later bring it back. The trick is to count something monotone
instead: let `atLeast(c)` be the number of windows that contain all five
vowels and at least `c` consonants. Both conditions only strengthen as a
window grows, so `atLeast` is well-behaved, and every exactly-k window is in
`atLeast(k)` but not `atLeast(k + 1)`; the answer is simply
`atLeast(k) - atLeast(k + 1)`, computed with two sweeps of the same routine.

Each sweep walks a two-pointer window: for every left end `l`, extend the
right end `r` until the window first holds all five vowels (tracked as a
count of distinct vowel letters seen) and `c` consonants; then that window
and every extension of it qualify, contributing `n - r` windows for this
left end. The first qualifying `r` for each `l` never moves backwards —
dropping the leftmost character can only make the window weaker, never
stronger — so across the whole sweep each character enters and leaves the
window once and the run time stays linear. The bookkeeping is a length-5
vowel counter plus a running consonant tally; no maps or reallocation happen
inside the loop, which matters near the constraint ceiling (`|word| = 2 ×
10⁵`). The answer can reach `n(n+1)/2 ≈ 2 × 10¹⁰`, far past 32-bit range,
so it is accumulated in a 64-bit integer throughout.

In JavaScript the count stays far below 2⁵³ (`2.000005 × 10¹⁰ < 9.007 ×
10¹⁵`), so an ordinary `number` accumulates it exactly — no BigInt needed.
Every other language uses its native 64-bit integer type for the total.

**Complexity:** `O(n)` time, `O(1)` space.
