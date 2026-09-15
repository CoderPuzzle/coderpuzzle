# Solutions — Can I Win

## Bitmask Memoized Game Search

With both players optimal, this is a combinatorial game whose state is fully described by the set of integers already used — the running total is determined by that set, since the remaining target is `desiredTotal` minus the sum of the used numbers. With `maxChoosableInteger <= 20`, the used-set fits in a 20-bit mask, giving at most `2^20` reachable states, which is why a brute-force game tree becomes tractable once memoized on the mask alone.

Two guards short-circuit degenerate inputs before any search: if `desiredTotal <= 0`, the first player has already "reached" the target and wins trivially; and if the sum of all choosable integers `1..m` is below the target, the pool can never reach it, so nobody wins and the first player loses. Without the second guard the search would correctly but wastefully explore the entire exhausted-pool tree.

`can_win(state, remaining)` asks whether the player about to move from this state can force a win. It tries every unused number `choice`: an immediate win occurs when `choice >= remaining` (the mover reaches the target), and otherwise the move wins precisely when it leaves the opponent in a losing state — `not can_win(state | bit, remaining - choice)`. If any choice succeeds the state is recorded as winning; if all fail, it is losing, the standard minimax identity for a single winner. Because players alternate and the loser is whoever cannot move toward the target, no draws exist beyond the pre-checked unreachable case.

The memo dictionary is keyed by `state` only; `remaining` is a derived quantity, memoizing each of the `2^m` states once. Each state evaluation loops at most m choices with an O(1) memo hit per child, so the whole game solves in roughly `m * 2^m` steps.

**Complexity:** `O(m * 2^m)` time and `O(2^m)` space, where m is `maxChoosableInteger`.
