# Solutions — DNA Pattern Recognition

Each of the four flags is an independent positional test on one string
column, so the whole query is four pattern checks projected beside the
original row.

## Four positional globs, one row per sample

`GLOB` matches the whole value against its pattern, so the position of the
wildcards encodes each rule directly: a leading `ATG*` anchors the start
codon at offset 0, the three trailing patterns `*TAA`, `*TAG`, `*TGA`
anchor a stop codon at the very end, and the doubled wildcards in
`*ATAT*` and `*GGG*` turn the anchored match into a plain containment
test. `GLOB` is case-sensitive where SQLite's `LIKE` is not, which keeps
the uppercase codon literals honest. A boolean expression in SQLite
already yields the integers the statement asks for — `1` when the pattern
is present, `0` when it is not — so each flag is simply the glob
expression aliased into its output column, with the stop-codon rule as
the `OR` of its three anchored patterns.

"at least 3 consecutive G" collapses to the substring `GGG` because a
longer run like `GGGG` contains `GGG` by definition, and no scattered
`G`'s can satisfy the glob since the three `G`'s in the pattern are
adjacent literals. `ORDER BY sample_id ASC` presents the rows in the
order the statement requires. Every flag is evaluated in a single scan of
`samples` with no joins, grouping, or working memory beyond the output
itself.

**Complexity:** `O(P · L)` time for `P` rows of average length `L`,
`O(1)` auxiliary space.
