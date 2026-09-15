# Check If It Is a Good Array

## Description

Given an array `nums` of positive integers. Your task is to select some subset
of `nums`, multiply each element by an integer and add all these numbers. The
array is **good** if you can obtain a sum of 1 from the array by any possible
subset and multiplicand.

Return `true` if the array is good, otherwise return `false`.

### Example 1

```text
Input: nums = [12,5,7,23]
Output: true
Explanation: Pick numbers 5 and 7. 5*3 + 7*(-2) = 1
```

### Example 2

```text
Input: nums = [29,6,10]
Output: true
Explanation: Pick numbers 29, 6 and 10. 29*1 + 6*(-3) + 10*(-1) = 1
```

### Example 3

```text
Input: nums = [3,6]
Output: false
```

### Constraints

- `1 <= nums.length <= 10⁵`
- `1 <= nums[i] <= 10⁹`

## Hints

### Hint 1

The equation `ax + by = 1` has a solution `x, y` iff `gcd(a, b) = 1`.

### Hint 2

Can you generalize the formula? Check Bézout's lemma.
