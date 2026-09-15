# Solutions — Letter Tile Possibilities

## Backtracking over a letter-frequency counter

Physical tiles with the same letter are indistinguishable, so searching
over which index goes where would count the same finished sequence once
for every permutation of the duplicate tiles behind it. Instead the
search tracks how many tiles of each distinct letter remain, in a
counter keyed by letter. At each step it tries every letter that still
has a positive count: placing it consumes one occurrence, contributes
one new sequence (the placement itself, not just a completed word), and
then recurses to extend that sequence further before restoring the
count on the way back up.

Because the recursion branches on distinct letters rather than tile
positions, two tiles carrying the same letter are only ever explored as
a single branch, so a sequence built from duplicate letters is counted
exactly once no matter which physical tiles could have produced it.
Every recursive call that places a letter corresponds to one distinct
non-empty sequence, so summing those calls is exactly the answer — there
is no separate step that walks a list of finished sequences afterward.

**Complexity:** `O(n · n!)` time, `O(n)` space, where `n` is the number
of distinct letters and their multiplicities bound the branching factor
at each depth.
