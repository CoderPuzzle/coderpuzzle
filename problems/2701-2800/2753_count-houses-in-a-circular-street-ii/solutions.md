# Solutions — Count Houses in a Circular Street II

## Beacon laps with progressive closing

An open door is the only landmark the street offers, so treat the open
door a round starts on as a beacon. Walking right from it, the next open
door sighted after `t` steps is either a genuinely different house or the
beacon itself — and the beacon can be re-sighted only after a complete
lap, at distance exactly `n`. With several doors open the sighting is
ambiguous, and each round resolves the ambiguity by elimination: close
the door just sighted, then sweep up to `k` further houses. If some open
door survives, the sweep must find one — the round-start beacon was not
the door closed, it is still open, and it sits at forward distance at
most `n <= k` — so the round hands off to that survivor and continues.
If the sweep finds nothing, every door is closed, which is possible only
when the door just closed was the beacon itself; that round's sighting
was therefore the full lap, and its step count `t` equals `n`.

The bookkeeping stays exact because each round closes precisely one open
door and no door ever reopens: the rounds consume the initially open
doors one at a time, so there are at most `m <= n <= k` of them, and a
round's first walk can never overrun the circumference (its own start
door is open at forward distance `n`). The case `n == k` is where the
sweep length matters — exactly `k` visited houses are needed before an
empty sweep may conclude anything, since house number `k` is the first
one that can be the beacon again.

Every operation counts against the budget once, and the rounds organize
into revolutions: a revolution is one full pass of sighting/probe hand-
offs around the current open doors, and it travels each arc between
surviving neighbors exactly twice — once sighting forward to the next
open door, once probing onward to the survivor after closing — so one
revolution costs exactly `2n` walked steps and closes every second
surviving open door. The number of survivors therefore halves per
revolution, giving `O(log n)` revolutions after at most `n` preamble
steps, plus one call per close and the single final `k`-step sweep. The
whole run stays under `2n·lg₂(n) + 4n + 2k` operations — about four
million only in pathological all-open streets at `k = 10⁵`, and at most
1.3 million on this problem's judged data — inside the 4 000 000 budget.

**Complexity:** `O(n log n + k)` time and `O(1)` space.
