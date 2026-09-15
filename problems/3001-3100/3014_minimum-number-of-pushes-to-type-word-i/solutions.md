# Solutions — Minimum Number of Pushes to Type Word I

## Round-robin over the eight keys

A letter's typing cost depends only on which position it occupies within its
key: first letters cost one push, second letters on the same key cost two,
and so on. Because all letters in `word` are distinct, each letter
contributes exactly once, so which specific letters share a key is
irrelevant — only the key load counts, and balancing the loads is optimal.
Dealing the `n` distinct letters round-robin over the 8 keys fills the push
tiers evenly, which puts the p-th dealt letter (0-indexed) at position
`p // 8` of its key for a cost of `p // 8 + 1`; the answer sums that over
`p` from `0` to `n - 1`.

No mapping can do better: if some key held more letters than another while a
cheaper slot sat unused anywhere, moving one letter into that cheaper slot
would strictly reduce cost, so an optimal layout packs earlier positions
before later ones — exactly the balanced tiers the round-robin produces.
Frequency weighting matters only when letters repeat (as in the II variant);
here distinctness makes every contribution identical, and one linear scan of
positions suffices with no counting pass at all.

**Complexity:** `O(n)` time, `O(1)` space.
