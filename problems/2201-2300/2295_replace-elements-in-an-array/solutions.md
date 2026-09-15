# Solutions — Replace Elements in an Array

## Reverse walk to final names

Rescanning the array on every operation costs `O(n * m)` — at the stated
bounds that is around ten billion comparisons, far past the limit. What an
operation really does is rename one token: the element currently equal to
`operations[i][0]` keeps its place and continues life under the name
`operations[i][1]`. A name's final fate therefore depends only on the suffix
of operations that runs after it enters the array, which suggests reading
the operations backwards.

The walk keeps a map `final_name` from a replaced value to what it
eventually ends up as, processing operations from last to first. For an
operation that replaces `x` with `y`, everything named `y` may itself be
replaced again later — but the walk has already visited those later
operations, so `final_name` already holds `y`'s ultimate name when one is
present. Recording `final_name[x] = final_name.get(y, y)` therefore settles
`x` in one step. Names can retire and later be recreated — a value removed
now may re-enter through some earlier-indexed operation and be replaced yet
again — so one key can be written twice; the older occurrence is reached
later in the walk and overwrites the entry, which is precisely the right
answer for the token that carried the name back then. Once the walk
finishes, the answer maps every original element through `final_name`,
falling back to the element itself when it was never replaced.

Each of the `m` operations is settled in constant time and each of the `n`
lookups is a single hash hit (or one array slot in the typed languages,
where values are bounded by `10⁶`), never touching the array between
operations.

**Complexity:** `O(n + m)` time, `O(m)` space.
