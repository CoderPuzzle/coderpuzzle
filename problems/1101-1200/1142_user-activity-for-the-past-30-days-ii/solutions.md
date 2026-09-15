# Solutions — User Activity for the Past 30 Days II

## Count distinct sessions per user, then average

The unit of counting is a `(user, session)` pair, not an activity: a session
with one activity and a session with fifty both count once, which is exactly
what `COUNT(DISTINCT session_id)` inside a per-user group computes. The
inner query first narrows the table to the closed window 2019-06-28 through
2019-07-27 (the 30 days ending 2019-07-27), then groups by `user_id` — so a
user appears in the result only when they have at least one in-window
activity, matching the statement's rule for which users are averaged over.

The outer query averages the per-user session counts and rounds to two
decimal places. With no in-window activity at all, the inner group set is
empty and `AVG` yields NULL, which is the natural answer for an undefined
average.

**Complexity:** `O(N)` time over `N` Activity rows — one filtered grouped
scan with a per-user session set — and `O(U × S)` space for `U` users and
their distinct sessions.
