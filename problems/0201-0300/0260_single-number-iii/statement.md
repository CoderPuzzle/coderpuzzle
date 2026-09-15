# Single Number III

## Description

Given an integer array `nums` in which exactly two elements appear only once
and all the other elements appear exactly twice, find the two elements that
appear only once. The answer may be returned in any order.

You must write an algorithm that runs in linear runtime complexity and uses
only constant extra space.

### Example 1

```text
Input: nums = [1,2,1,3,2,5]
Output: [3,5]
Explanation: [5, 3] is also a valid answer.
```

### Example 2

```text
Input: nums = [-1,0]
Output: [-1,0]
Explanation: The two elements that appear once are -1 and 0.
```

### Example 3

```text
Input: nums = [0,1]
Output: [1,0]
Explanation: [0, 1] is also a valid answer.
```

### Constraints

- `2 <= nums.length <= 3 * 10⁴`
- `-2³¹ <= nums[i] <= 2³¹ - 1`
- Each integer in `nums` appears exactly twice except for exactly two
  integers, which appear exactly once.

## Hints

### Hint 1

XOR-ing the whole array cancels every value that appears twice, leaving just
the XOR of the two single values — but that mixes them together.

### Hint 2

Since the two single values are different, their XOR is nonzero; pick any bit
set in it (the lowest set bit is easy to isolate) — the two singles differ at
that bit, and every duplicated value has a partner on the same side.

### Hint 3

Use that bit as a mask to split the array into two groups and XOR each group
separately: each group contains one single value plus complete pairs, so each
group's XOR is one of the two answers.
