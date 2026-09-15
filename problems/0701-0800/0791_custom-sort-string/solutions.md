# Solutions — Custom Sort String

The task is a permutation under a partial order: `order` ranks at most 26
distinct letters, `s` supplies the multiset, and letters `order` never
mentions are free. Everything the answer needs is visible in one 26-slot
count of `s` — the alphabet, and therefore the counter, is a fixed constant —
so the whole problem collapses to choosing an emission order over that
count.

## Count 26 Slots, Emit Twice

Count `s` into a 26-slot array in one sweep. Then emit in two passes: first
walk `order` itself, appending each letter it names exactly as many times as
`s` holds it and zeroing the slot as it goes. `order`'s sequence is literally
the relative order the answer must carry, so this pass alone satisfies the
property for every letter it touches; letters absent from `s` contribute
nothing, and letters of `s` absent from `order` are untouched by it.

The second pass handles those leftovers. The property says nothing about
letters `order` never mentions, so the statement's pinned form sends them to
the tail: walk `s` once more and append every letter whose slot is still
nonzero — which after pass one means precisely "not named by `order`" —
keeping their original order within `s`. The zeroing in pass one is what lets
pass two test membership with the same array, and multiplicities fall out of
the counts directly: no comparison, and no sort, anywhere.

**Complexity:** `O(|order| + |s|)` time, `O(1)` space.
