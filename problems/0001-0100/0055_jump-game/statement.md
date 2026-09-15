# Jump Game

## Description

You are given an integer array `nums`. You are initially positioned at the
array's **first index**, and each element in the array represents your maximum
jump length at that position.

Return `true` if you can reach the last index, or `false` otherwise.

### Example 1

```text
Input: nums = [2,3,1,1,4]
Output: true
Explanation: Jump 1 step from index 0 to 1, then 3 steps to the last index.
```

### Example 2

```text
Input: nums = [3,2,1,0,4]
Output: false
Explanation: You will always arrive at index 3 no matter what. Its maximum jump length is 0, which makes it impossible to reach the last index.
```

### Constraints

- `1 <= nums.length <= 10^4`
- `0 <= nums[i] <= 10^5`

## Hints

### Hint 1

Greedy: sweep left to right maintaining the farthest index reachable so far.

### Hint 2

If the current index is ever beyond that farthest reach, the last index cannot be reached.

### Hint 3

Update the reach with index + nums[index] at every position you can stand on.
