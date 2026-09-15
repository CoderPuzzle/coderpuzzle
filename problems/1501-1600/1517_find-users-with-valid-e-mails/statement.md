# Find Users With Valid E-Mails

## Description

Table: `Users`

| Column Name | Type    |
| ----------- | ------- |
| user_id     | int     |
| name        | varchar |
| mail        | varchar |

`user_id` is the primary key (column with unique values) for this table.
This table contains information of the users signed up on a website. Some
e-mails are invalid.

Write a solution to find the users who have valid emails.

A valid e-mail has a prefix name and a domain where:

- The prefix name is a string that may contain letters (upper or lower
  case), digits, underscore `'_'`, period `'.'`, and/or dash `'-'`. The
  prefix name must start with a letter.
- The domain must be exactly `'@leetcode.com'` in lowercase.

Each testcase supplies its own `dataset`: the DDL seeds the `Users` table
with that testcase's rows. The result format is in the following example.

### Example 1

```text
Input: Users table from the dataset below.
user_id  name       mail
1        Winston    winston@leetcode.com
2        Jonathan   jonathanisgreat
3        Annabelle  bella-@leetcode.com
4        Sally      sally.come@leetcode.com
5        Marwan     quarz#2020@leetcode.com
6        David      david69@gmail.com
7        Shapiro    .shapo@leetcode.com
Output:
user_id  name       mail
1        Winston    winston@leetcode.com
3        Annabelle  bella-@leetcode.com
4        Sally      sally.come@leetcode.com
Explanation: The mail of user 2 does not have a domain. The mail of user 5
has the # sign, which is not allowed. The mail of user 6 does not have the
leetcode domain. The mail of user 7 starts with a period.
```

Write your solution as a single `SELECT` query returning the `user_id`,
`name`, and `mail` of every user with a valid email. Rows may be returned
in any order.

## Hints

### Hint 1

The domain is a fixed, case-sensitive literal — `substr(mail, -13) =
'@leetcode.com'` compares the last 13 characters against it exactly, so an
uppercase domain or the wrong host both fail.

### Hint 2

`GLOB` supports character classes: `'[a-zA-Z]*'` anchors the first
character of the prefix to a letter, and the negated class
`'*[^a-zA-Z0-9_.-]*'` matches a prefix containing anything outside
letters, digits, `_`, `.`, and `-` — negate that with `NOT GLOB` to keep
only prefixes built entirely from the allowed characters.

### Hint 3

An email with nothing before `@leetcode.com` has an empty prefix, and an
empty string does not match `'[a-zA-Z]*'` — so a bare-domain address is
excluded without any extra length check.
