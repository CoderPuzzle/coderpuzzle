# Rising Temperature

## Description

Table: `Weather`

| Column Name | Type |
| ----------- | ---- |
| id          | int  |
| recordDate  | date |
| temperature | int  |

`id` is the column with unique values for this table. There are no different
rows with the same `recordDate`. This table contains information about the
temperature on a certain day.

Write a solution to find all dates' `id` with higher temperatures compared
to its previous dates (yesterday).

Return the result table in any order.

Each testcase supplies its own `dataset`: the DDL seeds the `Weather` table
with that testcase's rows, dates in ISO `YYYY-MM-DD` form. The result format
is in the following example.

### Example 1

```text
Input: Weather table from the dataset below.
Output:
id
2
4
Explanation: In 2015-01-02, the temperature was higher than the previous
day (10 -> 25). In 2015-01-04, the temperature was higher than the
previous day (20 -> 30).
```

Write your solution as a single `SELECT` query returning one column — the
`id` of every day whose temperature is strictly higher than the previous
day's.

## Hints

### Hint 1

Yesterday is a date computation, not an id offset: in SQLite the calendar day before d is DATE(d, '-1 day') — equivalently, w1's yesterday exists when w1.recordDate = DATE(w2.recordDate, '+1 day').

### Hint 2

The predicate relates two rows of the same table, so join Weather with itself: alias one side w1 (today) and the other w2 (yesterday), and match them on that one-day offset. recordDate values are unique, so each row pairs with at most one yesterday.

### Hint 3

Keep the pair only when w1.temperature > w2.temperature — the comparison is strict, so equal readings and drops are excluded. A day whose yesterday is missing (the table's first day, or a gap in the dates) joins with nothing and correctly never appears.
