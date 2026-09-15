# Solutions — Richest Customer Wealth

## Row sums, one scan

Wealth is a strictly per-customer quantity: customer `i` holds
`accounts[i][j]` in bank `j`, so their wealth is just the sum of row `i`.
No customer interacts with any other, and the banks within a row carry no
order that matters — the answer is the largest of the `m` row sums and
nothing else about the matrix.

The code walks the rows once, totals each row's balances, and keeps the
largest total seen. Because the constraints guarantee at least one
customer and every balance is at least 1, a running maximum seeded at 0
is always overwritten by the first row. Ties need no special handling:
when several customers share the top wealth, the value returned is that
shared wealth either way, since the question asks for the wealth, not the
customer.

The bounds are tiny — at most 50 customers with 50 banks each, balances
between 1 and 100 — so the largest possible wealth is `50 * 100 = 5000`,
far inside a 32-bit integer, and the whole job is one pass in which each
entry is read exactly once and only a running maximum is carried between
rows.

**Complexity:** `O(m * n)` time, `O(1)` extra space.
