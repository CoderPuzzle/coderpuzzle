# Count the Number of Arrays with K Matching Adjacent Elements

## Description

You are given three integers `n`, `m`, `k`. A good array `arr` of size `n` is
defined as follows:

- Each element in `arr` is in the inclusive range `[1, m]`.
- Exactly `k` indices `i` (where `1 <= i < n`) satisfy the condition
  `arr[i - 1] == arr[i]`.

Return the number of good arrays that can be formed.

Since the answer may be very large, return it modulo `10⁹ + 7`.

### Example 1

```text
Input: n = 3, m = 2, k = 1
Output: 4
Explanation: There are 4 good arrays. They are [1, 1, 2], [1, 2, 2], [2, 1, 1] and [2, 2, 1].
Hence, the answer is 4.
```

### Example 2

```text
Input: n = 4, m = 2, k = 2
Output: 6
Explanation: The good arrays are [1, 1, 1, 2], [1, 1, 2, 2], [1, 2, 2, 2], [2, 1, 1, 1], [2, 2, 1, 1] and [2, 2, 2, 1].
Hence, the answer is 6.
```

### Example 3

```text
Input: n = 5, m = 2, k = 0
Output: 2
Explanation: The good arrays are [1, 2, 1, 2, 1] and [2, 1, 2, 1, 2]. Hence, the answer is 2.
```

### Constraints

- `1 <= n <= 10⁵`
- `1 <= m <= 10⁵`
- `0 <= k <= n - 1`

## Hints

### Hint 1

The first position arr[0] has m choices.

### Hint 2

For each of the remaining n - 1 indices, select the k positions (from left to right) where arr[i] = arr[i - 1] is forced.

### Hint 3

For all other indices, set arr[i] != arr[i - 1] with (m - 1) choices for each of the n - 1 - k positions.
