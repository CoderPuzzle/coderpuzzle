# Find Customer Referee

## Description

Table: `Customer`

| Column Name | Type    |
| ----------- | ------- |
| id          | int     |
| name        | varchar |
| referee_id  | int     |

`id` is the primary key column for this table.
Each row of this table indicates the id of a customer, their name, and the id
of the customer who referred them.

Write a solution to find the names of the customers that are either:

- Referred by a customer with `id != 2`.
- Not referred by any customer.

Return the result table in any order.

Each testcase supplies its own `dataset`: the script seeds the `Customer`
table with that testcase's rows, `referee_id` null where the customer was not
referred by anyone. The result format is in the following example.

### Example 1

```text
Input: Customer table from the dataset below.
Output:
name
Will
Jane
Bill
Zack
Explanation: Will, Jane, and Bill have no referrer, so they were not referred
by any customer; Zack was referred by customer 1, whose id differs from 2.
Alex and Mark were both referred by customer 2, so they are excluded.
```

Write your solution as a single `SELECT` query returning one column, `name`:
the name of every customer who was referred by someone other than customer 2,
and of every customer who was not referred at all.

## Hints

### Hint 1

Both qualifying populations live in one column, so a single two-branch filter settles it: `WHERE referee_id IS NULL OR referee_id != 2` keeps the not-referred-at-all, whose `referee_id` is null, and the referred-by-someone-else, whose `referee_id` is an integer other than 2.

### Hint 2

The trap is SQL's three-valued logic: on an unreferred row `null != 2` is unknown, not true, so `WHERE referee_id != 2` alone silently drops exactly the customers the problem asks to keep. The `IS NULL` branch rescues them — or coalesce first, `IFNULL(referee_id, 0) != 2`, so the null rows compare as 0 against 2 and pass.

### Hint 3

The boundary is `referee_id` exactly 2: any customer referred by customer 2 is excluded, whatever their own `id` — and a customer whose own `id` is 2 is an ordinary customer, kept or dropped purely by their `referee_id`. The judge compares rows as an unordered multiset, so no `ORDER BY` is needed.
