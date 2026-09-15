# Solutions — Find Polygon With the Largest Perimeter

## Suffix Scan on Sorted Sides

A multiset of lengths forms a polygon exactly when the largest is smaller than the sum of all the others; that single inequality is necessary and sufficient for any number of sides `>= 3`. To maximize the perimeter, prefer more sides: if the full array already satisfies the condition with `nums`' maximum as the longest side, the total sum is the answer and nothing smaller can beat it. Sorting lets this be tested greedily from the top.

After sorting ascending and taking the total sum, scan candidate longest sides from the largest element down: at each step check whether the sum of everything below the current candidate exceeds the candidate (`total - nums[i] > nums[i]`); if so, the whole current prefix closes into a polygon and its sum — the largest sum considered so far — is returned immediately. If not, that largest side is hopeless (every polygon using it would need the smaller sides to outweigh it, and they cannot) and it is discarded from the running total before trying the next candidate.

Stopping the scan at index 2 guarantees at least three sides remain, satisfying the polygon's minimum side count; if no prefix of length three or more ever passes the check, the answer is `-1`. The work is a single linear pass after the sort, and sums fit comfortably in Python integers with `n` up to `10^5` and values up to `10^9`.

**Complexity:** `O(n log n)` time, `O(n)` space.
