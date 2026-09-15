# Solutions — Swap Sex of Employees

## Flip the sex in one scan

The judged output is the post-swap `Salary` table: every employee's row with
its sex value exchanged — each `'m'` an `'f'`, each `'f'` an `'m'` — and every
other column exactly as it stands. `CASE sex WHEN 'm' THEN 'f' ELSE 'm' END`
computes the flip per row: the enum holds exactly the two values, so one
matched arm plus the residual `ELSE` covers every row of the scan, and
projecting it in place of the `sex` column rewrites just that column while
`id`, `name`, and `salary` pass through untouched.

The form is the post-state itself rather than a simulation of the mutation:
the returned rows are exactly what
`UPDATE Salary SET sex = CASE sex WHEN 'm' THEN 'f' ELSE 'm' END` would leave
behind — the `SET` expression reused verbatim as a projection. Equivalent
shapes state the same per-row flip —
`CASE WHEN sex = 'm' THEN 'f' WHEN sex = 'f' THEN 'm' END` spells both arms
out, and `REPLACE('fm', sex, '')` deletes the row's own value from the two-
character string and hands back the other — but the single-`CASE` form needs
no second arm and no string trick.

One scan of the table computes one `CASE` per row and emits it; nothing is
aggregated, joined, or ordered.

**Complexity:** `O(N)` time, `O(1)` space, with `N` rows in `Salary`.
