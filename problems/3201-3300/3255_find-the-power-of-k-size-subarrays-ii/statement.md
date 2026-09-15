# Find the Power of K-Size Subarrays II

## Description

You are given an array of integers `nums` of length `n` and a positive
integer `k`.

The power of an array is defined as:

- Its maximum element if all of its elements are consecutive and sorted in
  ascending order.
- `-1` otherwise.

You need to find the power of all subarrays of `nums` of size `k`.

Return an integer array `results` of size `n - k + 1`, where `results[i]`
is the power of `nums[i..(i + k - 1)]`.

### Example 1

```text
Input: nums = [1,2,3,4,3,2,5], k = 3
Output: [3,4,-1,-1,-1]
Explanation: There are 5 subarrays of nums of size 3:
[1, 2, 3] with the maximum element 3.
[2, 3, 4] with the maximum element 4.
[3, 4, 3] whose elements are not consecutive.
[4, 3, 2] whose elements are not sorted.
[3, 2, 5] whose elements are not consecutive.
```

### Example 2

```text
Input: nums = [2,2,2,2,2], k = 4
Output: [-1,-1]
```

### Example 3

```text
Input: nums = [3,2,3,2,3,2], k = 2
Output: [-1,3,-1,3,-1]
```

### Constraints

- `1 <= n == nums.length <= 10⁵`
- `1 <= nums[i] <= 10⁶`
- `1 <= k <= n`

## Hints

### Hint 1

Let dp[i] denote the length of the longest subarray ending at index i that has
consecutive and sorted elements.

### Hint 2

Use a TreeMap with a sliding window to check if there are k elements in the
subarray ending at index i.

### Hint 3

If TreeMap has less than k elements and dp[i] , the subarray has power equal
to -1.

### Hint 4

Is it possible to achieve O(nums.length) using a Stack?
