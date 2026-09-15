# Number of Subarrays with Bounded Maximum

## Description

Given an integer array `nums` and two integers `left` and `right`, return the number of contiguous non-empty subarrays such that the value of the maximum array element in that subarray is in the range `[left, right]`.

The test cases are generated so that the answer will fit in a 32-bit integer.

### Example 1

```text
Input: nums = [2,1,4,3], left = 2, right = 3
Output: 3
Explanation: There are three subarrays that meet the requirements: [2], [2, 1], [3].
```

### Example 2

```text
Input: nums = [2,9,2,5,6], left = 2, right = 8
Output: 7
```

### Constraints

- `1 <= nums.length <= 10^5`
- `0 <= nums[i] <= 10^9`
- `0 <= left <= right <= 10^9`

## Hints

### Hint 1

Count the subarrays whose maximum is at most right, then subtract the subarrays whose maximum is at most left - 1.

### Hint 2

For an upper bound B, sweep the array keeping the length of the current run of elements <= B; each element extends that many new subarrays.

### Hint 3

An element above B resets the run to zero.
