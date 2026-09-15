# Minimum Distance Between Three Equal Elements II

## Description

You are given an integer array nums of length n.

A tuple (i, j, k) of three distinct indices is good if
nums[i] == nums[j] == nums[k]. The distance of a good tuple is
abs(i - j) + abs(j - k) + abs(k - i), where abs(x) denotes the absolute
value of x.

Return the minimum possible distance over all good tuples, or -1 if no
good tuple exists.

### Example 1

```text
Input: nums = [1,2,1,1,3]
Output: 6
Explanation: The minimum distance is achieved by the good tuple (0, 2, 3).
It is good because nums[0] == nums[2] == nums[3] == 1, and its distance is
abs(0 - 2) + abs(2 - 3) + abs(3 - 0) = 2 + 1 + 3 = 6.
```

### Example 2

```text
Input: nums = [1,1,2,3,2,1,2]
Output: 8
Explanation: The minimum distance is achieved by the good tuple (2, 4, 6).
It is good because nums[2] == nums[4] == nums[6] == 2, and its distance is
abs(2 - 4) + abs(4 - 6) + abs(6 - 2) = 2 + 2 + 4 = 8.
```

### Example 3

```text
Input: nums = [1]
Output: -1
Explanation: There are no good tuples, so the answer is -1.
```

### Constraints

- `1 <= n == nums.length <= 10^5`
- `1 <= nums[i] <= n`

## Hints

### Hint 1

The distance formula abs(i - j) + abs(j - k) + abs(k - i) simplifies to
`2 * (max(i, j, k) - min(i, j, k))`.

### Hint 2

Group the indices for each unique value. For a value to form a good tuple,
it must appear at least three times.

### Hint 3

For each value that appears at least three times, we want three of its
indices whose outermost positions are as close together as possible. This
is achieved by considering every three consecutive indices in the sorted
list of indices.
