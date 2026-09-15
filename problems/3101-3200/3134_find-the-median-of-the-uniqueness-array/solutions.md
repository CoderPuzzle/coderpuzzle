# Solutions — Find the Median of the Uniqueness Array

## Binary search on the answer with a sliding window

The uniqueness array has n(n+1)/2 entries but is never materialized — instead the search runs over its possible values, 1 through n. The rank target is the lower median, target_rank = (length + 1) // 2, and the answer is the smallest candidate x such that at least target_rank entries of the uniqueness array are <= x. That count is monotone in x, which is exactly what the binary search needs.

count_at_most(x) counts subarrays with at most x distinct values using a two-pointer window and a frequency map: the right end advances one element at a time, and whenever the map holds more than x keys the left end shrinks, deleting keys whose count drops to zero. Once the window is valid every subarray ending at right with start inside the window qualifies, contributing right - left + 1. Each pointer moves only forward, so the whole count is one linear pass.

The binary search converges on the least x whose cumulative count reaches the median rank; since the uniqueness array is sorted, that x is precisely the element sitting at the median position. Single-element subarrays guarantee the candidate range starts at 1, and the full array bounds it at n, so the bounds always bracket the answer.

**Complexity:** `O(n log n)` time, `O(n)` space.
