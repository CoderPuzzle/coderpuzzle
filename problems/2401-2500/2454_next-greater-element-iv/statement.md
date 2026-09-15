# Next Greater Element IV

## Description

You are given a 0-indexed integer array `nums`. For each integer in `nums`,
you must find its respective second greater integer.

The second greater integer of `nums[i]` is `nums[j]` such that:

- `j > i`
- `nums[j] > nums[i]`
- there exists exactly one index `k` such that `nums[k] > nums[i]` and
  `i < k < j`

If there is no such `nums[j]`, the second greater integer is considered to be
`-1`.

For example, in the array `[1, 2, 4, 3]`, the second greater integer of `1` is
`4`, of `2` is `3`, and of `3` and `4` is `-1`.

Return an integer array `answer` where `answer[i]` is the second greater
integer of `nums[i]`.

### Example 1

```text
Input: nums = [2,4,0,9,6]
Output: [9,6,6,-1,-1]
Explanation: For index 0, 4 is the first integer greater than 2 and 9 is the
second.
For index 1, 9 is the first integer greater than 4 and 6 is the second.
For index 2, 9 is the first integer greater than 0 and 6 is the second.
For index 3, there is no integer greater than 9 to its right, so the answer
is -1.
For index 4, there is no integer greater than 6 to its right, so the answer
is -1.
```

### Example 2

```text
Input: nums = [3,3]
Output: [-1,-1]
Explanation: Neither integer has any integer greater than it to its right.
```

### Constraints

- `1 <= nums.length <= 10⁵`
- `-2147483648 <= nums[i] <= 2147483647`

## Hints

### Hint 1

Keep a monotonic non-increasing stack of indices whose first greater element
has not been seen yet; a new value answers every index it pops off.

### Hint 2

When an index is popped off that stack it has found its first greater value —
move it into a second stack that holds indices still waiting for their second
greater value, and let later values answer them the same way.

### Hint 3

The second stack must stay ordered by value so a new value can settle all
eligible waiters at its top: a batch popped off the first stack comes off in
increasing order of value, so reverse each batch as you move it across.
