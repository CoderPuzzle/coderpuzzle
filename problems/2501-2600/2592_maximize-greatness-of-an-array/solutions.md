# Solutions — Maximize Greatness of an Array

## Sort + greedy two pointers

Only relative order matters for greatness, so sort one copy of `nums` to
process demands in increasing order and keep a second sorted copy of the
same multiset as the pool of values that perm can spend. A slow pointer
walks the demands; a fast pointer advances through the pool until it finds
the smallest not-yet-used value strictly greater than the current demand,
commits it, and counts one win. Any leftover pool values smaller than or
equal to everything still pending can never win again, so they are skipped
forever.

The exchange argument makes this optimal: if an optimal solution wins some
position with a value larger than necessary while a cheaper sufficient
value sits unused and loses, swapping the two assignments frees nothing but
keeps every win. Repeating the swap converts any optimum into this greedy
matching without losing a single winning index, so the pointer count equals
the maximum greatness.

Both passes are linear after sorting; counts stay below `nums.length ≤ 10⁵`
and values at `10⁹`, all inside 32-bit range and far under JavaScript's
exact-Number bound 2⁵³.

**Complexity:** `O(n log n)` time for the sorts, `O(n)` space.
