# Solutions — Maximum Number of Non-Overlapping Subarrays With Sum Equals Target

## Greedy prefix sum with a reset hash set

A subarray `nums[i..j]` sums to `target` exactly when `prefix[j] -
prefix[i-1] == target`, where `prefix[k]` is the running sum of the first
`k` elements and `prefix[-1] = 0`. So the algorithm walks the array once,
keeping the running prefix sum and a hash set of every prefix sum seen
since the end of the last subarray it took. At each element, if
`prefix_sum - target` is already in the set, a valid subarray ends here;
the algorithm counts it, then clears the set back to just `{0}` and
resets the running sum to `0`, so scanning effectively restarts from the
position right after the subarray just taken.

Resetting the moment a valid subarray is found, rather than waiting to
see whether extending further finds a "better" one, is what makes this
greedy choice optimal: closing off a subarray as early as possible can
only leave more room for later subarrays, never less, so no exchange
argument can improve on taking the earliest-ending candidate. Because
`nums[i]` can be negative, several disjoint or overlapping candidate
subarrays can share the same ending prefix sum, which is exactly why the
set — not a single last-seen index — is needed to detect a match in
`O(1)`; the reset after each match keeps the set from ever holding
entries from an already-claimed region.

**Complexity:** `O(n)` time, `O(n)` space.
