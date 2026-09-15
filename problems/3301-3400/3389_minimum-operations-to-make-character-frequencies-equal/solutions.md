# Solutions — Minimum Operations to Make Character Frequencies Equal

Only the letter counts matter, so let `occ[x]` be the count of the x-th
letter. A string is good exactly when every count is `0` or some common
target `c`, and `c` never needs to exceed the largest count — raising the
target past that only adds work. So the answer is the cheapest target
`c ∈ {0, 1, …, max(occ)}`, each priced independently.

## Per-target keep-or-empty letter DP

For a fixed `c`, each letter independently ends _kept_ at exactly `c`
copies — costing `|occ[x] − c|` in deletes or inserts — or _emptied_,
costing `occ[x]` deletes. One refinement earns its keep: a unit sitting in
the letter just left of a kept letter that still needs copies can change
into it. That single hop replaces the delete the unit was going to pay
anyway and cancels one insert on the right, so each flowed unit saves
exactly one operation, bounded by the spare units on the left (the kept
letter's surplus, or the whole count of an emptied letter) and the right
letter's remaining need. Flows two or more steps long save nothing — a
hop into a full letter is just an expensive delete — so only adjacent
pairs matter.

That makes the target priceable in one left-to-right pass over the 26
letters carrying two states: the best cost so far with the previous
letter kept, and with it emptied. Keeping letter `x` adds
`|occ[x] − c|` and credits `min(left spares, right need)` against the
pair; emptying adds `occ[x]` and credits nothing. Summing the cheaper
state over the alphabet prices the target, and the cheapest of the
`max(occ) + 1` targets is the answer — `O(26 · max(occ))` overall, at
most about `5 · 10⁵` steps for this input range. All counters stay far
below 32 bits: no target's cost can exceed the string length plus the
inserts of one full pass, well under `2 · 10⁴ + 26 · 2 · 10⁴`.

**Complexity:** `O(26 · max(occ))` time, `O(26)` space.
