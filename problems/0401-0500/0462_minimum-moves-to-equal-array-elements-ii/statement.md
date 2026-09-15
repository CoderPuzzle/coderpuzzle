# Minimum Moves to Equal Array Elements II

## Description

Given an integer array `nums` of size `n`, return the minimum number of moves
required to make all array elements equal.

In one move, you can increment or decrement an element of the array by `1`.

### Example 1

```text
Input: nums = [1,2,3]
Output: 2
Explanation: Only two moves are needed (remember each move increments or decrements one element):
[1,2,3]  =>  [2,2,3]  =>  [2,2,2]
```

### Example 2

```text
Input: nums = [1,10,2,9]
Output: 16
```

### Constraints

- `1 <= nums.length <= 10⁵`
- `-10⁹ <= nums[i] <= 10⁹`
- Test cases are designed so that the answer will fit in a 32-bit integer.
