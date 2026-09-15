# Decode XORed Permutation

## Description

There is an integer array `perm` that is a permutation of the first `n`
positive integers, where `n` is always odd.

It was encoded into another integer array `encoded` of length `n - 1`,
such that `encoded[i] = perm[i] XOR perm[i + 1]`. For example, if
`perm = [1,3,2]`, then `encoded = [2,1]`.

Given the encoded array, return the original array `perm`. It is
guaranteed that the answer exists and is unique.

### Example 1

```text
Input: encoded = [3,1]
Output: [1,2,3]
Explanation: If perm = [1,2,3], then encoded = [1 XOR 2,2 XOR 3] = [3,1]
```

### Example 2

```text
Input: encoded = [6,5,4,6]
Output: [2,4,1,5,3]
```

### Constraints

- `3 <= n < 10⁵`
- `n` is odd.
- `encoded.length == n - 1`

## Hints

### Hint 1

Compute the XOR of the numbers between 1 and `n`, and think about how it
can be used. Let it be `x`.

### Hint 2

Think about why `n` is odd.

### Hint 3

`perm[0] = x XOR encoded[1] XOR encoded[3] XOR encoded[5] ...`

### Hint 4

`perm[i] = perm[i - 1] XOR encoded[i - 1]`
