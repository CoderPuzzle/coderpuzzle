# Solutions — Widest Pair of Indices With Equal Range Sum

## Prefix Difference with First-Occurrence Map

The sum over a range `[i, j]` of `nums1` equals the sum over the same range of `nums2` exactly when the difference of the two prefix sums is the same at index `i - 1` and index `j`. So the problem becomes: track the running difference `diff = prefix1 - prefix2` and, for each value it takes, remember the first index where that value appeared. Whenever the current difference repeats a previously seen value at index `i`, the span between the earlier index and `i` is a valid pair, and keeping only the _first_ occurrence of each difference value maximizes every later span that can use it.

The walk is a single pass over both arrays in lockstep. The map is seeded with `0 -> -1` so that a pair starting at index 0 (where the "previous" prefix difference is the empty prefix's value 0) is measured correctly. For each index the code adds `nums1[i] - nums2[i]` to the difference; if that value is already in the map the candidate width `i - first[diff]` updates the answer, otherwise the index is recorded as the value's first occurrence. The distance is `j - i + 1` in problem terms, which the stored indices express directly as `current_index - stored_index`.

If the two arrays are identical the difference stays 0 throughout and the answer is the full length; if the difference never repeats and is never 0 after the seed, no equal-sum range exists and the answer stays 0. Difference values are bounded by `[-n, n]`, so the hash map holds at most `O(n)` entries.

**Complexity:** `O(n)` time, `O(n)` space.
