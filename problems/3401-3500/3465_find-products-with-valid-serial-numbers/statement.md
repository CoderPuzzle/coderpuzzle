# Find Products with Valid Serial Numbers

## Description

Table: `products`

| Column Name  | Type    |
| ------------ | ------- |
| product_id   | int     |
| product_name | varchar |
| description  | varchar |

(`product_id`) is the unique key for this table.
Each row in the table represents a product with its unique ID, name, and
description.

Write a solution to find all products whose description contains a valid
serial number pattern. A valid serial number follows these rules:

- It starts with the letters SN (case-sensitive).
- Followed by exactly 4 digits.
- It must have a hyphen (-) followed by exactly 4 digits.
- The serial number must be within the description (it may not necessarily
  start at the beginning).

Return the result table ordered by `product_id` in ascending order.

Each testcase supplies its own `dataset`: the script seeds the `products`
table before your query runs. The result format is in the following
example.

### Example 1

```text
Input:

products table:

+------------+--------------+------------------------------------------------------+
| product_id | product_name | description                                          |
+------------+--------------+------------------------------------------------------+
| 1          | Widget A     | This is a sample product with SN1234-5678            |
| 2          | Widget B     | A product with serial SN9876-1234 in the description |
| 3          | Widget C     | Product SN1234-56789 is available now                |
| 4          | Widget D     | No serial number here                                |
| 5          | Widget E     | Check out SN4321-8765 in this description            |
+------------+--------------+------------------------------------------------------+

Output:

+------------+--------------+------------------------------------------------------+
| product_id | product_name | description                                          |
+------------+--------------+------------------------------------------------------+
| 1          | Widget A     | This is a sample product with SN1234-5678            |
| 2          | Widget B     | A product with serial SN9876-1234 in the description |
| 5          | Widget E     | Check out SN4321-8765 in this description            |
+------------+--------------+------------------------------------------------------+

Explanation:

Product 1: Valid serial number SN1234-5678
Product 2: Valid serial number SN9876-1234
Product 3: Invalid serial number SN1234-56789 (contains 5 digits after the hyphen)
Product 4: No serial number in the description
Product 5: Valid serial number SN4321-8765

The result table is ordered by product_id in ascending order.
```

Write your solution as a single `SELECT` query returning three columns —
`product_id`, `product_name`, and `description` — one row for every product
whose description contains a valid serial number, ordered by `product_id`
in ascending order.
