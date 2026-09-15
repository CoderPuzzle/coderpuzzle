# Solutions — Shortest Word Distance II

## One index list per word, walked in lockstep

The array is fixed at construction while up to 5000 queries arrive, so the
constructor spends one pass buying speed for all of them: it appends each
word's index, left to right, into a per-word list inside a hash map, which
leaves every list sorted without ever sorting anything. A `shortest` call
then fetches the two lists and walks them in lockstep with two cursors,
folding `abs(first[i] - second[j])` into `best` and advancing whichever
cursor points at the smaller index. That advance rule is the whole
argument: keeping the smaller index fixed and moving the larger one can
only widen the gap, so every pair the walk skips is provably worse than
one it has already seen, and the closest pair — which is always an
adjacent pair in the merged order — cannot slip through.

The guarantees shape the details. `word1 != word2` means the two lists
hold disjoint indices, so the walk always compares genuine candidates and
never stalls on equal values; both words being present means both lists
are non-empty and the first comparison already seeds `best`. Queries are
read-only, so nothing needs invalidation across the 5000 calls.

Concretely, for the example's `shortest("makes", "coding")`: `"makes"` has
the index list `[1, 4]` and `"coding"` has `[3]`. The walk opens with the
gap `abs(1 - 3) = 2`, advances the smaller index 1, and the next gap
`abs(4 - 3) = 1` is the answer — found after two comparisons, whatever
the size of the array around them.

**Complexity:** `O(n)` construction; each `shortest` walks only the `a`
and `b` occurrences of the two words (`O(n)` worst case); `O(n)` space.
