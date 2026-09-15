# Solutions — Linked List Components

Counting components is a question about run boundaries, not about the values
themselves: a component begins exactly where membership in `nums` begins, so
one walk down the list with an O(1) membership test sees every boundary as it
passes. Nothing needs to be grouped, stored, or revisited — only counted.

## One walk, count the boundaries

Pour `nums` (length `G`) into a hash set first, so each "is this node's value
in `nums`?" costs O(1) instead of a scan of the array. Then walk the list
once carrying a single boolean: whether the previous node's value was in the
set. A component
starts at the current node precisely when membership turns on — the node's
value is in the set and its predecessor's was not — and counting those
turning-on moments is the same as counting components, because every
component has exactly one first node. Initializing the flag to false folds
the head into the same rule: with no predecessor, the head counts whenever it
is itself a member. The flag is updated at every step, member or not, so runs
of any length and gaps of any length are handled by the same two lines, and
the count is complete the moment the walk falls off the end of the list.

Both inputs are read exactly once and in order: the set build consumes `nums`
and the walk consumes the list, so no pass is repeated and nothing depends on
the order in which `nums` lists its values. A 10⁴-node chain is just 10⁴
constant-time steps — no recursion appears anywhere, and the only state is
the set plus one integer and one boolean.

**Complexity:** `O(n)` time, `O(G)` space.
