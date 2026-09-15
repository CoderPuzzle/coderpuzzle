# Solutions — Student Attendance Record I

## One sweep counting absences and lates

Both criteria are about facts the record reveals day by day: how many
absences have piled up in total, and how long the current streak of
consecutive lates has grown. Neither ever needs a look back past the current
day, so one left-to-right sweep with two counters decides everything —
`absents` for the running total of `'A'` days, `lates` for the streak of
`'L'` days ending at the current position.

The sweep updates both counters in the obvious way: an `'A'` increments
`absents` and ends the late streak — an absent day is not a late day — an
`'L'` extends the streak by one, and a `'P'` ends it. The verdict can also
fail early: the moment `absents` reaches 2 or `lates` reaches 3, no later
day can repair the breach, so the method returns `false` without reading the
rest of the record. A sweep that finishes proves both criteria held.

The two counters measure different shapes of failure. `"LLALL"` holds four
lates yet passes, because the `'A'` splits them into two legal streaks,
while `"ALPLA"` fails on two absences spaced as far apart as the record
allows — the absence count is total, the late rule is only about runs.

**Complexity:** `O(n)` time, `O(1)` space.
