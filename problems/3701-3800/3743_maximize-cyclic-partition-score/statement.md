# Maximize Cyclic Partition Score

## Description

You are given a cyclic integer array nums and an integer k.

Partition nums into at most k subarrays. Because nums is cyclic, a subarray
may wrap around from the end of the array back to its beginning.

The range of a subarray is the difference between its maximum and minimum
values. The score of a partition is the sum of the ranges of its subarrays.

Return the maximum possible score over all cyclic partitions into at most k
subarrays. Note that using fewer than k subarrays is allowed.

### Example 1

```text
Input: nums = [1,2,3,3], k = 2
Output: 3
Explanation: Partition nums into [2,3] and [3,1], where [3,1] wraps around
from the end of the array back to the beginning. The range of [2,3] is
3 - 2 = 1 and the range of [3,1] is 3 - 1 = 2, so the score is 1 + 2 = 3.
```

### Example 2

```text
Input: nums = [1,2,3,3], k = 1
Output: 2
Explanation: The only partition is the single subarray [1,2,3,3], whose
range is 3 - 1 = 2.
```

### Example 3

```text
Input: nums = [1,2,3,3], k = 4
Output: 3
Explanation: Identical to example 1; nums may be partitioned into fewer than
k subarrays.
```

### Constraints

- `1 <= nums.length <= 1000`
- `1 <= nums[i] <= 10^9`
- `1 <= k <= nums.length`

## Hints

### Hint 1

Think of each subarray as contributing two marked elements: its maximum and
its minimum. A partition into at most k subarrays therefore selects at most
2k marks.

### Hint 2

Selecting an element as a maximum adds nums[i] to the score and selecting it
as a minimum subtracts nums[i]; every selected element must be paired with
exactly one opposite mark next to it on the cycle.

### Hint 3

Scan the array once keeping states for how many pairs have been completed
and which marks are still waiting for their partners; the cyclic seam is
handled by tracking whether one pair is still open across it.
