# Exchange Seats

## Description

Table: `Seat`

| Column Name | Type    |
| ----------- | ------- |
| id          | int     |
| student     | varchar |

`id` is the primary key (column with unique values) for this table.
Each row of this table indicates the name and the ID of a student.
The ID sequence always starts from 1 and increments continuously.

Write a solution to swap the seat id of every two consecutive students.
If the number of students is odd, the id of the last student is not
swapped.

Return the result table ordered by id in ascending order.

Each testcase supplies its own `dataset`: the DDL seeds the `Seat`
table with that testcase's rows. The result format is in the following
example.

### Example 1

```text
Input: Seat table from the dataset below.
Output:
id  student
1   Doris
2   Abbot
3   Green
4   Emerson
5   Jeames
Explanation: consecutive pairs trade ids — Abbot takes 2 and Doris
takes 1, Emerson takes 4 and Green takes 3 — and the count is odd, so
the last student, Jeames, has no partner and keeps id 5.
```

Write your solution as a single `SELECT` query returning two columns —
`id` and `student` — the same students under their exchanged ids, one
row per student.

## Hints

### Hint 1

The exchange moves ids, not students: every name rides through
unchanged and only the id column mutates. An even id steps down to its
left neighbor (`id - 1`) and an odd id steps up to its right neighbor
(`id + 1`) — the pairing (1, 2), (3, 4), ... is exactly this two-way
trade, so one parity test per row decides the direction.

### Hint 2

The odd id's step up has one exception: when the student count is odd,
the last id has no right neighbor and stays put. No single row can know
it is the last one, so the table's extent must come from outside the
row — a scalar subquery such as `(SELECT MAX(id) FROM Seat)` names the
last seat, and comparing each odd id against it separates the paired
odds from the unpaired tail.

### Hint 3

One `CASE` spells all three arms — odd and not last gives `id + 1`,
odd and last gives `id`, even gives `id - 1` — and the closing
`ORDER BY id` returns the demanded ascending order. The judge compares
result rows as an unordered multiset, so the sort dresses the answer
rather than deciding it, and the exchanged ids are a permutation of
1..n, which makes the demanded order total: no two rows ever contend
for a position.
