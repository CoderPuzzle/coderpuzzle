# Solutions — First Letter Capitalization

## Walk the text once, capitalizing letters that start a word

The transformation is local to each character once you know whether the
previous character was a letter, so the query turns every cell into one
pass of a tiny state machine. A recursive CTE `walk` carries the row's
original text plus the prefix built so far and a `prev_alpha` flag; at
position `pos` it inspects `SUBSTR(txt, pos, 1)`, tests it against the
letter class `[a-zA-Z]` with `GLOB`, and appends either its uppercase
form (previous character was not a letter — word start) or its lowercase
form (mid-word). Spaces fail the letter test and are appended unchanged,
which both preserves them exactly — repeated spaces included, since the
step advances one character at a time — and resets the flag so the next
letter starts a new word. Empty strings terminate immediately: the seed
row already sits at position `LENGTH(txt) + 1` and is picked up directly.

Each chain produces exactly one completed row at `pos = LENGTH(txt) + 1`;
selecting those rows pairs `content_id` with the untouched original and
the rebuilt `converted_text`. Because each step appends one character,
the walk does constant work per character with no regexes and no
aggregate reassembly; the comparison treats the result as an unordered
multiset of rows keyed by the unique `content_id`.

**Complexity:** `O(total characters)` time, `O(longest text)` recursion
depth per row.
