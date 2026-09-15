# Mean of Array After Removing Some Elements

## Description

Given an integer array `arr`, remove the smallest 5% of its elements and
the largest 5% of its elements, then return the mean of the remaining
elements.

The 5% cutoffs are counted by position in the sorted order, not by value:
sort `arr`, drop the first `arr.length * 0.05` elements (the smallest
ones) and the last `arr.length * 0.05` elements (the largest ones), and
average what is left. Since `arr.length` is always a multiple of 20, this
count is always a whole number.

Answers within `10⁻⁵` of the actual value will be accepted.

### Example 1

```text
Input: arr = [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3]
Output: 2.00000
Explanation: After removing the minimum and maximum values from this
array, every remaining element equals 2, so the mean is 2.
```

### Example 2

```text
Input: arr = [6,2,7,5,1,2,0,3,10,2,5,0,5,5,0,8,7,6,8,0]
Output: 4.00000
```

### Example 3

```text
Input: arr = [6,0,7,0,7,5,7,8,3,4,0,7,8,1,6,8,1,1,2,4,8,1,9,5,4,3,8,5,10,8,6,6,1,0,6,10,8,2,3,4]
Output: 4.77778
```

### Constraints

- `20 <= arr.length <= 1000`
- `arr.length` is a multiple of `20`.
- `0 <= arr[i] <= 10⁵`

## Hints

### Hint 1

Sort the given array.

### Hint 2

Remove the first and last 5% of the sorted array.
