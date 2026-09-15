# Solutions — Count Pairs of Connectable Servers in a Weighted Tree Network

## Per-server branch tallies

Cut the tree at a server c and every other server falls into exactly one
branch, one component per neighbor of c. Two walks out of c share an edge
exactly when they leave along the same first edge — once they split, a tree
gives them no way back together — so a pair is connectable through c
precisely when both servers lie at distances divisible by signalSpeed and
the two sit in different branches. Server c itself belongs to no branch,
which is the same fact that forbids it as an endpoint.

So for every neighbor of c, flood that branch alone with an explicit stack
seeded at the neighbor, carrying the walked distance modulo signalSpeed and
never stepping back into the node it just came from (a parent guard is
enough to keep a tree walk acyclic), counting how many of its servers
finish at distance zero. If the branches hold cnt_1 … cnt_m qualifying
servers and S is their sum, the cross-branch pair count is the sum of
cnt_i * cnt_j over i < j, which `(S * S - sum of cnt_i²) / 2` delivers
without enumerating any pairs.

Doing this once per server costs one full tree walk per server. Every walk
is stack-driven rather than recursive, so a chain of 1000 servers — the
deepest shape the constraints allow — never approaches a call-stack or
recursion limit.

**Complexity:** `O(n²)` time, `O(n)` space.
