# Solutions — Missing Element in Sorted Array

## Binary Search on Missing Count

If the array had no gaps, nums[i] would equal nums[0] + i; therefore missing(i) = nums[i] − nums[0] − i counts exactly how many integers are missing from the range before nums[i]. This function is non-decreasing in i, which is what makes binary search applicable: the code looks for the first index whose missing count reaches k, because the kth missing number must lie in the gap immediately before that index.

Two cases bracket the search. If missing(n−1) < k, even the whole array does not contain k missing numbers, so the answer lies beyond the last element: nums[-1] plus the remaining k − missing(n−1) values. Otherwise the binary search runs on [0, n−1] with the predicate missing(mid) ≥ k, converging on the smallest such index lo. The kth missing number then sits in the gap after nums[lo−1]: precisely nums[lo−1] + (k − missing(lo−1)).

The predicate is strict enough that lo ≥ 1 whenever the answer is inside the array (missing(0) = 0 < k always holds), so the lo−1 access is safe, and the off-the-end case was already diverted before the search. Each probe is O(1) arithmetic.

**Complexity:** `O(log n)` time, `O(1)` space.
