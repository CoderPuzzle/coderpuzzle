# Find Median Given Frequency of Numbers

## Description

Table: `Numbers`

| Column Name | Type |
| ----------- | ---- |
| num         | int  |
| frequency   | int  |

num is the primary key (column with unique values) for this table.
Each row of this table shows the frequency of a number in the database.

The median is the value separating the higher half from the lower half of
a data sample.

Write a solution to report the median of all the numbers in the database
after decompressing the Numbers table. Round the median to one decimal
point.

The result format is in the following example.

Each testcase supplies its own `dataset`: the DDL seeds the `Numbers`
table with that testcase's rows.

### Example 1

```text
Input: Numbers table from the dataset below.
Output:
median
0.0
Explanation: if we decompress the Numbers table, we will get
[0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 3], so the median is (0 + 0) / 2 = 0.0.
```

Write your solution as a single `SELECT` query returning one column —
`median`, the decompressed median rounded to one decimal place — as a
single row.

## Hints

### Hint 1

Decompressing means each num repeated frequency times, in num order — so a rank in the sorted list is all you need, never the list itself: `SUM(frequency) OVER (ORDER BY num)` gives each num the cumulative count of decompressed values at or below it, and `SUM(frequency) OVER ()` gives the total count N.

### Hint 2

Two ranks cover both parities with integer division alone: the lower middle is rank (N+1)/2 and the upper is rank (N+2)/2 — when N is odd both divisions land on the same middle rank, so the same num fills both slots. The num occupying rank k is the smallest num whose cumulative count reaches k: `MIN(num)` over the rows whose running count is `>= k`.

### Hint 3

Average the two picked nums with `/ 2.0` — SQLite's integer `1/2` truncates to 0 — and `ROUND(x, 1)` reports one decimal, a real value on the wire. The window never expands the table, so one row with a huge frequency costs the same as frequency 1.
