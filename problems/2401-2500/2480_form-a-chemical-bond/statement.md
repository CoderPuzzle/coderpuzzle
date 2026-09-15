# Form a Chemical Bond

## Description

Table: `Elements`

| Column Name | Type    |
| ----------- | ------- |
| symbol      | varchar |
| type        | enum    |
| electrons   | int     |

`symbol` is the primary key (column with unique values) for this table.
Each row of this table contains information of one element.
`type` is an ENUM (category) of type `'Metal'`, `'Nonmetal'`, or
`'Noble'`.

- If `type` is `Noble`, `electrons` is `0`.
- If `type` is `Metal`, `electrons` is the number of electrons that one
  atom of this element can give.
- If `type` is `Nonmetal`, `electrons` is the number of electrons that
  one atom of this element needs.

Two elements can form a bond if one of them is `'Metal'` and the other is
`'Nonmetal'`.

Write a solution to find all the pairs of elements that can form a bond.

Return the result table in any order.

Each testcase supplies its own `dataset`: the DDL seeds the `Elements`
table with that testcase's rows. The result format is shown in the
following example.

### Example 1

```text
Input:
Elements table:
+--------+----------+-----------+
| symbol | type     | electrons |
+--------+----------+-----------+
| He     | Noble    | 0         |
| Na     | Metal    | 1         |
| Ca     | Metal    | 2         |
| La     | Metal    | 3         |
| Cl     | Nonmetal | 1         |
| O      | Nonmetal | 2         |
| N      | Nonmetal | 3         |
+--------+----------+-----------+
Output:
+-------+----------+
| metal | nonmetal |
+-------+----------+
| La    | Cl       |
| Ca    | Cl       |
| Na    | Cl       |
| La    | O        |
| Ca    | O        |
| Na    | O        |
| La    | N        |
| Ca    | N        |
| Na    | N        |
+-------+----------+
Explanation:
Metal elements are La, Ca, and Na.
Nonmeal elements are Cl, O, and N.
Each Metal element pairs with a Nonmetal element in the output table.
```

Every `Metal` element bonds with every `Nonmetal` element, and each pair
is reported once. Write your solution as a single `SELECT` query returning
two columns — `metal` and `nonmetal`, in that order — with one row per
`(Metal, Nonmetal)` pair. The rows may appear in any order.
