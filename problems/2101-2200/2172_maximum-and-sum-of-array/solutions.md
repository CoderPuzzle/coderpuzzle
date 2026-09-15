# Solutions — Maximum AND Sum of Array

## Bitmask DP over Slot Positions

Each slot holds at most two numbers, so model the slots as `2 · numSlots` individual positions, where position `p` belongs to slot `p // 2 + 1` (positions 0 and 1 map to slot 1, 2 and 3 to slot 2, and so on). Because `numSlots ≤ 9`, there are at most 18 positions and 2¹⁸ states — small enough to enumerate exhaustively. A state is a bitmask of which positions are already filled.

The numbers can be assigned in a fixed order, since the sum is symmetric in the assignment: the number placed next is determined by the state itself — the popcount of the mask says how many numbers have been placed, so it must be `nums[popcount(mask)]`. The DP sweeps every reachable mask (those with `dp[mask] ≥ 0`), skips terminal states where all `n` numbers are placed (updating the global best from them), and otherwise tries placing the next number into each free position, relaxing `dp[mask | 1 << p]` with `dp[mask] + (nums[i] & (p // 2 + 1))`.

Because the position a number enters is interchangeable — any assignment of numbers to positions is reachable by choosing the matching order — the fixed-order enumeration is exact. Unreachable masks keep the sentinel −1 and are skipped, and the answer collects the best terminal state. With `m = numSlots`, the sweep visits 2^(2m) states and tries up to 2m positions each.

**Complexity:** `O(2^(2m) · m)` time, `O(2^(2m))` space, where `m = numSlots ≤ 9`.
