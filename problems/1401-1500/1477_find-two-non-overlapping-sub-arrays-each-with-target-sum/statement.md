# Find Two Non-overlapping Sub-arrays Each With Target Sum

## Description

You are given an array of integers `arr` and an integer `target`.

You have to find two non-overlapping sub-arrays of `arr` each with a sum
equal to `target`. There can be multiple answers, so you have to find an
answer where the sum of the lengths of the two sub-arrays is minimum.

Return the minimum sum of the lengths of the two required sub-arrays, or
return `-1` if you cannot find such two sub-arrays.

### Example 1

```text
Input: arr = [3,2,2,4,3], target = 3
Output: 2
Explanation: Only two sub-arrays have sum = 3 ([3] and [3]). The sum of
their lengths is 2.
```

### Example 2

```text
Input: arr = [7,3,4,7], target = 7
Output: 2
Explanation: Although we have three non-overlapping sub-arrays of sum = 7
([7], [3,4] and [7]), we choose the first and third sub-arrays as the sum
of their lengths is 2.
```

### Example 3

```text
Input: arr = [4,3,2,6,2,3,4], target = 6
Output: -1
Explanation: We have only one sub-array of sum = 6.
```

### Constraints

- `1 <= arr.length <= 10⁵`
- `1 <= arr[i] <= 1000`
- `1 <= target <= 10⁸`

## Hints

### Hint 1

Create two arrays: `prefix[i]`, the minimum length of a sub-array ending
before `i` with sum equal to `target`, and `suffix[i]`, the minimum length
of a sub-array starting at or after `i` with sum equal to `target`.

### Hint 2

The answer is the minimum of `prefix[i] + suffix[i]` for all `i` from `0`
to `n - 1`.

### Hint 3

If stuck on building `prefix` and `suffix`: store for each index `i` the
length of the sub-array starting at `i` with sum equal to `target`
(infinity otherwise) and use it to build both.
