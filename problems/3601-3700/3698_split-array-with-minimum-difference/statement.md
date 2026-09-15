# Split Array With Minimum Difference

## Description

You are given an integer array `nums`.

Pick a split index `i` (0-indexed) and cut `nums` into exactly two non-empty
contiguous parts: the left part `nums[0..i]` and the right part
`nums[i+1..n-1]`, where `n` is the length of `nums`. The split is valid when
the left part is strictly increasing and the right part is strictly
decreasing. A part made of a single element is both strictly increasing and
strictly decreasing.

Return the minimum possible absolute difference between the sum of the left
part and the sum of the right part over all valid splits. If no valid split
exists, return `-1`.

### Example 1

```text
Input: nums = [1,3,2]
Output: 2
Explanation: There are two valid splits:
- i = 0: left = [1], right = [3,2]; the difference is |1 - 5| = 4.
- i = 1: left = [1,3], right = [2]; the difference is |4 - 2| = 2.
The minimum absolute difference is 2.
```

### Example 2

```text
Input: nums = [1,2,4,3]
Output: 4
Explanation: The split i = 0 gives right = [2,4,3], which is not strictly
decreasing, so it is invalid. The splits i = 1 (left = [1,2], right =
[4,3]) and i = 2 (left = [1,2,4], right = [3]) are both valid, with
differences |3 - 7| = 4 and |7 - 3| = 4. The minimum absolute difference
is 4.
```

### Example 3

```text
Input: nums = [3,1,2]
Output: -1
Explanation: For i = 0 the right part [1,2] is not strictly decreasing,
and for i = 1 the left part [3,1] is not strictly increasing, so no valid
split exists and the answer is -1.
```

### Constraints

- `2 <= nums.length <= 10⁵`
- `1 <= nums[i] <= 10⁵`

## Hints

### Hint 1

Build a prefix boolean `inc[i]` that is true iff the subarray `nums[0..i]` is
strictly increasing.

### Hint 2

Build a suffix boolean `dec[i]` that is true iff the subarray `nums[i..n-1]`
is strictly decreasing.

### Hint 3

A split after index `i` (where `0 <= i < n - 1`) is valid iff
`inc[i] && dec[i + 1]`.

### Hint 4

Build a prefix-sum array `pref`, and use it to check if a valid split exists.
If no valid split exists return `-1`.
