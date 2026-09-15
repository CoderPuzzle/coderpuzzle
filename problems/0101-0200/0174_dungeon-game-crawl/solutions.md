# Solutions — Dungeon Game

## Bottom-up dynamic programming from the princess

Call `need(i, j)` the least health the knight may hold on entering room `(i, j)` and still reach the princess alive. From any room the only moves are right and down, so `need(i, j) = max(1, min(need(i + 1, j), need(i, j + 1)) - dungeon[i][j])`, with the princess room itself needing `max(1, 1 - dungeon[m-1][n-1])` and the answer `need(0, 0)`. The direction is the whole problem: the same recurrence run forward does not exist. Health is not a cost that only shrinks — an orb can bank surplus for later — so "cheapest health on arrival at `(i, j)`" is not well-defined; an arrival with more health is not always better, because how much is enough depends on the entire remaining path. Summarizing the future first, at the princess and backwards, is what restores optimal substructure: by the time a room is folded in, the demand of everything after it is already a single number.

The code keeps one rolling row of `n + 1` entries. Index `n` holds an impassable sentinel far above any real need, and index `n - 1` is seeded with 1, the demand of the virtual room past the princess; every other entry starts at the sentinel. Rows fold bottom-up, and each row right-to-left: when column `j` is updated, `need[j]` still holds the room below and `need[j + 1]` already holds this row — exactly the two moves the recurrence consults. The clamp `max(1, ...)` is the rule that health may never touch zero, and it is applied at every room, including orbs that would otherwise drive the need negative.

A path crosses at most `m + n - 1 = 399` rooms whose values are bounded by 1000 in magnitude, so no honest need exceeds `1 + 399 * 1000 = 399001`; the sentinel 10⁹ towers over that while staying three powers of ten below 32-bit overflow, and it never wins a `min` against a computed entry. The dungeon itself is never mutated.

**Complexity:** `O(mn)` time, `O(n)` extra space.
