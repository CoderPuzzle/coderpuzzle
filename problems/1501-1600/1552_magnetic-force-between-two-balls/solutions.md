# Solutions — Magnetic Force Between Two Balls

## Binary Search on the Answer

The feasibility predicate "balls can be placed with every pair at least `d` apart" is monotone: if spacing `d` works, every smaller spacing also works. That monotonicity lets us binary search the answer over `[1, max(position) - min(position)]` instead of enumerating placements, which are exponentially many.

The check itself is greedy. Sort the positions, put the first ball at the leftmost basket, then walk rightward placing a ball at the first basket at least `d` beyond the last placed one. This earliest-possible placement is never worse than skipping ahead, so if this scheme cannot fit `m` balls, no scheme can; the loop exits early once `m` balls are placed. The search uses the upper-mid form `mid = (lo + hi + 1) // 2` with `hi = mid - 1` on failure, which avoids the infinite loop a plain midpoint would cause when converging on the last feasible value.

Positions are distinct and `m ≤ n`, so a feasible answer always exists at `d = 1`. The initial `count = 1` accounts for the ball at `position[0]`, and the degenerate `m = 2` case is handled by the same sweep, returning the full span when the extremes are the best choice.

**Complexity:** `O(n log n + n log D)` time, `O(n)` space, where `D` is the span between the smallest and largest positions.
