# Number of Subarrays With LCM Equal to K

## Description

Given an integer array nums and an integer k, return the number of
subarrays of nums where the least common multiple of the subarray's
elements is k.

A subarray is a contiguous non-empty sequence of elements within an
array.

The least common multiple of an array is the smallest positive integer
that is divisible by all the array elements.

### Example 1

```text
Input: nums = [3,6,2,7,1], k = 6
Output: 4
Explanation: The subarrays of nums where 6 is the least common multiple of all the subarray's elements are:
- [3,6,2,7,1]
- [3,6,2,7,1]
- [3,6,2,7,1]
- [3,6,2,7,1]
```

### Example 2

```text
Input: nums = [3], k = 2
Output: 0
Explanation: There are no subarrays of nums where 2 is the least common multiple of all the subarray's elements.
```

### Constraints

- `1 <= nums.length <= 1000`
- `1 <= nums[i], k <= 1000`

## Hints

### Hint 1

The constraints on nums.length are small. It is possible to check every subarray.

### Hint 2

To calculate LCM, you can use a built-in function or the formula lcm(a, b) = a * b / gcd(a, b).

### Hint 3

As you calculate the LCM of more numbers, it can only become greater. Once it becomes greater than k, you know that any larger subarrays containing all the current elements will not work.
