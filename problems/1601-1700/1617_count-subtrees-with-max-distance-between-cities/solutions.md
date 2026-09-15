# Solutions — Count Subtrees With Max Distance Between Cities

## Bitmask enumeration with a double-sweep diameter

Since `n` is at most 15, every one of the `2^n` possible city subsets
can be tried directly as a bitmask. A subset with fewer than two
cities is skipped; for the rest, connectivity is checked with a
breadth-first walk that starts from the subset's lowest-numbered city
and only follows roads whose both endpoints are also set in the mask —
the subset is a valid subtree exactly when that walk visits as many
cities as the mask has bits set.

For a connected subset, the maximum pairwise distance is a tree
diameter, which does not require comparing every pair. A first walk
from the arbitrary starting city finds the farthest reachable city
within the subset; a second walk from that farthest city finds a city
even farther away, and the distance reached on this second walk is
the subset's true diameter. This double-sweep trick works because any
connected subset of a tree's edges is itself a tree. Once a subset's
diameter `d` is known, the running count at index `d - 1` is
incremented; after all `2^n` masks are visited, that count array is
the answer.

**Complexity:** `O(2^n * n)` time, `O(n)` space.
