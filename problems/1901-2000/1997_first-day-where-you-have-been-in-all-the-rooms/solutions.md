# Solutions — First Day Where You Have Been in All the Rooms

## Linear DP on First-Visit Days

Rooms are entered in order: room `i + 1` can only be reached by leaving room `i` on an even-numbered visit, so before room `i` is ever entered, every room below `i` has been visited an even number of times. Let `f[i]` be the day room `i` is first visited; the answer is `f[n - 1]`. Everything about the walk is deterministic, so these first-visit days can be computed one room at a time.

Consider the first arrival at room `i - 1` on day `f[i - 1]`. Its visit count turns odd, so the next day the walker is thrown back to `j = nextVisit[i - 1]`. At that moment rooms `0..i - 2` all have even counts and `j` is odd — precisely the configuration of day `f[j] + 1`, when the original walk also stood at `nextVisit[j]` after `j`'s first visit. The walk inside rooms `0..i - 2` is deterministic and depends only on those parities, so the replay takes exactly the `f[i - 1] - f[j] - 1` days the original segment took to climb from that state back to room `i - 1`. This time the arrival raises `i - 1`'s count from one to two (even), so the following day the walker steps into room `i`. Summing the pieces gives the recurrence `f[i] = 2 * f[i - 1] - f[j] + 2`, evaluated modulo `10^9 + 7`; taking the final result modulo again keeps it non-negative.

The case `j = i - 1` (a self-bounce) degenerates correctly to `f[i] = f[i - 1] + 2`: first visit, bounce to itself, even count, step forward. Room 0 is visited on day 0 (`f[0] = 0`), anchoring the recurrence.

**Complexity:** `O(n)` time, `O(n)` space.
