# Sum of Subarray Ranges

## Description

You are given an integer array `nums`. The **range** of a subarray of `nums`
is the difference between the largest and smallest element in the subarray.

Return the sum of all subarray ranges of `nums`.

A subarray is a contiguous non-empty sequence of elements within an array.

### Example 1

```text
Input: nums = [1,2,3]
Output: 4
Explanation: The 6 subarrays of nums are the following:
[1], range = largest - smallest = 1 - 1 = 0
[2], range = 2 - 2 = 0
[3], range = 3 - 3 = 0
[1,2], range = 2 - 1 = 1
[2,3], range = 3 - 2 = 1
[1,2,3], range = 3 - 1 = 2
So the sum of all ranges is 0 + 0 + 0 + 1 + 1 + 2 = 4.
```

### Example 2

```text
Input: nums = [1,3,3]
Output: 4
Explanation: The 6 subarrays of nums are the following:
[1], range = 1 - 1 = 0
[3], range = 3 - 3 = 0
[3], range = 3 - 3 = 0
[1,3], range = 3 - 1 = 2
[3,3], range = 3 - 3 = 0
[1,3,3], range = 3 - 1 = 2
So the sum of all ranges is 0 + 0 + 0 + 2 + 0 + 2 = 4.
```

### Example 3

```text
Input: nums = [4,-2,-3,4,1]
Output: 59
Explanation: The sum of all subarray ranges of nums is 59.
```

### Constraints

- `1 <= nums.length <= 1000`
- `-10^9 <= nums[i] <= 10^9`

Follow-up: Could you find a solution with `O(n)` time complexity?

## Hints

### Hint 1

Can you get the max/min of a certain subarray by using the max/min of a smaller subarray within it?

### Hint 2

Notice that the max of the subarray from index i to j equals the max of (the max of the subarray from index i to j-1) and nums[j].

### Hint 3

For the O(n) follow-up, use monotonic stacks to compute, for each element, the sum of subarrays where it is the maximum and the sum where it is the minimum.
