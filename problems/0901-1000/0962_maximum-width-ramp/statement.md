# Maximum Width Ramp

## Description

A ramp in an integer array `nums` is a pair of indices `(i, j)` with `i < j`
and `nums[i] <= nums[j]` — a later element that does not fall below an earlier
one. The width of a ramp is the distance `j - i` between its two positions.

Given an integer array `nums`, report the maximum width of a ramp in `nums`, or
`0` if no ramp exists. Equal values qualify: the comparison is `<=`, so a later
copy of an earlier value forms a ramp.

### Example 1

```text
Input: nums = [6,0,8,2,1,5]
Output: 4
Explanation: The widest ramp is (1, 5): nums[1] = 0 and nums[5] = 5, and
0 <= 5, so its width is 5 - 1 = 4.
```

### Example 2

```text
Input: nums = [9,8,1,0,1,9,4,0,4,1]
Output: 7
Explanation: The widest ramp is (2, 9): nums[2] = 1 and nums[9] = 1, and
equal values qualify, so its width is 9 - 2 = 7.
```

### Constraints

- `2 <= nums.length <= 5 * 10⁴`
- `0 <= nums[i] <= 5 * 10⁴`
