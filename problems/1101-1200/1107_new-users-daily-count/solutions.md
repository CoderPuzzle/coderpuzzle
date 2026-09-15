# Solutions — New Users Daily Count

## First login per user, then filter and count by date

The query has two stages. An inner subquery narrows the table to `login`
rows and groups by `user_id`, keeping the earliest `activity_date` per user
as that user's `login_date` — the `MIN` collapses repeat logins and ignores
every non-login activity, so the first time a user ever logged in is what
survives. The outer query then keeps only those first-login dates that fall
inside the 90-day window ending on 2019-06-30, groups the survivors by
`login_date`, and counts the users in each group.

The window is closed at both ends: `BETWEEN DATE('2019-06-30', '-90 day')
AND '2019-06-30'` accepts the date exactly 90 days before today and
everything newer. `COUNT(*)` in the outer group is safe because the inner
subquery already emitted exactly one row per user, so each user contributes
to at most one login_date group.

**Complexity:** `O(N)` time and `O(U)` space, for `N` Traffic rows and `U`
distinct users — one grouped scan for the minima and one for the counts.
