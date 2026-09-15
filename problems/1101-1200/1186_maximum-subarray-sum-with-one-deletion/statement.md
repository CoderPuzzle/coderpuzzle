# Maximum Subarray Sum with One Deletion

## Description

Given an array of integers, return the maximum sum for a non-empty subarray
(contiguous elements) with at most one element deletion. In other words, you
want to choose a subarray and optionally delete one element from it so that
there is still at least one element left and the sum of the remaining elements
is maximum possible.

Note that the subarray needs to be non-empty after deleting one element.

### Example 1

```text
Input: arr = [1,-2,0,3]
Output: 4
Explanation: Because we can choose [1, -2, 0, 3] and drop -2, thus the subarray [1, 0, 3] becomes the maximum value.
```

### Example 2

```text
Input: arr = [1,-2,-2,3]
Output: 3
Explanation: We just choose [3] and it's the maximum sum.
```

### Example 3

```text
Input: arr = [-1,-1,-1,-1]
Output: -1
Explanation: The final subarray needs to be non-empty. You can't choose [-1] and delete -1 from it, then get an empty subarray to make the sum equals 0.
```

### Constraints

- `1 <= arr.length <= 10^5`
- `-10^4 <= arr[i] <= 10^4`

## Hints

### Hint 1

First solve the problem when no deletion is allowed: that is Kadane's algorithm.

### Hint 2

For the deletion, track two states as you scan: the best subarray sum ending here with no deletion, and with exactly one deletion.

### Hint 3

The one-deletion state either extends a previous one-deletion subarray or deletes the current element from the no-deletion subarray.
