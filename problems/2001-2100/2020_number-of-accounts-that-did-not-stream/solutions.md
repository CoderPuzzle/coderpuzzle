# Solutions — Number of Accounts That Did Not Stream

## Count overlapping subscriptions without a 2021 stream

A subscription intersects 2021 exactly when it starts no later than December
31 and ends no earlier than January 1. Filter `Subscriptions` by those inclusive
boundaries, then count the accounts for which a correlated `NOT EXISTS` finds
no `Streams` row from the same account dated within the year.

`NOT EXISTS` is unaffected by duplicate stream sessions and avoids the null
behavior of `NOT IN`. The outer `COUNT(*)` always emits one row, so an empty
input or a set where every qualifying account streamed still returns the
required zero under the `accounts_count` column.

**Complexity:** `O(S * T)` time and `O(1)` extra space for `S` subscriptions and `T` stream sessions.
