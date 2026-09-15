# Solutions — High-Access Employees

## Bucket by employee, sort minutes, scan triples

The definition only ever asks about one employee at a time, so the first
move is to split `access_times` into per-name buckets. While bucketing, each
four-digit `"HHMM"` stamp collapses to a minute count, `60 * HH + MM`; the
day is finite and linear, so comparing plain integers is exact and the
"0005"/"2350" wrap-around worry disappears — times near midnight are simply
far apart as numbers.

Within each bucket the stamps sort in increasing minute order, and then the
one-hour rule becomes local: the employee is high-access exactly when some
three consecutive stamps `t[k]`, `t[k+1]`, `t[k+2]` satisfy
`t[k+2] - t[k] < 60`. If any three stamps fit inside a one-hour window, the
earliest three of them do, and they must be consecutive after sorting;
conversely a consecutive triple with span under an hour is itself a
witness. The `<` (rather than `<=`) is what implements "exactly one hour of
difference is not the same period". Each bucket is scanned once, so the
whole method is a sort per bucket plus a linear sweep.

**Complexity:** `O(n log n)` time, `O(n)` space.
