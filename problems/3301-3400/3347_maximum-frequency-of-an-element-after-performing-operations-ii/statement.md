# Maximum Frequency of an Element After Performing Operations II

## Description

You are given an integer array `nums` and two integers `k` and
`numOperations`.

You must perform an operation `numOperations` times on `nums`, where in
each operation you:

- Select an index `i` that was not selected in any previous operations.
- Add an integer in the range `[-k, k]` to `nums[i]`.

Return the maximum possible frequency of any element in `nums` after
performing the operations.

### Example 1

```text
Input: nums = [1,4,5], k = 1, numOperations = 2
Output: 2
Explanation: We can achieve a maximum frequency of two by:
- Adding 0 to nums[1], after which nums becomes [1, 4, 5].
- Adding -1 to nums[2], after which nums becomes [1, 4, 4].
```

### Example 2

```text
Input: nums = [5,11,20,20], k = 5, numOperations = 1
Output: 2
Explanation: We can achieve a maximum frequency of two by:
- Adding 0 to nums[1].
```

### Constraints

- `1 <= nums.length <= 10⁵`
- `1 <= nums[i] <= 10⁹`
- `0 <= k <= 10⁹`
- `0 <= numOperations <= nums.length`

## Hints

### Hint 1

The optimal values to check are `nums[i] - k`, `nums[i]`, and
`nums[i] + k`.
