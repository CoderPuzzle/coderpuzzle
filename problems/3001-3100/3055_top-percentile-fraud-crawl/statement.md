# Top Percentile Fraud

## Description

Table: `Fraud`

| Column Name | Type    |
| ----------- | ------- |
| policy_id   | int     |
| state       | varchar |
| fraud_score | real    |

`policy_id` is a column of unique values for this table. This table
contains the policy id, state, and fraud score.

The insurance company has developed an ML-driven predictive model to
detect the likelihood of fraudulent claims. Consequently, it assigns its
most seasoned claim adjusters to address the top 5% of claims flagged by
this model.

Write a solution to find the top 5 percentile of claims from each state.

Note: rank with `PERCENT_RANK() OVER (PARTITION BY state ORDER BY
fraud_score DESC)` and keep the rows whose rank is strictly under `0.05`.
Rows sharing a `fraud_score` share one rank and stand or fall together,
and a state with a single row ranks that row at `0`.

Return the result table ordered by `state` in **ascending** order,
`fraud_score` in **descending** order, and `policy_id` in **ascending**
order.

Each testcase supplies its own `dataset`: the DDL seeds the `Fraud`
table with that testcase's rows. The result format is in the following
example.

### Example 1

```text
Input:
Fraud table:
+-----------+------------+-------------+
| policy_id | state      | fraud_score |
+-----------+------------+-------------+
| 1         | California | 0.92        |
| 2         | California | 0.68        |
| 3         | California | 0.17        |
| 4         | New York   | 0.94        |
| 5         | New York   | 0.81        |
| 6         | New York   | 0.77        |
| 7         | Texas      | 0.98        |
| 8         | Texas      | 0.97        |
| 9         | Texas      | 0.96        |
| 10        | Florida    | 0.97        |
| 11        | Florida    | 0.98        |
| 12        | Florida    | 0.78        |
| 13        | Florida    | 0.88        |
| 14        | Florida    | 0.66        |
+-----------+------------+-------------+
Output:
+-----------+------------+-------------+
| policy_id | state      | fraud_score |
+-----------+------------+-------------+
| 1         | California | 0.92        |
| 11        | Florida    | 0.98        |
| 4         | New York   | 0.94        |
| 7         | Texas      | 0.98        |
+-----------+------------+-------------+
Explanation
- For the state of California, only policy ID 1, with a fraud score of
0.92, falls within the top 5 percentile for this state.
- For the state of Florida, only policy ID 11, with a fraud score of
0.98, falls within the top 5 percentile for this state.
- For the state of New York, only policy ID 4, with a fraud score of
0.94, falls within the top 5 percentile for this state.
- For the state of Texas, only policy ID 7, with a fraud score of 0.98,
falls within the top 5 percentile for this state.
Output table is ordered by state in ascending order, fraud score in
descending order, and policy ID in ascending order.
```

Write your solution as a single `SELECT` query returning the columns
`policy_id`, `state`, and `fraud_score`.
