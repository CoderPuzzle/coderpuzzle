# Count Subarrays With Majority Element II

## Description

You are given an integer array `nums` and an integer `target`.

A subarray is a non-empty, contiguous run of elements `nums[l...r]`. The
majority element of a subarray of length `m` is the element that occurs
strictly more than half of the times in it — an element that appears exactly
half of the times does not qualify.

Return the number of subarrays of `nums` in which `target` is the majority
element.

### Example 1

```text
Input: nums = [1,2,2,3], target = 2
Output: 5
Explanation: The subarrays in which 2 is the majority element are
nums[1..1] = [2], nums[2..2] = [2], nums[1..2] = [2,2], nums[0..2] =
[1,2,2], and nums[1..3] = [2,2,3].
```

### Example 2

```text
Input: nums = [1,1,1,1], target = 1
Output: 10
Explanation: All 10 subarrays consist only of 1s, so 1 is the majority
element of every one of them.
```

### Example 3

```text
Input: nums = [1,2,3], target = 4
Output: 0
Explanation: 4 does not appear in nums at all, so there cannot be any
subarray where 4 is the majority element.
```

### Constraints

- `1 <= nums.length <= 10⁵`
- `1 <= nums[i] <= 10⁹`
- `1 <= target <= 10⁹`

## Hints

### Hint 1

Replace each element with a score: +1 when it equals `target` and -1
otherwise. A subarray has `target` as its majority element exactly when its
scores sum to a positive number.

### Hint 2

Move to prefix sums of those scores: `pref[0] = 0` and `pref[k] =
pref[k - 1] + score(nums[k - 1])` for `k = 1..n`. The subarray `(i, j]`
qualifies exactly when `pref[j] > pref[i]`.

### Hint 3

The task is now to count pairs `i < j` with `pref[i] < pref[j]`.

### Hint 4

Prefix values stay within `[-n, n]`, so they compress trivially. Sweep `k`
from `0` to `n` with a Fenwick tree (or an ordered map) over those values:
query how many earlier prefixes are below `pref[k]`, add that to the
answer, then insert `pref[k]`.

### Hint 5

If `target` never appears in `nums`, no subarray can qualify and the answer
is `0`.
