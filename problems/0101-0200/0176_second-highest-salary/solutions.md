# Solutions — Second Highest Salary

## Max below the maximum

The request is positional over the _distinct_ salaries: the value one step below the top, with `null` when fewer than two distinct values exist. `(SELECT MAX(salary) FROM Employee)` finds the top, the outer filter `salary <` that value keeps exactly the rows the second highest is drawn from, and `MAX` over them is the answer. The aggregate form is chosen over `DISTINCT ... ORDER BY salary DESC LIMIT 1 OFFSET 1`: with fewer than two distinct salaries the OFFSET form yields an empty row set, while an aggregate over zero rows emits one row holding `null` — the output shape the contract requires, with no wrapper query.

Duplicates collapse without any explicit deduplication. The strict `<` excludes every copy of the top salary at once, so repeated top values cannot leak into the answer, and `MAX` picks the largest remaining value no matter how often it repeats. Because the outer query is a plain aggregate its row count is fixed at one: the second highest when it exists, and `null` for the all-equal, single-row, and empty-table cases.

The uncorrelated scalar subquery scans `Employee` once for the maximum and the outer query scans it once more with a constant comparison per row; nothing beyond a running maximum is materialized. With `E` rows in `Employee` that is two linear passes.

**Complexity:** `O(E)` time, `O(1)` extra space.
