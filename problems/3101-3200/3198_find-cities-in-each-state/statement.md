# Find Cities in Each State

## Description

Table: `cities`

| Column Name | Type    |
| ----------- | ------- |
| state       | varchar |
| city        | varchar |

(`state`, `city`) is the primary key (combination of columns with unique
values) for this table.
Each row of this table contains the state name and the city name within
that state.

Write a solution to find all the cities in each state and combine them
into a single comma-separated string.

Return the result table ordered by state and city in ascending order.

Each testcase supplies its own `dataset`: the DDL seeds the `cities`
table with that testcase's rows. The comma-separated string joins each
state's cities in ascending order, separated by a comma and a space —
exactly as in the example below — and names are compared by their
ordinary character order (no diacritics appear in any dataset). The
result format is in the following example.

### Example 1

```text
Input:
cities table:
+-------------+---------------+
| state       | city          |
+-------------+---------------+
| California  | Los Angeles   |
| California  | San Francisco |
| California  | San Diego     |
| Texas       | Houston       |
| Texas       | Austin        |
| Texas       | Dallas        |
| New York    | New York City |
| New York    | Buffalo       |
| New York    | Rochester     |
+-------------+---------------+

Output:
+-------------+---------------------------------------+
| state       | cities                                |
+-------------+---------------------------------------+
| California  | Los Angeles, San Diego, San Francisco |
| New York    | Buffalo, New York City, Rochester     |
| Texas       | Austin, Dallas, Houston               |
+-------------+---------------------------------------+
Explanation:
    California: All cities ("Los Angeles", "San Diego", "San Francisco")
    are listed in a comma-separated string.
    New York: All cities ("Buffalo", "New York City", "Rochester") are
    listed in a comma-separated string.
    Texas: All cities ("Austin", "Dallas", "Houston") are listed in
    a comma-separated string.
Note: The output table is ordered by the state name in ascending order.
```

Write your solution as a single `SELECT` query returning two columns —
`state` and `cities` — one row per state with its cities joined in
ascending order into the comma-separated string, ordered by `state` in
ascending order. Return the result table in that order.
