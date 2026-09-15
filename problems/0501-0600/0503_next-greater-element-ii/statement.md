# Next Greater Element II

## Description

Given a circular integer array `nums` (the next element of
`nums[nums.length - 1]` is `nums[0]`), return the next greater number for
every element in `nums`.

The next greater number of a number `x` is the first greater number to its
traversing-order next in the array, which means you could search circularly to
find its next greater number. If it doesn't exist, return `-1` for this
number.

### Example 1

```text
Input: nums = [1,2,1]
Output: [2,-1,2]
Explanation: The first 1's next greater number is 2;
The number 2 can't find a next greater number.
The second 1's next greater number needs to search circularly, which is also 2.
```

### Example 2

```text
Input: nums = [1,2,3,4,3]
Output: [2,3,4,-1,4]
Explanation: The next greater number of 3 (index 4) needs to search
circularly: after wrapping past the end, the first greater value seen is 4.
```

### Constraints

- `1 <= nums.length <= 10⁴`
- `-2147483648 <= nums[i] <= 2147483647`

## Hints

### Hint 1

A circular scan means every element may look at up to one full extra lap;
imagine iterating over the array doubled, reading index `i % n`.

### Hint 2

Keep a stack of indices whose values form a non-increasing sequence; when the
current value is greater than the value at the stack top, it is the next
greater number for every index popped.

### Hint 3

Push indices only during the first lap (`i < n`) — the second lap exists just
to resolve the waiting indices, and answers default to `-1`.
