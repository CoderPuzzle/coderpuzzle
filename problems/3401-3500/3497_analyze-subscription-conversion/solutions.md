# Solutions — Analyze Subscription Conversion

## Join two per-type averages

A user converts exactly when their activity history holds both a
`free_trial` and a `paid` row — the relative order of the dates is not
part of the contract. Isolate each side with a grouped subquery: one
computes `AVG(activity_duration)` over only `free_trial` rows, the other
over only `paid` rows, each keyed by `user_id`. An inner join on
`user_id` then keeps precisely the users that appear in both groups,
which is the conversion predicate and automatically excludes users who
only tried the product or only paid.

Rounding belongs in the outer select: `ROUND(..., 2)` applied to each
computed average after aggregation, so every row of a group contributes
before any precision is lost. `trial_avg_duration` and
`paid_avg_duration` are derived independently, so a user with no paid
rows would carry a null average — the inner join removes those users
before the averages ever surface.

`ORDER BY user_id` produces the required ascending ordering of the final
row set.

**Complexity:** `O(M log M)` time for the grouping sorts over `M`
activity rows, `O(M)` space for the intermediate per-user aggregates.
