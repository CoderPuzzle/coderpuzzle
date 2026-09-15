# Rank Scores

## Description

Table: `Scores`

| Column Name | Type    |
| ----------- | ------- |
| id          | int     |
| score       | decimal |

`id` is the primary key (column with unique values) for this table. Each row
of this table contains the score of a game. Score is a floating point value
with two decimal places.

Write a solution to find the rank of the scores. The ranking should be
calculated according to the following rules:

- The scores should be ranked from the highest to the lowest.
- If there is a tie between two scores, both should have the same ranking.
- After a tie, the next ranking number should be the next consecutive
  integer value. In other words, there should be no holes between ranks.

Return the result table ordered by score in descending order.

Each testcase supplies its own `dataset`: the DDL seeds the `Scores` table
with that testcase's rows. The result format is in the following example.

### Example 1

```text
Input: Scores table from the dataset below.
Output:
score  rank
4.00   1
4.00   1
3.85   2
3.65   3
3.65   3
3.50   4
Explanation: the two 4.00 scores tie and share rank 1, 3.85 takes the next
consecutive integer 2, the two 3.65 scores tie and share rank 3, and 3.50
closes at rank 4 — no holes between ranks.
```

Write your solution as a single `SELECT` query returning two columns —
`score` and its `rank` — one row per row of the `Scores` table.

## Hints

### Hint 1

The three rules are the definition of a dense ranking: ties share one rank, and the next distinct value takes the very next integer — no holes. That is exactly what SQL's DENSE_RANK window function computes.

### Hint 2

Rank highest-first with DENSE_RANK() OVER (ORDER BY score DESC): the window's ORDER BY walks the scores from the highest to the lowest, so the top score gets 1 and every equal score repeats its rank.

### Hint 3

A window function emits one output row per input row — no GROUP BY is needed, ties included — and the outer ORDER BY score DESC presents them from the highest score down.
