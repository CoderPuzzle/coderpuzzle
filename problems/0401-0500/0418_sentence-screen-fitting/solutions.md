# Solutions — Sentence Screen Fitting

## Start-index memo

Rows are filled greedily left to right, and the only state that crosses a
row boundary is the position in the sentence: each row begins exactly where
the previous row's fill stopped, so the whole screen is the recurrence
`next = fill(start)` applied `rows` times. The decisive observation is that
`fill` is a pure function of the starting word index — the words, `cols`,
and the one-space rule never change — so a row that starts at word `i`
always places the same words and always hands the same successor to the
next row. Only `n` distinct starts exist, and that is what the memo
exploits: the pair (next start, words placed) is computed once per start
and reused every time the screen returns to it.

One entry costs one row's simulation, made cheap by the concatenated
sentence. Join the words with single spaces and append one trailing space:
that packet has width `L`, and once a row's fill has walked past the last
word it is aligned at word 0 again. From there `(cols - used) / L` whole
packets fit wholesale — a single division replaces most of the row's walk —
and what remains is under `L` columns, at most `n` further placements, with
a final guard for a row that ends flush on a word whose separating space
would fall past the edge.

The main loop is then constant work per row: read the memo entry for the
current start, add its word count, jump to the recorded successor. The
answer is the total words placed divided by `n`, since every `n`
consecutive words placed is one complete pass through the sentence. The
table fills lazily, at most one entry per distinct start actually visited,
so the row loop plus the table together cost one pass over the rows plus
one sentence pass per start.

**Complexity:** `O(rows * n)` time, `O(n)` space.
