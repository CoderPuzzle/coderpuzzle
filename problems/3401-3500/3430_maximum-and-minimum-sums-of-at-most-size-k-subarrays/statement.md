# Maximum and Minimum Sums of at Most Size K Subarrays

## Description

You are given an integer array `nums` and a positive integer `k`. Return the sum of the maximum and minimum elements of all subarrays with at most `k` elements.

### Example 1

```text
Input: nums = [1,2,3], k = 2
Output: 20
Explanation: The subarrays of nums with at most 2 elements are:
  [1]: min 1, max 1, sum 2
  [2]: min 2, max 2, sum 4
  [3]: min 3, max 3, sum 6
  [1, 2]: min 1, max 2, sum 3
  [2, 3]: min 2, max 3, sum 5
  Final total: 2 + 4 + 6 + 3 + 5 = 20
```

### Example 2

```text
Input: nums = [1,-3,1], k = 2
Output: -6
Explanation: The subarrays of nums with at most 2 elements are:
  [1]: min 1, max 1, sum 2
  [-3]: min -3, max -3, sum -6
  [1]: min 1, max 1, sum 2
  [1, -3]: min -3, max 1, sum -2
  [-3, 1]: min -3, max 1, sum -2
  Final total: 2 + (-6) + 2 + (-2) + (-2) = -6
```

### Constraints

- `1 <= nums.length <= 80000`
- `1 <= k <= nums.length`
- `-10⁶ <= nums[i] <= 10⁶`

## Hints

### Hint 1

Use a monotonic stack to find, for each element, how many subarrays have it as the largest element.

### Hint 2

Enforce the size condition (at most k elements) when counting the subarrays.
