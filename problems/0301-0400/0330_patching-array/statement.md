# Patching Array

## Description

Given a sorted integer array `nums` and an integer `n`, add/patch elements
to the array such that any number in the range `[1, n]` inclusive can be
formed by the sum of some elements in the array.

Return the minimum number of patches required.

### Example 1

```text
Input: nums = [1,3], n = 6
Output: 1
Explanation:
Combinations of nums are [1], [3], [1,3], which form possible sums of: 1, 3, 4.
Now if we add/patch 2 to nums, the combinations are: [1], [2], [3], [1,3], [2,3], [1,2,3].
Possible sums are 1, 2, 3, 4, 5, 6, which now covers the range [1, 6].
So we only need 1 patch.
```

### Example 2

```text
Input: nums = [1,5,10], n = 20
Output: 2
Explanation: The two patches can be [2, 4].
```

### Example 3

```text
Input: nums = [1,2,2], n = 5
Output: 0
```

### Constraints

- `1 <= nums.length <= 1000`
- `1 <= nums[i] <= 10^4`
- `nums` is sorted in ascending order.
- `1 <= n <= 2^31 - 1`

## Hints

### Hint 1

Track miss, the smallest positive sum that cannot be formed yet; every sum in [1, miss) is already covered.

### Hint 2

If the next unused element of nums is <= miss, consuming it extends the covered range to [1, miss + nums[i]) with no patch.

### Hint 3

Otherwise there is a gap: patch miss itself, which is optimal because it doubles the covered range to [1, 2 * miss).

### Hint 4

Count the patches added and stop as soon as miss exceeds n.
