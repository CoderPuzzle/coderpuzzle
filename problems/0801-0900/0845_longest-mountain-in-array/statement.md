# Longest Mountain in Array

## Description

An array `arr` is a mountain when it has at least `3` elements and there is
some index `i` with `0 < i < arr.length - 1` such that
`arr[0] < arr[1] < ... < arr[i - 1] < arr[i]` and
`arr[i] > arr[i + 1] > ... > arr[arr.length - 1]`: the values strictly
increase up to `arr[i]`, the peak, and strictly decrease after it. The peak
cannot sit at either end, and equal neighbors break both slopes.

Given an integer array `arr`, return the length of the longest subarray,
which is a mountain. Return `0` if there is no mountain subarray.

### Example 1

```text
Input: arr = [2,1,4,7,3,2,5]
Output: 5
Explanation: The largest mountain is [1,4,7,3,2], which has length 5.
```

### Example 2

```text
Input: arr = [2,2,2]
Output: 0
Explanation: There is no mountain.
```

### Constraints

- `1 <= arr.length <= 10⁴`
- `0 <= arr[i] <= 10⁴`

### Follow up

Can you solve it using only one pass?
Can you solve it in `O(1)` space?
