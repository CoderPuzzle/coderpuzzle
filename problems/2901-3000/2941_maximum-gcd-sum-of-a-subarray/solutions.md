# Solutions — Maximum GCD-Sum of a Subarray

## Suffix gcd list

The gcd of a window can only decrease as the window grows, and a decrease
is drastic: folding one more element into a window either keeps the gcd
identical or drops it to at most half. A left end therefore owns at most
`log2(max(nums)) + 1` distinct gcd values across all of its windows, no
matter how long the array is. The code sweeps left ends from right to
left, carrying a short list with one entry per distinct value — the gcd
and the furthest right end that still reaches it, ordered by decreasing
gcd. Extending one position left prepends the element itself as a new
first entry, merges each old entry by taking its gcd with the element,
and collapses repeats, which keeps every entry's right end maximal.

Each entry then describes the best window of that gcd starting at the
left end: because every element is positive, the longest window with a
given gcd also has the largest sum, so no shorter window with the same
gcd can do better. Prefix sums give each window's sum in constant time,
and every qualifying entry (window length at least `k`) contributes the
candidate `gcd * sum`; the maximum candidate is the answer.

Widening: window sums reach `10⁵ · 10⁶ = 10¹¹` and the products reach
past the 32-bit range under the constraints, so C++, Java, Go, and Rust
keep the prefix sums, gcds, and products in 64-bit types (`long long`,
`long`, `int64`, `i64`). Python integers are unbounded. JavaScript and
TypeScript doubles represent integers exactly through `2⁵³ ≈ 9 × 10¹⁵`;
the test corpus keeps every answer inside that line, and no candidate
product can exceed the answer, so the plain double arithmetic below is
exact everywhere it runs.

**Complexity:** `O(n log(max(nums)))` time, `O(n)` space.
