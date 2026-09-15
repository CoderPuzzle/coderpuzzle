# Shortest Subarray to be Removed to Make Array Sorted

## Description

Given an integer array `arr`, remove a subarray (possibly empty) from
`arr` such that the remaining elements form a non-decreasing sequence.

Return the length of the shortest subarray to remove.

A subarray is a contiguous run of elements taken from the array.

### Example 1

```text
Input: arr = [1,2,3,10,4,2,3,5]
Output: 3
Explanation: The shortest subarray we can remove is [10,4,2], which has
length 3. The remaining elements are [1,2,3,3,5], which is sorted.
Another correct answer is to remove [3,10,4].
```

### Example 2

```text
Input: arr = [5,4,3,2,1]
Output: 4
Explanation: The array is strictly decreasing, so at most a single
element can be kept. We must remove a subarray of length 4, either
[5,4,3,2] or [4,3,2,1].
```

### Example 3

```text
Input: arr = [1,2,3]
Output: 0
Explanation: The array is already non-decreasing, so no elements need
to be removed.
```

### Constraints

- `1 <= arr.length <= 10⁵`
- `0 <= arr[i] <= 10⁹`

## Hints

### Hint 1

The key is to find the longest non-decreasing subarray starting with
the first element, and the longest non-decreasing subarray ending with
the last element.

### Hint 2

After removing some subarray, the result is the concatenation of a
sorted prefix and a sorted suffix, where the last element of the prefix
is smaller than the first element of the suffix.
