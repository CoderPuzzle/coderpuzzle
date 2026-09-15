# Valid Subarrays With Matching Sum Digits II

## Description

You are given an integer array `nums` and an integer digit `x`.

A subarray `nums[l..r]` is considered valid if the sum of its elements
satisfies both of the following conditions:

- The first digit of the sum is equal to `x`.
- The last digit of the sum is equal to `x`.

Return the number of valid subarrays.

### Example 1

```text
Input: nums = [1,100,1], x = 1
Output: 4
Explanation:
    The valid subarrays are:
        nums[0..0]: sum = 1
        nums[0..1]: sum = 1 + 100 = 101
        nums[1..2]: sum = 100 + 1 = 101
        nums[2..2]: sum = 1

    Thus, the answer is 4.
```

### Example 2

```text
Input: nums = [1], x = 2
Output: 0
Explanation:
    The only subarray is nums[0..0] with a sum of 1, which does not satisfy
    the conditions.

    Thus, the answer is 0.
```

### Constraints

- `1 <= nums.length <= 10⁵`
- `1 <= nums[i] <= 10⁹`
- `1 <= x <= 9`

## Hints

### Hint 1

Since all elements are positive, prefix sums are strictly increasing.

### Hint 2

A sum has first digit `x` iff it belongs to one of the ranges
`[x * 10ᵖ, (x + 1) * 10ᵖ - 1]`.

### Hint 3

Also require the sum to be congruent to `x` modulo 10, then count prefix-sum
pairs whose difference lies in each valid range and residue class.
