# Solutions — Find the Lexicographically Smallest Valid Sequence

## Backward anchors plus one guarded greedy pass

Feasibility has to be decided without ever undoing a choice, so first compute,
for every slot of word2, where the suffix of word2 starting at that slot can
still be matched exactly. One right-to-left sweep over word1 does this: keep a
pointer into the not-yet-matched tail of word2, and whenever word1[i] equals
the next needed character, record `last[j] = i` — the anchor showing that
word2[j..] is exactly embeddable from index i onward — and move on. If the
sweep runs out of word1 characters before consuming all of word2, no exact
embedding exists anywhere; only the single allowed change can still save the
answer.

With those anchors in place, walk word1 left to right filling slots in order.
Whenever word1[i] matches the current slot's character, take i — an exact match
is always safe because it consumes nothing and leaves maximal room. The only
interesting moment is a mismatch: taking i for this slot spends the one
allowed change, and then the remaining suffix must still fit exactly. That is
checkable in O(1) against the anchors: spending at slot j is permitted only
when j is the final slot (nothing left to match) or i sits strictly before
`last[j + 1]`, which certifies that word2[j+1..] embeds exactly somewhere
after i. If the guard fails, skip i unchanged and keep the change in reserve;
if the change was already spent, mismatches can no longer be taken at all. If
every slot gets filled by the end of the walk, the recorded indices are the
lexicographically smallest valid sequence — each slot took the earliest index
any valid sequence could use there — and otherwise no sequence exists.

**Complexity:** `O(|word1| + |word2|)` time, `O(|word2|)` space.
