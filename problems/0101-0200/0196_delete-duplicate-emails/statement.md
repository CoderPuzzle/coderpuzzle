# Delete Duplicate Emails

## Description

Table: `Person`

| Column Name | Type    |
| ----------- | ------- |
| id          | int     |
| email       | varchar |

`id` is the primary key (column with unique values) for this table. Each row
of this table contains an email. The emails will not contain uppercase
letters.

Write a solution to delete all duplicate emails, keeping only one unique
email with the smallest id.

On LeetCode this problem is answered with a `DELETE` statement that mutates
`Person` in place. The runner's SQL executor judges a single `SELECT` only —
it cannot run a mutation against the table — so your query instead returns
the `Person` table exactly as it must remain after the deletion: one row per
distinct email, the copy with the smallest id. The judge compares the
returned rows as an unordered multiset, so the final order of the rows does
not matter.

Each testcase supplies its own `dataset`: the DDL seeds the `Person` table
with that testcase's rows. The result format is in the following example.

### Example 1

```text
Input: Person table from the dataset below.
Output:
id  email
1   john@example.com
2   bob@example.com
Explanation: john@example.com is repeated two times. We keep the row with
the smallest Id = 1.
```

Write your solution as a single `SELECT` query returning the `Person` rows
that remain after the deletion — for each distinct email, its one row with
the smallest id.

## Hints

### Hint 1

A row survives the deletion exactly when its id is the smallest id carrying its email. (SELECT MIN(id) FROM Person GROUP BY email) computes that survivor set: one id per distinct email.

### Hint 2

Keep the survivors with `id IN (...)`: `id` is the primary key, so each id belongs to exactly one email's group, and the membership test is true precisely for the min-id copy of every email.

### Hint 3

No ordering and no empty-table special case: the judge compares rows as an unordered multiset, and zero returned rows is itself the correct post-deletion state of an empty table.
