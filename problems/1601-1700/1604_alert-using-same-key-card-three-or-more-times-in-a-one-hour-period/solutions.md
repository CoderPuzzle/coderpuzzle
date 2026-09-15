# Solutions — Alert Using Same Key-Card Three or More Times in a One Hour Period

## Group, sort, and slide a window of three

An alert only depends on one worker's own swipe history, so the first move is
to separate the mixed stream into one list of times per name. Converting each
`"HH:MM"` string to minutes since midnight (`60 * H + M`) turns time
comparisons into plain integer arithmetic; because every swipe in the input
falls on the same day, no wraparound past midnight ever needs to be
considered.

Within a single worker's list, sort the minute values and slide a window of
three consecutive swipes: if the gap between the earliest and the latest of
three swipes in a row (`times[i + 2] - times[i]`) is at most 60, those three
swipes fall inside a one-hour period and the worker is added to the alert
list. Once one such window is found for a worker, the rest of their swipes
can be skipped — a name is added at most once, matching the "unique worker
names" requirement. Sorting each worker's alert status into the final answer
is just a final alphabetical sort of the collected names.

**Complexity:** `O(n log n)` time, `O(n)` space, where `n` is the number of
swipes.
