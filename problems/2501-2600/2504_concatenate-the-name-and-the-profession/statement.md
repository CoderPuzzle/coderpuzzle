# Concatenate the Name and the Profession

## Description

Table: `Person`

| Column Name | Type    |
| ----------- | ------- |
| person_id   | int     |
| name        | varchar |
| profession  | ENUM    |

`person_id` is the primary key (column with a unique value) for this
table.
Each row in this table contains a person's ID, name, and profession.
The profession column in an enum of the type ('Doctor', 'Singer',
'Actor', 'Player', 'Engineer', or 'Lawyer')

Write a solution to report each person's name followed by the first
letter of their profession enclosed in parentheses.

Return the result table ordered by `person_id` in descending order.

Each testcase supplies its own `dataset`: the DDL seeds the `Person`
table with that testcase's rows. The result format is shown in the
following example.

### Example 1

```text
Input:
Person table:
+-----------+-------+------------+
| person_id | name  | profession |
+-----------+-------+------------+
| 1         | Alex  | Singer     |
| 3         | Alice | Actor      |
| 2         | Bob   | Player     |
| 4         | Messi | Doctor     |
| 6         | Tyson | Engineer   |
| 5         | Meir  | Lawyer     |
+-----------+-------+------------+
Output:
+-----------+----------+
| person_id | name     |
+-----------+----------+
| 6         | Tyson(E) |
| 5         | Meir(L)  |
| 4         | Messi(D) |
| 3         | Alice(A) |
| 2         | Bob(P)   |
| 1         | Alex(S)  |
+-----------+----------+
Explanation:
Note that there should not be any white space between the name and the
first letter of the profession.
```

`person_id` values are unique primary keys, so ordering by them is total
— no two output rows can ever tie. Write your solution as a single
`SELECT` query returning two columns — `person_id` and `name`, in that
order — where `name` is each person's name immediately followed by their
profession's first letter in parentheses, with the rows ordered by
descending `person_id`.
