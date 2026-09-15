# Solutions — Arithmetic Subarrays

## Extract, Sort, and Check

A set of numbers can be rearranged into an arithmetic sequence if and only
if its sorted order is already arithmetic: sorting always produces the one
ordering (up to reversal) whose consecutive gaps could possibly all match,
so any other arrangement that worked would sort into the same shape anyway.
That turns "can this be rearranged" into a much simpler question — "is the
sorted version arithmetic" — which a single linear scan can answer.

For each query `i`, the solution copies out `nums[l[i]..r[i]]`, sorts the
copy, and walks it comparing every consecutive difference to the first one.
The moment two differences disagree the query is marked `false` and the
scan stops early; a range of exactly two elements is always `true`, since a
single gap trivially "matches itself". Repeated values are handled for
free — a run of equal numbers sorts to a zero common difference, which the
same equality check accepts.

**Complexity:** `O(m * n log n)` time, `O(n)` space, where `n` is the
array length and `m` is the number of queries.
