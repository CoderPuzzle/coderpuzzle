# Maximum Average Subarray II

## Description

You are given an integer array `nums` consisting of `n` elements, and an
integer `k`.

Find a contiguous subarray whose length is greater than or equal to `k` that
has the maximum average value and return this value. Any answer with a
calculation error less than `10⁻⁵` will be accepted.

### Example 1

```text
Input: nums = [1,12,-5,-6,50,3], k = 4
Output: 12.75000
Explanation:
- When the length is 4, averages are [0.5, 12.75, 10.5] and the maximum average is 12.75
- When the length is 5, averages are [10.4, 10.8] and the maximum average is 10.8
- When the length is 6, averages are [9.16667] and the maximum average is 9.16667
The maximum average is when we choose a subarray of length 4 (i.e., the subarray [12, -5, -6, 50]) which has the max average 12.75, so we return 12.75.
Note that we do not consider the subarrays of length < 4.
```

### Example 2

```text
Input: nums = [5], k = 1
Output: 5.00000
```

### Constraints

- `n == nums.length`
- `1 <= k <= n <= 10⁴`
- `-10⁴ <= nums[i] <= 10⁴`

## Hints

### Hint 1

If you knew the maximum average value m, subtracting m from every element turns the condition "average >= m" into a check on subarray sums being non-negative.

### Hint 2

Use prefix sums to test in O(n) whether any subarray of length >= k has average at least a candidate value, then binary search the answer.

### Hint 3

Track the minimum prefix sum seen so far that is at least k positions behind, so the length >= k constraint is respected.
