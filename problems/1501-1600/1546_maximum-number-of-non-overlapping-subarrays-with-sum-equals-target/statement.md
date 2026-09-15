# Maximum Number of Non-Overlapping Subarrays With Sum Equals Target

## Description

Given an integer array `nums` and an integer `target`, return the maximum
number of non-empty, non-overlapping subarrays whose elements sum to
exactly `target`.

### Example 1

```text
Input: nums = [1,1,1,1,1], target = 2
Output: 2
Explanation: The subarrays [1,1] (indices 0-1) and [1,1] (indices 2-3)
both sum to 2 and do not overlap, so the answer is 2. No selection of
three or more disjoint subarrays sums to 2 each.
```

### Example 2

```text
Input: nums = [-1,3,5,1,4,2,-9], target = 6
Output: 2
Explanation: Three subarrays sum to 6: [5,1], [4,2], and
[3,5,1,4,2,-9]. The third overlaps both of the others, so at most two of
them can be chosen without overlap: [5,1] and [4,2].
```

### Constraints

- `1 <= nums.length <= 10⁵`
- `-10⁴ <= nums[i] <= 10⁴`
- `0 <= target <= 10⁶`

## Hints

### Hint 1

Track running prefix sums in a hash set so that, at each position, you can
tell in `O(1)` whether some earlier position starts a subarray ending here
with sum exactly `target`.

### Hint 2

It can be proven that greedily closing off a valid subarray the moment one
is found — rather than waiting to see if a better one starts nearby — is
optimal.
