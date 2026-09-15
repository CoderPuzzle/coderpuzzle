# Solutions — Synonymous Sentences

## Union groups, then expand position by position

Transitive equivalence is a union-find job: merge the two endpoints of every
pair, then each connected component is a synonym group whose members are
interchangeable everywhere — including through chains like
`happy–joy–cheerful` that no single pair states.

For every word of `text`, collect its group (the word alone if it has none).
Then build sentences position by position: start from `[""]` and, per word,
append each group member to every partial sentence. The product of the group
sizes bounds the output, which the constraints keep tiny (at most 10 positions
and 20 words total). Sort at the end for lexicographic order.

**Complexity:** `O(p α) ` for `p` pairs to union; generation and sorting are
bounded by the output size times text length.
