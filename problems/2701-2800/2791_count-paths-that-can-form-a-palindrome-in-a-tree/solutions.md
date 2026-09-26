# Solutions — Count Paths That Can Form a Palindrome in a Tree

## Root Parity Masks with Hash Counting

A multiset of characters rearranges into a palindrome exactly when at most one character has odd frequency, so only parities matter. Encode each letter as a bit and give every node `v` the mask `mask[v]`, the XOR of the letters on the path from the root to `v`. The letters on the path between `u` and `v` have parity `mask[u] XOR mask[v]` — the shared prefix above their lowest common ancestor appears in both masks and cancels — so a pair is valid exactly when that XOR is 0 (all counts even) or a single set bit (exactly one odd).

![On parent = [-1,0,0,1,1,2], s = "acaabc" the root-path masks are 000, 001, 100, 101, 011, 101 for nodes 0-5; pair (3,5) XORs 101 ⊕ 101 = 000 (path acac, all even), while pair (3,4)'s shared bit c from edge 0→1 cancels and leaves 110, two odd letters, invalid — 8 of the 15 pairs are valid.](figures/solution-root-parity-masks.svg)

The input is a parent array, so the code builds children lists and computes all masks in one traversal order starting from node 0, deriving each child's mask as its parent's mask XOR the child's edge bit; `s[0]` is never used because the root has no incoming edge.

Counting pairs then reduces to a hash-map accumulation over the masks in any order: for each mask `m`, add `freq[m]` for partners with identical masks, plus `freq[m XOR (1 << b)]` for each of the 26 single-bit variants; only then increment `freq[m]`. Consulting the map before inserting the current mask guarantees each unordered pair is counted exactly once.

**Complexity:** `O(26n)` time, `O(n)` space.
