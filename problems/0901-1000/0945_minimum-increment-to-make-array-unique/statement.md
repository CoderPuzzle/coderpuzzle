# Minimum Increment to Make Array Unique

## Description

You are given an integer array `nums`. In one move you pick an index `i`
(`0 <= i < nums.length`) and increment `nums[i]` by 1.

Return the minimum number of moves needed to make every value in `nums`
unique.

### Example 1

```text
Input: nums = [1,2,2]
Output: 1
Explanation: After 1 move, the array could be [1,2,3].
```

### Example 2

```text
Input: nums = [3,2,1,2,1,7]
Output: 6
Explanation: After 6 moves, the array could be [3,4,1,2,5,7]. It can be
shown that no 5 moves can make every value unique.
```

### Constraints

- `1 <= nums.length <= 10⁵`
- `0 <= nums[i] <= 10⁵`
