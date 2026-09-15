# Solutions — Score Validator

## Single-pass simulation

Keep two running values and process the events once from left to right.
Digit events add their numeric value to the score, `"W"` raises the counter,
and both `"WD"` and `"NB"` add one to the score without touching the counter.

Because only `"W"` ever increases the counter, it is also the only event that
can trigger the stopping rule. Checking the counter after each event and
breaking as soon as it hits 10 implements "remaining events are ignored" with
no extra bookkeeping — whatever follows the breaking event simply never gets
read. Since `events.length <= 1000` and each digit event adds at most 6, the
score stays at most a few thousand, well inside 32-bit range.

**Complexity:** `O(n)` time, `O(1)` space.
