# Solutions — Range Sum of Sorted Subarray Sums

## Generate, sort, sum the window

With `n` at most 1000 there are only `n * (n + 1) / 2` subarrays — at most
500500 — so the whole sorted array the statement describes can simply be
built and sliced directly. For each start index `i` the code walks the end
index `j` from `i` to `n - 1`, keeping a running sum that gains `nums[j]`
at every step; that running sum is exactly the sum of `nums[i..j]`, so each
of the `O(n^2)` subarrays is priced in `O(1)` amortized work instead of
being re-summed from scratch.

Once every subarray sum has been collected, sorting the list reproduces
the statement's "new array" verbatim, and `left`/`right` become ordinary
1-indexed bounds into it. The answer accumulates those elements modulo
`10^9 + 7` as it goes — the reduction is taken after every addition rather
than once at the end, since the raw running total (up to roughly
`500500 * 100000`) comfortably overflows a 32-bit accumulator even though
no single subarray sum does, so the accumulator itself must be 64-bit.

**Complexity:** `O(n^2 log n)` time (subarray generation is `O(n^2)`,
dominated by sorting that many sums), `O(n^2)` space for the sum array.
