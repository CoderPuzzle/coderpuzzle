# Peak Index in a Mountain Array

## Description

You are given an integer mountain array `arr` of length `n` where the values
strictly increase up to a peak element and then strictly decrease.

Return the index of the peak element.

Your task is to solve it in `O(log n)` time complexity.

### Example 1

```text
Input: arr = [0,1,0]
Output: 1
```

### Example 2

```text
Input: arr = [0,2,1,0]
Output: 1
```

### Example 3

```text
Input: arr = [0,10,5,2]
Output: 1
```

### Constraints

- `3 <= arr.length <= 10⁵`
- `0 <= arr[i] <= 10⁶`
- `arr` is guaranteed to be a mountain array.
