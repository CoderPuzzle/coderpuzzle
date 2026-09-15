# Maximum Number of Ways to Partition an Array

## Description

You are given a 0-indexed integer array `nums` of length `n`. The number of
ways to partition `nums` is the number of pivot indices that satisfy both
conditions:

- `1 <= pivot < n`
- `nums[0] + nums[1] + ... + nums[pivot - 1] == nums[pivot] + nums[pivot + 1] + ... + nums[n - 1]`

You are also given an integer `k`. You can choose to change the value of one
element of `nums` to `k`, or to leave the array unchanged.

Return the maximum possible number of ways to partition `nums` to satisfy both
conditions after changing at most one element.

### Example 1

```text
Input: nums = [2,-1,2], k = 3
Output: 1
Explanation: One optimal approach is to change nums[0] to k. The array becomes [3,-1,2].
There is one way to partition the array:
- For pivot = 2, we have the partition [3,-1 | 2]: 3 + -1 == 2.
```

### Example 2

```text
Input: nums = [0,0,0], k = 1
Output: 2
Explanation: The optimal approach is to leave the array unchanged.
There are two ways to partition the array:
- For pivot = 1, we have the partition [0 | 0,0]: 0 == 0 + 0.
- For pivot = 2, we have the partition [0,0 | 0]: 0 + 0 == 0.
```

### Example 3

```text
Input: nums = [22,4,-25,-20,-15,15,-16,7,19,-10,0,-13,-14], k = -33
Output: 4
Explanation: One optimal approach is to change nums[2] to k. The array becomes [22,4,-33,-20,-15,15,-16,7,19,-10,0,-13,-14].
There are four ways to partition the array.
```

### Constraints

- `n == nums.length`
- `2 <= n <= 10⁵`
- `-10⁵ <= k, nums[i] <= 10⁵`

## Hints

### Hint 1

A pivot point splits the array into equal prefix and suffix. If no change is
made to the array, the goal is to find the number of pivot `p` such that
`prefix[p-1] == suffix[p]`.

### Hint 2

Consider how prefix and suffix will change when we change a number `nums[i]`
to `k`.

### Hint 3

When sweeping through each element, can you find the total number of pivots
where the difference of prefix and suffix happens to equal to the changes of
`k-nums[i]`.
