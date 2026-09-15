# Array of Doubled Pairs

## Description

Given an integer array `arr` of even length, return `true` if it is possible
to reorder `arr` such that `arr[2 * i + 1] = 2 * arr[2 * i]` for every
`0 <= i < len(arr) / 2`, or `false` otherwise.

In other words, the reordered array is read as consecutive pairs, and each
pair must be of the form `(x, 2 * x)`: the second member is exactly twice
the first. A zero pairs only with another zero. The relation keeps the sign —
the partner of a negative `x` is `2 * x`, which lies farther from zero, so
`-2` pairs with `-4` and a positive never pairs with a negative.

### Example 1

```text
Input: arr = [3,1,3,6]
Output: false
Explanation: The 1 has no 2 to pair with, and the two 3s would need two 6s
but only one 6 is present.
```

### Example 2

```text
Input: arr = [2,1,2,6]
Output: false
Explanation: The 1 must take a 2, but then the remaining 2 needs a 4 that is
not there, and the 6 has no 3 to pair with either.
```

### Example 3

```text
Input: arr = [4,-2,2,-4]
Output: true
Explanation: We can take two groups, [-2,-4] and [2,4], to form [-2,-4,2,4]
or [2,4,-2,-4]: in each, every second member is twice the first, since
2 * (-2) = -4 and 2 * 2 = 4.
```

### Constraints

- `2 <= arr.length <= 3 * 10⁴`
- `arr.length` is even.
- `-10⁵ <= arr[i] <= 10⁵`
