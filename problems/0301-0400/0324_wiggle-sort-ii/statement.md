# Wiggle Sort II

## Description

Given an integer array `nums`, reorder it such that
`nums[0] < nums[1] > nums[2] < nums[3] ...`.

You may assume the input array always has a valid answer.

On LeetCode the function modifies `nums` in place and returns nothing; here
the judge observes only the return value, so reorder `nums` in place and
return the reordered array.

Many orderings can wiggle the same array — the original judge accepts any of
them, so the guarantee above says only that one exists. For a deterministic
answer, the expected output is pinned to the canonical reverse interleave:
sort a copy of `nums` in ascending order, let `m = (n + 1) / 2` be the size
of the lower half, then write the first `m` sorted values in reverse order
into the even positions `0, 2, 4, ...` and the remaining `n - m` sorted
values in reverse order into the odd positions `1, 3, 5, ...`.

### Example 1

```text
Input: nums = [1,5,1,1,6,4]
Output: [1,6,1,5,1,4]
Explanation: [1,4,1,5,1,6] is also accepted; the pinned procedure produces
exactly this output.
```

### Example 2

```text
Input: nums = [1,3,2,2,3,1]
Output: [2,3,1,3,1,2]
```

### Constraints

- `1 <= nums.length <= 5 * 10⁴`
- `0 <= nums[i] <= 5000`
- It is guaranteed that there will be an answer for the given input `nums`.

### Follow-up

Can you do it in `O(n)` time and/or in-place with `O(1)` extra space?
