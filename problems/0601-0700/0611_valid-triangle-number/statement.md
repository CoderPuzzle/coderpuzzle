# Valid Triangle Number

## Description

Given an integer array `nums`, return the number of triplets chosen from
the array that can make triangles if we take them as side lengths of a
triangle.

### Example 1

```text
Input: nums = [2,2,3,4]
Output: 3
Explanation: Valid combinations are:
2,3,4 (using the first 2)
2,3,4 (using the second 2)
2,2,3
```

### Example 2

```text
Input: nums = [4,2,3,4]
Output: 4
```

### Constraints

- `1 <= nums.length <= 1000`
- `0 <= nums[i] <= 1000`

## Hints

### Hint 1

Sort the array first; then for a triplet with sides a <= b <= c, only a + b > c needs to be checked.

### Hint 2

Fix the largest side with one outer pointer, then sweep two pointers over the smaller elements to count pairs whose sum exceeds it.

### Hint 3

When nums[lo] + nums[hi] > nums[i], every index between lo and hi also works with hi, so add hi - lo to the count and move hi down.

### Hint 4

Sides of length 0 can never form a triangle, so skip the largest side when it is 0.
