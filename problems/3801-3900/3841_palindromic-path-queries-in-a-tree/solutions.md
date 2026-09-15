# Solutions — Palindromic Path Queries in a Tree

## Euler tour, XOR Fenwick tree, sparse-table LCA

A string can be rearranged into a palindrome exactly when at most one
distinct letter occurs an odd number of times, so only letter parities
matter. Encode each node's letter as a 26-bit mask holding one bit per
letter; XOR-combining the masks along a path leaves exactly the odd-count
letters set, and the path is palindromic precisely when the result is zero
or a single bit (`mask & (mask - 1) == 0`). For a query `u v` the path mask
is `rootMask(u) ^ rootMask(v) ^ letter(lca)`, where `rootMask(x)` XORs the
letter bits from the root down to `x`: every node above the lowest common
ancestor appears in both root paths and cancels, so the common ancestor's
current letter is XORed back in.

Updates rewrite single letters, so the root masks must be maintained
incrementally. `rootMask(x)` is the XOR of every update delta whose node is
an ancestor-or-equal of `x`, and on the entry/exit tick timeline of a depth-
first search the ancestors of `x` are exactly the nodes whose interval
`[tin, tout]` contains `tin[x]`. Flipping each node's delta at `tin` and at
`tout + 1` therefore turns `rootMask(x)` into a plain prefix XOR read at
position `tin[x]`: a node whose subtree lies entirely before `x`
contributes both of its flips, which cancel, while every ancestor
contributes only its opening flip. A Fenwick tree over the `2n` tick
positions answers those prefix XOR reads in `O(log n)` and applies each
update as two `O(log n)` point flips. The lowest common ancestors come from
a sparse table over the `2n - 1`-node Euler walk, packed as
`(depth << 17) | node` so a plain integer minimum over any walk range
returns the shallowest node — the LCA — in constant time. One iterative
depth-first search with an explicit stack builds every structure, because
the constraints admit a 5 × 10⁴-node path, far past what fixed call stacks
(the JVM's 512 KiB, Node's, CPython's) survive in a recursive traversal.

Building the sparse table dominates the preprocessing at `O(n log n)` time
and space (17 levels over the walk); the Fenwick tree and the DFS are
linear. Every operation then costs `O(log n)` — one constant-time LCA
lookup plus two Fenwick walks per query, two point flips per update — for
`O((n + q) log n)` overall. The masks fit 32 bits (at most 26 set), tick
positions fit 17 bits, but the packed sparse-table entries reach about
`2^33`, so Java, C++, Go, and Rust widen them to 64-bit integers; Python
stays exact naturally, and JavaScript/TypeScript pack the key
arithmetically (`depth * 2^17 + node`) because their bitwise operators are
32-bit while plain numbers are exact below `2^53`.

**Complexity:** `O((n + q) log n)` time, `O(n log n)` space.
