# Solutions — Find Anagram Mappings

## Hash map of position queues

The two arrays hold exactly the same values — `nums2` is a reorder of
`nums1` — so every element of `nums1` is looking for a position in `nums2`
that holds its value. When values are distinct, a plain value-to-index map
settles it; repeats break that map, because one position cannot serve two
elements. The statement's pinned rule — each element, walking `nums1` left
to right, takes the leftmost position not claimed by an earlier copy — is
exactly what one queue per value produces.

One pass over `nums2` appends each index to its value's queue, so every
queue ends up holding that value's positions in increasing order. A second
pass over `nums1` pops the front of the current element's queue: the front
is always the smallest position of that value still unclaimed, because the
earlier pops removed exactly the smaller claimed ones.

For `nums1 = [7,7,3]` and `nums2 = [3,7,7]` the queues are `3 -> [0]` and
`7 -> [1, 2]`: the first 7 takes 1, the second 7 takes 2, and 3 takes 0,
giving `[1, 2, 0]`. With no repeats every queue holds one element and the
walk degenerates into one lookup per element, as in the first example.

**Complexity:** `O(n)` time, `O(n)` space.
