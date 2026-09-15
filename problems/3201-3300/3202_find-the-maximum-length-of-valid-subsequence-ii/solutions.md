# Solutions — Find the Maximum Length of Valid Subsequence II

## Remainder-Pair Dynamic Programming

The definition hands the subsequence one hidden constant: some residue
`val` in `[0, k)` that every adjacent pair's sum must land on. Fixing
`val` turns membership into a chain rule — an element with residue `r`
may extend a chain whose current last element sits at residue
`(val - r) % k`, and every element can also start a fresh chain of length
one. Trying each of the `k` candidate values exhausts the space, because a
valid subsequence exists under exactly the `val` its own adjacent pairs
produce.

For one fixed `val` the scan streams `nums` once, carrying an array `dp`
over residues: `dp[r]` is the best valid chain seen so far that ends with
residue `r`. Reading `dp[(val - r) % k]`, adding one, and improving
`dp[r]` implements the chain rule; since elements arrive in index order,
the value recorded is always realizable by actually existing positions.
The leftover cases behave like Example 2: all of `[1, 4, 1, 4]` shares
residue 1 mod 3, so it rides the val = 2 pass where each element chains
onto its identical predecessor.

At most `10^3` candidate values times `10^3` array slots is around a
million constant-time transitions, and lengths never leave a 32-bit int.

**Complexity:** `O(n·k)` time, `O(k)` space.
