# Maximize Number of Nice Divisors

## Description

You are given a positive integer `primeFactors`. You are asked to construct a
positive integer `n` that satisfies the following conditions:

- The number of prime factors of `n` (not necessarily distinct) is at most
  `primeFactors`.
- The number of nice divisors of `n` is maximized. Note that a divisor of `n`
  is nice if it is divisible by every prime factor of `n`. For example, if
  `n = 12`, then its prime factors are `[2,2,3]`, then `6` and `12` are nice
  divisors, while `3` and `4` are not.

Return the number of nice divisors of `n`. Since that number can be too large,
return it modulo `10⁹ + 7`.

Note that a prime number is a natural number greater than `1` that is not a
product of two smaller natural numbers. The prime factors of a number `n` is a
list of prime numbers such that their product equals `n`.

### Example 1

```text
Input: primeFactors = 5
Output: 6
Explanation: 200 is a valid value of n.
It has 5 prime factors: [2,2,2,5,5], and it has 6 nice divisors: [10,20,40,50,100,200].
There is not other value of n that has at most 5 prime factors and more nice divisors.
```

### Example 2

```text
Input: primeFactors = 8
Output: 18
```

### Constraints

- `1 <= primeFactors <= 10⁹`

## Hints

### Hint 1

The number of nice divisors is equal to the product of the count of each prime
factor. Then the problem is reduced to: given n, find a sequence of numbers
whose sum equals n and whose product is maximized.

### Hint 2

This sequence can have no numbers that are larger than 4. Proof: if it contains
a number x that is larger than 4, then you can replace x with floor(x/2) and
ceil(x/2), and floor(x/2) * ceil(x/2) > x. You can also replace 4s with two
2s. Hence, there will always be optimal solutions with only 2s and 3s.

### Hint 3

If there are three 2s, you can replace them with two 3s to get a better
product. Hence, you'll never have more than two 2s.

### Hint 4

Keep adding 3s as long as n ≥ 5.
