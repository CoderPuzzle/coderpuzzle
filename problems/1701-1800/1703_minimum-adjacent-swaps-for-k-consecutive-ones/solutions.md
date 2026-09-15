# Solutions — Minimum Adjacent Swaps for K Consecutive Ones

## Sliding Window of Ones with Median Gathering

Only the positions of the `1`s matter, and an optimal solution picks `k` ones that are consecutive in that position list and gathers them around their median. The number of swaps needed to bring the chosen ones together equals the total distance each chosen one must travel, where travelling past `r` zeros costs `r` swaps. To make those costs plain, the code first compresses coordinates: with `pos` the list of one-positions, `q[i] = pos[i] - i` shifts the `i`-th one left by the number of ones before it, so in `q`-space every one costs exactly one swap per position of movement.

For a window of `k` consecutive ones starting at index `i`, the optimal meeting point is the median of their `q` values, taken at `mid = i + k // 2`. The cost of pulling the left half onto the median is `q[mid] * (mid - i) - (pref[mid] - pref[i])`, and symmetrically the right half costs `(pref[i + k] - pref[mid + 1]) - q[mid] * (i + k - 1 - mid)`, where `pref` is the prefix sum of `q`. This is the classic L1-distance-to-median formula; using the median minimizes the sum of absolute deviations.

The algorithm slides `i` from `0` to `m - k` over the `m` ones, computing each window's cost in O(1) from the prefix sums and keeping the minimum. Sliding rightward never needs to look back because the optimal group of `k` ones is contiguous in `pos` — interleaving an unchosen one between two chosen ones only adds movement. The trivial case `k <= 1` returns 0 immediately since a single one is already "consecutive".

**Complexity:** `O(n)` time, `O(n)` space.
