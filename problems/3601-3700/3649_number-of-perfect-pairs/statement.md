# Number of Perfect Pairs

## Description

You are given an integer array `nums`.

A pair of indices `(i, j)` with `i < j` is called **perfect** when, writing
`a = nums[i]` and `b = nums[j]`, both conditions below hold:

- `min(|a - b|, |a + b|) <= min(|a|, |b|)`
- `max(|a - b|, |a + b|) >= max(|a|, |b|)`

Here `|x|` denotes the absolute value of `x`. Return the number of perfect
pairs.

### Example 1

```text
Input: nums = [0,1,2,3]
Output: 2
Explanation: The perfect pairs are (1, 2) and (2, 3). For (1, 2),
min(|1 - 2|, |1 + 2|) = 1 <= min(1, 2) = 1 and max(|1 - 2|, |1 + 2|) =
3 >= max(1, 2) = 2; for (2, 3), min(|2 - 3|, |2 + 3|) = 1 <=
min(2, 3) = 2 and max(|2 - 3|, |2 + 3|) = 5 >= max(2, 3) = 3. Every
other pair fails at least one of the two checks.
```

### Example 2

```text
Input: nums = [-3,2,-1,4]
Output: 4
Explanation: The perfect pairs are (0, 1), (0, 3), (1, 2) and (1, 3).
For (0, 1): min(|-3 - 2|, |-3 + 2|) = 1 <= min(3, 2) = 2 and
max(|-3 - 2|, |-3 + 2|) = 5 >= max(3, 2) = 3. The remaining pairs,
(0, 2) and (2, 3), fail the first check.
```

### Example 3

```text
Input: nums = [1,10,100,1000]
Output: 0
Explanation: No pair satisfies both conditions, so the answer is 0.
```

### Constraints

- `2 <= nums.length <= 10⁵`
- `-10⁹ <= nums[i] <= 10⁹`

## Hints

### Hint 1

For any pair, write `x = |a|` and `y = |b|` and assume `x <= y`. One of
`|a - b|`, `|a + b|` equals `y - x` and the other equals `x + y`, so the
two conditions become `y - x <= x` and `x + y >= y`; the second always
holds, and a pair is perfect exactly when `y <= 2x`.

### Hint 2

Sort the array by absolute value.

### Hint 3

Keep two pointers `i` and `j`: for each `i`, advance `j` while
`|nums[j]| <= 2 * |nums[i]|`.

### Hint 4

For each `i`, add `j - i - 1` to your answer.
