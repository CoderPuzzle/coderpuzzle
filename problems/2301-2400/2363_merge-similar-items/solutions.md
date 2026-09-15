# Solutions — Merge Similar Items

## One map, then a sort

The merge is an addition keyed by value, so a single hash map fed from both
arrays does all the arithmetic: for every `[value, weight]` pair — from
either list — add the weight into the entry for that value. Values present
in only one array end up with exactly their original weight; values shared
by both arrays end up with their sum. Uniqueness within each array means
every pair is processed once, so there is nothing to deduplicate.

What remains is presentation: the result must list values in ascending
order. Sorting the map's entries by key at the end produces it directly.
(An ordered map would fold the two steps together; with `n1 + n2 <= 2000`
entries either way costs the same asymptotically.)

**Complexity:** `O((n1 + n2) log(n1 + n2))` time (the final sort dominates
the hash-map passes), `O(n1 + n2)` space.
