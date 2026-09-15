# Solutions — Cache With Time Limit

## Deadline map with lazy expiry

A Map from key to its live entry is the whole data structure. The entry
carries the value plus the instant its window closes (`Date.now()` +
duration at set time). Reading the clock once per call is enough because
the judge routes every time query through one deterministic source, so a
deadline stored during an earlier action stays comparable to any later
one. `set` reports whether an un-expired entry existed and then overwrites
value and deadline together; expired and absent keys take exactly that
same path, which is why the tricky "true only if un-expired" wording costs
nothing.

Reads never repair the map: `get` returns -1 when the stored deadline has
passed, and `count` walks the entries incrementing a counter only for
survivors of the current instant. Lapsed rows leave the map lazily the
next time their key is touched by a `set`; since every action either
reads state that filters by deadline or overwrites outright, no stale row
can ever resurface. Expired-then-rewritten keys behave as fresh inserts,
and two keys whose windows close at the same instant drop out together
because the comparison is against a single shared now.

**Complexity:** `O(1)` time per operation, `O(n)` space.
