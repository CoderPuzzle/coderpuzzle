# Year on Year Growth Rate

## Description

Table: `user_transactions`

| Column Name      | Type     |
| ---------------- | -------- |
| transaction_id   | integer  |
| product_id       | integer  |
| spend            | decimal  |
| transaction_date | datetime |

The `transaction_id` column uniquely identifies each row in this table.
Each row of this table contains the transaction ID, product ID, the spend
amount, and the transaction date.

Write a solution to calculate the year-on-year growth rate for the total
spend for each product.

The result table should include the following columns:

- `year`: The year of the transaction.
- `product_id`: The ID of the product.
- `curr_year_spend`: The total spend for the current year.
- `prev_year_spend`: The total spend for the previous year.
- `yoy_rate`: The year-on-year growth rate percentage, rounded to 2
  decimal places.

Return the result table ordered by `product_id`, `year` in ascending
order.

Each testcase supplies its own `dataset`: the script seeds the
`user_transactions` table with that testcase's rows, dates in ISO
`YYYY-MM-DD HH:MM:SS` form. A result row exists for every product-year
with at least one transaction, and never for any other pair. The previous
year's spend is the product's total in its closest earlier year that has
transactions — years without transactions are skipped and the comparison
spans the gap; if the product has no earlier year at all, both
`prev_year_spend` and `yoy_rate` are null, and if the previous year's
total spend is zero the rate divides by zero and is null as well. Only
the year of `transaction_date` matters — time-of-day components never
affect any grouping. The result format is in the following example.

### Example 1

```text
Input: user_transactions table from the dataset below.
Output:
year  product_id  curr_year_spend  prev_year_spend  yoy_rate
2019  123424      1500.6           null             null
2020  123424      1000.2           1500.6           -33.35
2021  123424      1246.44          1000.2           24.62
2022  123424      2145.32          1246.44          72.12
Explanation: product 123424 transacted in four consecutive years. In
2019 there is no earlier year, so prev_year_spend and yoy_rate are null.
In 2020 ((1000.20 - 1500.60) / 1500.60) * 100 = -33.35%; in 2021
((1246.44 - 1000.20) / 1000.20) * 100 = 24.62%; in 2022
((2145.32 - 1246.44) / 1246.44) * 100 = 72.12%.
```

Write your solution as a single `SELECT` query returning five columns —
`year`, `product_id`, `curr_year_spend`, `prev_year_spend`, `yoy_rate` —
one row per product-year with transactions, ordered by `product_id` then
`year`.
