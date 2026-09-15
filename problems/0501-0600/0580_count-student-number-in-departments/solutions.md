# Solutions — Count Student Number in Departments

## Left join the students and count the join column

Every department must be reported, staffed or not, which makes the join a
left outer join driven by `Department`: `Department LEFT JOIN Student ON
Department.dept_id = Student.dept_id` keeps every row of `Department`, and
a department with no students comes back once with null in the `Student`
columns instead of disappearing — an inner join would drop exactly the
empty departments the contract exists for. `GROUP BY dept_name` then
collapses each department's joined rows into a single group, giving the
one-row-per-department shape the contract asks for.

The counting expression is the whole exercise. `COUNT(student_id)` counts
the non-null student ids in each group, so a staffed department reports
its student total while an empty one — whose single row carries a null
`student_id` — reports 0. `COUNT(*)` would count that null-padded row
itself and report 1 for a department with no students at all, which is
precisely the trap; counting any never-null expression instead of the
join column fails the same way. `ORDER BY student_number DESC, dept_name`
presents the counts from the highest to the lowest and breaks ties
alphabetically, as the contract asks; the judge compares rows as an
unordered multiset, so that ordering is fidelity to the statement rather
than a correctness requirement. Counting is order-independent, so
insertion order never matters.

One pass over the `S + D` joined rows feeds the `D` groups, and ranking
those groups costs a sort — nothing beyond the group table is
materialized.

**Complexity:** `O(S + D log D)` time, `O(D)` space.
