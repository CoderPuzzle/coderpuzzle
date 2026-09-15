# Solutions — Sum of Absolute Differences in a Sorted Array

## Prefix and Suffix Sums

Because the array is sorted, every element left of index `i` is at most `nums[i]` and every element right of it is at least `nums[i]`, so the absolute values dissolve into signed sums. The left part contributes `nums[i]·i − (sum of the first i elements)` and the right part contributes `(sum of the elements after i) − nums[i]·(n − i − 1)`.

A single left-to-right sweep maintains the running prefix sum and the grand total, so both quantities are available at each index in constant time; their sum is `result[i]`. Emitting answers as it goes, the algorithm touches each element once, in contrast to the naive `O(n²)` pairwise accumulation.

Ties (equal values) cause no trouble: the formulas are exact for non-strict ordering, since `|x − y| = 0` is counted correctly whichever side it is attributed to. Only the output array is allocated; all other state is a fixed number of scalars.

**Complexity:** `O(n)` time, `O(1)` auxiliary space (excluding the output array).
