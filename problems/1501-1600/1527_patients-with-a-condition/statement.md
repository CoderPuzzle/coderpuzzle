# Patients With a Condition

## Description

Table: `Patients`

| Column Name  | Type    |
| ------------ | ------- |
| patient_id   | int     |
| patient_name | varchar |
| conditions   | varchar |

`patient_id` is the primary key (column with unique values) for this
table. `conditions` contains 0 or more codes separated by single spaces.
This table contains information of the patients in the hospital.

Write a solution to find the `patient_id`, `patient_name`, and
`conditions` of the patients who have Type I Diabetes. Type I Diabetes
always has a code that starts with the `DIAB1` prefix.

Each testcase supplies its own `dataset`: the DDL seeds the `Patients`
table with that testcase's rows. The result format is in the following
example.

### Example 1

```text
Input: Patients table from the dataset below.
patient_id  patient_name  conditions
1           Daniel        YFEV COUGH
2           Alice
3           Bob           DIAB100 MYOP
4           George        ACNE DIAB100
5           Alain         DIAB201
Output:
patient_id  patient_name  conditions
3           Bob           DIAB100 MYOP
4           George        ACNE DIAB100
Explanation: Bob and George both have a code that starts with DIAB1 among
their space-separated conditions. Alain's only code is DIAB201, which
starts with DIAB2, not DIAB1, so he is excluded.
```

Write your solution as a single `SELECT` query returning the
`patient_id`, `patient_name`, and `conditions` of every patient who has a
Type I Diabetes code. Rows may be returned in any order.

## Hints

### Hint 1

`conditions` is a single space-separated string, not a list — a naive
`conditions LIKE '%DIAB1%'` would also match a code like `ADIAB100` where
`DIAB1` sits in the middle of some other word, which does not count.

### Hint 2

A qualifying code either opens the string
(`conditions LIKE 'DIAB1%'`) or is preceded by a space that ends the
previous code (`conditions LIKE '% DIAB1%'`). Combine the two with `OR`
to cover a code in any position.

### Hint 3

The prefix rule is a prefix, not an exact match — `DIAB100` and `DIAB1`
itself both qualify, but `DIAB201` does not, since it starts with `DIAB2`.
