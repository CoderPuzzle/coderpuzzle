# Solutions — Stickers to Spell Word

## Breadth-first search over the spelled mask

Spell positions, not letters: a search state is the set of `m = |target|`
positions already holding a cut letter, packed as an `m`-bit mask. Cutting
is monotone — a spelled position never unspells — so the task is a shortest
path from the empty mask to the full mask where every edge spends one
sticker, and the layer of a breadth-first search counts stickers exactly.
The first time the full mask appears is therefore the minimum.

One edge works as follows. Precompute a 26-slot letter count per sticker,
ignoring letters the target never uses — they can never be spent. Spending
one copy of a sticker on a state walks the uncovered positions left to
right, covering each whose letter still has count left; spending greedily
is safe because equal letters are interchangeable, so covering more
uncovered positions with the same single copy can never hurt a later
choice. Infinite supply means a sticker may be spent on many consecutive
layers — reuse is exactly that repetition, which is how a single `a`
sticker spells a 15-letter run one copy at a time.

The search can only stall when some target letter appears on no sticker at
all: then the full mask is unreachable and the answer is `-1`, checked up
front so impossible inputs cost no search. Otherwise every spent sticker
covers at least one new position, the depth is at most `m`, and the full
mask is certain to appear.

**Complexity:** `O(2^m · n · m)` time, `O(2^m + n)` space — each of the at
most `2^m` reachable states tries each of the `n` stickers against at most
`m` positions, and the search keeps one distance per state plus one count
vector per sticker.
