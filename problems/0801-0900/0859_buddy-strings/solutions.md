# Solutions — Buddy Strings

A swap moves exactly two letters, so it changes exactly two positions of `s`
or, when the two letters are equal, nothing at all. The whole question
therefore reduces to a census of the positions where `s` and `goal` disagree.

## Counting mismatches

Strings of different lengths can never be made equal by a swap, so unequal
lengths answer `false` at once. Otherwise walk both strings together and
record the first two indices where the characters differ; a third difference
settles the matter on the spot, because a single swap touches at most two
positions.

With exactly two mismatched positions `first` and `second`, the swap has to
land on both of them, so the answer is whether the pair crosses:
`s[first] == goal[second]` and `s[second] == goal[first]`. A lone mismatch is
hopeless for the same reason — a swap changes zero or two positions, never
exactly one.

When the strings agree everywhere, the swap must change nothing, which is
possible only by trading two equal letters. The answer is then whether any
letter repeats, which a 26-slot seen array settles in one further scan of
`s`.

**Complexity:** `O(n)` time, `O(1)` space.
