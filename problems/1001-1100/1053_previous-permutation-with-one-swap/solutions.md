# Solutions — Previous Permutation With One Swap

## Scan from the right for the pivot, then swap in the best smaller value

Scan the array from the right to find the rightmost index `i` where
`arr[i] > arr[i + 1]`; everything after that point is already
non-decreasing, so it can never be the site of a beneficial swap, and
this is the latest position whose value can still be lowered by a swap.
If no such index exists, `arr` is already its own smallest permutation
and is returned unchanged.

Otherwise, walk the suffix starting at `i` and track the largest value
seen so far that is still strictly less than `arr[i]`. Because the
suffix is non-decreasing, scanning it left to right and only updating on
a strictly larger candidate naturally keeps the _leftmost_ occurrence of
that maximum qualifying value: placing `arr[i]`'s old value at the
earliest possible position among the tied candidates leaves the largest
possible value sitting at every position in between, which is what
maximizes the result lexicographically. Swap `arr[i]` with the position
holding that value and return the array.

**Complexity:** `O(n)` time, `O(1)` extra space, where `n` is the length
of `arr`.
