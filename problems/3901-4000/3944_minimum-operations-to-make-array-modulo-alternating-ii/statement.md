# Minimum Operations to Make Array Modulo Alternating II

## Description

You are given an integer array `nums` and integer `k`. In one operation, increase or decrease any element by 1. The array is modulo alternating if distinct remainders `x` and `y` exist such that every even index has remainder `x` modulo `k` and every odd index has remainder `y` modulo `k`.

Return the minimum operations required.

### Example 1

```text
Input: nums = [1,4,2,8], k = 3
Output: 2
```

### Example 2

```text
Input: nums = [1,1,1], k = 3
Output: 1
```

### Example 3

```text
Input: nums = [6,7,8], k = 2
Output: 0
```

### Constraints

- `1 <= nums.length <= 10⁵`
- `1 <= nums[i] <= 10⁹`
- `2 <= k <= 10⁵`

## Hints

### Hint 1

The cost from remainder `r` to `t` is `min(abs(r-t), k-abs(r-t))`.

### Hint 2

Compute the cost for every target remainder separately for even and odd indices, then combine distinct targets using the two smallest odd costs.
