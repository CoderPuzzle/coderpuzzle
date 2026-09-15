# Complete Prime Number

## Description

You are given an integer `num`.

A number is called a **complete prime number** when every prefix and every
suffix of it is prime. A prefix of a number is formed by its first `k`
digits for some `k`, and a suffix by its last `k` digits; reading any such
slice as an ordinary integer must yield a prime. In particular the whole
number itself appears in both scans, and single-digit numbers are complete
prime numbers exactly when they are prime.

Return `true` if `num` is a complete prime number, otherwise return
`false`.

### Example 1

```text
Input: num = 23
Output: true
Explanation: The prefixes of 23 are 2 and 23, both prime. The suffixes of
23 are 3 and 23, both prime. Every prefix and suffix is prime, so 23 is a
complete prime number.
```

### Example 2

```text
Input: num = 39
Output: false
Explanation: The prefixes of 39 are 3 and 39; 3 is prime but 39 = 3 x 13 is
not. The suffixes are 9 and 39, neither prime. One failing slice is enough,
so 39 is not a complete prime number.
```

### Example 3

```text
Input: num = 7
Output: true
Explanation: 7 is prime, so all of its prefixes and suffixes are prime.
```

### Constraints

- `1 <= num <= 10⁹`

## Hints

### Hint 1

Check primality for all prefixes and all suffixes of num and return true
only if every one of them is prime.
