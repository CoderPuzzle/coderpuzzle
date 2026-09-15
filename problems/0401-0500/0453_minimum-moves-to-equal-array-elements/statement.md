# Minimum Moves to Equal Array Elements

## Description

Given an integer array `nums` of size `n`, return the minimum number of moves
required to make all array elements equal.

In one move, you can increment `n - 1` elements of the array by `1`.

### Example 1

```text
Input: nums = [1,2,3]
Output: 3
Explanation: Only three moves are needed (remember each move increments two elements):
[1,2,3]  =>  [2,3,3]  =>  [3,4,3]  =>  [4,4,4]
```

### Example 2

```text
Input: nums = [1,1,1]
Output: 0
```

### Constraints

- `1 <= nums.length <= 10⁵`
- `-10⁹ <= nums[i] <= 10⁹`
- The answer is guaranteed to fit in a 32-bit integer.
