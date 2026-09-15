# Range Sum Query - Immutable

## Description

Given an integer array `nums`, handle multiple queries of the following type:

1. Calculate the sum of the elements of `nums` between indices `left` and
   `right` **inclusive** where `left <= right`.

The array never changes after construction, so preprocessing it once is fair
game.

Implement the `NumArray` class:

- `NumArray(int[] nums)` Initializes the object with the integer array `nums`.
- `int sumRange(int left, int right)` Returns the sum of the elements of
  `nums` between indices `left` and `right` inclusive (i.e.
  `nums[left] + nums[left + 1] + ... + nums[right]`).

### Example 1

```text
Input:
["NumArray", "sumRange", "sumRange", "sumRange"]
[[[-2, 0, 3, -5, 2, -1]], [0, 2], [2, 5], [0, 5]]
Output: [null, 1, -1, -3]
Explanation:
NumArray numArray = new NumArray([-2, 0, 3, -5, 2, -1]);
numArray.sumRange(0, 2); // return (-2) + 0 + 3 = 1
numArray.sumRange(2, 5); // return 3 + (-5) + 2 + (-1) = -1
numArray.sumRange(0, 5); // return (-2) + 0 + 3 + (-5) + 2 + (-1) = -3
```

### Example 2

```text
Input:
["NumArray", "sumRange", "sumRange", "sumRange"]
[[[100000, -100000]], [0, 0], [0, 1], [1, 1]]
Output: [null, 100000, 0, -100000]
Explanation:
NumArray numArray = new NumArray([100000, -100000]);
numArray.sumRange(0, 0); // return 100000
numArray.sumRange(0, 1); // return 100000 + (-100000) = 0
numArray.sumRange(1, 1); // return -100000
```

### Constraints

- `1 <= nums.length <= 10⁴`
- `-10⁵ <= nums[i] <= 10⁵`
- `0 <= left <= right < nums.length`
- At most `10⁴` calls will be made to `sumRange`.

### Follow-up

Could you preprocess `nums` in `O(n)` time so that every `sumRange` call is
answered in `O(1)` time?

## Hints

### Hint 1

Summing a slice on every query costs `O(n)` per call. Since the array never
changes, precompute something once so each query only combines a couple of
already-known numbers.

### Hint 2

Let `prefix[i]` be the sum of the first `i` elements (`prefix[0] = 0`). Build
the whole table in one left-to-right pass; each entry extends the previous one
by a single element.

### Hint 3

A range sum is the difference of two prefixes:
`sumRange(left, right) = prefix[right + 1] - prefix[left]`. Both entries are
already computed, so the query is one subtraction.
