# Degree of an Array

## Description

The degree of an array is the maximum frequency of any one of its elements.
Given a non-empty array of non-negative integers `nums`, return the smallest
possible length of a contiguous subarray of `nums` that has the same degree as
`nums`.

### Example 1

```text
Input: nums = [1,2,2,3,1]
Output: 2
Explanation: The input array has a degree of 2 because both elements 1 and 2
appear twice. Of the subarrays that have the same degree:
[1, 2, 2, 3, 1], [1, 2, 2, 3], [2, 2, 3, 1], [1, 2, 2], [2, 2, 3], [2, 2].
The shortest length is 2.
```

### Example 2

```text
Input: nums = [1,2,2,3,1,4,2]
Output: 6
Explanation: The degree is 3 because the element 2 is repeated 3 times.
So [2,2,3,1,4,2] is the shortest subarray of the same degree, and its length
is 6.
```

### Constraints

- `1 <= nums.length <= 5 * 10⁴`
- `0 <= nums[i] <= 49999`

## Hints

### Hint 1

Say 5 is the only element that occurs the most number of times — for example,
`nums = [1, 5, 2, 3, 5, 4, 5, 6]`. What is the answer?
