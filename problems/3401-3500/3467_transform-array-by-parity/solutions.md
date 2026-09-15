# Solutions — Transform Array by Parity

## Count parities, emit zeros then ones

The three prescribed operations collapse into something much simpler than
they look. Replacing evens by 0 and odds by 1 leaves an array holding only
the two values 0 and 1, and sorting such an array can only ever produce one
outcome: some run of zeros followed by some run of ones. Where each element
started is irrelevant — the sorted result is fully described by how many
entries are odd.

So instead of building and sorting, the solution counts. One pass tallies
the odd values (for each `x`, the low bit `x & 1` is exactly the number
that replaces it — 0 for even, 1 for odd), and the answer is `n - ones`
zeros followed by `ones` ones. This is the transformation the statement's
own hint describes, and it also side-steps any comparison sort: no
permutation of the input can change the two counts, so the reconstruction
is exact.

Each element is read once and the output array is written once, so the work
is linear; beyond the returned array itself only the single counter lives
in memory.

**Complexity:** `O(n)` time, `O(1)` auxiliary space (beyond the output).
