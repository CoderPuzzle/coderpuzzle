# Solutions — Minimum Number of Work Sessions to Finish the Tasks

## Bitmask Dynamic Programming

With at most 14 tasks, every set of already-scheduled tasks fits in a bitmask, and the key observation is that a partial schedule can be summarized by just two numbers: how many sessions it has opened, and how much time remains in the most recently opened session. Only the last session can still absorb more tasks (finished sessions are closed forever), so `dp[mask]` stores the pair `(sessions used, remaining time in the open session)` for the best known way to complete exactly the set `mask`. The pair is compared lexicographically — fewer sessions wins, and on a tie, more remaining time wins, since a roomier open session can only help future placements.

States are processed in increasing mask order, which guarantees every sub-mask is final before it is extended. From each state, every task not yet in the mask is tried: if it fits in the remaining time, the pair becomes `(sessions, remaining - cost)`; otherwise a new session opens, giving `(sessions + 1, sessionTime - cost)`. The candidate is written into `dp[mask | bit]` whenever it beats the stored pair. Because tasks are always appended in index order, every set partition of tasks into sessions is reachable by some order of decisions, so the search covers all packings.

Unreached states carry `(infinity, 0)` and are skipped. The guarantee `sessionTime >= max(tasks)` ensures each single task fits in a fresh session, so `dp[FULL]` is always finite, and its session count is the answer. The tie-breaking rule is safe because a state with equal sessions but more remaining time can imitate every continuation of its rival.

**Complexity:** `O(2^n * n)` time, `O(2^n)` space.
