# Solutions — Find Churn Risk Customers

## Aggregate Per User, Join Back the Last Event, Judge Four Bars

Every churn-risk rule is a property of one user's whole event
timeline, so the query first collapses that timeline into one summary
row per user. A grouped subquery scans `subscription_events` once and,
per `user_id`, collects everything the four bars need: `MAX` over the
dates gives the last event date and `MIN` the first (ISO dates compare
chronologically as plain text, so text `MIN`/`MAX` are date
`MIN`/`MAX`), `MAX(monthly_amount)` is the historical high-water mark,
and `SUM(event_type = 'downgrade')` turns the boolean test into a 0/1
count of downgrades.

The outer query joins each summary row back to the one event whose
date equals that user's last date — distinct dates per user make this
exactly one row — and judges all four bars on it. The last event's
type must not be `'cancel'`; the downgrade count must be at least 1;
the revenue bar compares the last event's `monthly_amount` against the
historical maximum cross-multiplied as `2 * current < max`, keeping
the strictly-less-than-half decision in exact arithmetic with no
division; and the tenure bar takes the plain day difference
`julianday(last) - julianday(first) >= 60`. Qualifying rows then emit
the reported columns straight from the data — plan, current amount,
maximum amount, and the day difference cast to an integer — and the
mandated order falls out of `ORDER BY days_as_subscriber DESC,
user_id ASC`.

Each event feeds a constant number of aggregate terms, so with hash
grouping the whole query is one linear sweep over the table (a
sort-based plan adds only a log factor); working storage holds one
summary row per distinct user.

**Complexity:** `O(T)` time and `O(U)` space for `T` events and `U`
users.
