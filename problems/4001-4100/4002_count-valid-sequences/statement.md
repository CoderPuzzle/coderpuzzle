# Count Valid Sequences

## Description

You are given two positive integers `n` and `k`.

A valid sequence is a sequence of `k` positive integers such that:

- The sum of all integers in the sequence is equal to `n`.
- The product of all integers in the sequence is even.

Return the number of valid sequences. Since the answer may be very large,
return it modulo `10⁹ + 7`.

Two sequences are considered different if they differ at any index. For
example, `[1, 1, 2]` and `[1, 2, 1]` are considered different sequences.

### Example 1

```text
Input: n = 5, k = 3
Output: 3
Explanation: The sequences of length k = 3 whose sum is 5 are:

Sequence    Product        Parity
[1, 1, 3]   1 * 1 * 3 = 3  Odd
[1, 2, 2]   1 * 2 * 2 = 4  Even
[2, 1, 2]   2 * 1 * 2 = 4  Even
[2, 2, 1]   2 * 2 * 1 = 4  Even
[1, 3, 1]   1 * 3 * 1 = 3  Odd
[3, 1, 1]   3 * 1 * 1 = 3  Odd

There are 3 sequences with an even product, thus the answer is 3.
```

### Example 2

```text
Input: n = 3, k = 2
Output: 2
Explanation: The sequences of length k = 2 whose sum is 3 are:

Sequence    Product      Parity
[1, 2]      1 * 2 = 2    Even
[2, 1]      2 * 1 = 2    Even

There are 2 sequences with an even product, thus the answer is 2.
```

### Example 3

```text
Input: n = 5, k = 5
Output: 0
Explanation: The only possible sequence of length k = 5 whose sum is 5 is [1, 1, 1, 1, 1], which has an odd product. Thus, the answer is 0.
```

### Constraints

- `1 <= n <= 5 * 10⁵`
- `1 <= k <= n`

## Hints

### Hint 1

Count all sequences of k positive integers with sum n, then subtract those
whose product is odd.

### Hint 2

Using stars and bars, the total number of such sequences is C(n - 1, k - 1).

### Hint 3

The product is odd exactly when every element is odd. Write each element as
2 * x + 1 and count the resulting non-negative solutions.

### Hint 4

If n - k is odd, no sequence consisting entirely of odd integers exists.
Otherwise, subtract C((n + k) / 2 - 1, k - 1).
