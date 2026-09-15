# Solutions — Good Subsequence Queries

Only values divisible by `p` can participate. After division by `p`, the task
is to choose a proper subsequence with GCD one, which can be tracked through
the coverage of distinct prime factors.

## Dynamic prime-factor coverage

Maintain, for every prime, how many active reduced values contain it. If fewer
than `n` indices are active, taking all active values is already a proper
subsequence, and its GCD is one exactly when no prime covers every active
index. A histogram of prime coverage counts answers that test immediately.

When all `n` indices are active, one index must be omitted. A prime occurring
at `n - 1` indices forbids omitting its unique missing index; XORs of covered
indices identify that index. Maintain how many distinct indices are forbidden,
as well as whether any prime covers all `n` indices. Each update changes only
the distinct prime factors of its old and new reduced values.

**Complexity:** `O((n + q) log V)` time, `O(n + V)` space, where `V = 50000`.
