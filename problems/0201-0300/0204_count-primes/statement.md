# Count Primes

## Description

Given an integer `n`, return the number of prime numbers that are strictly less
than `n`.

### Example 1

```text
Input: n = 10
Output: 4
Explanation: There are 4 prime numbers less than 10, they are 2, 3, 5, 7.
```

### Example 2

```text
Input: n = 0
Output: 0
```

### Example 3

```text
Input: n = 1
Output: 0
```

### Constraints

- `0 <= n <= 5 × 10⁶`

## Hints

### Hint 1

Checking all the integers in the range [1, n - 1] is not efficient. Think about a better approach.

### Hint 2

Since most of the numbers are not primes, we need a fast approach to exclude the non-prime integers.

### Hint 3

Use the Sieve of Eratosthenes: for each prime found, mark all of its multiples as composite, then count the survivors.
