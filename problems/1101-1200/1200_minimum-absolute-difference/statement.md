# Minimum Absolute Difference

## Description

Given an array of distinct integers `arr`, find all pairs of elements with
the minimum absolute difference of any two elements.

Return a list of pairs in ascending order (with respect to pairs), each pair
`[a, b]` follows

- `a`, `b` are from `arr`
- `a < b`
- `b - a` equals the minimum absolute difference of any two elements in `arr`

### Example 1

```text
Input: arr = [4,2,1,3]
Output: [[1,2],[2,3],[3,4]]
Explanation: The minimum absolute difference is 1. List all pairs with
difference equal to 1 in ascending order.
```

### Example 2

```text
Input: arr = [1,3,6,10,15]
Output: [[1,3]]
```

### Example 3

```text
Input: arr = [3,8,-10,23,19,-4,-14,27]
Output: [[-14,-10],[19,23],[23,27]]
```

### Constraints

- `2 <= arr.length <= 10⁵`
- `-10⁶ <= arr[i] <= 10⁶`

## Hints

### Hint 1

Find the minimum absolute difference between two elements in the array.

### Hint 2

The minimum absolute difference must be a difference between two consecutive
elements in the sorted array.
