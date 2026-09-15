# Maximum Ascending Subarray Sum

## Description

Given an array of positive integers `nums`, return the maximum possible
sum of an strictly increasing subarray in `nums`.

A subarray is defined as a contiguous sequence of numbers in an array.

### Example 1

```text
Input: nums = [10,20,30,5,10,50]
Output: 65
Explanation: [5,10,50] is the ascending subarray with the maximum sum of 65.
```

### Example 2

```text
Input: nums = [10,20,30,40,50]
Output: 150
Explanation: [10,20,30,40,50] is the ascending subarray with the maximum sum of 150.
```

### Example 3

```text
Input: nums = [12,17,15,13,10,11,12]
Output: 33
Explanation: [10,11,12] is the ascending subarray with the maximum sum of 33.
```

### Constraints

- `1 <= nums.length <= 100`
- `1 <= nums[i] <= 100`

## Hints

### Hint 1

It is fast enough to check all possible subarrays

### Hint 2

The end of each ascending subarray will be the start of the next
