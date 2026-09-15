# 132 Pattern

## Description

Given an array of `n` integers `nums`, a **132 pattern** is a subsequence of
three integers `nums[i]`, `nums[j]` and `nums[k]` such that
`i < j < k` and `nums[i] < nums[k] < nums[j]`.

Return `true` if there is a 132 pattern in `nums`, otherwise, return `false`.

### Example 1

```text
Input: nums = [1,2,3,4]
Output: false
Explanation: There is no 132 pattern in the sequence.
```

### Example 2

```text
Input: nums = [3,1,4,2]
Output: true
Explanation: There is a 132 pattern in the sequence: [1, 4, 2].
```

### Example 3

```text
Input: nums = [-1,3,2,0]
Output: true
Explanation: There are three 132 patterns in the sequence: [-1, 3, 2],
[-1, 3, 0] and [-1, 2, 0].
```

### Constraints

- `n == nums.length`
- `1 <= n <= 2 * 10^5`
- `-10^9 <= nums[i] <= 10^9`

## Hints

### Hint 1

Scan from the right while keeping a monotonically decreasing stack.

### Hint 2

Every value popped from the stack is smaller than some value to its right, so the largest popped value is the best candidate for nums[k].

### Hint 3

If the current value is smaller than that stored candidate while scanning leftward, a 132 pattern exists.
