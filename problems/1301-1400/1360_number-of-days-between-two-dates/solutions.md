# Number of Days Between Two Dates

## Approach: Days-from-epoch counter, absolute difference

Each date is converted to a day number counted from a fixed epoch: the
full years before it contribute 365 or 366 each (a year is leap when
divisible by 4, except the century years not divisible by 400 — and 2000
is the only such exception inside 1971..2100), the elapsed months of the
final year contribute their lengths, with February gaining one day in a
leap year, and the day-of-month finishes the count. The answer is the
absolute difference of the two day numbers.

Parsing is three fixed-width integer slices of the `YYYY-MM-DD` string —
no date library needed.

**Complexity:** O(1) time and space (at most 130 year iterations).
