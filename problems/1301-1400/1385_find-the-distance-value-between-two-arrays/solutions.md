# Solutions — Find the Distance Value Between Two Arrays

## Approach: Sort arr2 and binary-search the closest element

An element `arr1[i]` counts only if no value of `arr2` lies within `d` of it,
which is the same as saying the closest element of `arr2` is farther than
`d`. Sorting `arr2` puts every window of neighbors in order, so for each
`arr1[i]` one binary search finds the insertion point; only the elements at
that point and just before it can be closest, and both are checked in
constant time.

**Complexity:** `O((m + n) log n)` time to sort `arr2` once (`n = len(arr2)`)
and binary-search each of the `m` elements of `arr1`, `O(1)` extra space
beyond the sort (or `O(n)` when counting the sorted copy).
