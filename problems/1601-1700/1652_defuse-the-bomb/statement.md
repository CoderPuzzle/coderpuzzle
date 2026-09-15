# Defuse the Bomb

## Description

You are handed a bomb-defusing puzzle: a circular integer array `code` of
length `n`, together with an integer key `k`. You must replace every
number in `code` at once, all replacements computed from the original
array, according to these rules:

- If `k > 0`, replace the `i`-th number with the sum of the **next** `k`
  numbers.
- If `k < 0`, replace the `i`-th number with the sum of the **previous**
  `|k|` numbers.
- If `k == 0`, replace the `i`-th number with `0`.

Because `code` is circular, the element after `code[n - 1]` is `code[0]`,
and the element before `code[0]` is `code[n - 1]`.

Return the decrypted array.

### Example 1

```text
Input: code = [5,7,1,4], k = 3
Output: [12,10,16,13]
Explanation: Each number is replaced by the sum of the next 3 numbers.
The decrypted code is [7+1+4, 1+4+5, 4+5+7, 5+7+1]. The sums wrap around
the end of the array.
```

### Example 2

```text
Input: code = [1,2,3,4], k = 0
Output: [0,0,0,0]
Explanation: When k is zero, every number is replaced by 0.
```

### Example 3

```text
Input: code = [2,4,9,3], k = -2
Output: [12,5,6,13]
Explanation: The decrypted code is [3+9, 2+3, 4+2, 9+4]. The sums wrap
around the start of the array, since k is negative.
```

### Constraints

- `n == code.length`
- `1 <= n <= 100`
- `1 <= code[i] <= 100`
- `-(n - 1) <= k <= n - 1`

## Hints

### Hint 1

As the array is circular, use the modulo operator to find the correct
index once you step past either end.

### Hint 2

The constraints are small enough that a direct, brute-force computation
of every sum is fast enough.
