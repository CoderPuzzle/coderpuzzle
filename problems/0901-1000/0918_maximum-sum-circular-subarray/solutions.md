# Solutions — Maximum Sum Circular Subarray

## Kadane for Maximum and Minimum

A wrapping subarray omits a contiguous middle chunk, so its sum is the total minus that chunk's sum; maximizing a wrapping subarray therefore means minimizing the omitted chunk. The answer is the better of two candidates: the best ordinary, non-wrapping subarray from standard Kadane, and `total - best_min` where `best_min` is the minimum subarray sum from an inverted Kadane.

One pass computes both: `cur_max = x + max(cur_max, 0)` extends or restarts the running maximum subarray, and the symmetric `cur_min = x + min(cur_min, 0)` tracks the minimum. Initializing both with `nums[0]` and scanning from the second element keeps every candidate non-empty, which matters most for small arrays and for all-negative inputs.

That all-negative case is the one trap: if `best_max < 0`, every element is negative, the minimum subarray is the entire array, and the wrap candidate `total - best_min` degenerates to the empty subarray with sum 0, which is not allowed. The code then returns `best_max` directly — the single largest element, as in `[-3, -2, -3]` giving -2. Otherwise the answer is simply `max(best_max, total - best_min)`.

**Complexity:** `O(n)` time, `O(1)` space.
