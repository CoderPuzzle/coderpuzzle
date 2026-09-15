# Solutions — Restore the Array From Adjacent Pairs

## Walk the adjacency path

Every element of `nums` is a node of a path graph whose edges are the
given pairs: two values have exactly one neighbour (the endpoints of the
path), and every other value has two. Building an adjacency map from each
value to its neighbours turns reconstruction into a walk that starts at
one endpoint and, at every step, moves to the neighbour that was not just
visited.

Because the judge compares the returned array exactly rather than merely
checking that its adjacent pairs match the input, the traversal must be
deterministic — a reversed-but-valid array would still satisfy the
problem's own rules but would not match the judged output. The chosen
rule is: start at the first element of `adjacentPairs[0]` when that value
is an endpoint, otherwise at the second element when it is an endpoint,
and otherwise at the smaller-valued endpoint. This reproduces each sample
output and fixes the direction for every other input.

The walk is a plain `while` loop with a `prev` pointer, so a path of any
length costs one adjacency lookup per step and needs no recursion.

**Complexity:** `O(n)` time, `O(n)` space.
