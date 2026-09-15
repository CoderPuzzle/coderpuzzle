# Solutions — Day of the Week

## Count Days from a Known Anchor

The problem hands over an anchor: January 1, 1971 was a Friday. Weekdays
repeat with period 7, so naming a date's weekday reduces to counting how
many days separate it from the anchor and taking that count modulo 7 —
offset 0 lands back on Friday.

The count has three parts. Full years contribute 365 days each plus one
for every leap year crossed (divisible by 4, except centuries not divisible
by 400 — the Gregorian rule). Full months of the target year contribute
their fixed lengths from a table, with February widened to 29 when the
target year itself is a leap year. Finally `day − 1` adds the progress
through the target month. Indexing a names array anchored at Friday turns
the total offset into the answer; at most 130 years are involved, so the
year loop is trivially cheap.

**Complexity:** `O(y)` time for the year sweep (`y ≤ 130`), `O(1)` space.
