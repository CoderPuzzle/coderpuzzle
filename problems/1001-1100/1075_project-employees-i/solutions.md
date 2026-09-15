# Solutions — Project Employees I

One join plus a grouped average reports every project's mean
experience directly: `Project` joined to `Employee` on `employee_id`
attaches each row's `experience_years`, and `AVG` under `GROUP BY
project_id` folds those years down to one average per project.

## Join Project to Employee, average per project

`employee_id` is a foreign key from `Project` into `Employee`, so an
inner join between the two never drops a `Project` row or invents one:
every `(project_id, employee_id)` pair picks up exactly the matching
employee's `experience_years`. Grouping the joined rows by
`project_id` then reduces each project's employees to a single row,
and `AVG(experience_years)` computed over that group is the project's
mean.

`ROUND(..., 2)` fixes the result to two decimal places. Measured on
the judge's sqlite, `ROUND` operates on the exact binary value of its
argument and rounds a tie away from zero, so an average of exactly
`2.5` reports `2.5` and an average of exactly `2.125` reports `2.13`.
The rounded value travels as a float: an average of exactly `2` years
is `2.0` on the wire, not the string `"2.00"`. Row order needs no
pinning — the judge compares result multisets, which is precisely the
statement's "in any order".

**Complexity:** `O(n log n)` time (grouping), `O(n)` space, for `n`
`Project` rows.
