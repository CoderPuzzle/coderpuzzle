# Max Chunks To Make Sorted

## Description

You are given an integer array `arr` of length `n` that is a permutation of
the integers in the range `[0, n - 1]`: every value from `0` to `n - 1`
appears exactly once.

Split `arr` into some number of chunks (i.e. partitions), sort each chunk
individually, then concatenate them. The split is valid when the
concatenated result equals the fully sorted array.

Return the largest number of chunks you can split `arr` into.

### Example 1

```text
Input: arr = [4,3,2,1,0]
Output: 1
Explanation: Splitting into two or more chunks cannot produce the sorted
array. For instance, the split [4,3], [2,1,0] sorts and concatenates to
[3,4,0,1,2], which is not sorted, so the whole array stays one chunk.
```

### Example 2

```text
Input: arr = [1,0,2,3,4]
Output: 4
Explanation: Splitting into two chunks, such as [1,0], [2,3,4], works, but
[1,0], [2], [3], [4] gives the largest number of chunks.
```

### Constraints

- `n == arr.length`
- `1 <= n <= 10`
- `0 <= arr[i] < n`
- All the elements of `arr` are unique.

## Hints

### Hint 1

The first chunk must end at the smallest index `k` for which the first
`k + 1` elements contain exactly the values `0` to `k`; cut there and
repeat on the rest of the array.
