# Solutions — Number of Centered Subarrays

## Left-anchored sweep with a value counter

A window's centered test asks two things about the same range: its sum, and
whether that sum occurs among its values. Fixing the left end and growing
the right makes both incremental — extending by one element adds a single
term to a running total and a single entry to a counter of the values
currently inside the window. After each extension the counter answers the
membership question (is the running total a value the window holds?) in
constant time, so one anchored sweep decides every window that starts at
`i`, and `n` sweeps decide them all.

Single-element windows need no special case: their total is exactly the
element just added, so the counter always contains it and every
one-element subarray is centered — the answer is never below `n`. Each
pair of endpoints is visited exactly once across the two loops, so the
count accumulates as a plain enumeration of all `n(n+1)/2` windows, each
judged once.

Every accumulator stays inside 32 bits. At most 500 elements of magnitude
at most `10⁵` bound the running total by `5 × 10⁷`, and there are at
most `500 · 501 / 2 = 125,250` windows to count, so the fixed-width
languages carry the sums and the answer in plain `int`, while
JavaScript's doubles hold every integer involved exactly, far inside
`2⁵³`.

**Complexity:** `O(n²)` time, `O(n)` space.
