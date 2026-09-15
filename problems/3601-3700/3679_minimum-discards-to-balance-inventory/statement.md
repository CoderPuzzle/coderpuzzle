# Minimum Discards to Balance Inventory

## Description

A warehouse logs exactly one item arrival per day. You are given an integer
array `arrivals`, where `arrivals[i]` is the type of the item arriving on day
`i` (days are numbered from 1), along with two integers `w` and `m`.

Every arrival can either be kept or discarded, and the choice is irrevocable:
an item may only be discarded on the very day it arrives. To keep the stock
balanced, every window of the `w` most recent days — for each day `i`, the
window `[max(1, i - w + 1), i]` — must hold at most `m` kept arrivals of any
one item type. So an arrival whose type already occurs `m` times among the
kept arrivals inside its day's window cannot be kept; it must be discarded.

Return the minimum number of arrivals that must be discarded so that every
`w`-day window contains at most `m` occurrences of each type.

### Example 1

```text
Input: arrivals = [1,2,1,3,1], w = 4, m = 2
Output: 0
Explanation: Type 1 arrives on days 1, 3 and 5, but any 4-day window spans at
most two of those days, so no window ever holds more than two kept arrivals of
type 1. Every arrival stays and nothing is discarded.
```

### Example 2

```text
Input: arrivals = [1,2,3,3,3,4], w = 3, m = 2
Output: 1
Explanation: Days 3 and 4 bring type 3 into a shared window, which is allowed.
On day 5 the window covers days 3-5 and already holds two kept type-3 items,
so keeping a third would break the limit and the day-5 arrival is discarded;
one of the three must go because they all share that window. By day 6 the
window covers days 4-6 and holds just one kept type-3 arrival, comfortably
inside the limit. The single discard is therefore minimal.
```

### Constraints

- `1 <= arrivals.length <= 10⁵`
- `1 <= arrivals[i] <= 10⁵`
- `1 <= w <= arrivals.length`
- `1 <= m <= w`

## Hints

### Hint 1

Sweep the days left to right with two pointers marking the current window of
the last `w` days.

### Hint 2

Keep a hash map from item type to how many kept arrivals of that type sit in
the current window; when day `i` arrives, first consult the count of its type.

### Hint 3

When the left end of the window slides past day `i - w`, remove that day's
contribution from the map — but only if that arrival was actually kept;
discarded ones never entered the counts.

### Hint 4

If the count of the arriving type already equals `m`, discard the arrival and
count it; otherwise keep it and bump the count.
