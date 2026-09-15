# Minimum Removals to Balance Array

## Description

You are given an integer array `nums` and an integer `k`.

An array is **balanced** when its maximum element is at most `k` times its
minimum element. You may delete any number of elements from `nums`, as long as
at least one element remains. Return the minimum number of deletions that make
the remaining elements balanced.

A single-element array is always balanced: its maximum equals its minimum, so
the condition holds automatically.

### Example 1

```text
Input: nums = [2,1,5], k = 2
Output: 1
Explanation: Delete 5 to keep [2,1]. Its maximum 2 is at most twice its
minimum 1, so one deletion suffices.
```

### Example 2

```text
Input: nums = [1,6,2,9], k = 3
Output: 2
Explanation: Delete 1 and 9 to keep [6,2]; now 6 <= 2 * 3, and no single
deletion balances this array.
```

### Example 3

```text
Input: nums = [4,6], k = 2
Output: 0
Explanation: The array is already balanced because 6 <= 4 * 2.
```

### Constraints

- `1 <= nums.length <= 10⁵`
- `1 <= nums[i] <= 10⁹`
- `1 <= k <= 10⁵`

## Hints

### Hint 1

Sort `nums` and sweep two pointers over it, so the window's smallest kept
value sits at the left end and its largest kept value at the right end.

### Hint 2

Extend the right end while it stays within `k` times the left end to find
the longest balanced window; the answer is `n - (j - i + 1)` for the best
window.
