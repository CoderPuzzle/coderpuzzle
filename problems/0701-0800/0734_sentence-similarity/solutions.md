# Solutions — Sentence Similarity

The relation the statement hands out is a thin one: a word stands in for
itself, each declared pair works in both directions, and nothing chains. So
while a transitive variant of this problem would need connected components,
here similarity between two words is plain membership — the ordered pair
either derives from an entry of `similarPairs` or it does not — and the whole
verdict is one aligned scan.

## Pair Set, One Aligned Scan

Sentences of different lengths are rejected before any pair is consulted: no
alignment of positions exists when the counts differ, whatever the words.
Otherwise every declared pair `[x, y]` is folded into a hash set in both
orientations, `(x, y)` and `(y, x)`, which is the statement's symmetry made
explicit, so that one ordered lookup answers the only question a position can
ask. Languages whose hash sets key on compound values store the pair itself;
the others join the two words with a separator, which is collision-free
because the constraints make every word bare English letters.

The scan then walks the aligned positions. A position whose two words are
literally equal passes without touching the set — a word is always similar to
itself — and any other position passes exactly when its ordered pair is a set
member. Nothing closes transitively: `big~large` and `large~huge` never
combine into `big~huge`, because only literally declared pairs ever entered
the set. A word that occurs only in the sentences and never in a pair matches
nothing but a copy of itself, and with `similarPairs` empty the set stays
empty and the whole test collapses to position-by-position equality.

Each of the `p` declared pairs costs two insertions, and each of the `n`
positions costs at most one string comparison and one set lookup, so the
building pass and the scanning pass are both linear.

**Complexity:** `O(n + p)` time, `O(p)` space.
