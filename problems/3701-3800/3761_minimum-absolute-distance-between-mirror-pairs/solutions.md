# Solutions — Minimum Absolute Distance Between Mirror Pairs

Every candidate pair is anchored by the value at its later index: a position
`j` can close a mirror pair only with an earlier value whose digit reversal
is exactly `nums[j]`. Fixing that one number turns "somewhere to my left" —
a whole prefix to search — into a single hash-map lookup, and it also fixes
the distance: since only earlier indices count, the pair's span is just
`j - i`, no absolute values needed.

## Reverse-key hash map sweep

The map is keyed by reversed value and holds the most recent index that
produced each key. Scanning left to right, every index plays two roles.
First the consumer: if `nums[j]` itself is already a key in the map, some
earlier index wanted exactly this value, and because entries are
overwritten, the stored position is the most recent such index — so
`j - latest[nums[j]]` is the closest possible completion of that key and the
only distance worth testing. Then the producer: the index records itself
under key `reverse(nums[j])`, overwriting any older entry, since a nearer
supplier of the same reversal beats a farther one for every future consumer.

Looking up before recording enforces the `i < j` rule structurally: an index
cannot meet its own reversal while its position is still absent from the
map, so palindromic values like 7 or 121 never pair with themselves — they
simply wait under their own key for a genuine second occurrence.

Reversal needs no special case either: peeling last digits off `x` until it
reaches zero discards trailing zeros naturally, so 120 reverses to 21 and
100 to 1. Values nobody ever consumes cost nothing but a map slot, and if
the sweep ends without a hit the answer stays -1. Each element triggers one
lookup and one store; distances never exceed n - 1, far inside 32-bit range.

**Complexity:** `O(n)` time, `O(n)` space.
