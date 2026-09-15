# Single Number II

## Description

Given an integer array `nums` in which every element appears **three times**
except for one element, which appears **exactly once**. Find and return the
single element.

You must implement a solution with a linear runtime complexity and use only
constant extra space.

### Example 1

```text
Input: nums = [2,2,3,2]
Output: 3
Explanation: The value 2 appears three times, and 3 appears once, so the single element is 3.
```

### Example 2

```text
Input: nums = [0,1,0,1,0,1,99]
Output: 99
Explanation: The values 0 and 1 each appear three times, and 99 appears once, so the single element is 99.
```

### Constraints

- `1 <= nums.length <= 3 * 10⁴`
- `-2³¹ <= nums[i] <= 2³¹ - 1`
- Each element in `nums` appears exactly three times except for one element,
  which appears exactly once.

## Hints

### Hint 1

XOR cancels elements that appear an even number of times, so it solved the
twice-appearing variant — here you need something that cancels counts of
exactly three.

### Hint 2

Look at one bit position at a time: among the numbers that have that bit set,
the count is a multiple of three plus either 0 or 1, depending on whether the
single element has that bit set.

### Hint 3

Rebuild the answer from the 32 per-bit counts taken modulo 3. Mind the sign
bit: an answer with bit 31 set is a negative 32-bit integer, so interpret the
assembled bit pattern as a signed value.
