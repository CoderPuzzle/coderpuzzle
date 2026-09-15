# Smallest Value After Replacing With Sum of Prime Factors

## Description

You are given a positive integer n.

Continuously replace n with the sum of its prime factors.

- Note that if a prime factor divides n multiple times, it should be included
  in the sum as many times as it divides n.

Return the smallest value n will take on.

### Example 1

```text
Input: n = 15
Output: 5
Explanation: Initially, n = 15.
15 = 3 * 5, so replace n with 3 + 5 = 8.
8 = 2 * 2 * 2, so replace n with 2 + 2 + 2 = 6.
6 = 2 * 3, so replace n with 2 + 3 = 5.
5 is the smallest value n will take on.
```

### Example 2

```text
Input: n = 3
Output: 3
Explanation: Initially, n = 3.
3 is the smallest value n will take on.
```

### Constraints

- `2 <= n <= 10⁵`

## Hints

### Hint 1

Every time you replace n, it will become smaller until it is a prime number, where it will keep the same value each time you replace it.

### Hint 2

n decreases logarithmically, allowing you to simulate the process.

### Hint 3

To find the prime factors, iterate through all numbers less than n from least to greatest and find the maximum number of times each number divides n.
