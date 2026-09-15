# Maximum Frequency Score of a Subarray

## Description

You are given an integer array nums and a positive integer k.

The frequency score of an array is the sum of the distinct values in the
array raised to the power of their frequencies, taking the sum modulo
10⁹ + 7.

- For example, the frequency score of the array [5,4,5,7,4,4] is (4³ + 5² +
  7¹) modulo (10⁹ + 7) = 96.

Return the maximum frequency score of a subarray of size k in nums. You
should maximize the value under the modulo and not the actual value.

A subarray is a contiguous part of an array.

### Example 1

```text
Input: nums = [1,1,1,2,1,2], k = 3
Output: 5
Explanation: The subarray [2,1,2] has a frequency score equal to 5. It can be shown that it is the maximum frequency score we can have.
```

### Example 2

```text
Input: nums = [1,1,1,1,1,1], k = 4
Output: 1
Explanation: All the subarrays of length 4 have a frequency score equal to 1.
```

### Constraints

- `1 <= k <= nums.length <= 10⁵`
- `1 <= nums[i] <= 10⁶`

## Hints

### Hint 1

Calculate the frequency score of each subarray of size k and return the maximum one.

### Hint 2

Use the sliding window technique to keep the frequency scores.
