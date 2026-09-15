# Solutions — Boats to Save People

## Sort and Two Pointers

After sorting the weights, reason about the heaviest remaining person: they must board some boat no matter what, and the best possible partner for them is the lightest remaining person — a heavier partner only risks exceeding the limit and pairs no better with anyone else. So if `lightest + heaviest <= limit`, send them together; otherwise the heaviest sails alone, since a boat carries at most two people and no other pairing rescues the heaviest any more cheaply.

Two pointers implement this: `i` at the lightest, `j` at the heaviest. Each iteration launches exactly one boat for the person at `j`, advancing `i` as well when the pair fits; the `i < j` guard prevents pairing the last remaining person with themselves. Every person crosses one of the pointers exactly once, so the boat count is final when the pointers meet.

The constraint `people[i] <= limit` guarantees the heaviest always fits alone, so the "sails alone" branch always succeeds. Sorting dominates the running time, and the `sorted(...)` call allocates a fresh list rather than sorting in place, which is the only extra memory used.

**Complexity:** `O(n log n)` time, `O(n)` space.
