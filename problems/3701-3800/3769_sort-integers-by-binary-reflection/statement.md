# Sort Integers by Binary Reflection

## Description

You are given an integer array `nums`.

The **binary reflection** of a positive integer is the number obtained by
writing the integer in binary without leading zeros, reversing that binary
string, and reading the result back as a number. Reversing may produce
leading zeros, which are dropped when the string is read back as a number.

Sort `nums` in ascending order of each element's binary reflection. If two
elements have the same binary reflection, the smaller original value must
appear first. Elements that are equal share both values and keep together in
any position among themselves.

Return the resulting array.

### Example 1

```text
Input: nums = [4,5,4]
Output: [4,4,5]
Explanation: The binary reflections are:
  4 -> 100 -> reversed 001 -> 1
  5 -> 101 -> reversed 101 -> 5
  4 -> 100 -> reversed 001 -> 1
Sorting by reflection gives [4, 4, 5].
```

### Example 2

```text
Input: nums = [3,6,5,8]
Output: [8,3,6,5]
Explanation: The binary reflections are:
  3 -> 11 -> reversed 11 -> 3
  6 -> 110 -> reversed 011 -> 3
  5 -> 101 -> reversed 101 -> 5
  8 -> 1000 -> reversed 0001 -> 1
Sorting by reflection gives [8, 3, 6, 5]. The elements 3 and 6 share the
reflection 3, so the smaller value 3 is placed first.
```

### Constraints

- `1 <= nums.length <= 100`
- `1 <= nums[i] <= 10⁹`

## Hints

### Hint 1

Simulate and sort as described: compute every reflection first, then sort.

### Hint 2

To make the tie-break language-independent, sort on the pair (reflection,
value) as a single composite key rather than relying on a stable sort.
