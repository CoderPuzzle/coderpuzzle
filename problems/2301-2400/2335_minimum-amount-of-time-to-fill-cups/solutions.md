# Solutions — Minimum Amount of Time to Fill Cups

## Pair the two fullest types every second

Each second either pairs two different types or fills a single cup.
Pairing is strictly better whenever two nonzero types exist — it makes
the same progress as two single-cup seconds in one — so the optimal
schedule always pairs the two currently fullest types (exactly what the
hints prescribe), falling back to one cup only when a single type
remains. Sorting the three counts once is enough to see where this
ends: with `a <= b <= c`, pairing the two fullest keeps draining `c`
until it no longer exceeds `b`'s side, after which every second removes
two cups until at most one remains. So the schedule needs `ceil(total /
2)` seconds when the counts are balanced enough to pair throughout, and
`c` seconds when one type is so large that its tail must be filled
alone — whichever bound is larger. That gives the closed form
`max(c, ceil((a + b + c) / 2))`: each of the two quantities is a real
lower bound (`c` because a single cup per second is the most that type
can ever lose, `ceil(total / 2)` because a second removes at most two
cups), and the greedy pairing schedule meets both simultaneously.

The ceiling stays in integer arithmetic as `(total + 1) / 2`; the
maximum answer is `150` (three types of 100), far inside 32-bit range,
and nothing depends on the order the input arrives in beyond the one
sort.

**Complexity:** `O(1)` time, `O(1)` space.
