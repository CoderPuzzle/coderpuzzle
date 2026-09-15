# Missing Number In Arithmetic Progression

## Description

In some array `arr`, the values were in arithmetic progression: the values
`arr[i + 1] - arr[i]` are all equal for every `0 <= i < arr.length - 1`.

A value from `arr` was removed that was **not** the first or last value in the
array.

Given `arr`, return the removed value.

### Example 1

```text
Input: arr = [5,7,11,13]
Output: 9
Explanation: The previous array was [5,7,9,11,13].
```

### Example 2

```text
Input: arr = [15,13,12]
Output: 14
Explanation: The previous array was [15,14,13,12].
```

### Constraints

- `3 <= arr.length <= 1000`
- `0 <= arr[i] <= 10⁵`
- The given array is guaranteed to be a valid array.

## Hints

### Hint 1

Assume the sequence is increasing, what if we find the largest consecutive
difference?

### Hint 2

Is the missing element in the middle of the segment with the largest
consecutive difference?

### Hint 3

For decreasing sequences, just reverse the array and do a similar process.
