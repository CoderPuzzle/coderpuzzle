# Range Sum Query - Mutable

## Description

Given an integer array `nums`, handle multiple queries of the following types:

1. Update the value of an element in `nums`.
2. Calculate the sum of the elements of `nums` between indices `left` and
   `right` **inclusive** where `left <= right`.

Implement the `NumArray` class:

- `NumArray(int[] nums)` Initializes the object with the integer array `nums`.
- `void update(int index, int val)` Updates the value of `nums[index]` to be
  `val`.
- `int sumRange(int left, int right)` Returns the sum of the elements of
  `nums` between indices `left` and `right` inclusive (i.e.
  `nums[left] + nums[left + 1] + ... + nums[right]`).

### Example 1

```text
Input:
["NumArray", "sumRange", "update", "sumRange"]
[[[1, 3, 5]], [0, 2], [1, 2], [0, 2]]
Output: [null, 9, null, 8]
Explanation:
NumArray numArray = new NumArray([1, 3, 5]);
numArray.sumRange(0, 2); // return 1 + 3 + 5 = 9
numArray.update(1, 2);   // nums = [1, 2, 5]
numArray.sumRange(0, 2); // return 1 + 2 + 5 = 8
```

### Example 2

```text
Input:
["NumArray", "update", "update", "sumRange", "sumRange"]
[[[-10, 0, 10]], [0, -100], [2, 100], [0, 2], [1, 2]]
Output: [null, null, null, 0, 100]
Explanation:
NumArray numArray = new NumArray([-10, 0, 10]);
numArray.update(0, -100);  // nums = [-100, 0, 10]
numArray.update(2, 100);   // nums = [-100, 0, 100]
numArray.sumRange(0, 2);   // return -100 + 0 + 100 = 0
numArray.sumRange(1, 2);   // return 0 + 100 = 100
```

### Constraints

- `1 <= nums.length <= 3 * 10⁴`
- `-100 <= nums[i] <= 100`
- `0 <= index < nums.length`
- `-100 <= val <= 100`
- `0 <= left <= right < nums.length`
- At most `5 * 10⁴` calls in total will be made to `update` and `sumRange`.

### Follow-up

Could you implement both `update` and `sumRange` in `O(log n)` time, where
`n = nums.length`?

## Hints

### Hint 1

Recomputing a range sum by scanning the array costs `O(n)` per query — and so
does rebuilding prefix sums on every update. Look for a structure that keeps
**partial sums** so both operations touch only a few of them.

### Hint 2

A Fenwick tree (binary indexed tree) stores, at each 1-based position `i`, the
sum of the range of length `i & (-i)` ending at `i`. Walking `i -= i & (-i)`
collects disjoint ranges covering a prefix, and `i += i & (-i)` climbs from a
changed cell to every range that contains it.

### Hint 3

Express a range sum as a difference of prefixes: `sumRange(l, r)` equals
`prefix(r + 1) - prefix(l)`. For an update, add the **delta**
`val - nums[index]` (and remember the new value so the next delta is correct).
