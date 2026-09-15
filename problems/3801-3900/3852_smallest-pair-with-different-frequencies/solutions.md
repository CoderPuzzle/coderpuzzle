# Solutions — Smallest Pair With Different Frequencies

## Frequency map, then one scan past the smallest value

Counting frequencies first turns the pair search into a question about
distinct values only: build `freq` in one pass over `nums`, then work with
the sorted list of distinct values. The decisive observation is that the
answer's `x` is never in doubt — it is always the smallest distinct value
`v`, whenever a valid pair exists at all. If some larger value differed in
frequency from `v`, then `(v, that value)` is a valid pair with the
smallest possible `x`. If no larger value differed, every value in `nums`
would share `freq[v]`, so no pair anywhere has different frequencies and
the answer is `[-1, -1]` anyway.

With `x` pinned to `v`, the tie-break collapses to a single scan: walk the
distinct values in increasing order and return `[v, y]` at the first `y`
above `v` whose frequency differs from `freq[v]` — that is the smallest
qualifying `y`, matching Example 1, where 1 appears twice and the first
value with another frequency is 3. If the walk exhausts, every value
shares `freq[v]` and the method returns `[-1, -1]`, as in Examples 2 and 3. No nested pair enumeration is ever needed.

Everything stays tiny: values are bounded by 100 and so are frequencies
and both returned components, so 32-bit integers carry the whole
computation and JavaScript's numbers hold every value exactly, far inside
`2⁵³`.

**Complexity:** `O(n + d log d)` time, `O(d)` space, where `d` is the
number of distinct values (`d <= n <= 100`).
