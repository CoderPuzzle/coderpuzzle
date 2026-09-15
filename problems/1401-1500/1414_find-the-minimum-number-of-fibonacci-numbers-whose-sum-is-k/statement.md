# Find the Minimum Number of Fibonacci Numbers Whose Sum Is K

## Description

Given an integer `k`, return the minimum number of Fibonacci numbers whose sum is equal to `k`. The same Fibonacci number can be used multiple times.

The Fibonacci numbers are defined as:

- `F1 = 1`
- `F2 = 1`
- `Fn = Fn-1 + Fn-2` for `n > 2`

It is guaranteed that for the given constraints we can always find such Fibonacci numbers that sum up to `k`.

### Example 1

```text
Input: k = 7
Output: 2
Explanation: The Fibonacci numbers are: 1, 1, 2, 3, 5, 8, 13, ...
For k = 7 we can use 2 + 5 = 7.
```

### Example 2

```text
Input: k = 10
Output: 2
Explanation: For k = 10 we can use 2 + 8 = 10.
```

### Example 3

```text
Input: k = 19
Output: 3
Explanation: For k = 19 we can use 1 + 5 + 13 = 19.
```

### Constraints

- `1 <= k <= 10⁹`

## Hints

### Hint 1

Generate all Fibonacci numbers up to the limit (they are few).

### Hint 2

Use a greedy solution: at every step take the greatest Fibonacci number that is smaller than or equal to the current number, subtract it from the current number, and repeat.
