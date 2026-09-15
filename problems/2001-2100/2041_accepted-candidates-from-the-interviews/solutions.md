# Solutions — Accepted Candidates From the Interviews

## Filter, join, and aggregate

First keep candidates with at least two years of experience, then join each
surviving candidate to the rounds for the same `interview_id`. Grouping the
joined rows by `candidate_id` gives one group per candidate, and
`HAVING SUM(r.score) > 15` retains only groups whose total clears the strict
score threshold. The inner join also excludes a candidate with no rounds,
because that candidate contributes no joined group.

The grouping key is the candidate rather than the interview. This distinction
matters when multiple candidates share an `interview_id`: each candidate still
produces their own result row, even though the joined score rows are the same.
Selecting only `candidate_id` returns exactly the requested column, while the
multiset comparison permits any row order.

**Complexity:** `O(C log R + J)` time and `O(C)` space, where `C` is the number of candidates, `R` is the number of rounds, and `J` is the number of joined rows.
