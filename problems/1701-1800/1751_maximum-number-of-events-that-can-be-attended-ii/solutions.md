# Solutions — Maximum Number of Events That Can Be Attended II

## Dynamic Programming with Binary Search

Sorting the events by end day fixes a canonical order: any set of mutually compatible events, listed by when they finish, is a subsequence of this order, so a DP over prefixes of the sorted list sees compatible choices always to the left. The DP state is `prev[i]` — the best total value using only the first `i` sorted events while attending at most `j - 1` of them — and one sweep per additional allowed attendance upgrades it to the `j`-attendance table, so the two dimensions are processed as rolling arrays of length `n + 1`.

Each sweep builds `cur`, where `cur[i + 1]` is the best value over the first `i + 1` events with one more attendance available. Skipping is inherited through a running maximum, and taking event `t` adds `values[t]` on top of the best compatible prefix: the events that end strictly before `starts[t]` are exactly the first `bisect_left(ends, starts[t])` sorted events, found by binary search over the sorted end days. The strict comparison enforces the rule that an event may not start on the same day another ends.

Starting from the all-zero table (zero attendances) and sweeping `min(k, n)` times yields `prev[n]`, the answer over all events with at most `k` attendances; extra sweeps beyond `n` can never help since each event is taken at most once. The sort dominates the setup cost, and each sweep does `n` binary searches.

**Complexity:** `O(n log n + k n)` time, `O(n)` space.
