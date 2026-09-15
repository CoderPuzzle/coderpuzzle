# Solutions — Strings Differ by One Character

## Position-masked hash set

Comparing every pair of words character by character costs `O(n² · m)`,
which is wasteful: it re-derives, for each pair, information that is really
a property of a single position. Instead, fix a character position `j` and
ask a cheaper question: with position `j` hidden, do any two words look
identical? If so, those two words already agree everywhere except possibly
at `j` — and since the input guarantees every word is unique, they cannot
be identical strings, so they must differ at exactly `j` and nowhere else.

The algorithm walks each position `j` from `0` to `m - 1`. For that
position it builds a masked copy of every word — the word with index `j`
replaced by a placeholder character that cannot appear in the input, such
as `'*'` — and inserts each masked copy into a hash set that is reset for
every new position. Before inserting, it checks whether the masked copy is
already in the set; a hit means two words match everywhere except `j`,
which (by uniqueness) means they differ by exactly one character, so the
method returns `true` immediately. If every position is exhausted without a
collision, no such pair exists and the method returns `false`.

Masking a word costs `O(m)`, and there are `n` words at each of `m`
positions, so the whole scan revisits each character a constant number of
times per position.

**Complexity:** `O(n*m)` time, `O(n*m)` space.
