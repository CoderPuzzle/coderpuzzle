# Solutions — Second Highest Salary II

## Dense rank per department, keep rank two

`DENSE_RANK() OVER (PARTITION BY dept ORDER BY salary DESC)` numbers the
distinct salary levels inside each department from the top: every copy
of a department's best salary lands on rank one, its second-highest
distinct value on rank two. Ties never consume extra ranks precisely
because dense ranking skips nothing between distinct values.

Keeping only `rnk = 2` rows selects exactly the employees earning their
department's second-highest salary — all duplicates included — while
departments without a second distinct level (a single employee or one
shared salary) simply never produce a rank-two row and drop out of the
result without any special case. The final sort by `emp_id` produces the
required ascending order.

**Complexity:** `O(n log n)` time, `O(n)` space.
