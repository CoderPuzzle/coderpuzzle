# Count Subarrays With Fixed Bounds

## Description

You are given an integer array `nums` and two integers `minK` and `maxK`.

A fixed-bound subarray of `nums` is a subarray that satisfies the following
conditions:

- The minimum value in the subarray is equal to `minK`.
- The maximum value in the subarray is equal to `maxK`.

Return the number of fixed-bound subarrays.

A subarray is a contiguous part of an array.

### Example 1

```text
Input: nums = [1,3,5,2,7,5], minK = 1, maxK = 5
Output: 2
Explanation: The fixed-bound subarrays are [1,3,5] and [1,3,5,2].
```

### Example 2

```text
Input: nums = [1,1,1,1], minK = 1, maxK = 1
Output: 10
Explanation: Every subarray of nums is a fixed-bound subarray. There are 10 possible subarrays.
```

### Constraints

- `2 <= nums.length <= 10^5`
- `1 <= nums[i], minK, maxK <= 10^6`

## Hints

### Hint 1

Can you solve the problem if all the numbers in the array were between minK and maxK inclusive?

### Hint 2

Think of the inclusion-exclusion principle.

### Hint 3

Divide the array into multiple subarrays such that each number in each subarray is between minK and maxK inclusive, solve the previous problem for each subarray, and sum all the answers.
