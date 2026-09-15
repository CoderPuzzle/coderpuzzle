# Three Equal Parts

## Description

You are given an array `arr` consisting of only zeros and ones. Divide the
array into three non-empty parts such that all of these parts represent the
same binary value.

If it is possible, return `[i, j]` with `i + 1 < j`, such that:

- `arr[0], arr[1], ..., arr[i]` is the first part,
- `arr[i + 1], arr[i + 2], ..., arr[j - 1]` is the second part, and
- `arr[j], arr[j + 1], ..., arr[arr.length - 1]` is the third part.
- All three parts have equal binary values.

If it is not possible, return `[-1, -1]`.

Note that the entire part is used when considering what binary value it
represents. For example, `[1,1,0]` represents 6 in decimal, not 3. Also,
leading zeros are allowed, so `[0,1,1]` and `[1,1]` represent the same value.

More than one pair can work only when every element of `arr` is 0. For
deterministic judging, return the pair with the smallest `i` and, among
those, the smallest `j`.

### Example 1

```text
Input: arr = [1,0,1,0,1]
Output: [0,3]
Explanation: The three parts are [1], [0,1], and [0,1]. Each represents the
binary value 1.
```

### Example 2

```text
Input: arr = [1,1,0,1,1]
Output: [-1,-1]
Explanation: The array holds four 1s. Three equal parts would repeat one
binary value three times, so the total number of 1s would have to be
divisible by 3 — and four is not.
```

### Example 3

```text
Input: arr = [1,1,0,0,1]
Output: [0,2]
Explanation: The three parts are [1], [1], and [0,0,1]. Each represents the
binary value 1; the leading zeros in the third part do not change its value.
```

### Constraints

- `3 <= arr.length <= 3 * 10⁴`
- `arr[i]` is either `0` or `1`.
