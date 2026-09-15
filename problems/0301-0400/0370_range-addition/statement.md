# Range Addition

## Description

You are given an integer `length` and an array `updates` where
`updates[i] = [startIdxi, endIdxi, inci]`.

You have an array `arr` of length `length` with all zeros, and you have some
operation to apply on `arr`. In the `i`th operation, you should increment all
the elements `arr[startIdxi], arr[startIdxi + 1], ..., arr[endIdxi]` by
`inci`.

Return `arr` after applying all the updates.

### Example 1

```text
Input: length = 5, updates = [[1,3,2],[2,4,3],[0,2,-2]]
Output: [-2,0,3,5,3]
```

![The array evolving through the three range updates to [-2, 0, 3, 5, 3], with each update's range shaded](figures/example-1.svg)

### Example 2

```text
Input: length = 10, updates = [[2,4,6],[5,6,8],[1,9,-4]]
Output: [0,-4,2,2,2,4,4,-4,-4,-4]
```

### Constraints

- `1 <= length <= 10^5`
- `0 <= updates.length <= 10^4`
- `0 <= startIdxi <= endIdxi < length`
- `-1000 <= inci <= 1000`

## Hints

### Hint 1

Thinking of using advanced data structures? You are thinking too complicated.

### Hint 2

For each update operation, do you really need to update all the elements between i and j?

### Hint 3

Updating only the first and the last element is sufficient.

### Hint 4

The optimal time complexity is O(k + n) and uses O(1) extra space.
