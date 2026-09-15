# Evaluate Boolean Expression

## Description

Table `Variables`:

| Column Name | Type    |
| ----------- | ------- |
| name        | varchar |
| value       | int     |

In SQL, `name` is the primary key for this table. This table contains
the stored variables and their values.

Table `Expressions`:

| Column Name   | Type    |
| ------------- | ------- |
| left_operand  | varchar |
| operator      | enum    |
| right_operand | varchar |

In SQL, `(left_operand, operator, right_operand)` is the primary key for
this table. This table contains a boolean expression that should be
evaluated. `operator` is an enum that takes one of the values
`('<', '>', '=')`. The values of `left_operand` and `right_operand` are
guaranteed to be in the `Variables` table.

Evaluate the boolean expressions in `Expressions` table.

Each testcase's `dataset` seeds both tables: its script inserts the
testcase's `Variables` and `Expressions` rows before your query runs.
Return the result table in any order; the `value` column reports the
verdict as the string `'true'` or `'false'`. The result format is in the
following example.

### Example 1

```text
Input:
Variables
+------+-------+
| name | value |
+------+-------+
| x    | 66    |
| y    | 77    |
+------+-------+
Expressions
+--------------+----------+---------------+
| left_operand | operator | right_operand |
+--------------+----------+---------------+
| x            | >        | y             |
| x            | <        | y             |
| x            | =        | y             |
| y            | >        | x             |
| y            | <        | x             |
| x            | =        | x             |
+--------------+----------+---------------+
Output:
+--------------+----------+---------------+-------+
| left_operand | operator | right_operand | value |
+--------------+----------+---------------+-------+
| x            | >        | y             | false |
| x            | <        | y             | true  |
| x            | =        | y             | false |
| y            | >        | x             | true  |
| y            | <        | x             | false |
| x            | =        | x             | true  |
+--------------+----------+---------------+-------+
Explanation:
As shown, you need to find the value of each boolean expression in the
table using the variables table.
```

Write your solution as a single `SELECT` query returning four columns —
`left_operand`, `operator`, `right_operand` and `value` — one row per
expression.

## Hints

### Hint 1

Each expression needs both operands' values: join `Variables` twice —
once aliased for the left operand, once for the right — on the name
columns.

### Hint 2

A `CASE` over `operator` picks the comparison: `'>'`, `'<'` or `'='`
between the two joined values, mapping to `'true'` or `'false'`.
