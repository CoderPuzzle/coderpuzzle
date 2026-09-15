# Solutions — Leetflex Banned Accounts

An account is banned when two of its sessions — from different IP
addresses — were live at the same moment. Sessions live at the same
moment exactly when their intervals overlap, and "at some moment"
makes the endpoints inclusive: a logout at 17:00:00 collides with a
login at 17:00:00 (account 4 in the example), while 16:59:59 against
17:00:00 does not (account 3 escapes).

## Self-join on overlapping intervals

Join `LogInfo` to itself on the same account, different IP addresses,
and inclusive interval overlap: `a.login <= b.logout AND a.logout >=
b.login`. Either comparison alone is not enough — both directions must
hold for the intervals to share a moment — and the `!=` on IP keeps a
single address from banning itself across sessions. `SELECT DISTINCT`
collapses the join's duplicated hits into the account list; the
result's row order is free because the comparison is a multiset.

Timestamps compare as zero-padded `YYYY-MM-DD HH:MM:SS` strings, which
sort lexicographically in chronological order, so the interval test is
plain string comparison. The join is quadratic within an account in
the worst case, which the bounds comfortably allow.

**Complexity:** `O(n^2)` per-account worst case via the join, `O(n)`
output.
