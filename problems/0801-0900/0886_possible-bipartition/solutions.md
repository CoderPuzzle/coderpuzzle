# Solutions — Possible Bipartition

Two ways to decide whether the dislike graph splits in two: color the
groups directly with a traversal, or let a union-find structure merge
everyone who must share a side.

## dfs_color

The desired split exists exactly when the dislike graph is bipartite,
that is, 2-colorable: assign each person one of two colors so that every
dislike edge joins opposite colors. This turns the problem into a graph
traversal — build an adjacency list (dislike is symmetric), then DFS
outward from each person, giving every uncolored neighbor the opposite
of the current node's color.

The DFS runs on an explicit stack and detects failure the moment it
happens: if a neighbor is already colored and matches the current node's
color, an odd cycle exists and no two-group assignment can work, so the
function returns false immediately. Freshly discovered nodes get the
negated color and are pushed, marked on push, so nobody enters the stack
twice; a traversal that finishes without conflict proves its entire
connected component is 2-colorable, with the two colors literally being
the two groups.

Because the dislike graph may be disconnected, the outer loop restarts
the DFS from every still-uncolored person in `1..n`, coloring each
component independently across all `n` people and `e` dislike pairs.
Self-dislike pairs cannot occur (the constraints give `a < b`), so a
person is never forced to avoid themselves.

**Complexity:** `O(n + e)` time, `O(n + e)` space.

## union_find

Instead of naming the two groups, track only who must share a side.
Everyone a person dislikes has to end up together in the opposite group,
so after building the symmetric adjacency list the algorithm unions all
of a person's disliked neighbors into one set, anchored on that person's
first enemy. The union-find forest records exactly the "same group"
relation and never decides which group is which.

The merging can overshoot — transitivity pulls two enemies into one set
precisely when no valid split exists. The answer is therefore read off
afterwards: scan the dislike pairs and return false the moment some
`(a, b)` has `find(a) == find(b)`; if no pair collided, the sets fall
out as the two groups. Each `find` halves its path (every other node on
the walk is spliced under its grandparent), which keeps the trees nearly
flat.

**Complexity:** `O(n + e·α(n))` time, `O(n + e)` space — `α` is the
inverse Ackermann function.
