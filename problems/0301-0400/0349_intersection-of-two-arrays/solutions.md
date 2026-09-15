# Solutions — Intersection of Two Arrays

## Hash set membership, sorted output

The uniqueness requirement is the real constraint: a value may repeat on
either side any number of times and still appear in the answer exactly
once. A hash set does that bookkeeping for free — put every value of
`nums1` into a set, then scan `nums2` once, keeping each value the set
confirms. Collecting the hits into a second set collapses the duplicates
`nums2` itself carries, so every shared value is kept exactly once and
nothing else survives the pass.

What survives is precisely the intersection as a set of values. This
judge pins the output to ascending sorted order, and a final sort of the
`k` distinct survivors supplies it — the pin changes nothing about the
work, since each membership query against the set costs `O(1)` on
average.

**Complexity:** `O(n + m)` average time for the set build and the
membership pass, plus `O(k log k)` for the output sort; `O(n + k)` space.
