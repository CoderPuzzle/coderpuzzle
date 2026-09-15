# Longest Non-Decreasing Subarray After Replacing at Most One Element

## Description

You are given an integer array nums.

You may pick at most one index and overwrite its element with any integer
you like — the new value is unbounded, and it may even equal the old one —
or you may leave the array untouched altogether.

Return the length of the longest non-decreasing subarray that can be
obtained this way. A subarray occupies contiguous positions, and an array
is non-decreasing when every element is greater than or equal to the one
before it.

### Example 1

```text
Input: nums = [1,2,3,1,2]
Output: 4
Explanation: Overwrite the element 1 at index 3 with a 3, giving
[1,2,3,3,2]. Its prefix [1,2,3,3] is non-decreasing with length 4, and no
single replacement reaches 5.
```

### Example 2

```text
Input: nums = [2,2,2,2,2]
Output: 5
Explanation: The array is already non-decreasing, so without spending the
replacement at all, the whole array forms a subarray of length 5.
```

### Example 3

```text
Input: nums = [9,1,2,3]
Output: 4
Explanation: Overwrite the leading 9 with any value of 1 or smaller, say 0,
to get [0,1,2,3], which is non-decreasing from end to end.
```

### Constraints

- `1 <= nums.length <= 10⁵`
- `-10⁹ <= nums[i] <= 10⁹`

## Hints

### Hint 1

Scan once left to right to build `pref`, where `pref[i]` is the length of
the longest non-decreasing run ending at `i`; scan back right to left for
`suff`, the longest run starting at `i`.

### Hint 2

Skipping the replacement entirely leaves the best untouched run, so start
from `max(max(pref), max(suff))`.

### Hint 3

A replaced slot can also extend just one side. Because the new value is an
unbounded integer, `pref[i - 1] + 1` and `suff[i + 1] + 1` are always
achievable whenever those neighbors exist.

### Hint 4

One replacement bridges both sides only when the gap closes from inside:
whenever `nums[i - 1] <= nums[i + 1]`, a value between them joins the two
runs for `pref[i - 1] + suff[i + 1] + 1`.
