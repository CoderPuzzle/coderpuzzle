# Count Subarrays With Cost Less Than or Equal to K

## Description

You are given an integer array nums, and an integer k.

For any subarray nums[l..r], define its cost as:

cost = (max(nums[l..r]) - min(nums[l..r])) * (r - l + 1).

Return an integer denoting the number of subarrays of nums whose cost is less
than or equal to k.

### Example 1

```text
Input: nums = [1,3,2], k = 4
Output: 5
Explanation: We consider all subarrays of nums:
nums[0..0]: cost = (1 - 1) * 1 = 0
nums[0..1]: cost = (3 - 1) * 2 = 4
nums[0..2]: cost = (3 - 1) * 3 = 6
nums[1..1]: cost = (3 - 3) * 1 = 0
nums[1..2]: cost = (3 - 2) * 2 = 2
nums[2..2]: cost = (2 - 2) * 1 = 0
There are 5 subarrays whose cost is less than or equal to 4.
```

### Example 2

```text
Input: nums = [5,5,5,5], k = 0
Output: 10
Explanation: For any subarray of nums, the maximum and minimum values are the
same, so the cost is always 0.
As a result, every subarray of nums has cost less than or equal to 0.
For an array of length 4, the total number of subarrays is (4 * 5) / 2 = 10.
```

### Example 3

```text
Input: nums = [1,2,3], k = 0
Output: 3
Explanation: The only subarrays of nums with cost 0 are the single-element
subarrays, and there are 3 of them.
```

### Constraints

- `1 <= nums.length <= 10⁵`
- `1 <= nums[i] <= 10⁹`
- `0 <= k <= 10¹⁵`

## Hints

### Hint 1

Use sliding window.

### Hint 2

A monotonic deque is useful for maintaining the maximum or minimum in O(1) time
per operation.

### Hint 3

When the current window's cost exceeds k, move the left boundary forward until
the window becomes valid again. Count all subarrays ending at the current right
boundary.
