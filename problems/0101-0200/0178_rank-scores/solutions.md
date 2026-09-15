# Solutions — Rank Scores

## Dense-rank the scores

The three rules define a dense ranking, and SQL names that function directly:
`DENSE_RANK() OVER (ORDER BY score DESC)`. The window's `ORDER BY` walks the
scores from the highest to the lowest, so the top score takes rank 1; equal
scores receive the same rank, and after a tie the next distinct value
continues with the very next integer — no holes — which is the second and
third rule verbatim. Because it is a window function, one output row leaves
per input row: every row of `Scores` appears with its score and its rank,
ties included, and no `GROUP BY` is needed to collapse or expand anything.

The choice within the ranking family is the whole exercise. `RANK()` honors
ties but skips — after two rows share rank 1 it would jump to rank 3 — and
`ROW_NUMBER()` breaks ties with arbitrary consecutive integers, so neither
satisfies the "next consecutive integer value" rule; only the dense variant
both shares ranks and leaves no gaps between them. The outer
`ORDER BY score DESC` presents the result from the highest score down, as the
contract asks; the judge compares rows as an unordered multiset, so that
ordering is fidelity to the statement rather than a correctness requirement.

The window pass sorts the `S` rows once to feed the ranking, and the rank
itself is carried in constant state per row — the previous score and a
counter — so nothing beyond the sort buffer is materialized.

**Complexity:** `O(S log S)` time, `O(S)` space.
