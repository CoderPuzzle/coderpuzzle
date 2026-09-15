# Top Percentile Fraud

## Description

Table: `Fraud`

| Column Name | Type    |
| ----------- | ------- |
| policy_id   | int     |
| state       | varchar |
| fraud_score | real    |

`policy_id` contains unique values. Each row is a policy with its state and
fraud score.

The insurer assigns its most seasoned claim adjusters to the **top 5%** of
claims flagged by the predictive model.

Write a solution to find the top 5 percentile of claims from each state.

Return the result table ordered by `state` in **ascending** order,
`fraud_score` in **descending** order, and `policy_id` in **ascending**
order. Ordering is part of the answer — your query must produce the rows in
exactly this order.

Note: rank with `PERCENT_RANK() OVER (PARTITION BY state ORDER BY
fraud_score DESC)` and keep rows where the rank is strictly below `0.05`.

The test cases seed this table with different datasets; each testcase's
`dataset` value contains the `INSERT` statements.

### Example 1

```text
Input: Fraud table from the dataset below.
Output:
policy_id | state      | fraud_score
1         | California | 0.92
11        | Florida    | 0.98
4         | New York   | 0.94
7         | Texas      | 0.98
```

Write your solution as a single `SELECT` query returning columns
`policy_id`, `state`, and `fraud_score`.

## Hints

### Hint 1

Percentile ranks are computed per state, so partition the window by state.

### Hint 2

Ordering the window by fraud_score DESC puts the riskiest claims at rank 0.

### Hint 3

The final ORDER BY (state, fraud_score DESC, policy_id) is judged exactly — do not skip it.
