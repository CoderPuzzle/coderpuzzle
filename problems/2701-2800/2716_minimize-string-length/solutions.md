# Solutions — Minimize String Length

## Distinct-Character Set

Both operations only ever delete an occurrence of a letter while another
occurrence of that same letter survives: the chosen index i keeps its
character c, and one of its neighbors carrying c is removed. So no sequence
of operations can erase a letter entirely — the number of distinct letters
never decreases, and the final length can never drop below the count of
distinct letters in the original s.

That lower bound is also reachable. Whenever some letter still occurs twice,
pick its first remaining occurrence as the index i for operation 2; the
closest matching character to its right is exactly one of its redundant
copies and is deleted. Repeating this until every letter occurs once leaves
each distinct character alive and makes any further operation vacuous.

So the answer is simply the number of distinct letters in s, computed with a
fixed boolean marker table over the lowercase alphabet — scan s once marking
seen letters, then return how many marks are set. No simulation is needed at
submission time.

**Complexity:** `O(n)` time, `O(1)` space (a fixed 26-entry marker table).
