# Minimum Operations to Make Binary Array Elements Equal to One I

## Description

You are given a binary array `nums`.

You can do the following operation on the array any number of times (possibly
zero):

- Choose any 3 consecutive elements from the array and flip all of them.

Flipping an element means changing its value from `0` to `1`, and from `1` to
`0`.

Return the minimum number of operations required to make all elements in
`nums` equal to `1`. If it is impossible, return `-1`.

### Example 1

```text
Input: nums = [0,1,1,1,0,0]
Output: 3
Explanation: We can do the following operations:
- Choose the elements at indices 0, 1 and 2. The resulting array is nums = [1,0,0,1,0,0].
- Choose the elements at indices 1, 2 and 3. The resulting array is nums = [1,1,1,0,0,0].
- Choose the elements at indices 3, 4 and 5. The resulting array is nums = [1,1,1,1,1,1].
```

### Example 2

```text
Input: nums = [0,1,1,1]
Output: -1
Explanation: It is impossible to make all elements equal to 1.
```

### Constraints

- `3 <= nums.length <= 10^5`
- `0 <= nums[i] <= 1`

## Hints

### Hint 1

If nums[0] is 0, then the only way to change it to 1 is by doing an operation on the first 3 elements of the array.

### Hint 2

After changing nums[0] to 1, use the same logic on the remaining array.
