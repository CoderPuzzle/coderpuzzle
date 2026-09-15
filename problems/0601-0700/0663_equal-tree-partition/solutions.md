# Solutions — Equal Tree Partition

## Post-order, match a proper subtree against half the total

Removing exactly one edge detaches exactly one subtree, and the two parts it
leaves are that subtree and everything else — the complement's sum is the
total minus the subtree's. The partition is therefore equal exactly when some
subtree sums to half of the whole tree's total. One post-order pass computes
every subtree sum bottom-up, and the root's own sum, the last to finish, is
that total: collect the sums, halve, look.

Two guardrails. The candidate must be a proper subtree — the whole tree never
counts as the cut part — which is what keeps a total of `0` honest: the root's
own sum always equals its half there, so `[0,-1,1]` is false (no proper
subtree sums to `0`) while `[0,0]` is true. And the total must be even;
parity survives negative values intact (`-9` is as odd as `9`, and `-6`
halves to `-3`), so an odd total can be refused on the spot.

The walk carries an explicit stack of frames instead of recursing — a single
10^4-node chain would nest 10000 calls — and sums are accumulated 64-bit:
10^4 nodes of 10^5 each reach 10^9, at the very rim of 32 bits.

**Complexity:** `O(n)` time, `O(n)` space.
