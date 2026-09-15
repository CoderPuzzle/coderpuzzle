# Election Results

## Description

Table: `Votes`

| Column Name | Type    |
| ----------- | ------- |
| voter       | varchar |
| candidate   | varchar |

(`voter`, `candidate`) is the primary key (combination of unique values)
for this table.
Each row of this table contains name of the voter and their candidate.

The election is conducted in a city where everyone can vote for one or
more candidates or choose not to vote. Each person has 1 vote so if they
vote for multiple candidates, their vote gets equally split across them.
For example, if a person votes for 2 candidates, these candidates receive
an equivalent of 0.5 votes each.

Write a solution to find candidate who got the most votes and won the
election. Output the name of the candidate or If multiple candidates have
an equal number of votes, display the names of all of them.

Return the result table ordered by candidate in ascending order.

Each testcase supplies its own `dataset`: the script seeds the `Votes`
table with that testcase's rows before your query runs. A voter who opts
not to vote still occupies a row whose `candidate` is null — such rows
record zero votes and belong to no candidate's total. Candidate names are
unique, and the ascending order is ordinary string order. The result
format is in the following example.

### Example 1

```text
Input:
Votes table:
+----------+-----------+
| voter    | candidate |
+----------+-----------+
| Kathy    | null      |
| Charles  | Ryan      |
| Charles  | Christine |
| Charles  | Kathy     |
| Benjamin | Christine |
| Anthony  | Ryan      |
| Edward   | Ryan      |
| Terry    | null      |
| Evelyn   | Kathy     |
| Arthur   | Christine |
+----------+-----------+
Output:
+-----------+
| candidate |
+-----------+
| Christine |
| Ryan      |
+-----------+
Explanation:
- Kathy and Terry opted not to participate in voting, resulting in their votes being recorded as 0. Charles distributed his vote among three candidates, equating to 0.33 for each candidate. On the other hand, Benjamin, Arthur, Anthony, Edward, and Evelyn each cast their votes for a single candidate.
- Collectively, Candidate Ryan and Christine amassed a total of 2.33 votes, while Kathy received a combined total of 1.33 votes.
Since Ryan and Christine received an equal number of votes, we will display their names in ascending order.
```

Write your solution as a single `SELECT` query returning one column —
`candidate` — one row for each winning candidate, ordered by candidate in
ascending order.

## Hints

### Hint 1

Null rows drop out on their own if you count the right thing:
`COUNT(candidate)` tallies only non-null candidates while plain `COUNT(*)`
would let an abstention row through, so `GROUP BY voter` with
`COUNT(candidate)` yields every ballot's split denominator in one pass —
even when some voters never abstained and others did nothing else.

### Hint 2

Ballot splitting means every row of one voter carries the same weight,
namely `1.0 / COUNT(candidate)` over that voter's non-null rows. Build a
small per-voter CTE holding those shares, then join it back to the
non-null rows on `voter` before grouping by `candidate`; the joined share
is what makes `SUM(share)` the fractional total instead of a raw row
count.

### Hint 3

The winners are everyone tied at the top tier: compare each candidate's
total against `(SELECT MAX(votes) ...)` rather than sorting and keeping
one row, since ties must all survive. Weighted sums of thirds and halves
can pick up floating-point noise, so round the aggregated shares
(`ROUND(SUM(share), 9)`) before comparing — arithmetically equal tickets
then land on identical values. Finish with `ORDER BY candidate` for the
required ascending order.
