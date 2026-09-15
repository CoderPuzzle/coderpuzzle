# Maximum and Minimum Sums of at Most Size K Subsequences

## Description

You are given an integer array nums and a positive integer k. Return the sum
of the maximum and minimum elements of all subsequences of nums with at most
k elements.

Since the answer may be very large, return it modulo 10⁹ + 7.

### Example 1

```text
Input: nums = [1,2,3], k = 2
Output: 24
Explanation: The subsequences of nums with at most 2 elements are:
[1]: minimum 1, maximum 1, sum 2
[2]: minimum 2, maximum 2, sum 4
[3]: minimum 3, maximum 3, sum 6
[1, 2]: minimum 1, maximum 2, sum 3
[1, 3]: minimum 1, maximum 3, sum 4
[2, 3]: minimum 2, maximum 3, sum 5
Final Total: 24
The output would be 24.
```

### Example 2

```text
Input: nums = [5,0,6], k = 1
Output: 22
Explanation: For subsequences with exactly 1 element, the minimum and maximum
values are the element itself. Therefore, the total is 5 + 5 + 0 + 0 + 6 +
6 = 22.
```

### Example 3

```text
Input: nums = [1,1,1], k = 2
Output: 12
Explanation: The subsequences [1, 1] and [1] each appear 3 times. For all of
them, the minimum and maximum are both 1. Thus, the total is 12.
```

### Constraints

- `1 <= nums.length <= 10⁵`
- `0 <= nums[i] <= 10⁹`
- `1 <= k <= min(70, nums.length)`

## Hints

### Hint 1

Sort the array.
