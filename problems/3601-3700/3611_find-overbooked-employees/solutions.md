# Solutions — Find Overbooked Employees

The question folds into two levels of aggregation: first total each
employee's meeting hours per calendar week and keep the weeks that cross the
20-hour meeting-heavy threshold, then count those heavy weeks per employee
and keep only employees with at least two. Joining back to `employees`
restores the name and department the answer must carry.

## Group per employee per week, then count heavy weeks

`date(meeting_date, 'weekday 0', '-6 days')` maps every date to the Monday
of its Monday-to-Sunday week (the `weekday 0` modifier advances to the
following Sunday, and subtracting six days lands on that week's Monday; a
Sunday already stays put, so the week that contains it is still the one
ending that day). Grouping the `meetings` rows by employee and that Monday,
`SUM(duration_hours)` is the weekly load and `HAVING SUM(duration_hours) > 20`
keeps exactly the meeting-heavy weeks — the comparison is strict, so a week
of exactly 20.0 hours does not count, matching the example.

The inner result is one row per (employee, heavy week). Joining it to
`employees` and grouping by `employee_id` collapses each employee's heavy
weeks, and `COUNT(*)` then counts them; `HAVING COUNT(*) >= 2` drops
everyone meeting-heavy for fewer than two weeks. The final
`ORDER BY meeting_heavy_weeks DESC, employee_name ASC` reproduces the
required ordering — in example 1 both survivors have two heavy weeks, so
Alice Johnson sorts before David Wilson.

**Complexity:** `O(m log m)` time, `O(m)` space (m meeting rows).
