# Solutions — All People Report to the Given Manager

## Chain self-joins up the management tree

The reporting chain from an employee to the head is at most four people
long — the employee plus at most three managers above them. That bound
turns the traversal into a fixed number of self-joins: `e1` is a candidate
reporter, `e2` their manager, `e3` the manager's manager, and `e4` the
next link up. Requiring one of `e2..e4` to be the head keeps exactly the
employees whose chain reaches `employee_id = 1` within the depth
guarantee — an employee with fewer managers above simply has some join
alias coincide with the head.

Two guards keep degenerate rows out of the result. The head itself is
excluded (`e1.employee_id != 1`) — it reports to nobody, and the question
asks for reporters. And `e1.manager_id != e1.employee_id` drops anyone
whose row claims to be their own manager outside the head (the example's
employee 3), which would otherwise form a one-row cycle and never reach
the head but costs join rows trying.

**Complexity:** `O(n^4)` worst-case join nesting — in practice the primary-
key lookups along each three-link chain keep it near-linear for realistic
org tables; `O(d)` space for the chain bindings.
