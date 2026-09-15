# Solutions — K Divisible Elements Subarrays

## Enumerate subarrays with a hash set

With `n <= 200`, there are at most `n(n+1)/2 = 20100` subarrays, so the direct approach — enumerate, filter, deduplicate — is entirely affordable. For each left endpoint `i`, the code extends the right endpoint `j` one element at a time, maintaining a running count of elements divisible by `p` and a growing list `cur` of the subarray's elements. The moment the divisible count exceeds `k`, the inner loop breaks: appending more elements can only keep the count above the limit, so every extension past that point is invalid and there is nothing left to scan.

Distinctness is handled by inserting each valid subarray as a tuple into a set; tuples hash by content, so the two occurrences of `[2]` in the first example collapse into one entry, while subarrays of different lengths or differing at any position remain separate. The final answer is simply the size of the set — no counting logic beyond the dedup is needed.

The cost is dominated by materializing tuples: each of the up-to-`O(n^2)` valid subarrays costs its own length to copy and hash, giving a cubic worst case in total work and in the characters stored across the set — around `8 × 10^6` elementary items at `n = 200`, well within limits. The `O(n^2)` follow-up (rolling hashes or trie-based dedup) is unnecessary at these constraints.

**Complexity:** `O(n^3)` time, `O(n^3)` space.
