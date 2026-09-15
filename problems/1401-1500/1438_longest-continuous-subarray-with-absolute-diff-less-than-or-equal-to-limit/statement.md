# Longest Continuous Subarray With Absolute Diff Less Than or Equal to Limit

## Description

Given an array of integers `nums` and an integer `limit`, return the size of
the longest non-empty subarray such that the absolute difference between any
two elements of this subarray is less than or equal to `limit`.

### Example 1

```text
Input: nums = [8,2,4,7], limit = 4
Output: 2
Explanation: All subarrays are:
[8] with maximum absolute diff |8-8| = 0 <= 4.
[8,2] with maximum absolute diff |8-2| = 6 > 4.
[8,2,4] with maximum absolute diff |8-2| = 6 > 4.
[8,2,4,7] with maximum absolute diff |8-2| = 6 > 4.
[2] with maximum absolute diff |2-2| = 0 <= 4.
[2,4] with maximum absolute diff |2-4| = 2 <= 4.
[2,4,7] with maximum absolute diff |2-7| = 5 > 4.
[4] with maximum absolute diff |4-4| = 0 <= 4.
[4,7] with maximum absolute diff |4-7| = 3 <= 4.
[7] with maximum absolute diff |7-7| = 0 <= 4.
Therefore, the size of the longest subarray is 2.
```

### Example 2

```text
Input: nums = [10,1,2,4,7,2], limit = 5
Output: 4
Explanation: The subarray [2,4,7,2] is the longest since the maximum absolute diff is |2-7| = 5 <= 5.
```

### Example 3

```text
Input: nums = [4,2,2,2,4,4,2,2], limit = 0
Output: 3
```

### Constraints

- `1 <= nums.length <= 10^5`
- `1 <= nums[i] <= 10^9`
- `0 <= limit <= 10^9`

## Hints

### Hint 1

Use a sliding window approach, keeping the maximum and minimum value of the window in a data structure such as a multiset or two monotonic queues.

### Hint 2

Use the two pointer technique: move the right pointer as far as possible until the subarray is not valid (maxValue - minValue > limit), then move the left pointer until the subarray is valid again (maxValue - minValue <= limit). Keep repeating this process.
