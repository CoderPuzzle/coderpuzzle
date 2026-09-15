# Find a Value of a Mysterious Function Closest to Target

## Description

You are given an integer array `arr` and an integer `target`. Define
`func(arr, l, r)` as the bitwise AND of every element from index `l` to
index `r`, inclusive:

```text
func(arr, l, r) = arr[l] & arr[l + 1] & ... & arr[r]
```

Find the values `l` and `r` (with `0 <= l, r < arr.length`) that make
`|func(arr, l, r) - target|` as small as possible, and return that
minimum possible value.

![diagram](figures/1521-1.svg)

### Example 1

```text
Input: arr = [9,12,3,7,15], target = 5
Output: 2
Explanation: Calling func with every pair [l,r] produces the values
[9,12,3,7,15,8,0,3,7,0,0,3,0,0,0]. The value closest to 5 is 7 (or 3),
so the minimum difference is 2.
```

### Example 2

```text
Input: arr = [1000000,1000000,1000000], target = 1
Output: 999999
Explanation: Every call to func returns 1000000, so the minimum
difference is 999999.
```

### Example 3

```text
Input: arr = [1,2,4,8,16], target = 0
Output: 0
```

### Constraints

- `1 <= arr.length <= 10⁵`
- `1 <= arr[i] <= 10⁶`
- `0 <= target <= 10⁷`

## Hints

### Hint 1

For a fixed left endpoint `l`, the value of `func(arr, l, r)` never
increases as `r` grows: bitwise AND can only clear bits, never set them.

### Hint 2

For each right endpoint, track the set of distinct AND-values over every
subarray ending there. That set only grows by clearing bits, so it stays
small, and it updates cheaply from the previous endpoint's set.
