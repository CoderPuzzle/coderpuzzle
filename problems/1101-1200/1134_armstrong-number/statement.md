# Armstrong Number

## Description

Given an integer `n`, return `true` if and only if it is an Armstrong
number.

The k-digit number `n` is an Armstrong number if and only if the kth power
of each digit sums to `n`.

### Example 1

```text
Input: n = 153
Output: true
Explanation: 153 is a 3-digit number, and 153 = 1³ + 5³ + 3³.
```

### Example 2

```text
Input: n = 123
Output: false
Explanation: 123 is a 3-digit number, and 123 != 1³ + 2³ + 3³ = 36.
```

### Constraints

- `1 <= n <= 10⁸`

## Hints

### Hint 1

Check if the given k-digit number equals the sum of the k-th power of its
digits.

### Hint 2

How to compute the sum of the k-th power of the digits of a number? Can you
divide the number into digits using division and modulus operations?

### Hint 3

You can find the least significant digit of a number by taking its modulus
10, and remove it by dividing the number by 10 (integer division). Once you
have a digit, you can raise it to the power of k and add it to the sum.
