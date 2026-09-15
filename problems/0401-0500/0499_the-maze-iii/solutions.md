# Solutions — The Maze III

## Dijkstra with lexicographic path tie-break

The ball is only ever controllable where it rests, so the search runs over
stopping cells — but the hole changes the rules of Maze II in one way: a roll
that steps onto the hole ends right there, mid-roll, whether or not a wall
waits beyond it. Each roll from a stop is therefore simulated step by step,
stopping early at the hole, and becomes a graph edge carrying both its length
and its instruction letter. Because rolls have different lengths, Dijkstra is
required, and because the answer is a _string_ — shortest distance first, then
the lexicographically minimum instruction string — every state carries the
pair `(distance, instructions)` and the heap orders by exactly that pair:
distance primary, instruction string secondary. The recorded best pair per
cell is relaxed on the same comparison, and since every edge adds at least one
unit of distance, the first time the hole comes off the heap its pair is
final: nothing still in the heap can beat it on distance, and no undiscovered
path can beat it on either count. An empty heap means the hole is unreachable
and the answer is `"impossible"`.

The statement's rule that the next direction "must be different from last
chosen direction" turns out to need no code. The ball only ever stops against
a wall or the border — the one roll that halts without a wall ahead is the
drop into the hole, and there the game is over, so no next direction is ever
chosen. From any stop, re-choosing the direction it just arrived by faces the
wall that stopped it and rolls zero cells. Both crawl examples confirm this:
Example 1's answer `lul` obeys the rule anyway, and an enforced version of the
rule (tracking the last direction as part of the state) produces identical
answers on every example and thousands of random mazes.

Example 1 exercises the tie-break the ordering exists for: `lul` and `ul` both
reach the hole at distance 6, and `'l' < 'u'` picks `lul` — the comparison is
on the instruction strings themselves, not on any direction ordering. With
`m, n <= 100` there are at most `mn` cells, each settled once with four roll
simulations of up to `m + n` steps apiece; heap entries and relaxations
compare `(distance, instructions)` pairs, where an instruction string is at
most `L` letters long (`L <= mn`, in practice far less).

**Complexity:** `O(mn(m+n) + mn·L·log(mn))` time, where `L` bounds the
instruction-string length; `O(mn·L)` space.
