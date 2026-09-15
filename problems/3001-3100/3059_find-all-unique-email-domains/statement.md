# Find All Unique Email Domains

## Description

Table: `Emails`

| Column Name | Type    |
| ----------- | ------- |
| id          | int     |
| email       | varchar |

`id` is the primary key (column with unique values) for this table.
Each row of this table contains an email. The emails will not contain
uppercase letters.

Write a solution to find all unique email domains and count the number
of individuals associated with each domain. Consider only those domains
that end with .com.

Return the result table orderd by email domains in ascending order.

Each testcase supplies its own `dataset`: the DDL seeds the `Emails`
table with that testcase's rows. The result format is in the following
example.

### Example 1

```text
Input:
Emails table:
+-----+-----------------------+
| id  | email                 |
+-----+-----------------------+
| 336 | hwkiy@test.edu        |
| 489 | adcmaf@outlook.com    |
| 449 | vrzmwyum@yahoo.com    |
| 95  | tof@test.edu          |
| 320 | jxhbagkpm@example.org |
| 411 | zxcf@outlook.com      |
+----+------------------------+
Output:
+--------------+-------+
| email_domain | count |
+--------------+-------+
| outlook.com  | 2     |
| yahoo.com    | 1     |
+--------------+-------+
Explanation:
- The valid domains ending with ".com" are only "outlook.com" and "yahoo.com", with respective counts of 2 and 1.
Output table is ordered by email_domains in ascending order.
```

Write your solution as a single `SELECT` query returning two columns —
`email_domain`, the part of the address after the `@`, and `count`, how
many individuals carry an address with that domain — with one row for
every domain that ends with `.com`. The domain is read literally: an
address at `mail.foo.com` belongs to the domain `mail.foo.com`, a
different domain from `foo.com`. Matching is exact on the stored strings,
which the constraint above guarantees to be lowercase. Return the result
table ordered by `email_domain` in ascending order.
