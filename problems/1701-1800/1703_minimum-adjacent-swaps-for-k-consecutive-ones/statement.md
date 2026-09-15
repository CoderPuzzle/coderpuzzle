# Minimum Adjacent Swaps for K Consecutive Ones

## Description

You are given an integer array `nums` and an integer `k`. `nums` comprises only of `0`'s and `1`'s. In one move, you can choose two adjacent indices and swap their values.

Return the minimum number of moves required so that `nums` has `k` consecutive `1`'s.

### Example 1

```text
Input: nums = [1,0,0,1,0,1], k = 2
Output: 1
Explanation: In 1 move, nums could be [1,0,0,0,1,1] and have 2 consecutive 1's.
```

### Example 2

```text
Input: nums = [1,0,0,0,0,0,1,1], k = 3
Output: 5
Explanation: In 5 moves, the leftmost 1 can be shifted right until nums = [0,0,0,0,0,1,1,1].
```

### Example 3

```text
Input: nums = [1,1,0,1], k = 2
Output: 0
Explanation: nums already has 2 consecutive 1's.
```

### Constraints

- `1 <= nums.length <= 10⁵`
- `nums[i]` is `0` or `1`.
- `1 <= k <= sum(nums)`

## Hints

### Hint 1

Choose k 1s and determine how many steps are required to move them into 1 group.

### Hint 2

Maintain a sliding window of k 1s, and maintain the steps required to group them.

### Hint 3

When you slide the window across, should you move the group to the right? Once you move the group to the right, it will never need to slide to the left again.
