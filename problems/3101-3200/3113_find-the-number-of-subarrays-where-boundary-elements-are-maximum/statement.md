# Find the Number of Subarrays Where Boundary Elements Are Maximum

## Description

You are given an array of positive integers `nums`.

Return the number of subarrays of `nums`, where the first and the last
elements of the subarray are equal to the largest element in the subarray.

### Example 1

```text
Input: nums = [1,4,3,3,2]
Output: 6
Explanation: There are 6 subarrays which have the first and the last elements
equal to the largest element of the subarray:
- [1] (largest 1), [4] (largest 4), [3] (largest 3), [3] (largest 3),
  [2] (largest 2) are single-element subarrays.
- [3,3] (largest 3) has first and last elements 3.
```

### Example 2

```text
Input: nums = [3,3,3]
Output: 6
Explanation: There are 6 subarrays with the first and last elements equal to
the largest element 3: the three single-element subarrays plus [3,3] (indices
0-1), [3,3] (indices 1-2), and [3,3,3] (indices 0-2).
```

### Example 3

```text
Input: nums = [1]
Output: 1
Explanation: There is a single subarray [1], with its largest element 1.
```

### Constraints

- `1 <= nums.length <= 10⁵`
- `1 <= nums[i] <= 10⁹`

## Hints

### Hint 1

For each element nums[i], we can count the number of valid subarrays ending with it.

### Hint 2

For each index i, find the nearest index j on its left such that nums[j] > nums[i]. This can be done via a monotonic stack.

### Hint 3

For each index i, find the number of indices k in the window (j, i] such that nums[k] == nums[i]; this is the number of valid subarrays ending at nums[i].

### Hint 4

Sum the answers over all indices i to get the final result.
