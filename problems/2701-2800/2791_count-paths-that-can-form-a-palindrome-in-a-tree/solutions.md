# Solutions — Count Paths That Can Form a Palindrome in a Tree

## Root Parity Masks with Hash Counting

A multiset of characters rearranges into a palindrome exactly when at most one character has odd frequency, so only parities matter. Encode each letter as a bit and give every node `v` the mask `mask[v]`, the XOR of the letters on the path from the root to `v`. The letters on the path between `u` and `v` have parity `mask[u] XOR mask[v]` — the shared prefix above their lowest common ancestor appears in both masks and cancels — so a pair is valid exactly when that XOR is 0 (all counts even) or a single set bit (exactly one odd).

The input is a parent array, so the code builds children lists and computes all masks in one traversal order starting from node 0, deriving each child's mask as its parent's mask XOR the child's edge bit; `s[0]` is never used because the root has no incoming edge.

Counting pairs then reduces to a hash-map accumulation over the masks in any order: for each mask `m`, add `freq[m]` for partners with identical masks, plus `freq[m XOR (1 << b)]` for each of the 26 single-bit variants; only then increment `freq[m]`. Consulting the map before inserting the current mask guarantees each unordered pair is counted exactly once.

**Complexity:** `O(26n)` time, `O(n)` space.
