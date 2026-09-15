# Duplicate Emails

## Description

Table: `Person`

| Column Name | Type    |
| ----------- | ------- |
| id          | int     |
| email       | varchar |

`id` is the primary key (column with unique values) for this table. Each row
of this table contains an email. The emails will not contain uppercase
letters.

Write a solution to report all the duplicate emails — the emails that appear
in more than one row. It is guaranteed that the email field is not null.

Return the result table in any order.

Each testcase supplies its own `dataset`: the DDL seeds the `Person` table
with that testcase's rows. The result format is in the following example.

### Example 1

```text
Input: Person table from the dataset below.
Output:
Email
a@b.com
Explanation: a@b.com is repeated two times.
```

Write your solution as a single `SELECT` query returning one column, `Email`,
with one row for each email that appears two or more times in `Person` —
every duplicated address listed exactly once, and no other rows.

## Hints

### Hint 1

The answer is a property of each address as a whole — how many rows carry it — not of any single row. GROUP BY email turns each distinct address into one group whose size COUNT(email) reports.

### Hint 2

Filter groups with HAVING, not WHERE: `HAVING COUNT(email) > 1` keeps exactly the groups of size two or more, so each duplicated email survives as one output row and unique addresses drop out.

### Hint 3

No deduplication and no empty-table special case remain: one surviving group per duplicated address is already one row, and zero groups over an empty table is itself zero rows. Alias the column (`email AS Email`) to name the output.
