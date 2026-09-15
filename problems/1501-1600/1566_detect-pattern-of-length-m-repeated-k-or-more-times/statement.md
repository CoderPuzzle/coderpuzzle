# Detect Pattern of Length M Repeated K or More Times

## Description

You are given an array of positive integers `arr`. Determine whether there
exists a pattern of length `m` that repeats `k` or more times, back to back,
somewhere inside `arr`.

A pattern is a subarray — a consecutive run of elements — of length `m` that
is repeated multiple times **consecutively and without overlapping**. A
pattern is fully described by its length and how many times it repeats.

Return `true` if some pattern of length `m` repeats `k` or more times
consecutively, otherwise return `false`.

### Example 1

```text
Input: arr = [1,2,4,4,4,4], m = 1, k = 3
Output: true
Explanation: The pattern (4) of length 1 repeats 4 times in a row. A pattern
may repeat more than k times and still count.
```

### Example 2

```text
Input: arr = [1,2,1,2,1,1,1,3], m = 2, k = 2
Output: true
Explanation: The pattern (1,2) of length 2 repeats consecutively 2 times
starting at index 0. The pattern (2,1) starting at index 1 also repeats 2
times.
```

### Example 3

```text
Input: arr = [1,2,1,2,1,3], m = 2, k = 3
Output: false
Explanation: The pattern (1,2) has length 2 but only repeats 2 times
consecutively. No length-2 pattern repeats 3 or more times.
```

### Constraints

- `2 <= arr.length <= 100`
- `1 <= arr[i] <= 100`
- `1 <= m <= 100`
- `2 <= k <= 100`

## Hints

### Hint 1

Check every possible starting position and every possible pattern length
`m`, and count how many times the block starting there repeats
consecutively.

### Hint 2

You don't need to re-slice and compare whole subarrays each time: track how
many consecutive positions `i` satisfy `arr[i] == arr[i - m]`. A run of
`m * (k - 1)` such matches means the length-`m` block just before the run
has repeated `k` times.
