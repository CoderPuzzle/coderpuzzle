# Solutions — Minimum Time to Type Word Using Special Typewriter

## Greedy: always take the cheaper arc on the ring

The 26 letters form a ring, and between any two letters there are exactly
two paths — clockwise and counterclockwise — whose lengths add up to 26.
The minimal way to get from one letter to the next is always the cheaper
of those two arcs, because choosing a longer arc cannot help with any
later character: every future letter depends only on the pointer's
position after this move, and both arcs land on the same position. The
problem therefore reduces to summing, for each consecutive pair of
letters, `min(|a - b|, 26 - |a - b|)`.

The pointer starts on `'a'` (position 0), and each typed character costs
exactly one second regardless of any movement. So the answer is the word
length plus the sum of the cheaper arcs between the starting position and
the first letter, then between every adjacent pair of letters in `word`.
The whole computation is a single pass with no branching beyond the
minimal-arc comparison, so it is a clean greedy with no search state.

**Complexity:** `O(n)` time, `O(1)` space, where `n` is the length of
`word`.
