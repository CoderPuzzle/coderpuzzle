# Solutions — Longest Common Subsequence Between Sorted Arrays

Because every input array is strictly increasing, the longest common
subsequence is exactly the set of values present in every array.

## Count how many arrays contain each value

Every `arrays[i]` is sorted in strictly increasing order, so a given value
appears at most once inside any one array. Counting across every array
therefore tallies a value exactly `arrays.length` times if and only if that
value is present in all of them — the common elements are precisely the
values whose count reaches the number of arrays.

A single pass over all elements accumulates the counts in an array indexed
`1..100`, the value range the constraints allow. The count table is scanned
once afterwards and every position whose tally equals `arrays.length` is
emitted; because the index order is ascending, the result is already the
sorted order the statement requires, and no separate sort is needed.

The strictly-increasing property is what turns "longest common subsequence"
into plain intersection: a value common to all arrays occurs in the same
relative position in each one, so the full set of common values is always a
valid common subsequence, and no common subsequence can be longer than that
set.

**Complexity:** `O(n)` time, `O(100)` space, where `n` is the total number
of elements across all arrays.
