# Solutions — Determine if Two Strings Are Close

Closeness never has to be simulated — the two operations can be read as
statements about invariants. Operation 1 swaps characters, so it reaches
every rearrangement and positions carry no information; Operation 2 trades
the totals of two letters that both exist, so it only permutes counts among
the letters already present. Everything either operation preserves is the
answer: two strings are close exactly when they use the same set of letters
with the same multiset of frequencies.

## Same letter set, same sorted frequencies

Neither operation can make a letter appear or vanish. Operation 1 leaves
every count untouched; Operation 2 exchanges the counts of two existing
letters in one stroke, so the collection of counts as a whole is
invariant — it is only ever reshuffled across the letters that occur. So a
close pair must show the same alphabet and the same multiset of counts.
Conversely that pair of invariants is sufficient: Operation 2 swaps are
transpositions, and transpositions generate every permutation, so word1 can
move its counts onto whatever letter each count belongs to in word2, after
which the string is an anagram of word2 and Operation 1 finishes the
transformation. This is also why the one-letter gap is fatal — `"aabb"`
and `"ccbb"` share frequencies {2, 2}, but no operation ever introduces a
letter that is not already present, so the `c`'s are unreachable.

The code tallies both strings into 26-slot count arrays; a letter's presence
is simply its count being nonzero, so the arrays carry both invariants at
once. It first compares presence slot by slot — rejecting any pair whose
letter sets differ, the case the frequency comparison alone would miss —
then sorts the two 26-entry arrays and compares them as lists. Equal sorted
count lists are exactly equal frequency multisets, and they also force the
lengths to agree, so no separate length check is needed.

**Complexity:** `O(n + k log k)` time (`k` = 26), `O(k)` space.
