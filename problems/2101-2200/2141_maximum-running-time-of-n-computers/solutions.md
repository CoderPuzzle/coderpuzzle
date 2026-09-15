# Solutions — Maximum Running Time of N Computers

## Binary Search on the Answer

Whether all `n` computers can run simultaneously for `t` minutes is a monotone property: if `t` is achievable, so is any smaller duration. That makes the problem a binary search for the largest feasible `t`. The search runs over integers in `[0, sum(batteries) // n]`, since the total charge divided by `n` computers is an absolute ceiling, and the upper-mid variant (`(lo + hi + 1) // 2`) converges on the maximum feasible value.

The feasibility test captures the free swapping between computers. Over a horizon of `t` minutes, a single battery can power at most one computer at a time, so it contributes at most `min(battery, t)` computer-minutes — a battery larger than `t` cannot lend its surplus to another computer, and a smaller battery is fully consumed. Summing these capped contributions gives the maximum total computer-minutes extractable, and running `n` computers for `t` minutes needs exactly `n·t`, so `t` is feasible precisely when `sum(min(b, t) for b in batteries) >= n * t`. Sufficiency follows because this divisible pool of capped charges can always be scheduled across computers by swapping at integer moments.

Each test scans the battery list once; with `B` batteries and total charge `S`, the binary search performs `O(log(S/n))` tests. Only a few scalars are kept besides the input.

**Complexity:** `O(B log(S / n))` time, `O(1)` space, where `B` is the number of batteries and `S` the total charge.
