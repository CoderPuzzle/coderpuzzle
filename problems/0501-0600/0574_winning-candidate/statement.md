# Winning Candidate

## Description

Table: `Candidate`

| Column Name | Type    |
| ----------- | ------- |
| id          | int     |
| name        | varchar |

`id` is the column with unique values for this table.
Each row of this table contains information about the id and the name of
a candidate.

Table: `Vote`

| Column Name | Type |
| ----------- | ---- |
| id          | int  |
| candidateId | int  |

`id` is an auto-increment primary key (column with unique values) for
this table.
`candidateId` is a foreign key (reference column) to `id` from the
`Candidate` table.
Each row of this table determines the candidate who got the ith vote in
the elections.

Write a solution to report the name of the winning candidate (i.e. the
candidate who got the largest number of votes).

The test cases are generated so that exactly one candidate wins the
elections.

Each testcase's `dataset` seeds both tables: its script inserts the
testcase's `Candidate` rows and then its `Vote` rows before your query
runs. The result format is in the following example.

### Example 1

```text
Input: Candidate and Vote tables from the dataset below.
Output:
name
B
Explanation: candidate B got 2 votes; candidates C, D, and E got 1 vote
each; the winner is candidate B.
```

Write your solution as a single `SELECT` query returning one column —
`name` — and exactly one row, the winning candidate.

## Hints

### Hint 1

Each vote names its candidate by id, so join the tables before counting: Candidate JOIN Vote ON Candidate.id = Vote.candidateId carries each candidate's name on every one of their votes. An inner join is right — a candidate with no votes forms no group at all and can never win.

### Hint 2

One group per candidate, ranked by size: GROUP BY Candidate.id, name collapses each candidate's votes into a single group (id alone identifies the candidate; name rides along so the selection stays valid under strict grouping), and ORDER BY COUNT(*) DESC LIMIT 1 keeps the largest group — its name is the answer.

### Hint 3

The guarantee does the tie-breaking: exactly one candidate wins, so the top group is unique and LIMIT 1 returns that row alone — no tie-break key is needed. COUNT is order-independent, so Vote.id order and insertion order never matter.
