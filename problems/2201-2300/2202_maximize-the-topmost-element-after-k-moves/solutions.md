# Solutions — Maximize the Topmost Element After K Moves

The pile only ever shows a prefix of `nums` with some pushed-back elements
stacked on top, so whether a given element can sit on top after exactly `k`
moves is decided by a short move-budget argument, not by search. Working out
which tops each budget admits collapses the problem to a maximum over one or
two ranges.

## Case analysis on the move budget

To finish with `nums[i]` on top you must remove indices `0..i` (that is
`i + 1` moves) and push `nums[i]` back (one more), so `i + 2 <= k`; the
leftover budget burns harmlessly as pop-then-push-back pairs, and when its
parity is odd the extra pop simply happens one removal earlier. A run of `k`
pure removals instead exposes `nums[k]` itself. So for `2 <= k <= n` the
answer is the maximum of `nums[0..k-2]` and — only when `k < n` — `nums[k]`.

The remaining budgets are corner cases of the same argument. `k = 0` leaves
`nums[0]` standing; `k = 1` forces a single pop (nothing has been removed
yet, so nothing can be pushed), giving `nums[1]`. With `n = 1` the lone
element alternates removed and restored, so every odd `k` ends on an empty
pile and returns -1, every even `k` restores `nums[0]`. And when `k > n` the
whole pile can be removed, all but the last move burned in pairs, and the
maximum pushed back on, so the answer is `max(nums)` — which the `n = 1` and
`k = 1` cases have already excluded from being ambiguous.

Two bounds shape the code. `k` reaches `10⁹`, an order of magnitude past the
array length, so no branch may iterate `k` times — the removals loop stops at
`k - 1 < n`, everything else is `O(1)` or one scan of `nums`. And `nums[i]`
also reaches `10⁹`, comfortably inside 32-bit range for the fixed-width
languages; JavaScript only ever compares values and takes `k % 2`, never
arithmetic that could approach the `2⁵³` exact-integer ceiling.

**Complexity:** `O(n)` time, `O(1)` space.
