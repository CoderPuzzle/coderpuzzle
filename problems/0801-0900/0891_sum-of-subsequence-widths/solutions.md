# Solutions — Sum of Subsequence Widths

## Sorted Min/Max Contribution Counting

Enumerating the `2^n` subsequences is hopeless; instead, account for each element's role as a minimum or a maximum. A subsequence's width is its maximum minus its minimum, so the total sum equals the sum over all subsequences of their max, minus the sum over all subsequences of their min. An element's order inside a subsequence is irrelevant to its width, so sorting `nums` first loses nothing.

After sorting, `nums[i]` is the maximum of every subsequence whose other elements are chosen from the `i` positions before it — `2^i` choices — and the minimum of every subsequence whose other elements come from the `n - 1 - i` positions after it, i.e. `2^(n-1-i)` choices. Each subsequence is attributed to exactly one index as its max (its largest chosen position, which resolves ties deterministically) and one as its min, so summing `nums[i] * (2^i - 2^(n-1-i))` over all `i` counts every subsequence's width exactly once. Singleton subsequences contribute zero — the element is both max and min — and equal values are harmless because the position-based attribution never double-books a subsequence.

The powers of two are precomputed modulo `10^9 + 7` in a table, and the per-term difference of two powers may be negative before reduction, which Python's non-negative `%` repairs on the next accumulation. Sorting dominates the running time; the power table and the sorted copy are the only allocations.

**Complexity:** `O(n log n)` time, `O(n)` space.
