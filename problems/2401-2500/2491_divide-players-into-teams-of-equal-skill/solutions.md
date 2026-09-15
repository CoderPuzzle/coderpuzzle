# Solutions — Divide Players Into Teams of Equal Skill

Every team has the same total skill, so that total is forced: the sum of
all `n` skills split evenly across `n / 2` teams. If the sum does not
divide, no pairing can possibly be even; otherwise every team must reach
the same target.

## Sort and pair weakest with strongest

After sorting, the weakest remaining player and the strongest remaining
player must be teammates. If `skill[i] + skill[j]` (the current
extremes) is not the target, the whole division is impossible — the
weakest player cannot team with anyone stronger, and anyone weaker does
not exist. When the pair does match, their chemistry is their product,
added to the running sum, and both pointers move inward. The pairing is
greedy yet forced, so a single pass over the sorted array both verifies
feasibility and accumulates the answer.

The chemistry of one team is at most `1000 * 1000`, and there are at
most `n / 2 <= 5 * 10⁴` teams, so the answer fits comfortably in 64 bits
(the return type is widened from the statement's `int` for this reason).

**Complexity:** `O(n log n)` time, `O(log n)` space (for the sort).
