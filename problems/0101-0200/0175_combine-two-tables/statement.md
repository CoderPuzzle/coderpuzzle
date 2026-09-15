# Combine Two Tables

## Description

Table: `Person`

| Column Name | Type    |
| ----------- | ------- |
| personId    | int     |
| lastName    | varchar |
| firstName   | varchar |

`personId` is the primary key (column with unique values) for this table.
This table contains information about the ID of some persons and their
first and last names.

Table: `Address`

| Column Name | Type    |
| ----------- | ------- |
| addressId   | int     |
| personId    | int     |
| city        | varchar |
| state       | varchar |

`addressId` is the primary key (column with unique values) for this table.
Each row of this table contains information about the city and state of
one person with ID = personId.

Write a solution to report the first name, last name, city, and state of
each person in the `Person` table. If the address of a personId is not
present in the `Address` table, report null instead.

Return the result table in any order.

Each testcase's `dataset` seeds both tables: its script inserts the
testcase's `Person` rows and, when present, its `Address` rows before your
query runs. The result format is in the following example.

### Example 1

```text
Input: Person and Address tables from the dataset below.
Output:
firstName  lastName  city           state
Allen      Wang      Null           Null
Bob        Alice     New York City  New York
Explanation: there is no address in the Address table for personId = 1,
so their city and state are null; addressId = 1 contains information
about the address of personId = 2.
```

Write your solution as a single `SELECT` query returning four columns —
`firstName`, `lastName`, `city`, and `state` — one row per person and
address pair, with null `city` and `state` when the person has no address.

## Hints

### Hint 1

The contract asks for every person, matched or not — that is exactly a LEFT JOIN with Person on the left: every Person row survives, and unmatched rows come back with null in the Address columns.

### Hint 2

Join on personId alone. addressId is only Address's own primary key; a person may legitimately hold several Address rows, and each match yields its own output row.

### Hint 3

Addresses whose personId has no Person row (like the example's addressId 2) match nothing on a Person-driven join and simply never appear — no filter is needed to remove them.
