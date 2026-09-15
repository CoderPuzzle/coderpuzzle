# Largest Prime from Consecutive Prime Sum

## Description

You are given an integer `n`.

Return the largest prime number less than or equal to `n` that can be
expressed as the sum of one or more **consecutive prime numbers** starting
from `2`. The run must begin at the smallest prime: a qualifying sum is
`2`, or `2 + 3`, or `2 + 3 + 5`, and so on — each sum extends the previous
one by exactly the next prime. If no such number exists, return `0`.

### Example 1

```text
Input: n = 20
Output: 17
Explanation: The sums of consecutive primes starting from 2 that are at
most 20 are 2 = 2, 5 = 2 + 3 and 17 = 2 + 3 + 5 + 7. All three are prime,
and the largest is 17.
```

### Example 2

```text
Input: n = 2
Output: 2
Explanation: The only consecutive prime sum not exceeding 2 is 2 itself,
which is prime.
```

### Constraints

- `1 <= n <= 5 * 10⁵`

## Hints

### Hint 1

Generate all prime numbers up to `n` (a sieve works; so does trial
division).

### Hint 2

Add up the primes in order starting from 2 until the running total exceeds
`n`.

### Hint 3

The answer is the largest of those running totals that is itself prime.
