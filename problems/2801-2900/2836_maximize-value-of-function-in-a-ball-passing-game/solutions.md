# Solutions — Maximize Value of Function in a Ball Passing Game

## Binary Lifting

Since each player passes to exactly one fixed receiver, the trajectory from any starting player is deterministic, and after `k` passes it may cycle. With `k` up to `10^10`, following the passes one at a time for every start is far too slow, but the function is composable: knowing where `2^j` passes carry the ball also tells you where `2^(j+1)` passes carry it — do one `2^j` jump, then another from the landing spot.

The solution precomputes two tables for every `j < bit_length(k)`: `up[j][x]`, the player holding the ball after `2^j` passes starting from `x`, and `sm[j][x]`, the sum of the player indices who _receive_ the ball during those `2^j` passes. Level `0` is just `receiver[x]` for both, and each higher level composes two lower jumps: the endpoint follows `up[j-1]` twice, and the sums add `sm[j-1][x] + sm[j-1][up[j-1][x]]` because the second jump's prefix sum starts from where the first lands.

Answering a start `x` then means decomposing `k` into powers of two: walk the set bits from lowest to highest, and whenever bit `b` is set add `sm[b][cur]` to the running total and teleport `cur = up[b][cur]`. The starting index `x` itself is added first since it is counted in the score but not in any receiving sum. Each start costs at most `log k` lookups, and the answer is the maximum total over all `n` starts. Self-loops (`receiver[i] == i`) need no special handling — the tables simply keep adding `i` on every jump.

**Complexity:** `O(n log k)` time, `O(n log k)` space.
