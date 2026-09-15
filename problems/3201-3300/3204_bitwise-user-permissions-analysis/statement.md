# Bitwise User Permissions Analysis

## Description

Table: `user_permissions`

| Column Name | Type |
| ----------- | ---- |
| user_id     | int  |
| permissions | int  |

`user_id` is the primary key.
Each row of this table contains the user ID and their permissions encoded
as an integer.

Consider that each bit in the permissions integer represents a different
access level or feature that a user has.

Write a solution to calculate the following:

- `common_perms`: The access level granted to all users. This is computed
  using a bitwise AND operation on the permissions column.
- `any_perms`: The access level granted to any user. This is computed
  using a bitwise OR operation on the permissions column.

Return the result table in any order.

Each testcase supplies its own `dataset`: the DDL seeds the
`user_permissions` table with that testcase's rows. Every dataset holds
at least one user, and each `permissions` value lies between `0` and
`10^9`, so both aggregates are plain non-negative integers. Return the
result table as one row — `common_perms` then `any_perms`. The result
format is shown in the following example.

### Example 1

```text
Input:
user_permissions table:
+---------+-------------+
| user_id | permissions |
+---------+-------------+
| 1       | 5           |
| 2       | 12          |
| 3       | 7           |
| 4       | 3           |
+---------+-------------+
Output:
+--------------+-----------+
| common_perms | any_perms |
+--------------+-----------+
| 0            | 15        |
+--------------+-----------+
Explanation:
    common_perms: Represents the bitwise AND result of all permissions:
        For user 1 (5): 5 (binary 0101)
        For user 2 (12): 12 (binary 1100)
        For user 3 (7): 7 (binary 0111)
        For user 4 (3): 3 (binary 0011)
        Bitwise AND: 5 & 12 & 7 & 3 = 0 (binary 0000)
    any_perms: Represents the bitwise OR result of all permissions:
        Bitwise OR: 5 | 12 | 7 | 3 = 15 (binary 1111)
```

Write your solution as a single `SELECT` query returning exactly one row
with two columns — `common_perms`, the bitwise AND of every
`permissions` value, and `any_perms`, the bitwise OR of them all. The
result table holds that single row in any order.
