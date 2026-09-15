# Solutions — Maximum Requests Without Violating the Limit

A per-user greedy sweep: group request times by user, sort each list, and
slide a window that drops exactly the requests that would complete a
forbidden group of `k + 1`.

## Per-user greedy with a sliding window

The limit speaks only about a single user, so different users never
interact: the answer is the sum over users of the largest number of that
user's requests that can survive. Group the times in a hash map keyed by
user and sort each list. A kept multiset is legal exactly when no inclusive
interval of length `window` holds more than `k` kept times — and the
tightest intervals start at a kept time, so legality means every `k + 1`
consecutive kept times span strictly more than `window`.

Scan each user's sorted times ascending and keep a time `t` unless it would
complete a forbidden group: with `kept` the list of times accepted so far,
keep `t` iff fewer than `k` were kept, or `t - kept[-k] > window` — after
appending, the last `k + 1` kept times are exactly `kept[-k..]` plus `t`,
and requiring their span to exceed `window` checks every interval that ends
at `t`. This is optimal by an exchange argument: greedy's `j`-th kept time
is never later than any legal set's `j`-th, so whenever greedy drops `t`,
the `k` kept times it holds are all at or before the `k` times preceding
`t` in any legal set containing `t`, forcing that set's own last `k + 1`
times to span at most `window` — a contradiction. Hence no legal set keeps
more times than greedy does.

Every value stays small: users, times, `k`, and `window` are at most 10⁵
and the answer is bounded by the request count n ≤ 10⁵, so 32-bit integers
are exact in every language, and JavaScript's doubles represent all of them
exactly far below 2⁵³. The scan is fully iterative — sorting and one
pass per user — so there is no recursion-depth concern.

**Complexity:** `O(n log n)` time, `O(n)` space.
