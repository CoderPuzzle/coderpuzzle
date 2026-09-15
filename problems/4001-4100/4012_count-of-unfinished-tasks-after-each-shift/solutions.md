# Solutions — Count of Unfinished Tasks After Each Shift

## Prefix sums and binary search

Only two facts about a shift matter: how much work was already finished in the current pass, and where that amount lands among the tasks. Track `done`, the cumulative work completed since the last restart, and precompute `pref` where `pref[i]` is the total time tasks `0..i` need. Adding the shift's length to `done` either reaches `total` — every task is finished, so the answer is 0 and any unused time is discarded by resetting `done` to 0 — or it does not, in which case no restart happened.

With no restart, task `i` is fully completed exactly when `pref[i] <= done`; the next task (if any) holds all partially-consumed work, because carry-over keeps processing at one place. A binary search for `done` in `pref` therefore returns `c`, the count of fully completed tasks, and the answer is `n - c`. The search must be right-biased (`bisect_right`): if `done` equals an interior prefix sum exactly, that boundary task counts as finished, while the leading entry never appears because the prefix array starts at `tasks[0]`.

Each shift costs one `O(log n)` search after an `O(n)` preprocessing pass. Totals reach `10^5 * 10^9 = 10^14`, so `pref` and `done` need 64-bit arithmetic; the answers themselves are at most `10^5` and fit comfortably in 32 bits.

**Complexity:** `O(n + m log n)` time, `O(n)` space.
