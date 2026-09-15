# Sort Array by Moving Items to Empty Space

## Description

You are given an integer array `nums` of size `n` containing each element
from `0` to `n - 1` (inclusive). Each of the elements from `1` to `n - 1`
represents an item, and the element `0` represents an empty space.

In one operation, you can move any item to the empty space. `nums` is
considered to be sorted if the numbers of all the items are in ascending order
and the empty space is either at the beginning or at the end of the array.

For example, if `n = 4`, `nums` is sorted if `[0,1,2,3]` or `[1,2,3,0]`, and
considered to be unsorted otherwise.

Return the minimum number of operations needed to sort `nums`.

### Example 1

```text
Input: nums = [4,2,0,3,1]
Output: 3
Explanation:
- Move item 2 to the empty space. Now, nums = [4,0,2,3,1].
- Move item 1 to the empty space. Now, nums = [4,1,2,3,0].
- Move item 4 to the empty space. Now, nums = [0,1,2,3,4].
It can be proven that 3 is the minimum number of operations needed.
```

### Example 2

```text
Input: nums = [1,2,3,4,0]
Output: 0
Explanation: nums is already sorted so return 0.
```

### Example 3

```text
Input: nums = [1,0,2,4,3]
Output: 2
Explanation:
- Move item 2 to the empty space. Now, nums = [1,2,0,4,3].
- Move item 3 to the empty space. Now, nums = [1,2,3,4,0].
It can be proven that 2 is the minimum number of operations needed.
```

### Constraints

- `n == nums.length`
- `2 <= n <= 10⁵`
- `0 <= nums[i] < n`
- All the values of `nums` are unique.

## Hints

### Hint 1

There are two possibilities for nums to be sorted. Find the minimum number of operations needed for the first possibility, then for the second; the answer is the minimum of the two.

### Hint 2

If the empty space is not at its ending position, move the item that should be where the empty space is to the empty space.

### Hint 3

If the empty space is at its ending position, move an out-of-place item to the empty space.
