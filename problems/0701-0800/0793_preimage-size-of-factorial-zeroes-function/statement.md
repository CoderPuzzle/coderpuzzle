# Preimage Size of Factorial Zeroes Function

## Description

Let `f(x)` be the number of zeroes at the end of `x!`. Recall that `x! = 1 * 2 * 3 * ... * x` and by convention, `0! = 1`.

For example, `f(3) = 0` because `3! = 6` has no zeroes at the end, while `f(11) = 2` because `11! = 39916800` has two zeroes at the end.

Given an integer `k`, return the number of non-negative integers `x` that have the property that `f(x) = k`.

### Example 1

```text
Input: k = 0
Output: 5
Explanation: 0!, 1!, 2!, 3!, and 4! end with k = 0 zeroes.
```

### Example 2

```text
Input: k = 5
Output: 0
Explanation: There is no x such that x! ends in k = 5 zeroes.
```

### Example 3

```text
Input: k = 3
Output: 5
```

### Constraints

- `0 <= k <= 10^9`

## Hints

### Hint 1

The number of trailing zeroes of x! is x/5 + x/25 + x/125 + ... (multiples of 5 contribute at least one factor, multiples of 25 one more, and so on).

### Hint 2

This zero-count function is non-decreasing in x, so binary search for the smallest x whose count reaches k.

### Hint 3

The count only ever jumps by more than 1 at multiples of 25, so the preimage of any achievable k is exactly 5 values; the answer is always 0 or 5.
