# Find the Duplicate Number

## Description

Given an array of integers `nums` containing `n + 1` integers where each
integer is in the range `[1, n]` inclusive.

There is only one repeated number in `nums`, return this repeated number.

You must solve the problem without modifying the array `nums` and if possible
only using constant extra space.

### Example 1

```text
Input: nums = [1,3,4,2,2]
Output: 2
```

### Example 2

```text
Input: nums = [3,1,3,4,2]
Output: 3
```

### Example 3

```text
Input: nums = [3,3,3,3,3]
Output: 3
```

### Constraints

- `1 <= n <= 10^5`
- `nums.length == n + 1`
- `1 <= nums[i] <= n`
- All the integers in `nums` appear only once except for precisely one
  integer which appears two or more times.

### Follow-up

- How can we prove that at least one duplicate number must exist in `nums`?
- Can you solve the problem in linear runtime complexity?

## Hints

### Hint 1

By the pigeonhole principle, n + 1 numbers drawn from [1, n] force at least one duplicate.

### Hint 2

Interpret nums as a linked list: index i points to index nums[i]; the duplicate value is a node with two incoming pointers.

### Hint 3

That structure guarantees a cycle, and the duplicate is the cycle's entry point.

### Hint 4

Find it with Floyd's tortoise-and-hare: detect the meeting point with slow/fast pointers, then restart one pointer at 0 and advance both one step at a time.
