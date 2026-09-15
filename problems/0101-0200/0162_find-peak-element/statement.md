# Find Peak Element

## Description

A peak element is an element that is strictly greater than its neighbors.

Given a 0-indexed integer array `nums`, find a peak element, and return its
index. If the array contains multiple peaks, return the index of the
leftmost peak.

You may imagine that `nums[-1] = nums[n] = -infinity`. In other words, an
element is always considered to be strictly greater than a neighbor that is
outside the array.

### Example 1

```text
Input: nums = [1,2,3,1]
Output: 2
Explanation: 3 is a peak element and its index is 2.
```

### Example 2

```text
Input: nums = [1,2,1,3,5,6,4]
Output: 1
Explanation: 2 is a peak element at index 1 and 6 is a peak element at index 5;
the leftmost peak is at index 1.
```

### Constraints

- `1 <= nums.length <= 1000`
- `-2^31 <= nums[i] <= 2^31 - 1`
- `nums[i] != nums[i + 1]` for all valid `i`.

## Hints

### Hint 1

The leftmost peak is the first index i where nums[i] > nums[i + 1]: every earlier index climbs, so such an i is greater than both neighbors.

### Hint 2

If the array is strictly increasing, there is no such index and the leftmost peak is the last index.

### Hint 3

Treat the positions just outside the array as -infinity so index 0 and index n - 1 can be peaks.
