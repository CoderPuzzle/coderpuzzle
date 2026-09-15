# Number of Valid Subarrays

## Description

Given an integer array `nums`, return the number of non-empty subarrays with
the leftmost element of the subarray not larger than other elements in the
subarray.

A subarray is a contiguous part of an array.

### Example 1

```text
Input: nums = [1,4,2,5,3]
Output: 11
Explanation: There are 11 valid subarrays: [1],[4],[2],[5],[3],[1,4],[2,5],
[1,4,2],[2,5,3],[1,4,2,5],[1,4,2,5,3].
```

### Example 2

```text
Input: nums = [3,2,1]
Output: 3
Explanation: The 3 valid subarrays are: [3],[2],[1].
```

### Example 3

```text
Input: nums = [2,2,2]
Output: 6
Explanation: There are 6 valid subarrays: [2],[2],[2],[2,2],[2,2],[2,2,2].
```

### Constraints

- `1 <= nums.length <= 5 * 10^4`
- `0 <= nums[i] <= 10^5`

## Hints

### Hint 1

For a subarray starting at index i, it stays valid until the first element strictly smaller than nums[i] appears.

### Hint 2

So the answer is the sum over all i of (index of the next strictly smaller element after i, or n) minus i.

### Hint 3

A monotonic stack computes the next strictly smaller element for every index in one linear pass.
