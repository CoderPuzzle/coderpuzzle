# Minimum Operations to Make Array Non Decreasing

## Description

You are given an integer array `nums` of length `n`.

In one operation, you may choose any subarray `nums[l..r]` and increase each
element in that subarray by `x`, where `x` is any positive integer.

Return the minimum possible sum of the values of `x` across all operations
required to make the array non-decreasing.

An array is non-decreasing if `nums[i] <= nums[i + 1]` for all
`0 <= i < n - 1`.

### Example 1

```text
Input: nums = [3,3,2,1]
Output: 2
Explanation:
    One optimal set of operations:

        Choose subarray [2..3] and add x = 1 resulting in [3, 3, 3, 2]
        Choose subarray [3..3] and add x = 1 resulting in [3, 3, 3, 3]

    The array becomes non-decreasing, and the total sum of chosen x values is
    1 + 1 = 2.
```

### Example 2

```text
Input: nums = [5,1,2,3]
Output: 4
Explanation:
    One optimal set of operations:

        Choose subarray [1..3] and add x = 4 resulting in [5, 5, 6, 7]

    The array becomes non-decreasing, and the total sum of chosen x values is
    4.
```

### Constraints

- `1 <= n == nums.length <= 10⁵`
- `1 <= nums[i] <= 10⁹`

## Hints

### Hint 1

Focus only on positions where the array decreases
(`nums[i] > nums[i + 1]`).

### Hint 2

Each such drop must be fixed by increasing a subarray starting at `i + 1`.

### Hint 3

Observe that you only need to pay for the difference at each drop.
