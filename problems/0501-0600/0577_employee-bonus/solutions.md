# Solutions — Employee Bonus

## Left join Bonus onto Employee

The two qualifying populations — employees whose bonus is below 1000,
and employees who never got a bonus at all — sit on opposite sides of a
join, so the query is a left join plus a two-branch filter.
`Employee LEFT JOIN Bonus ON Employee.empId = Bonus.empId` keeps every
employee; a matching `Bonus` row fills in the `bonus` column, and an
employee with no bonus row survives with null there. The
`WHERE bonus < 1000 OR bonus IS NULL` then admits both kinds of row:
real bonuses strictly under 1000, and the nulls that stand for "no
bonus".

Each half of that filter is a trap on its own. `bonus < 1000` alone
loses the bonus-less: in SQL the comparison `null < 1000` is unknown,
not true, so those rows would drop — the explicit `OR bonus IS NULL`
rescues them. The strict `<` matters at the boundary: a bonus of
exactly 1000 is not less than 1000 and does not qualify. Replacing the
left join with an inner join would discard the very employees the null
branch exists for before the filter ever runs, and `Bonus` rows whose
empId has no `Employee` entry match nothing on an `Employee`-driven
join and never surface on their own. `empId` is unique in `Bonus`, so
each employee matches at most one bonus row and yields at most one
output row.

With the join key resolved through an index or hash lookup, each of the
`E` `Employee` rows costs one probe into `Bonus`, so the join runs in
`O(E + B)` time over `B` bonus rows, and only the result itself — at
most `E` rows — is materialized.

**Complexity:** `O(E + B)` time, `O(E)` space.
