# Maximum Size Subarray Sum Equals k

## Description

Given an integer array `nums` and an integer `k`, return the maximum
length of a subarray that sums to `k`. If there is not one, return `0`
instead.

### Example 1

```text
Input: nums = [1,-1,5,-2,3], k = 3
Output: 4
Explanation: The subarray [1, -1, 5, -2] sums to 3 and is the longest.
```

### Example 2

```text
Input: nums = [-2,-1,2,1], k = 1
Output: 2
Explanation: The subarray [-1, 2] sums to 1 and is the longest.
```

### Constraints

- `1 <= nums.length <= 2 * 10^5`
- `-10^4 <= nums[i] <= 10^4`
- `-10^9 <= k <= 10^9`

## Hints

### Hint 1

Compute the prefix sum array where psum[i] is the sum of all the elements from 0 to i.

### Hint 2

At each index i the prefix sum is psum[i], so you are searching for the index x where psum[x] = psum[i] - k; the subarray [x + 1, i] sums to k.

### Hint 3

Use a hashmap to find the index x efficiently, storing only the earliest index for each prefix sum to maximize the length.
