# Maximum Score with Co-Prime Element

## Description

You may change any element of `nums` to a positive integer at most `maxVal`, at cost 1 per changed element. Afterwards choose an index whose final value is co-prime with every other final value. The score is the selected value minus the number of modifications.

Return the maximum possible score.

### Example 1

```text
Input: nums = [3,4,6], maxVal = 5
Output: 4
```

### Example 2

```text
Input: nums = [1,2,3], maxVal = 4
Output: 3
```

### Example 3

```text
Input: nums = [2,2], maxVal = 1
Output: 1
```

### Constraints

- `1 <= nums.length <= 10⁵`
- `1 <= nums[i] <= 10⁵`
- `1 <= maxVal <= 10⁵`

## Hints

### Hint 1

For fixed selected value `x`, every other value sharing a prime factor with `x` must change.

### Hint 2

Use divisible counts and inclusion-exclusion over the distinct prime factors of `x`.
