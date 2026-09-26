# Solutions — Time Taken to Mark All Nodes

## Rerooting dynamic programming

Traversing an edge into node v costs 1 if v is odd and 2 if v is even, so the time everything gets marked when node i is the origin is the weighted height of the tree rooted at i. Computing an unweighted-height-style DP once per root would be quadratic, so the standard rerooting trick is used: solve the problem for one root, then push the answer across every edge in one additional sweep.

Rooted at 0 (an iterative DFS produces the ordering and parents, avoiding recursion limits), a bottom-up pass computes last[u], the latest marking time inside u's subtree, as the maximum over children v of last[v] + entry cost of v. To reroot, each node also remembers which child attains that maximum (last_no) and the best runner-up (second) — when the DP value flows back down through the champion child, the parent must offer its second-best branch instead, or the answer would count a path through the child it is currently visiting.

The top-down sweep then walks the same ordering with up[v], the latest marking time strictly outside v's subtree: entering u from below costs 2 if u is even else 1, added to max(up[u], last[u] or second[u] as appropriate). The final answer for each node is the larger of its downward value and this upward value, since the last-marked node lies either inside or outside its subtree.

![On Example 3's tree the bottom-up pass fills last = [4, 0, 2, 0, 0] and the top-down sweep fills up = [0, 6, 3, 5, 5] — node 1 gets 2 + 4 = 6 because node 0 must offer its runner-up branch — so max(last, up) = [4, 6, 3, 5, 5].](figures/solution-last-up-reroot.svg)

**Complexity:** `O(n)` time, `O(n)` space.
