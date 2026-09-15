# Count Subarrays With More Ones Than Zeros

## Description

You are given a binary array `nums` containing only the integers `0` and `1`.
Return the number of subarrays in `nums` that have more `1`'s than `0`'s. Since
the answer may be very large, return it modulo `10⁹ + 7`.

A subarray is a contiguous sequence of elements within an array.

### Example 1

```text
Input: nums = [0,1,1,0,1]
Output: 9
Explanation:
The subarrays of size 1 that have more ones than zeros are: [1], [1], [1]
The subarrays of size 2 that have more ones than zeros are: [1,1]
The subarrays of size 3 that have more ones than zeros are: [0,1,1], [1,1,0], [1,0,1]
The subarrays of size 4 that have more ones than zeros are: [1,1,0,1]
The subarrays of size 5 that have more ones than zeros are: [0,1,1,0,1]
```

### Example 2

```text
Input: nums = [0]
Output: 0
Explanation: No subarrays have more ones than zeros.
```

### Example 3

```text
Input: nums = [1]
Output: 1
Explanation: The subarrays of size 1 that have more ones than zeros are: [1]
```

### Constraints

- `1 <= nums.length <= 10⁵`
- `0 <= nums[i] <= 1`

## Hints

### Hint 1

Change the zeros in `nums` to `-1` and create a prefix sum array `prefixSum`
using the new `nums`.

### Hint 2

If `prefixSum[i]` for any index `i` in the range
`0 <= i < prefixSum.length` is positive, that means that there are more ones
than zeros in the prefix ending at index `i`.

### Hint 3

If `prefixSum[j] > prefixSum[i]` for two indexes `i` and `j` such that
`0 <= i < j < prefixSum.length`, that means that there are more ones than zeros
in `nums` in the range `[i + 1 : j]` (inclusive).
