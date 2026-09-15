# Solutions — Minimum Bitwise OR From Grid

## Greedy accumulated forbidden mask

Process bits from 16 down to 0, so each decision fixes the next most significant bit of the answer. Maintain a mask of every bit already required to be absent. To tentatively exclude the current bit as well, add it to that mask and check every row. The tentative mask is feasible exactly when each row contains at least one value whose intersection with the mask is zero: choices in different rows are independent, so taking one such value per row keeps every forbidden bit out of their combined OR, while a row without such a value makes that impossible.

The invariant before each test is that the mask contains all more significant bits already proven simultaneously avoidable, while the answer contains the more significant bits forced after preserving those zeroes. If the tentative mask is feasible, retaining it gives the lexicographically smaller prefix with the current answer bit unset. If it is infeasible, every selection that preserves the earlier zeroes must set the current bit, so adding that bit to the answer is forced. This accumulated-mask condition is essential because different bits can each be avoidable on their own but impossible to avoid simultaneously. Values are at most `10⁵`, so bits 16 through 0 cover every possible value.

**Complexity:** `O(Bmn)` time, `O(1)` extra space, where `B = 17`.
