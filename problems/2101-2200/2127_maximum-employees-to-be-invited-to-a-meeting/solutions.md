# Solutions — Maximum Employees to Be Invited to a Meeting

## Functional Graph Cycles and Chain Depths

Each employee points at exactly one favorite, so `favorite` defines a functional graph: a set of disjoint cycles with trees (in-trees) hanging off them. A valid seating decomposes into two mutually exclusive shapes. Either the invitees form one whole cycle of length ≥ 3 (no outsider can join, since every cycle member's favorite already has both neighbors taken by cycle members), or the anchor is a 2-cycle — the two mutual favorites sit together and the two seats beside them can each absorb one chain of employees leading into the pair, and multiple such pairs can be seated around the same table. The answer is the larger of the best single cycle and the sum over all 2-cycles.

The solution computes in-degrees and runs a Kahn-style peel of the acyclic nodes: repeatedly removing an indegree-zero node relaxes `depth[favorite[u]]` to `max(depth[favorite[u]], depth[u] + 1)`, so after the peel `depth[v]` holds the number of nodes on the longest chain of non-cycle employees leading directly into `v` (at least 1, itself). This is exactly the arm length a 2-cycle can absorb on each side.

![The example favorite = [2, 2, 1, 2] seated around the table: the mutual pair 1 and 2 sits together, node 0 takes the free seat beside 2, and employee 3 — who also favorites 2 — is left out because both neighboring seats are taken, giving depth[1] + depth[2] = 3.](figures/solution-two-cycle-table.svg)

What survives the peel with positive indegree are precisely the cycle nodes. Walking each unvisited cycle once via `favorite` links gives its length: length-2 cycles contribute `depth[i] + depth[favorite[i]]` to the pair sum (both chains, left and right of the pair), while longer cycles only update the maximum cycle length. Comparing the two totals gives the answer. Both phases touch each node and edge a constant number of times.

**Complexity:** `O(n)` time, `O(n)` space.
