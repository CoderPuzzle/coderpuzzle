# Max Chunks To Make Sorted II

## Description

You are given an integer array `arr`.

We split `arr` into some number of chunks (i.e., partitions), and individually
sort each chunk. After concatenating them, the result should equal the sorted
array.

Return the largest number of chunks we can make to sort the array.

### Example 1

```text
Input: arr = [5,4,3,2,1]
Output: 1
Explanation:
Splitting into two or more chunks will not return the required result.
For example, splitting into [5, 4], [3, 2, 1] will result in [4, 5, 1, 2, 3], which isn't sorted.
```

### Example 2

```text
Input: arr = [2,1,3,4,4]
Output: 4
Explanation:
We can split into two chunks, such as [2, 1], [3, 4, 4].
However, splitting into [2, 1], [3], [4], [4] is the highest number of chunks possible.
```

### Constraints

- `1 <= arr.length <= 2000`
- `0 <= arr[i] <= 10^8`

## Hints

### Hint 1

Each index k where the multiset of arr[:k] equals the multiset of sorted(arr)[:k] is a valid chunk boundary.

### Hint 2

Track a running balance between the original array and the sorted array; every time it returns to zero you can cut a chunk.

### Hint 3

Sorting the array first makes the comparison against the target ordering straightforward.
