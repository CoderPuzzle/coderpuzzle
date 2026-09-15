# Minimum Operations to Make Array Equal

## Description

You have an array `arr` of length `n` where `arr[i] = (2 * i) + 1` for
every `0 <= i < n`. In other words, `arr` is `[1, 3, 5, ..., 2n - 1]`; it
is never passed in directly, only `n` is given.

In one operation you may select two indices `x` and `y` with
`0 <= x, y < n` and simultaneously subtract `1` from `arr[x]` and add `1`
to `arr[y]` (that is, `arr[x] -= 1` and `arr[y] += 1`). The goal is to
make every element of `arr` equal. It is guaranteed this is always
achievable.

Given the integer `n`, return the minimum number of operations needed to
make all elements of `arr` equal.

### Example 1

```text
Input: n = 3
Output: 2
Explanation: arr = [1, 3, 5].
Choose x = 2, y = 0: arr becomes [2, 3, 4].
Choose x = 2, y = 0 again: arr becomes [3, 3, 3].
```

### Example 2

```text
Input: n = 6
Output: 9
```

### Constraints

- `1 <= n <= 10⁴`

## Hints

### Hint 1

Build `arr` from the given formula and let `target = sum(arr) / n`.

### Hint 2

How many operations are needed to turn `arr` into an array of all
`target`s?
