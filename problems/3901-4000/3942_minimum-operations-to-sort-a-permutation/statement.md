# Minimum Operations to Sort a Permutation

## Description

You are given an integer array `nums` of length `n`, where `nums` is a
permutation of the integers from `0` to `n - 1`.

You may perform only the following operations:

- Reverse the entire array.
- Rotate Left by One: Move the first element to the end of the array, and
  rest elements to left by one position.

Return an integer denoting the minimum number of operations required to sort
the array in increasing order. If it is not possible to sort the array using
only the given operations, return `-1`.

### Example 1

```text
Input: nums = [0,2,1]
Output: 2
Explanation:
    Rotate Left by one: [2, 1, 0]
    Reverse the array: [0, 1, 2]

The array becomes sorted in 2 operations, which is minimal.
```

### Example 2

```text
Input: nums = [1,0,2]
Output: 2
Explanation:
    Reverse the array: [2, 0, 1]
    Rotate Left by one: [0, 1, 2]

The array becomes sorted in 2 operations, which is minimal.
```

### Example 3

```text
Input: nums = [2,0,1,3]
Output: -1
Explanation: It is impossible to reach [2, 0, 1, 3]. Thus, the answer is -1.
```

### Constraints

- `1 <= n == nums.length <= 10⁵`
- `0 <= nums[i] <= n - 1`
- `nums` is a permutation of integers from `0` to `n - 1`.

## Hints

### Hint 1

The operations generate only rotations of `nums` and rotations of
`reverse(nums)`.

### Hint 2

So sorting is possible if and only if `nums` is a rotation of increasing
order, or a rotation of decreasing order.

### Hint 3

Compress a state into `(type, shift)`, where `type = 0` means a rotation of
the original array and `type = 1` means a rotation of the reversed array.

### Hint 4

Run BFS on these `2n` states using the two allowed operations.
