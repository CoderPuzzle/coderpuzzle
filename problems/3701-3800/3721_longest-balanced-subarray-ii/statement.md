# Longest Balanced Subarray II

## Description

You are given an integer array `nums`.

A subarray of `nums` is called **balanced** when the number of distinct even
values it contains equals the number of distinct odd values it contains.
Distinctness is over values, not positions: a value that occurs several times
inside the subarray still counts once. A balanced subarray therefore always
contains at least one even and one odd value, and the shortest it can be is
length 2.

Return the length of the longest balanced subarray of `nums`, or `0` if no
balanced subarray exists.

### Example 1

```text
Input: nums = [2,5,4,3]
Output: 4
Explanation: The whole array is balanced. Its distinct even values are 2 and
4 and its distinct odd values are 5 and 3 — two of each.
```

### Example 2

```text
Input: nums = [3,2,2,5,4]
Output: 5
Explanation: Again the whole array is balanced: the distinct even values are
2 and 4 and the distinct odd values are 3 and 5. The repeated 2 still counts
only once.
```

### Example 3

```text
Input: nums = [1,2,3,2]
Output: 3
Explanation: The subarray [2,3,2] has one distinct even value (2) and one
distinct odd value (3), so it is balanced. No longer balanced subarray
exists.
```

### Constraints

- `1 <= nums.length <= 10⁵`
- `1 <= nums[i] <= 10⁵`

## Hints

### Hint 1

Score a window by `g = (distinct odds) - (distinct evens)`; a window is
balanced exactly when `g` holds zero, and each value contributes its sign to
precisely those windows that contain it.

### Hint 2

Keep a segment tree indexed by right endpoint whose entry `r` holds `g` of
the window starting at the current left end. Support range addition, and
store both minimum and maximum per node so an entry equal to zero can be
detected and located.

### Hint 3

Seed the scores for left end 0 with one range add per distinct value: a
value contributes its sign (+1 odd, -1 even) to every right end from its
first occurrence onward. Precompute each position's next occurrence of the
same value.

### Hint 4

Slide the left end forward: leaving value `v` withdraws its sign exactly on
right ends before its next occurrence, where a later copy takes over the
counting. After each step, the rightmost zero among ends at or after `l`
spans the longest balanced window for this left end.
