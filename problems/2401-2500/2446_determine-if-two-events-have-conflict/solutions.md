# Solutions — Determine if Two Events Have Conflict

## Interval Overlap in Minutes

Each `"HH:MM"` timestamp names one minute of the day, so the clean move
(hint 1) is to parse it into that minute count — `HH * 60 + MM` — after
which every event is just an inclusive integer interval `[start, end]`.
The string format exists only to be decoded; nothing about the conflict
question needs the text again.

Two inclusive intervals share a moment exactly when neither starts after
the other ends: `start1 <= end2 and start2 <= end1`. Both comparisons are
needed. Dropping either breaks a disjoint pair like
`[10:00, 11:00]` vs `[14:00, 15:00]`, where only `start1 <= end2` holds.
The inclusive endpoints matter too — an event ending at `02:00` does
conflict with one starting at `02:00` (example 1), which is why both
tests use `<=` rather than `<`.

All values live comfortably in 32 bits: a minute-of-day never exceeds
`23 * 60 + 59 = 1439`, so parsing and comparing four of them touches no
bound at all.

**Complexity:** `O(1)` time (four fixed-length parses), `O(1)` space.
