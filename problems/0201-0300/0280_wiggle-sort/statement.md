# Wiggle Sort

## Description

Given an integer array `nums`, reorder it such that
`nums[0] <= nums[1] >= nums[2] <= nums[3] ...`.

You may assume the input array always has a valid answer.

On LeetCode the function modifies `nums` in place and returns nothing; here
the judge observes only the return value, so reorder `nums` in place and
return the reordered array.

Many orderings can wiggle the same array — the original judge accepts any of
them, so the guarantee above says only that one exists. For a deterministic
answer, the expected output is pinned to the canonical one-pass repair: scan
`i` from `1` to the end, and whenever the pair `(nums[i-1], nums[i])` breaks
the relation its position demands — `nums[i-1] <= nums[i]` when `i` is odd,
`nums[i-1] >= nums[i]` when `i` is even — swap the two elements in place;
leave a pair that already satisfies its relation alone.

### Example 1

```text
Input: nums = [3,5,2,1,6,4]
Output: [3,5,1,6,2,4]
Explanation: [1,6,2,5,3,4] also wiggles the array; the pinned procedure
produces exactly this output.
```

### Example 2

```text
Input: nums = [6,6,5,6,3,8]
Output: [6,6,5,6,3,8]
```

### Constraints

- `1 <= nums.length <= 5 * 10⁴`
- `0 <= nums[i] <= 10⁴`
- It is guaranteed that there will be a valid answer for the given input
  `nums`.

### Follow-up

Could you solve the problem in `O(n)` time complexity?
