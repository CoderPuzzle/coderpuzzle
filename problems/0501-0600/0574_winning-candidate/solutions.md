# Solutions — Winning Candidate

## Join, group, and keep the largest group

The answer is the name of the candidate with the most votes, and both
ingredients come from one grouping over a join.
`Candidate JOIN Vote ON Candidate.id = Vote.candidateId` carries each
candidate's name on every one of their votes; the join is inner on
purpose — a candidate with zero votes matches nothing, forms no group,
and can never win, which is exactly the contract.
`GROUP BY Candidate.id, name` then collapses each candidate's votes into
a single group — `id` alone identifies the candidate, and `name` rides
along so the selection stays valid under strict grouping rules (and two
candidates sharing a name stay two distinct groups).
`ORDER BY COUNT(*) DESC LIMIT 1` ranks the groups by size and keeps the
largest; the selected `name` of that one group is the winning candidate.

The winner guarantee carries the tie-breaking, not the query: exactly
one candidate wins, so the top group is unique and `LIMIT 1` returns
that row alone — no tie-break key is needed, and a one-vote margin is
just the boundary where that uniqueness still holds. Counting is
order-independent, so `Vote.id` order and insertion order never matter,
and because `candidateId` is a foreign key to `Candidate.id`, every
vote joins to exactly one candidate, making `COUNT(*)` per group exactly
that candidate's vote total.

One pass over the `V` votes builds the join and the `C` groups; ranking
the `C` groups costs a sort, and a single row leaves.

**Complexity:** `O(V + C log C)` time, `O(C)` space.
