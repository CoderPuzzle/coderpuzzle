# Solutions — Count Ways to Build Rooms in an Ant Colony

## Tree DP with Multinomial Interleaving

A valid build order is exactly a linear extension of the tree rooted at room 0: a room may be built only once its parent exists. If `ways[u]` is the number of valid orderings of the subtree rooted at `u`, then building `u`'s subtree means fixing `u` first and interleaving the already-valid orderings of its child subtrees. The interleavings of blocks of sizes `s1, s2, ...` is the multinomial coefficient `(s1+s2+...)! / (s1!·s2!·...)`, so `ways[u] = (size(u)-1)! · Π ways[v] / size[v]!` taken over children `v`, all modulo 10^9+7.

Division is turned into multiplication by precomputing factorials and inverse factorials: one Fermat little-theorem exponentiation `pow(fact[n], MOD-2, MOD)` gives the inverse of `fact[n]`, and the rest of the inverse factorial table is filled backwards with `invfact[i-1] = invfact[i] · i`. This avoids one modular exponent per node.

With `n` up to 10^5, recursion is off the table, so the code builds children lists, produces a processing order by pushing children onto a stack (parents always appear before their descendants), and then walks that order in reverse — a post-order in which every child is combined into its parent before the parent is combined into its own parent. `size[u]` and `ways[u]` are filled bottom-up in a single pass, and the answer is `ways[0]`. A pure chain (`-1, 0, 1, ...`) exercises the degenerate case: each node has one child, the multinomial coefficient is 1, and the result is 1.

**Complexity:** `O(n)` time, `O(n)` space.
