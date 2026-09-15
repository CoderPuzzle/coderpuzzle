# Find Candidates for Data Scientist Position

## Description

Table: `Candidates`

| Column Name  | Type    |
| ------------ | ------- |
| candidate_id | int     |
| skill        | varchar |

`(candidate_id, skill)` is the primary key (columns with unique values) for
this table. Each row includes `candidate_id` and `skill`.

Write a query to find the candidates best suited for a Data Scientist
position. The candidate must be proficient in `Python`, `Tableau`, and
`PostgreSQL`.

Return the result table ordered by `candidate_id` in ascending order.

Each testcase supplies its own `dataset`: the DDL seeds the `Candidates`
table with that testcase's rows. The result format is in the following
example.

### Example 1

```text
Input: Candidates table from the dataset below.
Output:
candidate_id
123
147
Explanation: Candidates 123 and 147 possess the necessary skills in
Python, Tableau, and PostgreSQL for the data scientist position.
Candidates 234 and 102 do not possess any of the required skills for
this position. Candidate 256 has proficiency in Tableau but is missing
skills in Python and PostgreSQL. The output table is sorted by
candidate_id in ascending order.
```

Write your solution as a single `SELECT` query returning one column,
`candidate_id`, with one row for every candidate proficient in all three of
the required skills — each qualifying candidate listed exactly once, and no
other rows. Proficiency means a row whose `skill` is precisely the required
name: skill matching is exact and case-sensitive.

## Hints

### Hint 1

The answer is a property of each candidate as a whole — which required
skills they hold — not of any single row. Grouping the table by
`candidate_id` turns every candidate into one group whose surviving rows
tell you exactly what that candidate is proficient in.

### Hint 2

`WHERE skill IN ('Python', 'Tableau', 'PostgreSQL')` first keeps only the
rows carrying a required skill; the match is exact and case-sensitive, so
`python`, `Pythons`, and `Python` with a trailing space are different
strings that fall through the filter without helping their owner.
`HAVING COUNT(DISTINCT skill) = 3` then keeps exactly the groups holding
all three — counting bare rows instead would promote a candidate holding
any three unrelated skills.

### Hint 3

`ORDER BY candidate_id ASC` honors the statement's demand that smaller ids
stand first. The judge compares result rows as an unordered multiset, so
the sort dresses the answer rather than deciding it — and no contention is
possible anyway: every qualifying candidate contributes exactly one output
row, so the demanded order is total.
