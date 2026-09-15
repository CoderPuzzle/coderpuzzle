# Solutions — Divide an Array Into Subarrays With Minimum Cost II

## Sliding window with dual Fenwick trees

The first subarray always contributes `nums[0]`. If the second subarray starts at `i1`, every later subarray start `i2, ..., i_{k-1}` must land in `[i1+1, i1+dist]` — they are increasing indices and the last one is at most `dist` past `i1` — and conversely any `k-2` distinct positions in that range are valid starts. So for each `i1` the problem reduces to summing the `k-2` smallest values in the window `nums[i1+1 .. i1+dist]`.

Slide that window left to right and maintain its multiset with two Fenwick trees over the coordinate-compressed values: one tree stores how many window elements have each value, the other stores their sum. The sum of the `k-2` smallest is obtained by binary lifting on the count tree down to the `(k-2)`-th smallest value, taking count/sum prefix queries below it plus a partial count times that value.

For each `i1` from 1 to `n-1`, if the window holds at least `k-2` elements, candidate answer `nums[0] + nums[i1] + sum_k_smallest(k-2)` updates the minimum; then the window slides by removing `nums[i1+1]` and inserting `nums[i1+1+dist]`, each a couple of O(log n) tree updates. The initial window for `i1 = 1` is seeded before the loop. Coordinate compression keeps the trees small even with values up to 10^9, and duplicate values are handled naturally since the trees count occurrences.

**Complexity:** `O(n log n)` time, `O(n)` space.
