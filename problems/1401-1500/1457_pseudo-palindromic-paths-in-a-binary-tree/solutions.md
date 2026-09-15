# Solutions — Pseudo-Palindromic Paths in a Binary Tree

## Iterative DFS with a nine-bit parity mask

A multiset of digits rearranges into a palindrome exactly when at most
one digit occurs an odd number of times, and the values live in `1..9` —
so the whole parity state of a root-to-node path is nine bits: bit `v-1`
toggles each time value `v` is seen. Entering a node toggles its bit;
the mask travels down as a plain integer that children copy.

At a leaf the mask is tested with one bit trick: `mask & (mask - 1)`
clears the lowest set bit, so it is zero exactly when the mask holds at
most one set bit — the pseudo-palindrome condition. Odd path length
needs one odd digit (the middle), even length needs none, and both cases
are covered by the same at-most-one test.

The traversal uses an explicit stack rather than recursion: the tree may
be a chain `10⁵` nodes deep, beyond what the stricter language runtimes'
call stacks allow, so the walk keeps its own frame list of
`(node, mask)` pairs. Each node enters the stack once, and the toggles
are `O(1)` per node.

**Complexity:** `O(n)` time, `O(h)` space for the stack on a tree of
height `h`.
