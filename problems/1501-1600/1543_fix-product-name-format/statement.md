# Fix Product Name Format

## Description

Table: `Sales`

| Column Name  | Type    |
| ------------ | ------- |
| sale_id      | int     |
| product_name | varchar |
| sale_date    | date    |

`sale_id` is the primary key (column with unique values) for this table.
Each row of this table contains the product name and the date it was sold.

Since the table was filled in manually, `product_name` may contain leading
and/or trailing white spaces, and it is also case-insensitive.

Write a solution to report:

- `product_name` in lowercase, without leading or trailing white spaces.
- `sale_date` formatted as `'YYYY-MM'`.
- `total`, the number of times the product was sold in that month.

Each testcase supplies its own `dataset`: the DDL seeds the `Sales` table
with that testcase's rows. Return the result table ordered by
`product_name` ascending; break ties by `sale_date` ascending. The result
format is in the following example.

### Example 1

```text
Input: Sales table from the dataset below.
sale_id  product_name  sale_date
1        LCPHONE       2000-01-16
2        LCPhone       2000-01-17
3        LcPhOnE       2000-02-18
4        LCKeyCHAiN    2000-02-19
5        LCKeyChain    2000-02-28
6        Matryoshka    2000-03-31
Output:
product_name  sale_date  total
lckeychain    2000-02    2
lcphone       2000-01    2
lcphone       2000-02    1
matryoshka    2000-03    1
Explanation: In January, 2 LcPhones were sold. Product names are compared
case-insensitively after leading and trailing white space is removed. In
February, 2 LCKeychains and 1 LCPhone were sold. In March, one matryoshka
was sold.
```

## Hints

### Hint 1

`LOWER(TRIM(product_name))` collapses every casing and leading/trailing
spacing variant of the same name down to one canonical value — group by
that expression, not by `product_name` itself, or `'LCPhone'` and
`'lcphone '` will land in different groups.

### Hint 2

`strftime('%Y-%m', sale_date)` reads a `'YYYY-MM-DD'` value and keeps only
the year and month, so two sales on different days of the same month
collapse to the same group; grouping additionally by this expression is
what separates a product's February sales from its March sales.
