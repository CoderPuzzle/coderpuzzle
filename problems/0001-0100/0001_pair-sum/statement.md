# Pair Sum

## Description

You are given an integer array `nums` and an integer `target`. Locate the two
positions whose values sum to `target`, and report those positions.

A position cannot be paired with itself, and the input is guaranteed to admit
**exactly one** such pair.

Either ordering of the two positions is accepted.

### Example 1

```text
Input: nums = [4,13,6,21], target = 19
Output: [1,2]
Explanation: 13 sits at position 1 and 6 at position 2, and 13 + 6 is 19.
```

### Example 2

```text
Input: nums = [-5,8,14,3], target = -2
Output: [0,3]
Explanation: -5 + 3 is -2. Values may be negative.
```

### Example 3

```text
Input: nums = [9,2,9,17], target = 18
Output: [0,2]
Explanation: The two nines occupy different positions, so pairing them is legal.
```

### Constraints

- `2 <= nums.length <= 10⁴`
- `-10⁹ <= nums[i] <= 10⁹`
- `-10⁹ <= target <= 10⁹`
- The pair is unique.

### Follow-up

Checking every pair takes `O(n²)`. Can you finish in one sweep of the array?

## Hints

### Hint 1

Once you fix one member of the pair, the other is no longer a free choice —
it is determined. What is it?

### Hint 2

Sweeping left to right, at each position you need to know whether the value
that completes the pair has already gone by, and where it was.

### Hint 3

Storing every value you pass, keyed by the value itself, makes that question
answerable in expected constant time.
