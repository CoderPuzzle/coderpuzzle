# Solutions — Keyboard Row

## Row table, one pass

The three rows are a fixed partition of the alphabet, so the entire decision
per letter is one lookup: build a map from every letter to its row 0, 1 or 2
once, from the three row listings. Case-insensitivity costs nothing extra —
both cases of a letter sit on the same physical key, so the uppercase form is
mapped alongside the lowercase form while the table is filled.

The pass over `words` then decides each word independently. Its first letter
fixes the only row the word could ever be typed on, so the scan compares every
letter's row against that anchor and rejects the word at the first letter that
leaves it. A surviving word is appended untouched, which is why the answer
preserves both the input order and each word's original casing — nothing is
normalized on the way out.

Nothing qualifies yields the empty list; a single-letter word always qualifies,
since its one letter cannot disagree with itself. With C the total number of
characters across `words`, the work is one table build of constant size plus a
single look at every character.

**Complexity:** `O(C)` time, `O(1)` space.
