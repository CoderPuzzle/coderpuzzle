# Count Bowl Subarrays

## Description

You are given an integer array `nums` whose elements are pairwise distinct.

A subarray `nums[l...r]` is called a bowl when it is long enough to hold one
and its two rims tower over everything in between:

- It spans at least three positions: `r - l + 1 >= 3`.
- The smaller of its two ends is strictly greater than every element strictly
  between them: `min(nums[l], nums[r]) > max(nums[l + 1], ..., nums[r - 1])`.

The interior may dip as deep as it likes — only its ceiling matters. Return
how many subarrays of `nums` are bowls.

### Example 1

```text
Input: nums = [2,5,3,1,4]
Output: 2
Explanation: The bowls are [3,1,4] and [5,3,1,4]. [3,1,4] qualifies because
min(3, 4) = 3 is strictly greater than its interior maximum max(1) = 1, and
[5,3,1,4] qualifies because min(5, 4) = 4 is strictly greater than
max(3, 1) = 3.
```

### Example 2

```text
Input: nums = [5,1,2,3,4]
Output: 3
Explanation: The bowls are [5,1,2], [5,1,2,3], and [5,1,2,3,4]: after
dipping to 1 the array climbs monotonically without ever regaining 5, so
every run that starts at the leading 5 and ends somewhere on that climb is
a bowl.
```

### Example 3

```text
Input: nums = [1000000000,999999999,999999998]
Output: 0
Explanation: The array descends from start to finish, so no subarray rises
strictly above its own interior at both ends.
```

### Constraints

- `3 <= nums.length <= 10⁵`
- `1 <= nums[i] <= 10⁹`
- The elements of `nums` are pairwise distinct.

## Hints

### Hint 1

Use monotonic stacks to find the nearest strictly greater elements on both
sides.

### Hint 2

The bowl condition compares both ends with the maximum of the middle — avoid
recomputing that maximum from scratch by preprocessing.

### Hint 3

Think in terms of "valid endpoints" rather than enumerating all subarrays.

### Hint 4

There's symmetry: you can handle both (left endpoint is smaller) and (right
endpoint is smaller) cases separately.
