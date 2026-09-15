# Solutions — Smallest Common Region

## Climb to the root, then walk the other node up

Each region appears as the first element of at most one list (a region cannot
be directly contained in more than one region), so the containment relation is
a tree and each region has at most one parent: the head of its list. Record
`parent[child] = head` for every list, then answer with a classic
lowest-common-ancestor walk.

Collect the ancestor chain of `region1`, starting from itself, into a set.
Then climb from `region2`; the first of its ancestors (itself included) that
appears in `region1`'s chain is the smallest common region — deeper common
ancestors are strictly bigger, so the first hit wins.

**Complexity:** `O(n)` time to build plus `O(depth)` for the walks — `O(n)`
total; `O(n)` space for the parent map and the ancestor set.
