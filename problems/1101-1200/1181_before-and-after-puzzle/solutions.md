# Solutions — Before and After Puzzle

## Bucket Phrases by First Word

Every merge decision reduces to one comparison: does phrase `A` end with
the word that phrase `B` starts with? Grouping the phrases by their first
word turns that search into a lookup — for each phrase, its possible
successors all live in one bucket keyed by the word it ends with.

So: split every phrase once, file each index under its first word, then
walk the phrases again. For a phrase ending in word `w`, everything in
bucket `w` (except the phrase itself, which must not pair with its own
position) continues the chain; the puzzle string is the first phrase plus
the successor with its leading word removed. A self-merge like `"a b a"`
followed by itself is still forbidden — same position, even though the
words would match — while two distinct copies of identical text do merge,
since they occupy different positions.

Collecting results in a set absorbs duplicates (many pairs can spell the
same sentence), and one final sort produces the required lexicographic
order. When a successor consists of its single matching word only, nothing
follows the shared word, and the merged text is just the first phrase as
it stands.

**Complexity:** splitting costs `O(total words)`; the walk does one bucket
lookup per phrase and emits at most `n²` candidate strings of length up to
200 — `O(n² · L)` worst-case time for `n` phrases of length `L`, linear
space in the output.
