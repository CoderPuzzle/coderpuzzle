# Solutions — Two-Letter Card Game

## Count three shapes, balance, and split the helpers

Only cards containing `x` can ever play, so everything else is set aside in
one pass. The playable cards come in three shapes: `xx` (the letter in both
positions), `xc` (only the first position), and `cx` (only the second).
Checking pairs position by position shows who is compatible. Two `xx` cards
never are; an `xx` card is compatible with every one-sided card; two cards on
the same side pair exactly when their non-`x` letters differ; two cards on
opposite sides differ in both positions at once, so they never pair. The
game therefore decomposes into two independent one-sided pools plus a pool
of `xx` cards, each of which can be spent as a partner for exactly one card
on either side.

Within one side the answer has a closed form. Let the one-sided class sizes
sum to `total`, let `largest` be the biggest class, and add `have` double-`x`
helpers. Every pair consumes at least one letter card — helpers never pair
with each other — so at most `total` pairs exist. Every pair also needs a
partner outside the largest class, since that class has no internal edges,
so at most `total - largest + have`. And of course at most
`(total + have) / 2` pairs fit. All three bounds are reachable at once by
balancing the classes round-robin against each other and spending each
helper on whichever class currently dominates, so the side's answer is
exactly `min((total + have) / 2, total - largest + have, total)` — no
simulation needed.

The double-`x` pool is the only link between the sides, so the last step is
to decide how its cards split. Giving `i` helpers to the first side and
`both - i` to the second always yields a legal global matching, and every
global matching splits this way, so scanning all splits and summing the two
closed forms finds the maximum. The scan tallies class counts into fixed
26-slot tables, and the split loop runs once per double-`x` card over the
at most nine nonzero classes per side.

**Complexity:** `O(n)` time, `O(1)` space.
