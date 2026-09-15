# Solutions — Get the Second Most Recent Activity

## Approach: Rank rows per user, keep rank one or two

Rank each user's activities from most recent to oldest with a window
function: `ROW_NUMBER() OVER (PARTITION BY username ORDER BY startDate DESC)`
numbers the rows within every username, newest first. The second most recent
activity is exactly row number two — and when a user has only one activity,
no row numbered two exists, so union in each user's single-row case (row
number one for usernames whose partition has just that row). Filtering on the
row number keeps both halves simple; `UNION ALL` merges them.

**Complexity:** `O(N log N)` over the `N` activity rows (the window sort),
`O(U)` output for `U` users.
