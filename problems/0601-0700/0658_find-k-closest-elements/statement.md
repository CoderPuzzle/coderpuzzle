# Find K Closest Elements

## Description

Given a sorted integer array `arr`, two integers `k` and `x`, return the `k`
closest integers to `x` in the array. The result should also be sorted in
ascending order.

An integer `a` is closer to `x` than an integer `b` if:

- `|a - x| < |b - x|`, or
- `|a - x| == |b - x|` and `a < b`

### Example 1

```text
Input: arr = [1,2,3,4,5], k = 4, x = 3
Output: [1,2,3,4]
```

### Example 2

```text
Input: arr = [1,1,2,3,4,5], k = 4, x = -1
Output: [1,1,2,3]
```

### Constraints

- `1 <= k <= arr.length`
- `1 <= arr.length <= 10⁴`
- `arr` is sorted in ascending order.
- `-10⁴ <= arr[i], x <= 10⁴`

## Hints

### Hint 1

The answer is always a contiguous window of k elements, so the task reduces to finding the best starting index.

### Hint 2

Binary search on the start of the window: compare x - arr[mid] against arr[mid + k] - x to decide which side to discard.

### Hint 3

Ties are broken toward the smaller element, which is exactly what the window comparison above encodes.
